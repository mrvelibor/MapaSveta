package com.mrvelibor.mapasveta.model.json;

import com.mrvelibor.mapasveta.model.json.facebook.GraphUserResponse;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthenticationResponse {
    public String token;
    public UserDetails user;
    public GraphUserResponse graph;

    public AuthenticationResponse() {}

    public AuthenticationResponse(String token, UserDetails user) {
        this.token = token;
        this.user = user;
    }
}
