package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.user.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User save(User user);
    User loadUserByUsername(String username);
}