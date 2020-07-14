package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.stereotype.Service;

@Service
public class ColleagueService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ColleagueService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Colleague getRandomColleague() {
        SampleOperation matchStage = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(matchStage);
        AggregationResults<Colleague> output = mongoTemplate.aggregate(aggregation, "colleagues", Colleague.class);
        return output.getMappedResults().get(0);
    }

}
