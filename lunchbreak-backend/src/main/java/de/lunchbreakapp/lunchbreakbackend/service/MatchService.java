package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.MatchMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import de.lunchbreakapp.lunchbreakbackend.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.*;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@Service
public class MatchService {

    private final MongoTemplate mongoTemplate;
    private final MatchMongoDb matchMongoDb;
    private final DateUtils dateUtils;
    private final HistoryService historyService;

    @Autowired
    public MatchService(MongoTemplate mongoTemplate, MatchMongoDb matchMongoDb, DateUtils dateUtils, HistoryService historyService) {
        this.mongoTemplate = mongoTemplate;
        this.matchMongoDb = matchMongoDb;
        this.dateUtils = dateUtils;
        this.historyService = historyService;
    }

    public Optional<Colleague> getMatchingColleague(String loggedUsername, Map<String, Boolean> lunchdays) {
        if (lunchdays.isEmpty()) {
            Query queryForNewUsers = new Query();
            queryForNewUsers.addCriteria(new Criteria().where("username").ne(loggedUsername));
            List<Colleague> allColleagues = mongoTemplate.find(queryForNewUsers, Colleague.class);
            int randomIndexAllColleagues = (int) (Math.random() * allColleagues.size());
            return Optional.of(allColleagues.get(randomIndexAllColleagues));
        } else {
            List<Criteria> checkedLunchdays = new ArrayList<>();

            lunchdays.forEach((key, value) -> {
                if (value) {
                    checkedLunchdays.add(where("lunchdays." + key).is(true));
                }
            });

            Query lunchdayQuery = new Query();
            lunchdayQuery.addCriteria(
                    new Criteria().andOperator(
                            where("username").ne(loggedUsername),
                            where("profileFilled").is(true),
                            new Criteria().orOperator(checkedLunchdays.toArray(Criteria[]::new))
                    )
            );
            List<Colleague> matchingColleagues = mongoTemplate.find(lunchdayQuery, Colleague.class);
            int randomIndexMatchingColleagues = (int) (Math.random() * matchingColleagues.size());
            return Optional.of(matchingColleagues.get(randomIndexMatchingColleagues));
        }
    }

    public LunchMatch saveNewLunchMatchToDb(String loggedUsername, String matchedUsername) {
        LunchMatch newLunchMatch = new LunchMatch();
        newLunchMatch.setLoggedUsername(loggedUsername);
        newLunchMatch.setMatchedUsername(matchedUsername);
        newLunchMatch.setMatchDate(dateUtils.formatCurrentDate());
        return matchMongoDb.save(newLunchMatch);
    }

    public Optional<LunchMatch> getMostRecentLunchMatchOfLoggedUser(String loggedUsername) {
        Query lunchMatchQuery = new Query();
        lunchMatchQuery.addCriteria(new Criteria().where("loggedUsername").is(loggedUsername));
        lunchMatchQuery.with(Sort.by(Sort.Direction.DESC, "_id"));
        LunchMatch mostRecentLunchMatch = mongoTemplate.findOne(lunchMatchQuery, LunchMatch.class);
        return Optional.of(mostRecentLunchMatch);
    }

    public Boolean isMatchMutual(LunchMatch lunchMatch) {
        String loggedUsername = lunchMatch.getLoggedUsername();
        String matchedUsername = lunchMatch.getMatchedUsername();
        List<LunchMatch> lunchMatchesOfMatchedUser = historyService.getLunchMatchesByUsername(matchedUsername);
        for (LunchMatch match : lunchMatchesOfMatchedUser) {
            if (match.getMatchedUsername().equals(loggedUsername)) {
                return true;
            }
        }
        return false;
    }

    /*public Boolean isMatchMutual(String loggedUsername, String matchedUsername) {
        List<LunchMatch> lunchMatchesOfMatchedUser = historyService.getLunchMatchesByUsername(matchedUsername);
        for (LunchMatch match : lunchMatchesOfMatchedUser) {
            if (match.getMatchedUsername().equals(loggedUsername)) {
                return true;
            }
        }
        return false;
    }*/

}
