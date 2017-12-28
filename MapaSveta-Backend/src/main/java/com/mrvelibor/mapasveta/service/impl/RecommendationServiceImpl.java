package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.RecommendationDao;
import com.mrvelibor.mapasveta.dao.RecommendationRatingDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.recommendations.RecommendationRating;
import com.mrvelibor.mapasveta.model.recommendations.RecommendationRatingCount;
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
        recommendation = recommendationDao.save(recommendation);
        rateRecommendation(recommendation, recommendation.getCreatedBy(), 1);
        return recommendation;
    }

    @Override
    public Recommendation getRecommendation(Long recommendationId) {
        return recommendationDao.findOne(recommendationId);
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
    public List<Recommendation> getAllRecommendationsByCountry(Country country) {
        return recommendationDao.findAllByAddress_Country_Id(country.getId());
    }

    @Override
    public long getRecommendationsCountByCountry(Country country) {
        return recommendationDao.countByAddress_Country_Id(country.getId());
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
    public RecommendationRatingCount getRecommendationRatingCount(Recommendation recommendation) {
        long upvotes = recommendationRatingDao.countByRecommendation_IdAndRating(recommendation.getId(), 1);
        long downvotes = recommendationRatingDao.countByRecommendation_IdAndRating(recommendation.getId(), -1);
        return new RecommendationRatingCount(recommendation, upvotes, downvotes);
    }

    @Override
    public List<RecommendationRating> getAllRatingsByUser(User user) {
        return recommendationRatingDao.findAllByUser_Id(user.getId());
    }

    @Override
    public RecommendationRating getRecommendationRatingForUser(Recommendation recommendation, User user) {
        RecommendationRating recommendationRating = recommendationRatingDao.findByRecommendation_IdAndUser_Id(recommendation.getId(), user.getId());
        if (recommendationRating == null) {
            recommendationRating = new RecommendationRating();
            recommendationRating.setRating(0);
        }
        return recommendationRating;
    }
}
