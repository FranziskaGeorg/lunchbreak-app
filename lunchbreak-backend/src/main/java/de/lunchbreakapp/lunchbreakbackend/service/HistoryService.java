package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.db.MatchMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import de.lunchbreakapp.lunchbreakbackend.model.dto.HistoryData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class HistoryService {

    private final MatchMongoDb matchMongoDb;
    private final ColleagueMongoDb colleagueMongoDb;
    private final ProfileService profileService;

    @Autowired
    public HistoryService(MatchMongoDb matchMongoDb, ColleagueMongoDb colleagueMongoDb, ProfileService profileService) {
        this.matchMongoDb = matchMongoDb;
        this.colleagueMongoDb = colleagueMongoDb;
        this.profileService = profileService;
    }

    public List<LunchMatch> getLunchMatchesByLoggedUsername(String loggedUsername) {
        List<LunchMatch> lunchMatches = matchMongoDb.findAllByLoggedUsername(loggedUsername);
        if (!lunchMatches.isEmpty()) {
            lunchMatches.sort(Comparator.comparing(LunchMatch::getMatchDate).reversed());
            return lunchMatches;
        } else {
            return Collections.emptyList();
        }
    }

    public List<LunchMatch> getLunchMatchesByMatchedUsername(String matchedUsername) {
        List<LunchMatch> lunchMatches = matchMongoDb.findAllByMatchedUsername(matchedUsername);
        if (!lunchMatches.isEmpty()) {
            return lunchMatches;
        } else {
            return Collections.emptyList();
        }
    }

    public List<HistoryData> getLunchMatchDetails(List<LunchMatch> lunchMatches, Colleague loggedColleague) {
        List<HistoryData> allLunchMatchDetails = new ArrayList<>();
        for (int i = 0; i < lunchMatches.size(); i++) {
            HistoryData lunchMatchDetails = new HistoryData();
            String matchedUsername = lunchMatches.get(i).getMatchedUsername();
            LocalDate matchDate = lunchMatches.get(i).getMatchDate();
            Colleague matchedColleague = colleagueMongoDb.findByUsername(matchedUsername).get();
            lunchMatchDetails.setMatchedUsername(matchedUsername);
            lunchMatchDetails.setFirstName(matchedColleague.getFirstName());
            lunchMatchDetails.setLastName(matchedColleague.getLastName());
            lunchMatchDetails.setMatchDate(matchDate);
            lunchMatchDetails.setPhoneNumber(matchedColleague.getPhoneNumber());
            lunchMatchDetails.setProfilePicUrl(matchedColleague.getProfilePicUrl());
            lunchMatchDetails.setCommonLunchdays(getCommonLunchdays(loggedColleague.getLunchdays(), matchedColleague.getLunchdays()));
            allLunchMatchDetails.add(lunchMatchDetails);
        }
        return allLunchMatchDetails;
    }

    public List<HistoryData> getDetailsForLunchMatches(String loggedUsername) {
        List<LunchMatch> lunchMatches = getLunchMatchesByLoggedUsername(loggedUsername);
        Colleague loggedColleague = profileService.getColleagueByUsername(loggedUsername).get();
        return getLunchMatchDetails(lunchMatches, loggedColleague);
    }

    public List<String> getCommonLunchdays(Map<String, Boolean> loggedUserLunchdays, Map<String, Boolean> matchedUserLunchdays) {
        List<String> loggedUserCheckedLunchdays = new ArrayList<>();
        loggedUserLunchdays.forEach((key, value) -> {
            if (value) {
                loggedUserCheckedLunchdays.add(key);
            }
        });
        List<String> matchedUserCheckedLunchdays = new ArrayList<>();
        matchedUserLunchdays.forEach((key, value) -> {
            if (value) {
                matchedUserCheckedLunchdays.add(key);
            }
        });
        List<String> commonLunchdays = new ArrayList<>();
        for (String matchedUserCheckedLunchday : matchedUserCheckedLunchdays) {
            if (loggedUserCheckedLunchdays.contains(matchedUserCheckedLunchday)) {
                commonLunchdays.add(matchedUserCheckedLunchday);
            }
        }
        if (!commonLunchdays.isEmpty()) {
            return commonLunchdays;
        } else {
            return Collections.emptyList();
        }
    }

    public void deleteMatchesByUsername(String loggedUsername) {
        List<LunchMatch> lunchMatchesByLoggedUsername = getLunchMatchesByLoggedUsername(loggedUsername);
        List<LunchMatch> lunchMatchesByMatchedUsername = getLunchMatchesByMatchedUsername(loggedUsername);
        List<LunchMatch> allLunchMatchesByUser = Stream.of(lunchMatchesByLoggedUsername, lunchMatchesByMatchedUsername)
                .flatMap(Collection::stream)
                .collect(Collectors.toList());
        if (!allLunchMatchesByUser.isEmpty()) {
            for (LunchMatch lunchMatch : allLunchMatchesByUser) {
                matchMongoDb.delete(lunchMatch);
            }
        }
    }

}
