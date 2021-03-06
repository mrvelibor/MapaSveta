package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.recommendations.RecommendationRating;
import com.mrvelibor.mapasveta.model.recommendations.RecommendationRatingCount;
import com.mrvelibor.mapasveta.model.user.User;

import java.util.List;

public interface RecommendationService {
    Recommendation createRecommendation(Recommendation recommendation);
    Recommendation getRecommendation(Long recommendationId);
    boolean deleteRecommendation(Recommendation recommendation);
    List<Recommendation> getAllRecommendations();
    List<Recommendation> getAllRecommendationsByUser(User user);
    List<Recommendation> getAllRecommendationsByCountry(Country country);
    long getRecommendationsCountByCountry(Country country);
    RecommendationRating rateRecommendation(Recommendation recommendation, User user, int rating);
    List<RecommendationRating> getAllRatingsForRecommendation(Recommendation recommendation);
    RecommendationRatingCount getRecommendationRatingCount(Recommendation recommendation);
    List<RecommendationRating> getAllRatingsByUser(User user);
    RecommendationRating getRecommendationRatingForUser(Recommendation recommendation, User user);
}
