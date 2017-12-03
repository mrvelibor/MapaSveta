package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/recommendations")
public class RecommendationRestController {
    @Autowired
    private RecommendationService recommendationService;

    @GetMapping(value = "")
    public List<Recommendation> getAllRecommendations() {
        return recommendationService.getAllRecommendations();
    }
}
