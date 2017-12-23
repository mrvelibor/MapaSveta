package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.VisaRequirement;
import com.mrvelibor.mapasveta.model.countries.CountryMap;
import com.mrvelibor.mapasveta.model.common.enums.CountryMapSize;

import java.util.List;

public interface CountryService {
    Country getCountry(Long countryId);
    Country findCountryByCode2(String countryCode2);
    Country findCountryByCode3(String countryCode3);
    Country findCountryByVisaCode(String visaCode);
    Country findCountryByCommonName(String commonName);
    List<Country> findCountriesByName(String name);
    List<Country> getAllCountries();
    List<CountryMap> getMaps(CountryMapSize size);
    List<VisaRequirement> getVisaPolicy(Country country);
    List<VisaRequirement> getVisaRequirements(Country country);
}
