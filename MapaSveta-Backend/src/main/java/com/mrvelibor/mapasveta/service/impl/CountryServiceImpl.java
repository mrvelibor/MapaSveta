package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryDao countryDao;

    @Override
    public List<Country> getAllCountries() {
        return countryDao.findAll();
    }
}
