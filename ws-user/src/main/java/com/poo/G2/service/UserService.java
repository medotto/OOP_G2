package com.poo.G2.service;

import com.poo.G2.entity.User;

public interface UserService {

    User findByEmail(String email);

}
