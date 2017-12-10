package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.dao.CountryMapDao;
import com.mrvelibor.mapasveta.dao.VisaRequirementDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.geojson.CountryMap;
import com.mrvelibor.mapasveta.model.countries.geojson.CountryMapSize;
import com.mrvelibor.mapasveta.service.CountryLoaderService;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
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
    private VisaRequirementDao visaRequirementDao;

    @Autowired
    private ResourceLoader resourceLoader;

    @Override
    public void loadCountries() {
        Resource fileResource = resourceLoader.getResource("classpath:public/res/countries.json");
        try(Scanner scanner = new Scanner(fileResource.getInputStream())) {
            if (scanner.useDelimiter("\\A").hasNext()) {
                String json = scanner.next();
                loadJsonArray(new JSONArray(json));
            }
        } catch (IOException | JSONException ex) {
            // Ignore
        }
    }

    private void loadJsonArray(JSONArray array) {
        for (int i = 0; i < array.length(); ++i) {
            JSONObject object = array.getJSONObject(i);
            Country country = new Country();
            country.setCountryCode2(object.getString("cca2"));
            country.setCountryCode3(object.getString("cca3"));
            country.setCommonName(object.getJSONObject("name").getString("common"));
            country.setOfficialName(object.getJSONObject("name").getString("official"));
            country = createCountry(country);
            LOG.info("Created: " + country);
        }
    }

    @Override
    public Country createCountry(Country country) {
        country = countryDao.save(country);
        for (CountryMapSize size : CountryMapSize.values()) {
            CountryMap countryMap = new CountryMap();
            countryMap.setCountryCode3(country.getCountryCode3());
            countryMap.setSize(size);
            Resource fileResource = resourceLoader.getResource("classpath:public/res/country_maps/" + countryMap.getSize() + "/" + countryMap.getCountryCode3() + ".geo.json");
            try(Scanner scanner = new Scanner(fileResource.getInputStream())) {
                if (scanner.useDelimiter("\\A").hasNext()) {
                    countryMap.setGeoJson(scanner.next());
                }
            } catch (IOException ex) {
                // Ignore
            }
            countryMapDao.save(countryMap);
        }
        return null;
    }
}
