package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.User;
import de.lunchbreakapp.lunchbreakbackend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{id}")
    public User getUser(@PathVariable String id) {
        Optional<User> userOptional = userService.getUser(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID " + id + " does not exist");
    }

    @PostMapping("testusers")
    public void addSampleUsersToDb() {
        userService.addSampleUsersToDb();
    }

    @GetMapping
    public User getRandomUser() {
        return userService.getRandomUser();
    }

}
