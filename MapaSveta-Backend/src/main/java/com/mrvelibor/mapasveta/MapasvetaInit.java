package com.mrvelibor.mapasveta;

import com.mrvelibor.mapasveta.dao.CityDao;
import com.mrvelibor.mapasveta.dao.RecommendationDao;
import com.mrvelibor.mapasveta.model.common.LatLng;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.countries.Country;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.AuthenticationService;
import com.mrvelibor.mapasveta.service.CountryService;
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
    private CountryService countryService;

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
        countrySerbia.setCountryCode2("RS");
        countrySerbia.setCountryCode3("SRB");
        countrySerbia.setCommonName("Serbia");
        countrySerbia.setDiallingCode("+381");
        countrySerbia = countryService.createCountry(countrySerbia);
        LOG.info("Saved: " + countrySerbia);

        Country countryBiH = new Country();
        countryBiH.setCountryCode2("BH");
        countryBiH.setCountryCode3("BIH");
        countryBiH.setCommonName("Bosnia & Herzegovina");
        countryBiH.setDiallingCode("+385");
        countryBiH = countryService.createCountry(countryBiH);
        LOG.info("Saved: " + countryBiH);

        Country countryCroatia = new Country();
        countryCroatia.setCountryCode2("HR");
        countryCroatia.setCountryCode3("HRV");
        countryCroatia.setCommonName("Croatia");
        countryCroatia.setDiallingCode("+382");
        countryCroatia = countryService.createCountry(countryCroatia);
        LOG.info("Saved: " + countryCroatia);

        City cityBelgrade = new City();
        cityBelgrade.setName("Belgrade");
        cityBelgrade.setCountry(countrySerbia);
        cityBelgrade.setLocation(new LatLng(new BigDecimal("44.816667"), new BigDecimal("20.466667")));
        cityBelgrade = cityDao.save(cityBelgrade);
        LOG.info("Saved: " + cityBelgrade);

//        countrySerbia.setCapital(cityBelgrade);
//        countrySerbia = countryDao.save(countrySerbia);
//        LOG.info("Saved: " + countrySerbia);

        Recommendation recommendation = new Recommendation();
        recommendation.setDescription("Banja");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8737322"), new BigDecimal("20.6439815")));
        recommendation.setCreatedBy(user);
        recommendation = recommendationDao.save(recommendation);
        LOG.info("Saved: " + recommendation);
    }

}
