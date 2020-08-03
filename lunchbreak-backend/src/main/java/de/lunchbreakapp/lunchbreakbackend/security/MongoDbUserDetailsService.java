package de.lunchbreakapp.lunchbreakbackend.security;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
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

    private final ColleagueMongoDb colleagueMongoDb;

    @Autowired
    public MongoDbUserDetailsService(ColleagueMongoDb colleagueMongoDb) {
        this.colleagueMongoDb = colleagueMongoDb;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Colleague> optionalColleague = colleagueMongoDb.findById(username);
        if (optionalColleague.isEmpty()){
            throw new UsernameNotFoundException("user with username: \""+username+"\" not found");
        }

        Colleague colleague = optionalColleague.get();

        return new User(colleague.getUsername(), colleague.getPassword(), List.of(new SimpleGrantedAuthority("admin")));
    }
}
