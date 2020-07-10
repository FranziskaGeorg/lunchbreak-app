package de.lunchbreakapp.lunchbreakbackend.db;

import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserMongoDb extends PagingAndSortingRepository<LunchBreakUser, String> {
}
