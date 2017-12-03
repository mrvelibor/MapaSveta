package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.countries.VisaRequirement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisaRequirementDao extends JpaRepository<VisaRequirement, Long> {
    List<VisaRequirement> findAllByFromCountry_Id(Long countryId);
    List<VisaRequirement> findAllByToCountry_Id(Long countryId);
}
