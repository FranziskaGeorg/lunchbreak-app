package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class MatchService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public MatchService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
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
                        Criteria.where("profileFilled").is(true),
                        new Criteria().orOperator(checkedLunchdays.toArray(Criteria[]::new))
                )
        );

        List<Colleague> matchingColleagues = mongoTemplate.find(lunchdayQuery, Colleague.class);
        int randomIndex = (int) (Math.random() * (matchingColleagues.size() + 1));
        return Optional.of(matchingColleagues.get(randomIndex));
    }

}
