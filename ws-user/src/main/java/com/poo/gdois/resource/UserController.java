package com.poo.gdois.resource;

import com.poo.gdois.entity.User;
import com.poo.gdois.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    public ResponseEntity<?> create(@RequestBody User user) {
        userService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody User user) {
        userService.update(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
