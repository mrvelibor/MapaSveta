package com.mrvelibor.mapasveta.service.impl;

import com.mrvelibor.mapasveta.dao.UserDao;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User getUser(Long userId) {
        return userDao.findOne(userId);
    }

    @Override
    public User createUser(User user) {
        user.setId(null);
        return userDao.save(user);
    }

    @Override
    public User editUser(User user) {
        User oldUser = getUser(user.getId());
        user.setPassword(oldUser.getPassword());
        user.setType(oldUser.getType());
        user.setFacebookId(oldUser.getFacebookId());
        user.setGoogleId(oldUser.getGoogleId());
        return userDao.save(user);
    }

    @Override
    public boolean deleteUser(User user) {
        userDao.delete(user.getId());
        return true;
    }

    @Override
    public User loadUserByUsername(String username) {
        return userDao.findByEmail(username);
    }

    @Override
    public User findByFacebookId(String facebookId) {
        return userDao.findByFacebookId(facebookId);
    }

    @Override
    public User findByGoogleId(String googleId) {
        return userDao.findByGoogleId(googleId);
    }

    @Override
    public List<User> getAllUsers() {
        return userDao.findAll();
    }
}
