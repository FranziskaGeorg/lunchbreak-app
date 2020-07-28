package de.lunchbreakapp.lunchbreakbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HistoryData {

    private String matchedUsername;
    private String matchDate;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String profilePicUrl;

}
