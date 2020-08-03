package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.dto.HistoryData;
import de.lunchbreakapp.lunchbreakbackend.service.HistoryService;
import de.lunchbreakapp.lunchbreakbackend.service.MatchService;
import de.lunchbreakapp.lunchbreakbackend.service.ProfileService;
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
    private final ProfileService profileService;
    private final MatchService matchService;

    public HistoryController(HistoryService historyService, ProfileService profileService, MatchService matchService) {
        this.historyService = historyService;
        this.profileService = profileService;
        this.matchService = matchService;
    }

    @GetMapping
    public List<HistoryData> getLunchMatchDetails(Principal principal) {
        String loggedUsername = principal.getName();
        return historyService.getDetailsForLunchMatches(loggedUsername);
    }

    @GetMapping("{matchedUsername}")
    public Boolean checkIfMatchIsMutual(Principal principal, @PathVariable String matchedUsername) {
        String loggedUsername = principal.getName();
        return matchService.isMatchMutual(loggedUsername, matchedUsername);
    }

}
