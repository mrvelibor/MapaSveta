package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.user.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User getUser(Long userId);
    User createUser(User user);
    User editUser(User user);
    boolean deleteUser(User user);
    User loadUserByUsername(String username);
    User findByFacebookId(String facebookId);
    User findByGoogleId(String googleId);
    List<User> getAllUsers();
}
