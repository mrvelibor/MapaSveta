package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.RecommendationDao;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationServiceImpl implements RecommendationService {
    @Autowired
    private RecommendationDao recommendationDao;

    @Override
    public List<Recommendation> getAllRecommendations() {
        return recommendationDao.findAll();
    }
}
