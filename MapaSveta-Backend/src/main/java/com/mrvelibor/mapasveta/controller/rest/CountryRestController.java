package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.common.enums.CountryMapSize;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.CountryMap;
import com.mrvelibor.mapasveta.model.countries.VisaRequirement;
import com.mrvelibor.mapasveta.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/countries")
public class CountryRestController {
    @Autowired
    private CountryService countryService;

    @GetMapping(value = "")
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping(value = "maps/{size}")
    public ResponseEntity<List<CountryMap>> getMaps(@PathVariable("size") CountryMapSize size) {
        List<CountryMap> maps = countryService.getMaps(size);
        return ResponseEntity.ok(maps);
    }

    @GetMapping(value = "{countryId}/visa_policy")
    public ResponseEntity<List<VisaRequirement>> getVisaPolicy(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        List<VisaRequirement> policies = countryService.getVisaPolicy(country);
        return ResponseEntity.ok(policies);
    }

    @GetMapping(value = "{countryId}/visa_requirements")
    public ResponseEntity<List<VisaRequirement>> getVisaRequirements(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        List<VisaRequirement> requirements =  countryService.getVisaRequirements(country);
        return ResponseEntity.ok(requirements);
    }
}
