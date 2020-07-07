package de.lunchbreakapp.lunchbreakbackend.db;

import de.lunchbreakapp.lunchbreakbackend.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserMongoDb extends PagingAndSortingRepository<User, String> {
}
