package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.countries.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityDao extends JpaRepository<City, Long> {
    List<City> findAllByCountry_Id(Long countryId);
}
