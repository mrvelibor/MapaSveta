package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.common.enums.UserType;
import com.mrvelibor.mapasveta.model.trips.Trip;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.TripService;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/trips")
public class TripRestController {
    @Autowired
    private TripService tripService;

    @Autowired
    private UserService userService;

    @PostMapping(value = "")
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip, Principal principal) {
        User user = userService.loadUserByUsername(principal.getName());
        trip.setUser(user);
        trip = tripService.createTrip(trip);
        return ResponseEntity.ok(trip);
    }

    @PutMapping(value = "{tripId}")
    public ResponseEntity<Trip> editTrip(@PathVariable Long tripId, @RequestBody Trip trip, Principal principal) {
        Trip oldTrip = tripService.getTrip(tripId);
        if (oldTrip == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser.getType() != UserType.admin && !currentUser.getId().equals(oldTrip.getUser().getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        trip.setId(oldTrip.getId());
        trip = tripService.editTrip(trip);
        return ResponseEntity.ok(trip);
    }

    @DeleteMapping(value = "{tripId}")
    public ResponseEntity<Boolean> deleteTrip(@PathVariable Long tripId, Principal principal) {
        Trip trip = tripService.getTrip(tripId);
        if (trip == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser.getType() != UserType.admin && !currentUser.getId().equals(trip.getUser().getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        boolean deleted = tripService.deleteTrip(trip);
        return ResponseEntity.ok(deleted);
    }

    @GetMapping(value = "")
    public ResponseEntity<List<Trip>> getAllTrips(Principal principal) {
        User user = userService.loadUserByUsername(principal.getName());
        List<Trip> trips = tripService.getAllTripsForUser(user);
        return ResponseEntity.ok(trips);
    }
}
