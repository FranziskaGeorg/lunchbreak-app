package de.lunchbreakapp.lunchbreakbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryData {

    private String matchedUsername;
    private LocalDate matchDate;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profilePicUrl;
    private List<String> commonLunchdays;

}
