package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/cities")
public class CityRestController {
    @Autowired
    private CityService cityService;

    @GetMapping(value = "")
    public List<City> getAllCities() {
        return cityService.getAllCities();
    }
}
