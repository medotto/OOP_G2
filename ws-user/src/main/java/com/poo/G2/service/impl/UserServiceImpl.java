package com.poo.G2.service.impl;

import com.poo.G2.entity.User;
import com.poo.G2.repository.UserRepository;
import com.poo.G2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
