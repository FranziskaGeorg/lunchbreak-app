package de.lunchbreakapp.lunchbreakbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationData {

    @Size(min = 2)
    private String firstName;

    @Size(min = 2)
    private String lastName;

    @Email
    private String username;

    @Size(min = 8, max = 15, message = "Password must be 8-15 characters long")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]*$",
            message = "Password must contain one uppercase, one lowercase and one digit minimum")
    private String password;

}
