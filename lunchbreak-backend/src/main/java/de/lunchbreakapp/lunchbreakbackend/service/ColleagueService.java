package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

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

    public Colleague getRandomColleague() {
        SampleOperation matchStage = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(matchStage);
        AggregationResults<Colleague> output = mongoTemplate.aggregate(aggregation, "colleagues", Colleague.class);
        return output.getMappedResults().get(0);
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
        newColleague.setLunchdays("");
        return colleagueMongoDb.save(newColleague);
    }

    public Optional<Colleague> getColleagueById(String id) {
        return colleagueMongoDb.findById(id);
    }

    public Optional<Colleague> getColleagueByUsername(String username) {
        return colleagueMongoDb.findByUsername(username);
    }

    public Colleague updateColleague(Colleague updatedColleague, String firstName, String lastName, String job, String subsidiary, String favoriteFood,
                                     String hobbies, String phoneNumber, String lunchdays) {
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
