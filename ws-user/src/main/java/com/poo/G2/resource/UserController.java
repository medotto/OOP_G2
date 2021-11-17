package com.poo.G2.resource;

import com.poo.G2.entity.User;
import com.poo.G2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/users")
public class UserController extends AbstractController {

    @Autowired
    private UserService userService;

    @GetMapping("/search")
    public ResponseEntity<User> findUserByEmail(@RequestParam String email) {
        User user = userService.findByEmail(email);
        return buildSuccessOrNoContentResponse(user);
    }

}
