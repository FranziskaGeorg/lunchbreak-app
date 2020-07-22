package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.LunchdayList;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ColleagueService {

    private final MongoTemplate mongoTemplate;
    private final ColleagueMongoDb colleagueMongoDb;

    @Autowired
    public ColleagueService(MongoTemplate mongoTemplate, ColleagueMongoDb colleagueMongoDb) {
        this.mongoTemplate = mongoTemplate;
        this.colleagueMongoDb = colleagueMongoDb;
    }

    public Optional<Colleague> getMatchingColleague(String loggedUsername, LunchdayList lunchdays) {

        List<Criteria> checkedLunchdays = new ArrayList<>();

        if (lunchdays.getMonday()) {
            checkedLunchdays.add(Criteria.where("lunchdays.monday").is(true));
        }
        if (lunchdays.getTuesday()) {
            checkedLunchdays.add(Criteria.where("lunchdays.tuesday").is(true));
        }
        if (lunchdays.getWednesday()) {
            checkedLunchdays.add(Criteria.where("lunchdays.wednesday").is(true));
        }
        if (lunchdays.getThursday()) {
            checkedLunchdays.add(Criteria.where("lunchdays.thursday").is(true));
        }
        if (lunchdays.getFriday()) {
            checkedLunchdays.add(Criteria.where("lunchdays.friday").is(true));
        }

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
        newColleague.setLunchdays(new LunchdayList(false, false, false, false, false));
        return colleagueMongoDb.save(newColleague);
    }

    public Optional<Colleague> getColleagueByUsername(String username) {
        return colleagueMongoDb.findByUsername(username);
    }

    public Colleague updateColleague(Colleague updatedColleague, String firstName, String lastName, String job, String subsidiary, String favoriteFood,
                                     String hobbies, String phoneNumber, LunchdayList lunchdays) {
        updatedColleague.setFirstName(firstName);
        updatedColleague.setLastName(lastName);
        updatedColleague.setJob(job);
        updatedColleague.setSubsidiary(subsidiary);
        updatedColleague.setFavoriteFood(favoriteFood);
        updatedColleague.setHobbies(hobbies);
        updatedColleague.setPhoneNumber(phoneNumber);
        updatedColleague.setLunchdays(lunchdays);
        return colleagueMongoDb.save(updatedColleague);
    }

}
