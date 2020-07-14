package de.lunchbreakapp.lunchbreakbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationData {

    @Size(min=2)
    private String firstName;

    @Size(min=2)
    private String lastName;

    @Email
    private String username;

    @Size(min=8, max=15)
    private String password;

}
