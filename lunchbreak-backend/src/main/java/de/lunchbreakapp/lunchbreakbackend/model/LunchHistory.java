package de.lunchbreakapp.lunchbreakbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LunchHistory {

    String loggedUserId;
    String matchedUserId;
    LocalDate matchDate;

}
