package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.db.MatchMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import de.lunchbreakapp.lunchbreakbackend.model.dto.HistoryData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class HistoryService {

    private final MatchMongoDb matchMongoDb;
    private final ColleagueMongoDb colleagueMongoDb;

    @Autowired
    public HistoryService(MatchMongoDb matchMongoDb, ColleagueMongoDb colleagueMongoDb) {
        this.matchMongoDb = matchMongoDb;
        this.colleagueMongoDb = colleagueMongoDb;
    }

    public List<LunchMatch> getLunchMatchesByUsername(String loggedUsername) {
        List<LunchMatch> lunchMatches = matchMongoDb.findAllByLoggedUsername(loggedUsername);
        lunchMatches.sort(Comparator.comparing(LunchMatch::getMatchDate).reversed());
        return lunchMatches;
    }

    public List<HistoryData> getLunchMatchDetails(List<LunchMatch> lunchMatches) {
        List<HistoryData> allLunchMatchDetails = new ArrayList<>();
        for (int i = 0; i < lunchMatches.size(); i++) {
            HistoryData lunchMatchDetails = new HistoryData();
            String matchedUsername = lunchMatches.get(i).getMatchedUsername();
            String matchDate = lunchMatches.get(i).getMatchDate();
            Colleague matchedColleague = colleagueMongoDb.findByUsername(matchedUsername).get();
            lunchMatchDetails.setMatchedUsername(matchedUsername);
            lunchMatchDetails.setFirstName(matchedColleague.getFirstName());
            lunchMatchDetails.setLastName(matchedColleague.getLastName());
            lunchMatchDetails.setMatchDate(matchDate);
            lunchMatchDetails.setPhoneNumber(matchedColleague.getPhoneNumber());
            allLunchMatchDetails.add(lunchMatchDetails);
        }
        return allLunchMatchDetails;
    }

    public List<HistoryData> getDetailsForLunchMatches(String loggedUsername) {
        List<LunchMatch> lunchMatches = getLunchMatchesByUsername(loggedUsername);
        if (!lunchMatches.isEmpty()) {
            return getLunchMatchDetails(lunchMatches);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No lunch matches for " + loggedUsername + " found");
        }
    }

}
