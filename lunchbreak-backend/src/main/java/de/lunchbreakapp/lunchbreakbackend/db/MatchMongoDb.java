package de.lunchbreakapp.lunchbreakbackend.db;

import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface MatchMongoDb extends PagingAndSortingRepository<LunchMatch, String> {

    public List<LunchMatch> findAllByLoggedUsername(String loggedUsername);

}
