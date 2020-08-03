package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public Colleague getColleagueByUsername(Principal principal) {
        String loggedUsername = principal.getName();
        Optional<Colleague> optionalColleague = profileService.getColleagueByUsername(loggedUsername);
        if (optionalColleague.isPresent()) {
            return optionalColleague.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Colleague with e-mail address " + loggedUsername + " does not exist.");
    }

    @PostMapping
    public void saveProfileChanges(@RequestBody Colleague profileData) {
        Optional<Colleague> optionalColleague = profileService.getColleagueByUsername(profileData.getUsername());
        if (optionalColleague.isPresent()) {
            profileService.updateColleague(optionalColleague.get(), profileData.getFirstName(), profileData.getLastName(), profileData.getJob(),
                    profileData.getSubsidiary(), profileData.getLocation(), profileData.getFavoriteFood(), profileData.getHobbies(), profileData.getPhoneNumber(),
                    profileData.getLunchdays());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Colleague with e-mail address " + profileData.getUsername() + " does not exist.");
        }
    }

    @GetMapping("status")
    public Boolean getProfileStatus(Principal principal) {
        Colleague loggedColleague = getColleagueByUsername(principal);
        return loggedColleague.getProfileFilled();
    }

    @PostMapping("picture")
    public void saveProfilePicture(Principal principal, @RequestBody String imageUrl) throws IOException {
        Map imageMap = profileService.uploadProfilePicToCloud(imageUrl);
        String cloudinaryUrl = (String) imageMap.get("url");
        Colleague loggedColleague = getColleagueByUsername(principal);
        profileService.saveProfilePicToDb(loggedColleague, cloudinaryUrl);
    }

    @GetMapping("picture")
    public String getProfilePictureUrl(Principal principal) {
        Colleague loggedColleague = getColleagueByUsername(principal);
        return loggedColleague.getProfilePicUrl();
    }

    @DeleteMapping("picture")
    public void deleteProfilePic(Principal principal) {
        Colleague loggedColleague = getColleagueByUsername(principal);
        profileService.deleteProfilePic(loggedColleague);
    }

}
