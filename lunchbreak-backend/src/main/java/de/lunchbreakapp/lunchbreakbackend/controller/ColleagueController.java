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

    @GetMapping("dailymatch")
    public Colleague getRandomColleague() {
        return colleagueService.getRandomColleague();
    }

    @GetMapping("profile/{id}")
    public Optional<Colleague> getColleagueByUsername(@PathVariable String id) {
        Optional <Colleague> optionalColleague = colleagueService.getColleagueById(id);
        if (Optional.of(optionalColleague).isPresent()) {
            System.out.println(optionalColleague.get());
            return optionalColleague;
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Colleague with id " + id + " does not exist.");
    }

}
