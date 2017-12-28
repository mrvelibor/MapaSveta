package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.common.enums.CountryMapSize;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.countries.CountryMap;
import com.mrvelibor.mapasveta.model.countries.VisaRequirement;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.CountryService;
import com.mrvelibor.mapasveta.service.RecommendationService;
import com.mrvelibor.mapasveta.service.TripService;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(path = "/countries")
public class CountryRestController {
    @Autowired
    private CountryService countryService;

    @Autowired
    private RecommendationService recommendationService;

    @Autowired
    private TripService tripService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "")
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping(value = "{countryId}")
    public ResponseEntity<Country> getCountry(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        if (country == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(country);
    }

    @GetMapping(value = "{countryId}/trip_count")
    public ResponseEntity<Long> getCountryTripCount(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        if (country == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Long travels = tripService.getTripCountForCountry(country);
        return ResponseEntity.ok(travels);
    }

    @GetMapping(value = "{countryId}/recommendation_count")
    public ResponseEntity<Long> getCountryRecommendation(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        if (country == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Long travels = recommendationService.getRecommendationsCountByCountry(country);
        return ResponseEntity.ok(travels);
    }

    @GetMapping(value = "visited")
    public ResponseEntity<Set<Country>> getVisitedCountries(Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Set<Country> countries = tripService.getVisitedCountries(currentUser);
        return ResponseEntity.ok(countries);
    }

    @GetMapping(value = "wishlist")
    public ResponseEntity<Set<Country>> getWishlistCountries(Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Set<Country> countries = tripService.getWishlistCountries(currentUser);
        return ResponseEntity.ok(countries);
    }

    @GetMapping(value = "wishlist/{countryId}")
    public ResponseEntity<Boolean> isCountryInWishlist(@PathVariable Long countryId, Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Country country = countryService.getCountry(countryId);
        if (country == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        boolean result = tripService.isCountryInWishlist(country, currentUser);
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "wishlist/{countryId}")
    public ResponseEntity<Boolean> addCountryToWishList(@PathVariable Long countryId, Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Country country = countryService.getCountry(countryId);
        if (country == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        boolean result = tripService.addCountryToWishList(country, currentUser);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping(value = "wishlist/{countryId}")
    public ResponseEntity<Boolean> deleteCountryFromWishList(@PathVariable Long countryId, Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Country country = countryService.getCountry(countryId);
        if (country == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        boolean result = tripService.deleteCountryFromWishList(country, currentUser);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "maps/{size}")
    public ResponseEntity<List<CountryMap>> getMaps(@PathVariable("size") CountryMapSize size) {
        List<CountryMap> maps = countryService.getMaps(size);
        return ResponseEntity.ok(maps);
    }

    @GetMapping(value = "{countryId}/visa_policy")
    public ResponseEntity<List<VisaRequirement>> getVisaPolicy(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        List<VisaRequirement> policies = countryService.getVisaPolicy(country);
        return ResponseEntity.ok(policies);
    }

    @GetMapping(value = "{countryId}/visa_requirements")
    public ResponseEntity<List<VisaRequirement>> getVisaRequirements(@PathVariable Long countryId) {
        Country country = countryService.getCountry(countryId);
        List<VisaRequirement> requirements =  countryService.getVisaRequirements(country);
        return ResponseEntity.ok(requirements);
    }
}
