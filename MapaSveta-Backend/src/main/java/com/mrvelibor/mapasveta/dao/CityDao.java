package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.countries.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityDao extends JpaRepository<City, Long> {
    City findByCountry_Id(String countryId);
}