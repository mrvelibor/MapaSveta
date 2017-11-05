package com.mrvelibor.mapasveta.model.json;

import org.springframework.security.core.userdetails.UserDetails;

public class AuthenticationResponse {
    public String token;
    public UserDetails user;

    public AuthenticationResponse() {}

    public AuthenticationResponse(String token, UserDetails user) {
        this.token = token;
        this.user = user;
    }
}
