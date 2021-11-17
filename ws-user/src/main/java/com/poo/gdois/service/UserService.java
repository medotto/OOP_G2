package com.poo.gdois.service;

import com.poo.gdois.entity.User;

public interface UserService {

    User findByEmail(String email);

    void create(User user);

}
