package com.mrvelibor.mapasveta;

import com.mrvelibor.mapasveta.dao.CityDao;
import com.mrvelibor.mapasveta.dao.RecommendationDao;
import com.mrvelibor.mapasveta.model.common.LatLng;
import com.mrvelibor.mapasveta.model.common.enums.UserType;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.recommendations.Recommendation;
import com.mrvelibor.mapasveta.model.trips.Trip;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.ServletException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.logging.Logger;

@Component
public class MapasvetaInit {
    private static final Logger LOG = Logger.getLogger(MapasvetaInit.class.getName());

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    private DateFormat dateFormat;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CountryLoaderService countryLoaderService;

    @Autowired
    private UserService userService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private TripService tripService;

    @Autowired
    private CityDao cityDao;

    @Autowired
    private RecommendationDao recommendationDao;

    @PostConstruct
    public void init() throws Exception {
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        if (!"create".equals(ddlAuto) && !"create-drop".equals(ddlAuto)) {
            return;
        }

        mongoTemplate.getDb().dropDatabase();
        countryLoaderService.loadCountries();
        createTestUsers();
    }

//        City cityBelgrade = new City();
//        cityBelgrade.setName("Belgrade");
//        cityBelgrade.setLocation(new LatLng(new BigDecimal("44.816667"), new BigDecimal("20.466667")));
//        cityBelgrade = cityDao.save(cityBelgrade);
//        LOG.info("Saved: " + cityBelgrade);

    private void createTestUsers() throws Exception {
        createVelja();
        createAdmin();
        createSvetskiPutnik();
        createVodic();
        createTurista();
        createNovica();
        createEmptyUsers();
    }

    private void createVelja() throws ParseException {
        User user = new User();
        user.setFirstName("Velibor");
        user.setLastName("Bačujkov");
        user.setEmail("velibor.bacujkov.2493@metropolitan.ac.rs");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        Recommendation recommendation = new Recommendation();
        recommendation.setName("Banja");
        recommendation.setDescription("Mesto za bleju");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8737322"), new BigDecimal("20.6439815")));
        recommendation.setCreatedBy(user);
        recommendation = recommendationDao.save(recommendation);
        LOG.info("Saved: " + recommendation);

        Trip trip = new Trip();
        trip.setCountry(countryService.findCountryByCommonName("Russia"));
        trip.setDateFrom(dateFormat.parse("2016-11-21"));
        trip.setDateTo(dateFormat.parse("2016-11-30"));
        trip.setCityName("Sankt Petersburg");
        trip.setDetails("Išli smo u Rusiju");
        trip.setUser(user);
        tripService.createTrip(trip);
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
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
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
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
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
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
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
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);
    }

    private void createEmptyUsers() {
        User user = new User();
        user.setFirstName("Indi");
        user.setLastName("Janac");
        user.setEmail("indij@nac.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("India"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        user = new User();
        user.setFirstName("Hrvoje");
        user.setLastName("Bok");
        user.setEmail("hrvoje@bok.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Croatia"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        user = new User();
        user.setFirstName("Zmago");
        user.setLastName("Slovenac");
        user.setEmail("zmago@slovenia.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Slovenia"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        user = new User();
        user.setFirstName("Maki");
        user.setLastName("Donac");
        user.setEmail("maki@donac.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Macedonia"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        user = new User();
        user.setFirstName("Crni");
        user.setLastName("Goran");
        user.setEmail("crni@goran.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Montenegro"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        user = new User();
        user.setFirstName("Tvrda");
        user.setLastName("Glava");
        user.setEmail("bos@nac.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Bosnia and Herzegovina"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        user = new User();
        user.setFirstName("America");
        user.setLastName("F**k Yeah!");
        user.setEmail("america@usa.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("United States"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        user = new User();
        user.setFirstName("Ramm");
        user.setLastName("Stein");
        user.setEmail("r@mm.stein");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Germany"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);
    }
}
