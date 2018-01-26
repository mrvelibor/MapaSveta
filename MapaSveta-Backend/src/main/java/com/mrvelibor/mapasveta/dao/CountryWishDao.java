package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.trips.CountryWish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountryWishDao extends JpaRepository<CountryWish, Long> {
    List<CountryWish> findAllByUser_Id(Long userId);
    List<CountryWish> findAllByCountry_Id(Long countryId);
    long countByCountry_Id(Long countryId);
    CountryWish findByUser_IdAndCountry_Id(Long userId, Long countryId);
}
