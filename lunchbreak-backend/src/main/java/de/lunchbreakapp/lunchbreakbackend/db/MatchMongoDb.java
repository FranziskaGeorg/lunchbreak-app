package de.lunchbreakapp.lunchbreakbackend.db;

import de.lunchbreakapp.lunchbreakbackend.model.LunchMatch;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MatchMongoDb extends PagingAndSortingRepository<LunchMatch, String> {

}
