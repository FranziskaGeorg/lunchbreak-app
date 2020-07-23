package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.service.ColleagueService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/dailymatch")
public class MatchController {

    private final ColleagueService colleagueService;
    private final ProfileController profileController;

    public MatchController(ColleagueService colleagueService, ProfileController profileController) {
        this.colleagueService = colleagueService;
        this.profileController = profileController;
    }

    @GetMapping
    public Colleague getMatchingColleague(Principal principal) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        Map<String, Boolean> lunchdays = loggedColleague.getLunchdays();
        Optional<Colleague> optionalColleague = colleagueService.getMatchingColleague(loggedUsername, lunchdays);
        if (optionalColleague.isPresent()) {
            return optionalColleague.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No matching colleague for " + loggedUsername + " found.");
    }

}
