package com.mrvelibor.mapasveta;

import com.mrvelibor.mapasveta.dao.CityDao;
import com.mrvelibor.mapasveta.dao.RecommendationDao;
import com.mrvelibor.mapasveta.model.common.LatLng;
import com.mrvelibor.mapasveta.model.common.enums.UserType;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.AuthenticationService;
import com.mrvelibor.mapasveta.service.CountryLoaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.logging.Logger;

@Component
public class MapasvetaInit {

    private static final Logger LOG = Logger.getLogger(MapasvetaInit.class.getName());

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private CountryLoaderService countryLoaderService;

    @Autowired
    private CityDao cityDao;

    @Autowired
    private RecommendationDao recommendationDao;

    @PostConstruct
    public void init() throws Exception {
        mongoTemplate.getDb().dropDatabase();

        User user = new User();
        user.setFirstName("Veli");
        user.setLastName("Bor");
        user.setEmail("velja@velja.com");
        user.setPassword("passw0rd");
        user.setType(UserType.traveller);
        user = authenticationService.register(user);
        LOG.info("Saved: " + user);

        countryLoaderService.loadCountries();

        City cityBelgrade = new City();
        cityBelgrade.setName("Belgrade");
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
