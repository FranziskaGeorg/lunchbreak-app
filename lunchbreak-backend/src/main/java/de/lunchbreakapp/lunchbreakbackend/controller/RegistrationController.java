package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import de.lunchbreakapp.lunchbreakbackend.model.RegistrationData;
import de.lunchbreakapp.lunchbreakbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("register")
public class RegistrationController {

    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public void registration(@RequestBody RegistrationData data) {
        LunchBreakUser newUser = new LunchBreakUser(data.getUsername(), data.getPassword(), "user");
        userService.saveNewUserToDb(newUser);
    }

}
