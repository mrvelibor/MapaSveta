package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.VisaRequirement;

import java.util.List;

public interface CountryService {
    List<Country> getAllCountries();
    List<VisaRequirement> getVisaPolicy(Country country);
    List<VisaRequirement> getVisaRequirements(Country country);
}
