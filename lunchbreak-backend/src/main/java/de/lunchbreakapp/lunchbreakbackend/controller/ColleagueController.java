package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.service.ColleagueService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("api")
public class ColleagueController {

    private final ColleagueService colleagueService;

    public ColleagueController(ColleagueService colleagueService) {
        this.colleagueService = colleagueService;
    }

    @GetMapping("{id}")
    public Colleague getColleague (@PathVariable String id) {
        Optional<Colleague> colleagueOptional = colleagueService.getColleague(id);
        if (colleagueOptional.isPresent()) {
            return colleagueOptional.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID " + id + " does not exist");
    }

    @PostMapping("testcolleagues")
    public void addSampleColleaguesToDb() {
        colleagueService.addSampleColleaguesToDb();
    }

    @GetMapping("dailymatch")
    public Colleague getRandomColleague() {
        return colleagueService.getRandomColleague();
    }

    @PostMapping("testusers")
    public void addSampleUsersToDb() {
        colleagueService.addSampleUsersToDb();
    }

}
