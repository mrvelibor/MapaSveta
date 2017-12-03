package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.CityDao;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityDao cityDao;

    @Override
    public List<City> getAllCities() {
        return cityDao.findAll();
    }
}
