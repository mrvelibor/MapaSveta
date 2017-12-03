package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.model.json.AuthenticationRequest;
import com.mrvelibor.mapasveta.model.json.AuthenticationResponse;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.security.TokenUtils;
import com.mrvelibor.mapasveta.service.AuthenticationService;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userService.save(user);
    }
}
