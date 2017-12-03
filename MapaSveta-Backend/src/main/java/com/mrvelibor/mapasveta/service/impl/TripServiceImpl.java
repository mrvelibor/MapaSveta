package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.TripDao;
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
    public List<Trip> getAllTripsForUser(User user) {
        return tripDao.findAllByUser_Id(user.getId());
    }
}
