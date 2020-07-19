package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import de.lunchbreakapp.lunchbreakbackend.model.dto.RegistrationData;
import de.lunchbreakapp.lunchbreakbackend.service.ColleagueService;
import de.lunchbreakapp.lunchbreakbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("auth/register")
public class RegistrationController {

    private final UserService userService;
    private final ColleagueService colleagueService;

    public RegistrationController(UserService userService, ColleagueService colleagueService) {
        this.userService = userService;
        this.colleagueService = colleagueService;
    }

    @PostMapping
    public Colleague registration(@RequestBody @Valid RegistrationData data) {
        LunchBreakUser newUser = new LunchBreakUser(data.getUsername(), data.getPassword(), "user");
        userService.saveNewUserToDb(newUser);
        Colleague newColleague = colleagueService.saveNewColleagueToDb(data.getUsername(), data.getFirstName(), data.getLastName());
        return newColleague;
    }

}
