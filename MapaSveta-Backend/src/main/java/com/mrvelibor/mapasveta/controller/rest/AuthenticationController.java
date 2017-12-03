package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.json.AuthenticationRequest;
import com.mrvelibor.mapasveta.model.json.AuthenticationResponse;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<?> auth() throws AuthenticationException {
        AuthenticationResponse response = authenticationService.auth();
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest) throws AuthenticationException {
        AuthenticationResponse response = authenticationService.login(authenticationRequest);
        return ResponseEntity.ok(response);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody User user) throws ServletException {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest(user.getUsername(), user.getPassword());
        authenticationService.register(user);
        return login(authenticationRequest);
    }
}
