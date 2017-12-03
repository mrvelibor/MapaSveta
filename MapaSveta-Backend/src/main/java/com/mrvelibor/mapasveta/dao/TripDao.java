package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.trips.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripDao extends JpaRepository<Trip, Long> {
    List<Trip> findAllByUser_Id(Long userId);
    List<Trip> findAllByCountry_Id(Long countryId);
}
