package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.dto.LoginData;
import de.lunchbreakapp.lunchbreakbackend.security.JWTUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ColleagueMongoDb colleagueDb;

    @Autowired
    private JWTUtils jwtUtils;

    @BeforeEach
    public void resetDb() {
        colleagueDb.deleteAll();
    }


    @Test
    public void loginWithValidCredentials() {
        // GIVEN
        Colleague testColleague = new Colleague("test@test.de", passwordEncoder.encode("Testpw123"), "Theo", "Tester", "", "", "", "", "", "", new HashMap<>(), false, "");
        colleagueDb.save(testColleague);

        // WHEN
        String url = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> postResponse = restTemplate.postForEntity(url, new LoginData("test@test.de", "Testpw123"), String.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.OK);
        assertTrue(jwtUtils.validateToken(postResponse.getBody(), "test@test.de"));
    }

    @Test
    public void loginWithInvalidCredentials() {
        // GIVEN
        Colleague testColleague = new Colleague("test@test.de", passwordEncoder.encode("Testpw123"), "Theo", "Tester", "", "", "", "", "", "", new HashMap<>(), false, "");
        colleagueDb.save(testColleague);

        // WHEN
        String url = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> postResponse = restTemplate.postForEntity(url, new LoginData("test@testing.de", "Testpw123"), String.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.BAD_REQUEST);
    }

}