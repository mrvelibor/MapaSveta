package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.json.AuthenticationRequest;
import com.mrvelibor.mapasveta.model.json.AuthenticationResponse;
import com.mrvelibor.mapasveta.model.json.SocialAuthenticationRequest;
import com.mrvelibor.mapasveta.model.user.User;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.ServletException;

public interface AuthenticationService {
    AuthenticationResponse auth() throws AuthenticationException;
    AuthenticationResponse login(AuthenticationRequest authenticationRequest) throws AuthenticationException;
    User register(User user) throws ServletException;
    AuthenticationResponse facebookAuth(SocialAuthenticationRequest socialAuthenticationRequest, User currentUser) throws AuthenticationException;
    AuthenticationResponse googleAuth(SocialAuthenticationRequest socialAuthenticationRequest, User currentUser) throws AuthenticationException;
}
