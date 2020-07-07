package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserMongoDb userMongoDb;
    private final MongoTemplate mongoTemplate;

    @Autowired
    public UserService(UserMongoDb userMongoDb, MongoTemplate mongoTemplate) {
        this.userMongoDb = userMongoDb;
        this.mongoTemplate = mongoTemplate;
    }

    public Optional<User> getUser(String id) {
        return userMongoDb.findById(id);
    }

    public void addSampleUsersToDb() {
        User user1 = new User("1", "Franzi", "Georg");
        User user2 = new User("2", "Peter", "Parker");
        User user3 = new User("3", "Tony", "Montana");
        User user4 = new User("4", "Elvis", "Presley");
        userMongoDb.deleteAll();
        userMongoDb.save(user1);
        userMongoDb.save(user2);
        userMongoDb.save(user3);
        userMongoDb.save(user4);
    }

    public User getRandomUser() {
        SampleOperation matchStage = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(matchStage);
        AggregationResults<User> output = mongoTemplate.aggregate(aggregation, "users", User.class);
        return output.getMappedResults().get(0);
    }

}
