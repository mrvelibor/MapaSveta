package com.mrvelibor.mapasveta.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import com.mrvelibor.mapasveta.security.TokenUtils;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.model.json.AuthenticationRequest;
import com.mrvelibor.mapasveta.model.json.AuthenticationResponse;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class UserController {

    @Value("Authorization")
    private String tokenHeader;

    @Autowired
    private TokenUtils tokenUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    private AuthenticationResponse getAuthenticationResponse(String username) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        Map<String, Object> claims = getClaims(userDetails.getUsername());
        String token = tokenUtils.generateToken(claims);
        return new AuthenticationResponse(token, userDetails);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<?> authenticationCheck() throws AuthenticationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthenticationResponse response = getAuthenticationResponse(authentication.getName());
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticationRequest(@RequestBody AuthenticationRequest authenticationRequest) throws AuthenticationException {
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.username,
                        authenticationRequest.password
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        AuthenticationResponse response = getAuthenticationResponse(authenticationRequest.username);
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@RequestBody User user) throws ServletException {
        String email = user.getUsername();
        String password = user.getPassword();

        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            throw new ServletException("Please fill in username and password");
        }

        AuthenticationRequest authenticationRequest = new AuthenticationRequest(user.getUsername(), user.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);

        return authenticationRequest(authenticationRequest);
    }

    private Map<String, Object> getClaims(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", username);
        claims.put("created", new Date());
        return claims;
    }

}