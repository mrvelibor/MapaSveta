package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.countries.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryDao extends JpaRepository<Country, Long> {
    Country findByCountryCode2(String countryCode2);
    Country findByCountryCode3(String countryCode3);
    Country findByVisaCode(String visaCode);
    Country findByCommonName(String name);
    List<Country> findAllByCommonNameContainingOrOfficialNameContaining(String commonName, String officialName);
}
