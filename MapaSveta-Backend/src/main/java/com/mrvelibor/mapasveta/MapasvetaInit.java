package com.mrvelibor.mapasveta;

import com.mrvelibor.mapasveta.dao.CityDao;
import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.dao.RecommendationDao;
import com.mrvelibor.mapasveta.model.common.LatLng;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.logging.Logger;

@Component
public class MapasvetaInit {

    private static final Logger LOG = Logger.getLogger(MapasvetaInit.class.getName());

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private CountryDao countryDao;

    @Autowired
    private CityDao cityDao;

    @Autowired
    private RecommendationDao recommendationDao;

    @PostConstruct
    public void init() throws Exception {
        User user = new User();
        user.setFirstName("Veli");
        user.setLastName("Bor");
        user.setEmail("velja@velja.com");
        user.setPassword("passw0rd");
        user = authenticationService.register(user);
        LOG.info("Saved: " + user);

        Country countrySerbia = new Country();
        countrySerbia.setCountryCode("RS");
        countrySerbia.setName("Serbia");
        countrySerbia.setDiallingCode("+381");
        countrySerbia = countryDao.save(countrySerbia);
        LOG.info("Saved: " + countrySerbia);

        City cityBelgrade = new City();
        cityBelgrade.setName("Belgrade");
        cityBelgrade.setCountry(countrySerbia);
        cityBelgrade.setLocation(new LatLng(new BigDecimal("44.816667"), new BigDecimal("20.466667")));
        cityBelgrade = cityDao.save(cityBelgrade);
        LOG.info("Saved: " + cityBelgrade);

        Recommendation recommendation = new Recommendation();
        recommendation.setDescription("Banja");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8737322"), new BigDecimal("20.6439815")));
        recommendation.setCreatedBy(user);
        recommendation = recommendationDao.save(recommendation);
        LOG.info("Saved: " + recommendation);
    }

}
