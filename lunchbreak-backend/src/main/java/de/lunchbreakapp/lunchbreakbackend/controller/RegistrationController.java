package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import de.lunchbreakapp.lunchbreakbackend.model.dto.RegistrationData;
import de.lunchbreakapp.lunchbreakbackend.service.ProfileService;
import de.lunchbreakapp.lunchbreakbackend.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("auth/register")
public class RegistrationController {

    private final UserService userService;
    private final ProfileService profileService;

    public RegistrationController(UserService userService, ProfileService profileService) {
        this.userService = userService;
        this.profileService = profileService;
    }

    @PostMapping
    public Colleague registration(@RequestBody @Valid RegistrationData data) {
        LunchBreakUser newUser = new LunchBreakUser(data.getUsername(), data.getPassword(), "user");
        userService.saveNewUserToDb(newUser);
        Colleague newColleague = profileService.saveNewColleagueToDb(data.getUsername(), data.getFirstName(), data.getLastName());
        return newColleague;
    }

}
