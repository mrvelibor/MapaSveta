package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.*;
import com.mrvelibor.mapasveta.model.common.Currency;
import com.mrvelibor.mapasveta.model.common.Language;
import com.mrvelibor.mapasveta.model.common.LatLng;
import com.mrvelibor.mapasveta.model.common.enums.VisaRequirementEnum;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.CountryMap;
import com.mrvelibor.mapasveta.model.common.enums.CountryMapSize;
import com.mrvelibor.mapasveta.model.countries.VisaRequirement;
import com.mrvelibor.mapasveta.service.CountryLoaderService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.logging.Logger;

@Service
public class CountryLoaderServiceImpl implements CountryLoaderService {

    private static final Logger LOG = Logger.getLogger(CountryLoaderService.class.getName());

    @Autowired
    private CountryDao countryDao;

    @Autowired
    private CountryMapDao countryMapDao;

    @Autowired
    private CityDao cityDao;

    @Autowired
    private VisaRequirementDao visaRequirementDao;

    @Autowired
    private LanguageDao languageDao;

    @Autowired
    private CurrencyDao currencyDao;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private ResourcePatternResolver resourcePatternResolver;

    @Override
    public void loadCountries() {
        // JSON Countries
        Resource fileResource = resourceLoader.getResource("classpath:public/res/countries.json");
        try(Scanner scanner = new Scanner(fileResource.getInputStream())) {
            if (scanner.useDelimiter("\\A").hasNext()) {
                String json = scanner.next();
                JSONArray array = new JSONArray(json);
                for (int i = 0; i < array.length(); ++i) {
                    loadJsonCountry(array.getJSONObject(i));
                }
            } else {
                LOG.info("No file: " + fileResource.getDescription());
            }
        } catch (IOException | JSONException ex) {
            LOG.info(ex.getMessage());
            ex.printStackTrace();
        }

        // JSON Visas
        Resource[] resources = new Resource[0];
        try {
            resources = resourcePatternResolver.getResources("classpath:public/res/country_visas/*.json");
        } catch (IOException ex) {
            LOG.info(ex.getMessage());
            ex.printStackTrace();
        }
        List<JSONObject> visaCountries = new ArrayList<>(resources.length);
        for (Resource visaRes : resources) {
            try(Scanner scanner = new Scanner(visaRes.getInputStream())) {
                if (scanner.useDelimiter("\\A").hasNext()) {
                    String json = scanner.next();
                    visaCountries.add(new JSONObject(json));
                } else {
                    LOG.info("No file: " + fileResource.getDescription());
                }
            } catch (IOException | JSONException ex) {
                LOG.info(ex.getMessage());
                ex.printStackTrace();
            }
        }
        for (JSONObject visaCountry : visaCountries) {
            loadJsonVisaCode(visaCountry);
        }
//        for (JSONObject visaCountry : visaCountries) {
//            loadJsonVisaPolicies(visaCountry);
//        }
    }

    private void loadJsonCountry(JSONObject object) {
        Country country = new Country();

        country.setCountryCode2(object.getString("cca2"));
        country.setCountryCode3(object.getString("cca3"));
        country.setCommonName((String) object.query("/name/common"));
        country.setOfficialName((String) object.query("/name/official"));

        City capital = new City();
        capital.setName(object.getString("capital"));
        //capital.setLocation(new LatLng(object.getJSONArray("latlng").getBigDecimal(0), object.getJSONArray("latlng").getBigDecimal(1)));
        capital = cityDao.save(capital);
        country.setCapital(capital);

        JSONObject nativeNames = (JSONObject) object.query("/name/native");
        country.setNativeNames(new HashSet<>(nativeNames.keySet().size()));
        for (String key: nativeNames.keySet()) {
            country.getNativeNames().add((String) nativeNames.query("/" + key + "/official"));
        }

        JSONObject languages = (JSONObject) object.query("/languages");
        country.setLanguages(new ArrayList<>(languages.keySet().size()));
        for (String key: languages.keySet()) {
            Language language = languageDao.findByCode(key);
            if (language == null) {
                language = new Language();
                language.setCode(key);
                language.setName(languages.getString(key));
                language = languageDao.save(language);
            }
            country.getLanguages().add(language);
        }

        JSONArray currencies = object.getJSONArray("currency");
        country.setCurrencies(new ArrayList<>(currencies.length()));
        for (int i = 0; i < currencies.length(); ++i) {
            String code = currencies.getString(i);
            Currency currency = currencyDao.findByCode(code);
            if (currency == null) {
                currency = new Currency();
                currency.setCode(code);
                currency = currencyDao.save(currency);
            }
            country.getCurrencies().add(currency);
        }

        try {
            country.setDiallingCode("+" + object.query("/callingCode/0"));
        } catch (Exception ex) {}

        try {
            country.setDomain((String) object.query("/tld/0"));
        } catch (Exception ex) {}

        country = createCountry(country);
        LOG.info("Created: " + country);
    }

    private void loadJsonVisaCode(JSONObject object) {
        String cca2 = object.getString("cca2");
        Country country = countryDao.findByCountryCode2(cca2);
        if (country == null) {
            return;
        }
        country.setVisaCode(object.getString("csvc"));
        countryDao.save(country);
    }

    private void loadJsonVisaPolicies(JSONObject object) {
        String visaCode = object.getString("csvc");
        JSONObject requirements = object.optJSONObject("requirements");
        if (requirements == null) {
            return;
        }
        Country countryFrom = countryDao.findByVisaCode(visaCode);
        if (countryFrom == null) {
            return;
        }
        for (String key : requirements.keySet()) {
            Country countryTo = countryDao.findByVisaCode(key);
            if (countryTo == null) {
                continue;
            }
            JSONObject requirement = requirements.getJSONObject(key);
            VisaRequirement visaRequirement = new VisaRequirement();
            visaRequirement.setFromCountry(countryFrom);
            visaRequirement.setToCountry(countryTo);
            visaRequirement.setRequirement(VisaRequirementEnum.fromString(requirement.getString("permission")));
            visaRequirement.setLengthOfStay(requirement.getString("time"));
            visaRequirement.setOther(requirement.get("required").toString());
            visaRequirement.setNotes(requirement.getString("note"));
            visaRequirementDao.save(visaRequirement);
        }
    }

    private Country createCountry(Country country) {
        country = countryDao.save(country);
        for (CountryMapSize size : CountryMapSize.values()) {
            CountryMap countryMap = new CountryMap();
            countryMap.setCountryCode3(country.getCountryCode3());
            countryMap.setSize(size);
            Resource fileResource = resourceLoader.getResource("classpath:public/res/country_maps/" + countryMap.getSize() + "/" + countryMap.getCountryCode3().toLowerCase() + ".geo.json");
            try(Scanner scanner = new Scanner(fileResource.getInputStream())) {
                if (scanner.useDelimiter("\\A").hasNext()) {
                    String json = scanner.next();
                    countryMap.setGeoJson(new JSONObject(json).toMap());
                } else {
                    LOG.info("No file: " + fileResource.getDescription());
                }
            } catch (IOException ex) {
                LOG.info("VELJA" + ex.getMessage());
            }
            countryMapDao.save(countryMap);
        }
        return null;
    }
}
