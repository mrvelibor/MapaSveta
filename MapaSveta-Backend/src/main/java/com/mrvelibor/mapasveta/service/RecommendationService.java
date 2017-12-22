package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.recommendations.RecommendationRating;
import com.mrvelibor.mapasveta.model.user.User;

import java.util.List;

public interface RecommendationService {
    Recommendation createRecommendation(Recommendation recommendation);
    boolean deleteRecommendation(Recommendation recommendation);
    List<Recommendation> getAllRecommendations();
    List<Recommendation> getAllRecommendationsByUser(User user);
    List<Recommendation> getAllRecommendationsForCountry(Country country);
    RecommendationRating rateRecommendation(Recommendation recommendation, User user, int rating);
    List<RecommendationRating> getAllRatingsForRecommendation(Recommendation recommendation);
    List<RecommendationRating> getAllRatingsByUser(User user);
}
