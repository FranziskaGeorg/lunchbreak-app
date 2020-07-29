package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.dto.HistoryData;
import de.lunchbreakapp.lunchbreakbackend.service.HistoryService;
import de.lunchbreakapp.lunchbreakbackend.service.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/history")
public class HistoryController {

    private final HistoryService historyService;
    private final ProfileController profileController;

    public HistoryController(HistoryService historyService, ProfileController profileController, ProfileService profileService) {
        this.historyService = historyService;
        this.profileController = profileController;
    }

    @GetMapping
    public List<HistoryData> getLunchMatchDetails(Principal principal) {
        Colleague loggedColleague = profileController.getColleagueByUsername(principal);
        String loggedUsername = loggedColleague.getUsername();
        return historyService.getDetailsForLunchMatches(loggedUsername);
    }

}
