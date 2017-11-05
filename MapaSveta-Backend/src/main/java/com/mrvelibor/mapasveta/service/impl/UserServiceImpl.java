package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.UserDao;
import com.mrvelibor.mapasveta.model.User;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User save(User user) {
        return userDao.save(user);
    }

    @Override
    public User loadUserByUsername(String username) {
        return userDao.findByUsername(username);
    }

}