package de.lunchbreakapp.lunchbreakbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "colleagues")
public class Colleague {

    @Id
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String job;
    private String subsidiary;
    private String location;
    private String favoriteFood;
    private String hobbies;
    private String phoneNumber;
    private Map<String, Boolean> lunchdays;
    private Boolean profileFilled;
    private String profilePicUrl;

}