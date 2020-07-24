package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.MatchMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import de.lunchbreakapp.lunchbreakbackend.model.dto.HistoryData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    private final MatchMongoDb matchMongoDb;

    @Autowired
    public HistoryService(MatchMongoDb matchMongoDb) {
        this.matchMongoDb = matchMongoDb;
    }

    public List<LunchMatch> getLunchMatchesByUsername(String loggedUsername) {
        return matchMongoDb.findAllByLoggedUsername(loggedUsername);
    }

}
