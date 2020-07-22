package de.lunchbreakapp.lunchbreakbackend.utils;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
public class LunchdayUtils {

    private final List<String> validWeekdays = List.of("monday", "tuesday", "wednesday", "thursday", "friday");

    public void validateLunchdays(Map<String, Boolean> lunchdays) {
        for (String weekday : lunchdays.keySet()) {
            if (!validWeekdays.contains(weekday)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "weekday "+ weekday + " is not valid");
            }
        }
    }

}
