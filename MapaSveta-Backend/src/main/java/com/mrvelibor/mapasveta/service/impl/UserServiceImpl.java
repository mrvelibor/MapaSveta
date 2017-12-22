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
    public User createUser(User user) {
        return userDao.save(user);
    }

    @Override
    public User getUser(Long userId) {
        return userDao.findOne(userId);
    }

    @Override
    public User editUser(User user) {
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
    public List<User> getAllUsers() {
        return userDao.findAll();
    }
}
