package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationDao extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findAllByCreatedBy_Id(Long userId);
    List<Recommendation> findAllByAddress_Country_Id(Long countryId);
    long countByAddress_Country_Id(Long countryId);
}
