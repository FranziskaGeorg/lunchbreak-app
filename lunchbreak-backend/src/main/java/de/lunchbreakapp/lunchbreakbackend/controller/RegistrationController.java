package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.dto.RegistrationData;
import de.lunchbreakapp.lunchbreakbackend.service.ProfileService;
import de.lunchbreakapp.lunchbreakbackend.service.RegistrationService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("auth/register")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final ProfileService profileService;

    public RegistrationController(RegistrationService registrationService, ProfileService profileService) {
        this.registrationService = registrationService;
        this.profileService = profileService;
    }

    @PostMapping
    public Colleague registration(@RequestBody @Valid RegistrationData data) {
        String usernameInput = data.getUsername();
        Optional<Colleague> optionalColleague = profileService.getColleagueByUsername(usernameInput);
        if (optionalColleague.isEmpty()) {
            return registrationService.saveNewColleagueToDb(data.getUsername(), data.getPassword(), data.getFirstName(), data.getLastName());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with e-mail address " + usernameInput + " does already exsist in database");
        }
    }

}
