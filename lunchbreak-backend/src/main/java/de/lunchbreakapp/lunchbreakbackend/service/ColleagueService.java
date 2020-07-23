package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.utils.LunchdayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ColleagueService {

    private final MongoTemplate mongoTemplate;
    private final ColleagueMongoDb colleagueMongoDb;
    private final LunchdayUtils lunchdayUtils;

    @Autowired
    public ColleagueService(MongoTemplate mongoTemplate, ColleagueMongoDb colleagueMongoDb, LunchdayUtils lunchdayUtils) {
        this.mongoTemplate = mongoTemplate;
        this.colleagueMongoDb = colleagueMongoDb;
        this.lunchdayUtils = lunchdayUtils;
    }

    public Optional<Colleague> getMatchingColleague(String loggedUsername, Map<String, Boolean> lunchdays) {
        List<Criteria> checkedLunchdays = new ArrayList<>();

        lunchdays.forEach((key, value) -> {
            if (value) {
                checkedLunchdays.add(Criteria.where("lunchdays." + key).is(true));
            }
        });

        Query lunchdayQuery = new Query();
        lunchdayQuery.addCriteria(
                new Criteria().andOperator(
                        Criteria.where("username").ne(loggedUsername),
                        new Criteria().orOperator(checkedLunchdays.toArray(Criteria[]::new))
                )
        );

        List<Colleague> matchingColleagues = mongoTemplate.find(lunchdayQuery, Colleague.class);
        int randomIndex = (int) (Math.random() * (matchingColleagues.size() + 1));
        return Optional.of(matchingColleagues.get(randomIndex));
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
        && !favoriteFood.isBlank() && !hobbies.isBlank() && !phoneNumber.isBlank() &&!lunchdays.isEmpty()) {
            updatedColleague.setProfileFilled(true);
        }
        return colleagueMongoDb.save(updatedColleague);
    }

}