package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.service.ColleagueService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("api/profile")
public class ProfileController {

    private final ColleagueService colleagueService;

    public ProfileController(ColleagueService colleagueService) {
        this.colleagueService = colleagueService;
    }

    @GetMapping
    public Colleague getColleagueByUsername(Principal principal) {
        String loggedUsername = principal.getName();
        Optional<Colleague> optionalColleague = colleagueService.getColleagueByUsername(loggedUsername);
        if (optionalColleague.isPresent()) {
            return optionalColleague.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Colleague with e-mail address " + loggedUsername + " does not exist.");
    }

    @PostMapping
    public void saveProfileChanges(@RequestBody Colleague profileData) {
        Optional<Colleague> optionalColleague = colleagueService.getColleagueByUsername(profileData.getUsername());
        if (optionalColleague.isPresent()) {
            colleagueService.updateColleague(optionalColleague.get(), profileData.getFirstName(), profileData.getLastName(), profileData.getJob(),
                    profileData.getSubsidiary(), profileData.getFavoriteFood(), profileData.getHobbies(), profileData.getPhoneNumber(),
                    profileData.getLunchdays());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Colleague with e-mail address " + profileData.getUsername() + " does not exist.");
        }
    }

    @GetMapping("status")
    public Boolean getProfileStatus(Principal principal) {
        Colleague loggedColleague = getColleagueByUsername(principal);
        Boolean profileFilled = loggedColleague.getProfileFilled();
        return profileFilled;
    }

}