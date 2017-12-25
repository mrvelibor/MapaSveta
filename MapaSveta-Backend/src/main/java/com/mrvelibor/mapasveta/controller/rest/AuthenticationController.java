package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.json.AuthenticationRequest;
import com.mrvelibor.mapasveta.model.json.AuthenticationResponse;
import com.mrvelibor.mapasveta.model.json.SocialAuthenticationRequest;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.AuthenticationService;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import java.security.Principal;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private UserService userService;

    @GetMapping(value = "")
    public ResponseEntity<?> auth(Principal principal) throws AuthenticationException {
        if (principal == null) {
            throw new AuthenticationCredentialsNotFoundException("Principal null");
        }
        return ResponseEntity.ok(principal.getName());
    }

    @PostMapping(value = "login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest authenticationRequest) throws AuthenticationException {
        AuthenticationResponse response = authenticationService.login(authenticationRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User user) throws ServletException {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest(user.getUsername(), user.getPassword());
        authenticationService.register(user);
        return login(authenticationRequest);
    }

    @PostMapping(value = "google")
    public ResponseEntity<AuthenticationResponse> google(@RequestBody SocialAuthenticationRequest socialAuthenticationRequest, Principal principal) throws ServletException {
        User currentUser = null;
        if (principal != null) {
            userService.loadUserByUsername(principal.getName());
        }
        AuthenticationResponse response = authenticationService.googleAuth(socialAuthenticationRequest, currentUser);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "facebook")
    public ResponseEntity<AuthenticationResponse> facebook(@RequestBody SocialAuthenticationRequest socialAuthenticationRequest, Principal principal) throws ServletException {
        User currentUser = null;
        if (principal != null) {
            userService.loadUserByUsername(principal.getName());
        }
        AuthenticationResponse response = authenticationService.facebookAuth(socialAuthenticationRequest, currentUser);
        return ResponseEntity.ok(response);
    }
}
