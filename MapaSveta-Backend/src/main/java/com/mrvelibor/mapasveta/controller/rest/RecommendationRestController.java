package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.common.enums.UserType;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.json.RecommendationRatingValue;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.recommendations.RecommendationRating;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.CountryService;
import com.mrvelibor.mapasveta.service.RecommendationService;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/recommendations")
public class RecommendationRestController {
    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private UserService userService;

    @Autowired
    private CountryService countryService;

    @PostMapping(value = "")
    public ResponseEntity<Recommendation> createRecommendation(@RequestBody Recommendation recommendation, Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        recommendation.setCreatedBy(currentUser);
        recommendation = recommendationService.createRecommendation(recommendation);
        return ResponseEntity.ok(recommendation);
    }

    @DeleteMapping(value = "{recommendationId}")
    public ResponseEntity<Boolean> deleteRecommendation(@PathVariable Long recommendationId, Principal principal) {
        Recommendation recommendation = recommendationService.getRecommendation(recommendationId);
        if (recommendation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser.getType() != UserType.admin && !currentUser.getId().equals(recommendation.getCreatedBy().getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        boolean deleted = recommendationService.deleteRecommendation(recommendation);
        return ResponseEntity.ok(deleted);
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Recommendation>> getAllRecommendations() {
        List<Recommendation> recommendations = recommendationService.getAllRecommendations();
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping(value = "by_user/{userId}")
    public ResponseEntity<List<Recommendation>> getAllRecommendationsByUser(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        List<Recommendation> recommendations = recommendationService.getAllRecommendationsByUser(user);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping(value = "by_country/{countryId}")
    public ResponseEntity<List<Recommendation>> getAllRecommendationsByCountry(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        List<Recommendation> recommendations =  recommendationService.getAllRecommendationsByCountry(country);
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping(value = "{recommendationId}/ratings")
    public ResponseEntity<List<RecommendationRating>> getAllRecommendationRatings(@PathVariable Long recommendationId) {
        Recommendation recommendation = recommendationService.getRecommendation(recommendationId);
        List<RecommendationRating> ratings =  recommendationService.getAllRatingsForRecommendation(recommendation);
        return ResponseEntity.ok(ratings);
    }

    @PostMapping(value = "{recommendationId}/ratings")
    public ResponseEntity<RecommendationRating> rateRecommendation(@PathVariable Long recommendationId, @RequestBody RecommendationRatingValue rating, Principal principal) {
        Recommendation recommendation = recommendationService.getRecommendation(recommendationId);
        User currentUser = userService.loadUserByUsername(principal.getName());
        RecommendationRating recommendationRating = recommendationService.rateRecommendation(recommendation, currentUser, rating.rating);
        return ResponseEntity.ok(recommendationRating);
    }
}
