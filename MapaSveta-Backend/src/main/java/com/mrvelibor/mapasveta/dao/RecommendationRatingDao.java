package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.recommendations.RecommendationRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendationRatingDao extends JpaRepository<RecommendationRating, Long> {
    List<RecommendationRating> findAllByUser_Id(Long userId);
    List<RecommendationRating> findAllByRecommendation_Id(Long recommendationId);
    RecommendationRating findByRecommendation_IdAndUser_Id(Long recommendationId, Long userId);
}
