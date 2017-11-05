package com.mrvelibor.mapasveta.dao;

import com.mrvelibor.mapasveta.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User save(User user);
    User findByUsername(String email);
}