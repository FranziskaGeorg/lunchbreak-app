package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.security.JWTUtils;
import de.lunchbreakapp.lunchbreakbackend.security.JwtAuthFilter;
import de.lunchbreakapp.lunchbreakbackend.service.ColleagueService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class ColleagueController {

    private final ColleagueService colleagueService;
    private final JWTUtils jwtUtils;
    private final JwtAuthFilter jwtAuthFilter;

    public ColleagueController(ColleagueService colleagueService, JWTUtils jwtUtils, JwtAuthFilter jwtAuthFilter) {
        this.colleagueService = colleagueService;
        this.jwtUtils = jwtUtils;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @GetMapping("dailymatch")
    public Colleague getRandomColleague() {
        return colleagueService.getRandomColleague();
    }

    @GetMapping("profile")
    public Optional<Colleague> getColleagueByUsername(HttpServletRequest httpServletRequest) {
        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        String token = authorizationHeader.replace("Bearer", "").trim();
        String usernameFromToken = jwtUtils.extractUserName(token);
        Optional<Colleague> optionalColleague = colleagueService.getColleagueByUsername(usernameFromToken);
        if (optionalColleague.isPresent()) {
            return optionalColleague;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Colleague with e-mail address " + usernameFromToken + " does not exist.");
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
