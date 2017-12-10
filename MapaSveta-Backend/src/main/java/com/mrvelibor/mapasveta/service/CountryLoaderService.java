package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.countries.Country;

public interface CountryLoaderService {
    void loadCountries();
    Country createCountry(Country country);
}
