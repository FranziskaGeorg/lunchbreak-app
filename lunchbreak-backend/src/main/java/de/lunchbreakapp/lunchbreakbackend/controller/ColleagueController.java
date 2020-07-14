package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.service.ColleagueService;
import org.springframework.web.bind.annotation.*;

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

}
