package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/countries")
public class CountryRestController {

    @Autowired
    private CountryService countryService;

    @GetMapping(value = "")
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }
}
