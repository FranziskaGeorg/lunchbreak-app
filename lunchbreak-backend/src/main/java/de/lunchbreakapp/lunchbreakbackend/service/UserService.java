package de.lunchbreakapp.lunchbreakbackend.service;

import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserMongoDb userMongoDb;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserMongoDb userMongoDb) {
        this.userMongoDb = userMongoDb;
    }

    public void saveNewUserToDb(LunchBreakUser newUser) {
        newUser.setUsername(newUser.getUsername());
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setRole(newUser.getRole());
        userMongoDb.save(newUser);
    }

}
