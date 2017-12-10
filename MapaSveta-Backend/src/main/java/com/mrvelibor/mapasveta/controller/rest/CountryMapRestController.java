package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.countries.geojson.CountryMap;
import com.mrvelibor.mapasveta.model.countries.geojson.CountryMapSize;
import com.mrvelibor.mapasveta.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/maps")
public class CountryMapRestController {
    @Autowired
    private CountryService countryService;

    @GetMapping(value = "/{size}")
    public List<CountryMap> getAllCountryGeoJsons(@PathVariable("size") CountryMapSize size) {
        return countryService.getMaps(size);
    }
}
