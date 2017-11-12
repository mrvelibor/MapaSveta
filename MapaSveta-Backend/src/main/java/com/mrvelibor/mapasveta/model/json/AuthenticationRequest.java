package com.mrvelibor.mapasveta.model.json;

public class AuthenticationRequest {
    public String email;
    public String password;

    public AuthenticationRequest() {}

    public AuthenticationRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
