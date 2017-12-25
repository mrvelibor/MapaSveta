package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByFacebookId(String facebookId);
    User findByGoogleId(String googleId);
}
