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
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletException;
import java.math.BigDecimal;
import java.util.logging.Logger;

@Component
public class MapasvetaInit {
    private static final Logger LOG = Logger.getLogger(MapasvetaInit.class.getName());

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CountryLoaderService countryLoaderService;

    @Autowired
    private UserService userService;

    @Autowired
    private CityDao cityDao;

    @Autowired
    private RecommendationDao recommendationDao;

    @PostConstruct
    public void init() throws Exception {
        if (!"create".equals(ddlAuto) && !"create-drop".equals(ddlAuto)) {
            return;
        }

        mongoTemplate.getDb().dropDatabase();

        countryLoaderService.loadCountries();

//        City cityBelgrade = new City();
//        cityBelgrade.setName("Belgrade");
//        cityBelgrade.setLocation(new LatLng(new BigDecimal("44.816667"), new BigDecimal("20.466667")));
//        cityBelgrade = cityDao.save(cityBelgrade);
//        LOG.info("Saved: " + cityBelgrade);

        User user = new User();
        user.setFirstName("Veli");
        user.setLastName("Bor");
        user.setEmail("velja@velja.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        createAdmin();
        createSvetskiPutnik();
        createVodic();
        createTurista();
        createNovica();

        Recommendation recommendation = new Recommendation();
        recommendation.setDescription("Banja");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8737322"), new BigDecimal("20.6439815")));
        recommendation.setCreatedBy(user);
        recommendation = recommendationDao.save(recommendation);
        LOG.info("Saved: " + recommendation);
    }

    private void createAdmin() {
        User user = new User();
        user.setFirstName("Admin");
        user.setLastName("Lokalni");
        user.setEmail("admin@localhost");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setType(UserType.admin);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);
    }

    private void createSvetskiPutnik() {
        User user = new User();
        user.setFirstName("Svetski");
        user.setLastName("Putnik");
        user.setEmail("svetski_putnik@test.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);
    }

    private void createVodic() {
        User user = new User();
        user.setFirstName("Vodič");
        user.setLastName("Turistički");
        user.setEmail("vodic@test.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);
    }

    private void createTurista() {
        User user = new User();
        user.setFirstName("Turista");
        user.setLastName("Putnik");
        user.setEmail("turista@test.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);
    }

    private void createNovica() {
        User user = new User();
        user.setFirstName("Novica");
        user.setLastName("Putnik");
        user.setEmail("novica@test.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);
    }
}
