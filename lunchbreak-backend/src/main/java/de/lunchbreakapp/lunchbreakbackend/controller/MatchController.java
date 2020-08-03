package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.dto.MatchData;
import de.lunchbreakapp.lunchbreakbackend.service.MailService;
import de.lunchbreakapp.lunchbreakbackend.service.MatchService;
import de.lunchbreakapp.lunchbreakbackend.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/dailymatch")
public class MatchController {

    private final MatchService matchService;
    private final ProfileService profileService;
    private final MailService mailService;

    public MatchController(MatchService matchService, ProfileService profileService, MailService mailService) {
        this.matchService = matchService;
        this.profileService = profileService;
        this.mailService = mailService;
    }

    @GetMapping
    public Colleague getMatchingColleague(Principal principal) {
        String loggedUsername = principal.getName();
        Colleague loggedColleague = profileService.getColleagueByUsername(loggedUsername).get();
        Map<String, Boolean> lunchdays = loggedColleague.getLunchdays();
        Optional<Colleague> optionalColleague = matchService.getMatchingColleague(loggedUsername, lunchdays);
        if (optionalColleague.isPresent()) {
            return optionalColleague.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No matching colleague for " + loggedUsername + " found.");
    }

    @PostMapping
    public void saveLunchMatch(Principal principal, @RequestBody MatchData data) {
        String loggedUsername = principal.getName();
        String matchedUsername = data.getMatchedUsername();
        matchService.saveNewLunchMatchToDb(loggedUsername, matchedUsername);
    }

    @GetMapping("{matchedUsername}")
    public Boolean checkIfMatchIsMutual(Principal principal, @PathVariable String matchedUsername) {
        String loggedUsername = principal.getName();
        Colleague loggedColleague = profileService.getColleagueByUsername(loggedUsername).get();
        Boolean isMatchMutual = matchService.isMatchMutual(loggedUsername, matchedUsername);

        if (isMatchMutual) {
            String firstNameOfLoggedUser = loggedColleague.getFirstName();
            Colleague matchedColleague = profileService.getColleagueByUsername(matchedUsername).get();
            String firstNameOfMatchedUser = matchedColleague.getFirstName();
            mailService.sendMatchMail(firstNameOfMatchedUser, firstNameOfLoggedUser);
        }

        return isMatchMutual;
    }

}
