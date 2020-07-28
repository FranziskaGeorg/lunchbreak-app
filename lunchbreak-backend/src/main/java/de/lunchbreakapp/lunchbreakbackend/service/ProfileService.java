package de.lunchbreakapp.lunchbreakbackend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.utils.LunchdayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class ProfileService {

    private final ColleagueMongoDb colleagueMongoDb;
    private final LunchdayUtils lunchdayUtils;
    private final String cloudinaryUrl;

    @Autowired
    public ProfileService(ColleagueMongoDb colleagueMongoDb, LunchdayUtils lunchdayUtils, @Value("${cloudinary.url}") String cloudinaryUrl) {
        this.colleagueMongoDb = colleagueMongoDb;
        this.lunchdayUtils = lunchdayUtils;
        this.cloudinaryUrl = cloudinaryUrl;
    }

    public Colleague saveNewColleagueToDb(String username, String firstName, String lastName) {
        Colleague newColleague = new Colleague();
        newColleague.setUsername(username);
        newColleague.setFirstName(firstName);
        newColleague.setLastName(lastName);
        newColleague.setJob("");
        newColleague.setSubsidiary("");
        newColleague.setFavoriteFood("");
        newColleague.setHobbies("");
        newColleague.setPhoneNumber("");
        newColleague.setLunchdays(new HashMap<>());
        newColleague.setProfileFilled(false);
        newColleague.setProfilePicUrl("https://res.cloudinary.com/hql1hvgt9/image/upload/v1595924252/happytoast_profilepic_yt9b3r.png");
        return colleagueMongoDb.save(newColleague);
    }

    public Optional<Colleague> getColleagueByUsername(String username) {
        return colleagueMongoDb.findByUsername(username);
    }

    public Colleague updateColleague(Colleague updatedColleague, String firstName, String lastName, String job, String subsidiary, String favoriteFood,
                                     String hobbies, String phoneNumber, Map<String, Boolean> lunchdays) {
        updatedColleague.setFirstName(firstName);
        updatedColleague.setLastName(lastName);
        updatedColleague.setJob(job);
        updatedColleague.setSubsidiary(subsidiary);
        updatedColleague.setFavoriteFood(favoriteFood);
        updatedColleague.setHobbies(hobbies);
        updatedColleague.setPhoneNumber(phoneNumber);
        lunchdayUtils.validateLunchdays(lunchdays);
        updatedColleague.setLunchdays(lunchdays);
        if (!firstName.isBlank() && !lastName.isBlank() && !job.isBlank() && !subsidiary.isBlank()
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

}