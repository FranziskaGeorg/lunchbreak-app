package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ColleagueService {

    private final ColleagueMongoDb colleagueMongoDb;
    private final MongoTemplate mongoTemplate;
    private final UserMongoDb userMongoDb;

    @Autowired
    public ColleagueService(ColleagueMongoDb colleagueMongoDb, MongoTemplate mongoTemplate, UserMongoDb userMongoDb) {
        this.colleagueMongoDb = colleagueMongoDb;
        this.mongoTemplate = mongoTemplate;
        this.userMongoDb = userMongoDb;
    }

    public Optional<Colleague> getColleague(String id) {
        return colleagueMongoDb.findById(id);
    }

    public void addSampleColleaguesToDb() {
        Colleague colleague1 = new Colleague("1", "Franzi", "Georg");
        Colleague colleague2 = new Colleague("2", "Peter", "Parker");
        Colleague colleague3 = new Colleague("3", "Tony", "Montana");
        Colleague colleague4 = new Colleague("4", "Elvis", "Presley");
        colleagueMongoDb.deleteAll();
        colleagueMongoDb.save(colleague1);
        colleagueMongoDb.save(colleague2);
        colleagueMongoDb.save(colleague3);
        colleagueMongoDb.save(colleague4);
    }

    public void addSampleUsersToDb() {
        LunchBreakUser user1 = new LunchBreakUser("Herbert", "herbertspw", "user");
        LunchBreakUser user2 = new LunchBreakUser("Robert", "robertspw", "user");
        userMongoDb.save(user1);
        userMongoDb.save(user2);
    }

    public Colleague getRandomColleague() {
        SampleOperation matchStage = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(matchStage);
        AggregationResults<Colleague> output = mongoTemplate.aggregate(aggregation, "colleagues", Colleague.class);
        return output.getMappedResults().get(0);
    }

}
