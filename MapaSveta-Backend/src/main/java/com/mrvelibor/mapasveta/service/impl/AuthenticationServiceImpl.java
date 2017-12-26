package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.model.common.enums.UserType;
import com.mrvelibor.mapasveta.model.json.AuthenticationRequest;
import com.mrvelibor.mapasveta.model.json.AuthenticationResponse;
import com.mrvelibor.mapasveta.model.json.SocialAuthenticationRequest;
import com.mrvelibor.mapasveta.model.json.facebook.GraphUserResponse;
import com.mrvelibor.mapasveta.model.json.google.GapiUserResponse;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.security.TokenUtils;
import com.mrvelibor.mapasveta.service.AuthenticationService;
import com.mrvelibor.mapasveta.service.CountryService;
import com.mrvelibor.mapasveta.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private CountryService countryService;

    @Autowired
    private RestTemplate restTemplate;

    private Map<String, Object> createClaims(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", username);
        claims.put("created", new Date());
        return claims;
    }

    private AuthenticationResponse createAuthenticationResponse(String username) throws AuthenticationException {
        UserDetails userDetails = userService.loadUserByUsername(username);
        if (userDetails == null) {
            throw new AuthenticationCredentialsNotFoundException("Not logged in.");
        }
        Map<String, Object> claims = createClaims(userDetails.getUsername());
        String token = tokenUtils.generateToken(claims);
        return new AuthenticationResponse(token, userDetails);
    }

    @Override
    public AuthenticationResponse auth() throws AuthenticationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AuthenticationCredentialsNotFoundException("Not logged in.");
        }
        return createAuthenticationResponse(authentication.getName());
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest authenticationRequest) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.email,
                        authenticationRequest.password
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return createAuthenticationResponse(authentication.getName());
    }

    @Override
    public User register(User user) throws ServletException {
        if (user.getEmail() == null || user.getEmail().isEmpty() || user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new ServletException("Please fill in email and password");
        }
        user.setType(UserType.traveller);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.createUser(user);
    }

    private static final String GRAPH_API_URL = "https://graph.facebook.com/v2.11/me?fields={fields}&access_token={token}";
    private static final String FIELDS = "id,name,first_name,last_name,email,birthday,age_range,gender,hometown{location},location{location},picture.type(large)";

    @Override
    public AuthenticationResponse facebookAuth(SocialAuthenticationRequest socialAuthenticationRequest, User currentUser) throws AuthenticationException {
        GraphUserResponse graphUserResponse = restTemplate.getForObject(GRAPH_API_URL, GraphUserResponse.class, FIELDS, socialAuthenticationRequest.token);
        if (graphUserResponse == null || graphUserResponse.id == null) {
            throw new BadCredentialsException("No user found.");
        }
        User user = userService.findByFacebookId(graphUserResponse.id);
        if (user == null) {
            user = new User();
            user.setFacebookId(graphUserResponse.id);
            user.setFirstName(graphUserResponse.first_name);
            user.setLastName(graphUserResponse.last_name);
            user.setEmail(graphUserResponse.email);
            user.setBirthday(graphUserResponse.birthday);
            user.setGender(graphUserResponse.gender);
            if (graphUserResponse.location != null && graphUserResponse.location.location != null) {
                user.setCountry(countryService.findCountryByCommonName(graphUserResponse.location.location.country));
            } else if (graphUserResponse.hometown != null && graphUserResponse.hometown.location != null) {
                user.setCountry(countryService.findCountryByCommonName(graphUserResponse.hometown.location.country));
            }
            if (graphUserResponse.picture != null && graphUserResponse.picture.data != null) {
                user.setAvatarUrl(graphUserResponse.picture.data.url);
            }
            user.setType(UserType.traveller);
            user = userService.createUser(user);
        }
        return createAuthenticationResponse(user.getEmail());
    }

    private static final String GOOGLE_API_URL = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token={token}";

    @Override
    public AuthenticationResponse googleAuth(SocialAuthenticationRequest socialAuthenticationRequest, User currentUser) throws AuthenticationException {
        GapiUserResponse gapiUserResponse = restTemplate.getForObject(GOOGLE_API_URL, GapiUserResponse.class, socialAuthenticationRequest.token);
        if (gapiUserResponse == null || gapiUserResponse.sub == null) {
            throw new BadCredentialsException("No user found.");
        }
        User user = userService.findByGoogleId(gapiUserResponse.sub);
        if (user == null) {
            user = new User();
            user.setGoogleId(gapiUserResponse.sub);
            user.setFirstName(gapiUserResponse.given_name);
            user.setLastName(gapiUserResponse.family_name);
            user.setEmail(gapiUserResponse.email);
            user.setAvatarUrl(gapiUserResponse.picture);
            user.setType(UserType.traveller);
            user = userService.createUser(user);
        }
        return createAuthenticationResponse(user.getEmail());
    }
}
