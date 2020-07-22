package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.security.JWTUtils;
import de.lunchbreakapp.lunchbreakbackend.service.ColleagueService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class ColleagueController {

    private final ColleagueService colleagueService;
    private final JWTUtils jwtUtils;

    public ColleagueController(ColleagueService colleagueService, JWTUtils jwtUtils) {
        this.colleagueService = colleagueService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("dailymatch")
    public Colleague getMatchingColleague(Principal principal) {
        Colleague loggedColleague = getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        Map<String, Boolean> lunchdays = loggedColleague.getLunchdays();
        Optional<Colleague> optionalColleague = colleagueService.getMatchingColleague(loggedUsername, lunchdays);
        if (optionalColleague.isPresent()) {
            return optionalColleague.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No matching colleague for " + loggedUsername + " found.");
    }

    @GetMapping("profile")
    public Colleague getColleagueByUsername(Principal principal) {
        String loggedUsername = principal.getName();
        Optional<Colleague> optionalColleague = colleagueService.getColleagueByUsername(loggedUsername);
        if (optionalColleague.isPresent()) {
            return optionalColleague.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Colleague with e-mail address " + loggedUsername + " does not exist.");
    }

    @PostMapping("profile")
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

}
