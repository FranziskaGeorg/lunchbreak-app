package de.lunchbreakapp.lunchbreakbackend.security;

import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MongoDbUserDetailsService implements UserDetailsService {

    private final UserMongoDb userMongoDb;

    @Autowired
    public MongoDbUserDetailsService(UserMongoDb userMongoDb) {
        this.userMongoDb = userMongoDb;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<LunchBreakUser> optionalUser = userMongoDb.findById(username);
        if (optionalUser.isEmpty()){
            throw new UsernameNotFoundException("user with username: \""+username+"\" not found");
        }

        LunchBreakUser user = optionalUser.get();

        return new User(user.getUsername(), user.getPassword(), List.of(new SimpleGrantedAuthority("admin")));
    }
}
