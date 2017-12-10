package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.dao.CountryMapDao;
import com.mrvelibor.mapasveta.dao.VisaRequirementDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.VisaRequirement;
import com.mrvelibor.mapasveta.model.countries.geojson.CountryMap;
import com.mrvelibor.mapasveta.model.countries.geojson.CountryMapSize;
import com.mrvelibor.mapasveta.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Scanner;

@Service
public class CountryServiceImpl implements CountryService {
    @Autowired
    private CountryDao countryDao;

    @Autowired
    private CountryMapDao countryMapDao;

    @Autowired
    private VisaRequirementDao visaRequirementDao;

    @Autowired
    private ResourceLoader resourceLoader;

    @Override
    public Country createCountry(Country country) {
        country = countryDao.save(country);
        for (CountryMapSize size : CountryMapSize.values()) {
            CountryMap countryMap = new CountryMap();
            countryMap.setCountryCode3(country.getCountryCode3());
            countryMap.setSize(size);
            Resource fileResource = resourceLoader.getResource("classpath:public/res/country_maps/" + countryMap.getSize() + "/" + countryMap.getCountryCode3() + ".geo.json");
            try(Scanner scanner = new java.util.Scanner(fileResource.getInputStream())) {
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

    @Override
    public List<Country> getAllCountries() {
        return countryDao.findAll();
    }

    @Override
    public List<CountryMap> getMaps(CountryMapSize size) {
        return countryMapDao.findAllBySize(size);
    }

    @Override
    public List<VisaRequirement> getVisaPolicy(Country country) {
        return visaRequirementDao.findAllByToCountry_Id(country.getId());
    }

    @Override
    public List<VisaRequirement> getVisaRequirements(Country country) {
        return visaRequirementDao.findAllByFromCountry_Id(country.getId());
    }
}
