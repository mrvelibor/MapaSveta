package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.trips.Trip;
import com.mrvelibor.mapasveta.model.user.User;

import java.util.List;
import java.util.Set;

public interface TripService {
    Trip createTrip(Trip trip);
    Trip getTrip(Long tripId);
    Trip editTrip(Trip trip);
    boolean deleteTrip(Trip trip);
    List<Trip> getAllTripsForUser(User user);
    List<Trip> getAllTripsForCountry(Country country);
    Set<Country> getVisitedCountries(User user);
    Set<Country> getWishlistCountries(User user);
    boolean isCountryInWishlist(Country country, User user);
    boolean addCountryToWishList(Country country, User user);
    boolean deleteCountryFromWishList(Country country, User user);
}
