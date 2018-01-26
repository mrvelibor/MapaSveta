package com.mrvelibor.mapasveta;

import com.mrvelibor.mapasveta.dao.CityDao;
import com.mrvelibor.mapasveta.dao.CountryDao;
import com.mrvelibor.mapasveta.model.common.Address;
import com.mrvelibor.mapasveta.model.common.LatLng;
import com.mrvelibor.mapasveta.model.common.enums.UserType;
import com.mrvelibor.mapasveta.model.countries.City;
import com.mrvelibor.mapasveta.model.countries.Country;
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
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Random;
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
    private RecommendationService recommendationService;

    @Autowired
    private CountryDao countryDao;

    @Autowired
    private CityDao cityDao;

    @PostConstruct
    public void init() throws Exception {
        dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        if ("create".equals(ddlAuto) || "create-drop".equals(ddlAuto)) {
            mongoTemplate.getDb().dropDatabase();
            countryLoaderService.loadCountries();
            createCities();
            createTestUsers();
        } else if ("update".equals(ddlAuto)) {
            updateCountries();
        }
    }

    private void createCities() {
        City city = new City();
        city.setName("Pančevo");
        // city.setLocation(new LatLng(new BigDecimal("44.87272011318116"), new BigDecimal("20.649683475494385")));
        city.setCountry(countryService.findCountryByCommonName("Serbia"));
        city = cityDao.save(city);
        LOG.info("Saved: " + city);
    }

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
        user.setEmail("velja@velja.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        Trip trip = new Trip();
        trip.setCountry(countryService.findCountryByCommonName("Russia"));
        trip.setDateFrom(dateFormat.parse("2016-11-21"));
        trip.setDateTo(dateFormat.parse("2016-11-30"));
        trip.setCityName("Sankt Petersburg");
        trip.setDetails("Išli smo u Rusiju");
        trip.setUser(user);
        trip = tripService.createTrip(trip);
        LOG.info("Saved: " + trip);

        Recommendation recommendation = new Recommendation();
        recommendation.setName("Baščaršija");
        recommendation.setDescription("Baščaršija je stara sarajevska čaršija i historijski i kulturni centar grada.");
        recommendation.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ba%C5%A1%C4%8Dar%C5%A1ija_2006.jpg/288px-Ba%C5%A1%C4%8Dar%C5%A1ija_2006.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("43.8600064"), new BigDecimal("18.4313089")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Sarajevo");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Bosnia and Herzegovina"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
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
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
        user.setAvatarUrl("https://business.americanexpress.com/uk/~/media/Images/GCP/uk2/business-news-and-insights/The-New-Business-Traveller/Amex_New_Breed_Business_Traveler.jpg");
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        List<Country> countries = countryService.getAllCountries();
        for (Country country : countries) {
            Trip trip = new Trip();
            trip.setUser(user);
            trip.setCountry(country);
            trip.setDetails("Putovanje u: " + country.getOfficialName());
            trip = tripService.createTrip(trip);
            LOG.info("Saved: " + trip);
        }
    }

    private void createVodic() {
        User user = new User();
        user.setFirstName("Vodič");
        user.setLastName("Turistički");
        user.setEmail("vodic@test.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
        user.setAvatarUrl("http://www.ablebooker.com/wp-content/uploads/2014/08/tourguide-672x372.jpg");
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        Recommendation recommendation;

        recommendation = new Recommendation();
        recommendation.setName("Ajfelov toranj");
        recommendation.setDescription("Ajfelova kula ili Ajfelov toranj (franc. la Tour Eiffel) je metalni toranj sagrađen na Marsovim poljima u Parizu (Francuska) i danas je znamenitost i simbol Pariza.");
        recommendation.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg/250px-Tour_Eiffel_Wikimedia_Commons.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("48.8582776"), new BigDecimal("2.2944260")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Pariz");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("France"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Koloseum");
        recommendation.setDescription("Koloseum, izvorno nazvan „Flavijev amfiteatar“, je amfiteatar u Rimu. Izgrađen od betona i peska, on je najveći amfiteatar ikad izgrađen.");
        recommendation.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg/220px-Colosseum_in_Rome%2C_Italy_-_April_2007.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("41.8902021"), new BigDecimal("12.4921417")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Rim");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Italy"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Crveni trg");
        recommendation.setDescription("Crveni trg (rus. Красная площадь) je najpoznatiji moskovski gradski trg. Trg odvaja Moskovski Kremlj, nekadašnju carsku, a današnju službenu rezidenciju ruskog predsednika, od stare istorijske trgovačke četvrti Kitaj-gorod.");
        recommendation.setImageUrl("https://reflectionandchoice.files.wordpress.com/2014/04/russia-in-snow.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("55.7539385"), new BigDecimal("37.6207066")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Moskva");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Russia"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Petropavlovska tvrđava");
        recommendation.setDescription("Petropavlovska tvrđava (rus. Petropavlovskaя krepostь) je tvrđava iz ranog 18. veka, oko koje je izrastao istorijski centar grada Sankt Peterburga. Danas se pre svega koristi kao prostor za izložbe i muzeje, kao park i turistička atrakcija.");
        recommendation.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/RUS-2016-Aerial-SPB-Peter_and_Paul_Fortress_02.jpg/250px-RUS-2016-Aerial-SPB-Peter_and_Paul_Fortress_02.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("59.9498530"), new BigDecimal("30.3166866")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Sankt Peterburg");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Russia"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Muzej Van Goga");
        recommendation.setDescription("Muzej Van Goga je muzej u Amsterdamu, Holandiji, koji sadrži dela holandskog slikara Vinsenta van Goga i njegovih savremenika.");
        recommendation.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Van_Gogh_Museum_Amsterdam.jpg/800px-Van_Gogh_Museum_Amsterdam.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("52.3584879"), new BigDecimal("4.8808479")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Amsterdam");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Netherlands"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Kula Nebojša");
        recommendation.setDescription("Kula Nebojša je jedna od najpoznatijih kula u Beogradskoj tvrđavi. Nalazi se u Donjem gradu na ulazu u nekadašnje Dunavsko pristanište. U njoj je za vreme turske vladavine pogubljen grčki revolucionar Riga od Fere.");
        recommendation.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kalemegdan_03.jpg/300px-Kalemegdan_03.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8273031"), new BigDecimal("20.4478097")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Beograd");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Serbia"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Pobednik");
        recommendation.setDescription("Pobednik je naziv trijumfalnog spomenika koji je podignut 1928. na Gornjem gradu Beogradske tvrđave povodom proslave desetogodišnjice proboja Solunskog fronta.");
        recommendation.setImageUrl("http://www.beogradskatvrdjava.co.rs/wp-content/uploads/2014/07/slika_2393_DSC_0003.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8230570"), new BigDecimal("20.4476810")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Beograd");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Serbia"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Hram Svetog Save");
        recommendation.setDescription("Hram Svetog Save u Beogradu najveći je srpski pravoslavni hram, najveći pravoslavni hram na Balkanu.");
        recommendation.setImageUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Temple_Saint_Sava.jpg/250px-Temple_Saint_Sava.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("44.7979162"), new BigDecimal("20.4694176")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Beograd");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Serbia"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Vukov spomenik");
        recommendation.setDescription("Spomenik Vuku Karadžiću.");
        recommendation.setImageUrl("https://www.011info.com/uploads/PosaljiSliku/2017/10/31/24/Vuk.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8048666"), new BigDecimal("20.4776251")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Beograd");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Serbia"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);

        recommendation = new Recommendation();
        recommendation.setName("Crveni magacin");
        recommendation.setDescription("Magacin se nalazi u blizini Tamiša, iz razumljivih razloga: prevoz žita brodovima. Ima prizemlje i tri sprata.");
        recommendation.setImageUrl("http://www.pancevo.com/wp-content/uploads/2014/03/cmagacin3.jpg");
        recommendation.setLocation(new LatLng(new BigDecimal("44.8651848"), new BigDecimal("20.6398398")));
        recommendation.setAddress(new Address());
        recommendation.getAddress().setCityName("Pančevo");
        recommendation.getAddress().setCountry(countryService.findCountryByCommonName("Serbia"));
        recommendation.setCreatedBy(user);
        recommendation = recommendationService.createRecommendation(recommendation);
        LOG.info("Saved: " + recommendation);
    }

    private void createTurista() throws ParseException {
        User user = new User();
        user.setFirstName("Turista");
        user.setLastName("Putnik");
        user.setEmail("turista@test.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
        user.setAvatarUrl("http://laoblogger.com/images/clipart-female-world-traveler-royalty-free-9.jpg");
        user.setType(UserType.traveller);
        user = userService.createUser(user);
        LOG.info("Saved: " + user);

        List<Country> countries = countryService.getAllCountries();
        Random rand = new Random();

        for (int i = 0; i < 20; ++i) {
            Trip trip = new Trip();
            trip.setUser(user);

            Country country = countries.get(rand.nextInt(countries.size()));
            trip.setCountry(country);
            if (country.getCapital() != null) {
                trip.setCityName(country.getCapital().getName());
            }

            int startDay = 1 + rand.nextInt(15);
            int endDay = startDay + rand.nextInt(12);
            int month = 1 + rand.nextInt(12);
            int year = 1990 + rand.nextInt(28);
            trip.setDateFrom(dateFormat.parse(year + "-" + month + "-" + startDay));
            trip.setDateFrom(dateFormat.parse(year + "-" + month + "-" + endDay));

            trip = tripService.createTrip(trip);
            LOG.info("Saved: " + trip);
        }
        for (int i = 0; i < 10; ++i) {
            Country country = countries.get(rand.nextInt(countries.size()));
            if (tripService.isCountryInWishlist(country, user)) {
                --i;
                continue;
            }
            tripService.addCountryToWishList(country, user);
        }
    }

    private void createNovica() {
        User user = new User();
        user.setFirstName("Novica");
        user.setLastName("Putnik");
        user.setEmail("novica@test.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Serbia"));
        user.setAvatarUrl("https://i.pinimg.com/736x/9a/c6/af/9ac6af947b0851ddb1a21a732569efe5--dora-the-explorer-ideas-para.jpg");
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
        user.setFirstName("Mujo");
        user.setLastName("Haso");
        user.setEmail("bos@nac.com");
        user.setPassword(passwordEncoder.encode("passw0rd"));
        user.setCountry(countryService.findCountryByCommonName("Bosnia and Herzegovina"));
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

    private void updateCountries() {
        for (Country country : countryDao.findAll()) {
            country.setVisitorCount(tripService.getTripCountForCountry(country));
            country.setWishListCount(tripService.getWishlistCountForCountry(country));
            country.setRecommendationCount(recommendationService.getRecommendationsCountByCountry(country));
            countryDao.save(country);
        }
    }
}
