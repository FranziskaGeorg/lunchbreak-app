package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import de.lunchbreakapp.lunchbreakbackend.model.dto.MatchData;
import de.lunchbreakapp.lunchbreakbackend.service.HistoryService;
import de.lunchbreakapp.lunchbreakbackend.service.MatchService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/dailymatch")
public class MatchController {

    private final MatchService matchService;
    private final ProfileController profileController;

    public MatchController(MatchService matchService, ProfileController profileController) {
        this.matchService = matchService;
        this.profileController = profileController;
    }

    @GetMapping
    public Colleague getMatchingColleague(Principal principal) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        Map<String, Boolean> lunchdays = loggedColleague.getLunchdays();
        Optional<Colleague> optionalColleague = matchService.getMatchingColleague(loggedUsername, lunchdays);
        if (optionalColleague.isPresent()) {
            return optionalColleague.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No matching colleague for " + loggedUsername + " found.");
    }

    @PostMapping
    public void saveLunchMatch(Principal principal, @RequestBody MatchData data) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        String matchedUsername = data.getMatchedUsername();
        matchService.saveNewLunchMatchToDb(loggedUsername, matchedUsername);
    }

    @GetMapping("mutual")
    public Boolean checkIfMatchIsMutual(Principal principal) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        LunchMatch mostRecentLunchMatchOfLoggedUser = matchService.getMostRecentLunchMatchOfLoggedUser(loggedUsername).get();
        return matchService.isMatchMutual(mostRecentLunchMatchOfLoggedUser);
    }

}
