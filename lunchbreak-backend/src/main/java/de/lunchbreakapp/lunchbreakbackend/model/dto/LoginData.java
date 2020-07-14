package de.lunchbreakapp.lunchbreakbackend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginData {

    @Email
    private String username;

    private String password;

}