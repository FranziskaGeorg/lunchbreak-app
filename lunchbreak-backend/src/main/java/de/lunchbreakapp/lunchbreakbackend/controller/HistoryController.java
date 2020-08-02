package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.dto.HistoryData;
import de.lunchbreakapp.lunchbreakbackend.service.HistoryService;
import de.lunchbreakapp.lunchbreakbackend.service.MatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/history")
public class HistoryController {

    private final HistoryService historyService;
    private final ProfileController profileController;
    private final MatchService matchService;

    public HistoryController(HistoryService historyService, ProfileController profileController, MatchService matchService) {
        this.historyService = historyService;
        this.profileController = profileController;
        this.matchService = matchService;
    }

    @GetMapping
    public List<HistoryData> getLunchMatchDetails(Principal principal) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        return historyService.getDetailsForLunchMatches(loggedUsername);
    }

    @GetMapping("{matchedUsername}")
    public Boolean checkIfMatchIsMutual(Principal principal, @PathVariable String matchedUsername) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        return matchService.isMatchMutual(loggedUsername, matchedUsername);
    }

}
