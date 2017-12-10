package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.countries.geojson.CountryMap;
import com.mrvelibor.mapasveta.model.countries.geojson.CountryMapSize;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CountryMapDao extends MongoRepository<CountryMap, String> {
    List<CountryMap> findAllByCountryCode3(CountryMapSize countryCode3);
    List<CountryMap> findAllBySize(CountryMapSize size);
    CountryMap findByCountryCode3AndSize(String countryCode3, CountryMapSize size);
}
