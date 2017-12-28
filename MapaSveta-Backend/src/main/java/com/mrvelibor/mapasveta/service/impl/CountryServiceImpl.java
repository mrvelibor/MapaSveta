package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.dao.CountryMapDao;
import com.mrvelibor.mapasveta.dao.VisaRequirementDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.VisaRequirement;
import com.mrvelibor.mapasveta.model.countries.CountryMap;
import com.mrvelibor.mapasveta.model.common.enums.CountryMapSize;
import com.mrvelibor.mapasveta.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    @Autowired
    private CountryDao countryDao;

    @Autowired
    private CountryMapDao countryMapDao;

    @Autowired
    private VisaRequirementDao visaRequirementDao;

    @Override
    public Country getCountry(Long countryId) {
        return countryDao.findOne(countryId);
    }

    @Override
    public Country findCountryByCode2(String countryCode2) {
        return countryDao.findByCountryCode2(countryCode2);
    }

    @Override
    public Country findCountryByCode3(String countryCode3) {
        return countryDao.findByCountryCode3(countryCode3);
    }

    @Override
    public Country findCountryByVisaCode(String visaCode) {
        return countryDao.findByVisaCode(visaCode);
    }

    @Override
    public Country findCountryByCommonName(String commonName) {
        return countryDao.findByCommonName(commonName);
    }

    @Override
    public List<Country> findCountriesByName(String name) {
        return countryDao.findDistinctByCommonNameContainingOrOfficialNameContaining(name, name);
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
