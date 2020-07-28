package de.lunchbreakapp.lunchbreakbackend.db;

import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserMongoDb extends PagingAndSortingRepository<LunchBreakUser, String> {

    public Optional<LunchBreakUser> findByUsername(String username);

}
