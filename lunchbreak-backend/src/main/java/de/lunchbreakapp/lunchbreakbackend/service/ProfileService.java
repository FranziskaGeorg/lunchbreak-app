package de.lunchbreakapp.lunchbreakbackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.db.MatchMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import de.lunchbreakapp.lunchbreakbackend.utils.LunchdayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProfileService {

    private final ColleagueMongoDb colleagueMongoDb;
    private final LunchdayUtils lunchdayUtils;
    private final String cloudinaryUrl;
    private final HistoryService historyService;
    private final MatchMongoDb matchMongoDb;

    @Autowired
    public ProfileService(ColleagueMongoDb colleagueMongoDb, LunchdayUtils lunchdayUtils, @Value("${cloudinary.url}") String cloudinaryUrl, HistoryService historyService, MatchMongoDb matchMongoDb) {
        this.colleagueMongoDb = colleagueMongoDb;
        this.lunchdayUtils = lunchdayUtils;
        this.cloudinaryUrl = cloudinaryUrl;
        this.historyService = historyService;
        this.matchMongoDb = matchMongoDb;
    }

    public Optional<Colleague> getColleagueByUsername(String username) {
        return colleagueMongoDb.findByUsername(username);
    }

    public Colleague updateColleague(Colleague updatedColleague, String firstName, String lastName, String job, String subsidiary, String location,
                                     String favoriteFood, String hobbies, String phoneNumber, Map<String, Boolean> lunchdays) {
        updatedColleague.setFirstName(firstName);
        updatedColleague.setLastName(lastName);
        updatedColleague.setJob(job);
        updatedColleague.setSubsidiary(subsidiary);
        updatedColleague.setLocation(location);
        updatedColleague.setFavoriteFood(favoriteFood);
        updatedColleague.setHobbies(hobbies);
        updatedColleague.setPhoneNumber(phoneNumber);
        lunchdayUtils.validateLunchdays(lunchdays);
        updatedColleague.setLunchdays(lunchdays);
        if (!firstName.isBlank() && !lastName.isBlank() && !job.isBlank() && !subsidiary.isBlank() && !location.isBlank()
                && !favoriteFood.isBlank() && !hobbies.isBlank() && !phoneNumber.isBlank() && !lunchdays.isEmpty()) {
            updatedColleague.setProfileFilled(true);
        } else {
            updatedColleague.setProfileFilled(false);
        }
        return colleagueMongoDb.save(updatedColleague);
    }

    public Map uploadProfilePicToCloud(String imageUrl) throws IOException {
        Cloudinary cloudinary = new Cloudinary(cloudinaryUrl);
        return cloudinary.uploader().upload(
                imageUrl,
                ObjectUtils.asMap("transformation", new Transformation().width(400).height(400).gravity("face").crop("fill")
                )
        );
    }

    public Colleague saveProfilePicToDb(Colleague loggedColleage, String cloudinaryUrl) {
        loggedColleage.setProfilePicUrl(cloudinaryUrl);
        return colleagueMongoDb.save(loggedColleage);
    }

    public Colleague deleteProfilePic(Colleague loggedColleague) {
        loggedColleague.setProfilePicUrl("");
        return colleagueMongoDb.save(loggedColleague);
    }

    public void deleteColleague(Colleague loggedColleague) {
        colleagueMongoDb.delete(loggedColleague);
    }

    public void deleteMatchesByUsername(String loggedUsername) {
        List<LunchMatch> lunchMatchesByLoggedUsername = historyService.getLunchMatchesByLoggedUsername(loggedUsername);
        List<LunchMatch> lunchMatchesByMatchedUsername = historyService.getLunchMatchesByMatchedUsername(loggedUsername);
        List<LunchMatch> allLunchMatchesByUser = Stream.of(lunchMatchesByLoggedUsername, lunchMatchesByMatchedUsername)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
        matchMongoDb.deleteAll(allLunchMatchesByUser);
    }

}