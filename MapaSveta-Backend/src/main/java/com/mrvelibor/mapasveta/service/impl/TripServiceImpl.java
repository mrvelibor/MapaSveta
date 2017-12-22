package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.TripDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.trips.Trip;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripServiceImpl implements TripService {
    @Autowired
    private TripDao tripDao;

    @Override
    public Trip createTrip(Trip trip) {
        return tripDao.save(trip);
    }

    @Override
    public Trip getTrip(Long tripId) {
        return tripDao.findOne(tripId);
    }

    @Override
    public Trip editTrip(Trip trip) {
        return tripDao.save(trip);
    }

    @Override
    public boolean deleteTrip(Trip trip) {
        tripDao.delete(trip.getId());
        return true;
    }

    @Override
    public List<Trip> getAllTripsForUser(User user) {
        return tripDao.findAllByUser_Id(user.getId());
    }

    @Override
    public List<Trip> getAllTripsForCountry(Country country) {
        return tripDao.findAllByCountry_Id(country.getId());
    }
}
