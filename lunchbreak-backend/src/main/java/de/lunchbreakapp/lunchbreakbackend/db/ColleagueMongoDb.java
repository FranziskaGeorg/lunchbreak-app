package de.lunchbreakapp.lunchbreakbackend.db;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface ColleagueMongoDb extends PagingAndSortingRepository<Colleague, String> {

    public Optional<Colleague> findByUsername(String username);

}
