package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.RecommendationDao;
import com.mrvelibor.mapasveta.dao.RecommendationRatingDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.recommendations.RecommendationRating;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {
    @Autowired
    private RecommendationDao recommendationDao;

    @Autowired
    private RecommendationRatingDao recommendationRatingDao;

    @Override
    public Recommendation createRecommendation(Recommendation recommendation) {
        return recommendationDao.save(recommendation);
    }

    @Override
    public boolean deleteRecommendation(Recommendation recommendation) {
        recommendationDao.delete(recommendation.getId());
        return true;
    }

    @Override
    public List<Recommendation> getAllRecommendations() {
        return recommendationDao.findAll();
    }

    @Override
    public List<Recommendation> getAllRecommendationsByUser(User user) {
        return recommendationDao.findAllByCreatedBy_Id(user.getId());
    }

    @Override
    public List<Recommendation> getAllRecommendationsForCountry(Country country) {
        return recommendationDao.findAllByAddress_Country_Id(country.getId());
    }

    @Override
    public RecommendationRating rateRecommendation(Recommendation recommendation, User user, int rating) {
        recommendation = recommendationDao.findOne(recommendation.getId());
        RecommendationRating recommendationRating = new RecommendationRating();
        recommendationRating.setRecommendation(recommendation);
        recommendationRating.setUser(user);
        recommendationRating.setRating(rating);
        return recommendationRatingDao.save(recommendationRating);
    }

    @Override
    public List<RecommendationRating> getAllRatingsForRecommendation(Recommendation recommendation) {
        return recommendationRatingDao.findAllByRecommendation_Id(recommendation.getId());
    }

    @Override
    public List<RecommendationRating> getAllRatingsByUser(User user) {
        return recommendationRatingDao.findAllByUser_Id(user.getId());
    }
}
