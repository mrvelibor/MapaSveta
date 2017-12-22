package com.mrvelibor.mapasveta.service;

import com.mrvelibor.mapasveta.model.user.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {
    User createUser(User user);
    User getUser(Long userId);
    User editUser(User user);
    boolean deleteUser(User user);
    User loadUserByUsername(String username);
    List<User> getAllUsers();
}
