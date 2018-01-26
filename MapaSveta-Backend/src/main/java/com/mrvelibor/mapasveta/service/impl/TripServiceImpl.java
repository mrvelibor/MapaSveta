package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.dao.CountryWishDao;
import com.mrvelibor.mapasveta.dao.TripDao;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.trips.CountryWish;
import com.mrvelibor.mapasveta.model.trips.Trip;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TripServiceImpl implements TripService {
    @Autowired
    private TripDao tripDao;

    @Autowired
    private CountryWishDao countryWishDao;

    @Autowired
    private CountryDao countryDao;

    @Override
    public Trip createTrip(Trip trip) {
        trip = tripDao.save(trip);
        Country country = countryDao.findOne(trip.getCountry().getId());
        country.setVisitorCount(country.getVisitorCount() + 1);
        countryDao.save(country);
        return trip;
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
        Country country = countryDao.findOne(trip.getCountry().getId());
        country.setVisitorCount(country.getVisitorCount() + 1);
        countryDao.save(country);
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

    @Override
    public long getTripCountForCountry(Country country) {
        return tripDao.countByCountry_Id(country.getId());
    }

    @Override
    public long getWishlistCountForCountry(Country country) {
        return countryWishDao.countByCountry_Id(country.getId());
    }

    @Override
    public Set<Country> getVisitedCountries(User user) {
        List<Trip> countries = tripDao.findAllByUser_Id(user.getId());
        return countries.stream().map(Trip::getCountry).collect(Collectors.toSet());
    }

    @Override
    public Set<Country> getWishlistCountries(User user) {
        List<CountryWish> countries = countryWishDao.findAllByUser_Id(user.getId());
        return countries.stream().map(CountryWish::getCountry).collect(Collectors.toSet());
    }

    @Override
    public boolean isCountryInWishlist(Country country, User user) {
        return countryWishDao.findByUser_IdAndCountry_Id(user.getId(), country.getId()) != null;
    }

    @Override
    public boolean addCountryToWishList(Country country, User user) {
        try {
            CountryWish countryWish = new CountryWish();
            countryWish.setCountry(country);
            countryWish.setUser(user);
            countryWishDao.save(countryWish);
            country.setWishListCount(country.getWishListCount() + 1);
            countryDao.save(country);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }

    @Override
    public boolean deleteCountryFromWishList(Country country, User user) {
        try {
            CountryWish countryWish = countryWishDao.findByUser_IdAndCountry_Id(user.getId(), country.getId());
            if (countryWish != null) {
                countryWishDao.delete(countryWish);
                country.setWishListCount(country.getWishListCount() - 1);
                countryDao.save(country);
            }
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
