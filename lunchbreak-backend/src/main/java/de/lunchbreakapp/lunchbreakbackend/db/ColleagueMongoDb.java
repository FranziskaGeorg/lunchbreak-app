package de.lunchbreakapp.lunchbreakbackend.db;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ColleagueMongoDb extends PagingAndSortingRepository<Colleague, String> {
}
