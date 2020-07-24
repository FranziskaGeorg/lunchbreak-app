package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import de.lunchbreakapp.lunchbreakbackend.service.HistoryService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/history")
public class HistoryController {

    private final HistoryService historyService;
    private final ProfileController profileController;

    public HistoryController(HistoryService historyService, ProfileController profileController) {
        this.historyService = historyService;
        this.profileController = profileController;
    }

    @GetMapping
    public List<LunchMatch> getLunchMatchesByUsername(Principal principal) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        List<LunchMatch> lunchMatches = historyService.getLunchMatchesByUsername(loggedUsername);
        if (!lunchMatches.isEmpty()) {
            return lunchMatches;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No lunch matches for " + loggedUsername + "found");
        }
    }

}
