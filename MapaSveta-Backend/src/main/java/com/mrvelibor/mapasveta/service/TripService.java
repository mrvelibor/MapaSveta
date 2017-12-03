package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.trips.Trip;
import com.mrvelibor.mapasveta.model.user.User;

import java.util.List;

public interface TripService {
    List<Trip> getAllTripsForUser(User user);
}
