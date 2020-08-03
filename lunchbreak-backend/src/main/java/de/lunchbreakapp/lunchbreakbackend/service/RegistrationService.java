package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class RegistrationService {

    private final ColleagueMongoDb colleagueMongoDb;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public RegistrationService(ColleagueMongoDb colleagueMongoDb) {
        this.colleagueMongoDb = colleagueMongoDb;
    }

    public Colleague saveNewColleagueToDb(String username, String password, String firstName, String lastName) {
        Colleague newColleague = new Colleague();
        newColleague.setUsername(username);
        newColleague.setPassword(passwordEncoder.encode(password));
        newColleague.setFirstName(firstName);
        newColleague.setLastName(lastName);
        newColleague.setJob("");
        newColleague.setSubsidiary("");
        newColleague.setLocation("");
        newColleague.setFavoriteFood("");
        newColleague.setHobbies("");
        newColleague.setPhoneNumber("");
        newColleague.setLunchdays(new HashMap<>());
        newColleague.setProfileFilled(false);
        newColleague.setProfilePicUrl("");
        return colleagueMongoDb.save(newColleague);
    }

}
