package com.poo.gdois.service;

import com.poo.gdois.entity.User;

import java.util.List;

public interface UserService {

    User findByEmail(String email);

    List<User> findAll();

    void create(User user);

    void update(User user);

}
