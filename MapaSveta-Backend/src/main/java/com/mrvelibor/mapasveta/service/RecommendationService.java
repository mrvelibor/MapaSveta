package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.recommendations.Recommendation;

import java.util.List;

public interface RecommendationService {
    List<Recommendation> getAllRecommendations();
}
