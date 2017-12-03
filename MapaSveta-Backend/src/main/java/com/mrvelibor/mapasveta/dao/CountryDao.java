package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.countries.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryDao extends JpaRepository<Country, Long> {
    Country findByCountryCode(String countryCode);
}
