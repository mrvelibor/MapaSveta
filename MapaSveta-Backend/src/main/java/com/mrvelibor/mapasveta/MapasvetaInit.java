package com.mrvelibor.mapasveta;

import com.mrvelibor.mapasveta.dao.CityDao;
import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.model.common.LatLng;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.countries.Country;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.math.BigDecimal;
import java.util.logging.Logger;

@Component
public class MapasvetaInit {

    private static final Logger LOG = Logger.getLogger(MapasvetaInit.class.getName());

    @Autowired
    private CountryDao countryDao;

    @Autowired
    private CityDao cityDao;

    @PostConstruct
    public void init(){
        Country countrySerbia = new Country();
        countrySerbia.setCountryCode("RS");
        countrySerbia.setName("Serbia");
        countrySerbia.setDiallingCode("+381");
        countrySerbia = countryDao.save(countrySerbia);
        LOG.info("Saved: " + countrySerbia);

        City cityBelgrade = new City();
        cityBelgrade.setName("Belgrade");
        cityBelgrade.setCountry(countrySerbia);
        cityBelgrade.setLocation(new LatLng(new BigDecimal("10.1"), new BigDecimal("11.2")));
        cityBelgrade = cityDao.save(cityBelgrade);
        LOG.info("Saved: " + cityBelgrade);
    }

}