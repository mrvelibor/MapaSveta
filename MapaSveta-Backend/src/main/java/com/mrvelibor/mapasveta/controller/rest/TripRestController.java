package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.trips.Trip;
import com.mrvelibor.mapasveta.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/trips")
public class TripRestController {
    @Autowired
    private TripService tripService;

    @GetMapping(value = "")
    public List<Trip> getAllTrips() {
        return tripService.getAllTripsForUser(null);
    }
}
