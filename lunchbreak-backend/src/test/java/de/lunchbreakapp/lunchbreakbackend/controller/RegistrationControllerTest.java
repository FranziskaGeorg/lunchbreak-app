package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.dto.RegistrationData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RegistrationControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserMongoDb userDb;

    @Autowired
    private ColleagueMongoDb colleagueDb;

    @BeforeEach
    public void resetDb() {
        userDb.deleteAll();
    }

    @Test
    public void registerNewUserWithValidData() {
        // GIVEN
        Colleague testColleague = new Colleague("123", "test@test.de", "Theo", "Tester", "", "", "", "", "", new HashMap<>(), false);

        // WHEN
        String url = "http://localhost:" + port + "/auth/register";
        ResponseEntity<Colleague> postResponse = restTemplate.postForEntity(url, new RegistrationData("Theo", "Tester", "test@test.de", "Testpw123"), Colleague.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.OK);
        assertTrue(userDb.existsById("test@test.de"));
        assertEquals(postResponse.getBody(), colleagueDb.findByUsername("test@test.de").get());

        postResponse.getBody().setId("123");
        assertEquals(postResponse.getBody(), testColleague);
    }

    @Test
    public void registerNewUserWithInvalidData() {
        // GIVEN

        // WHEN
        String url = "http://localhost:" + port + "/auth/register";
        ResponseEntity<Colleague> postResponse = restTemplate.postForEntity(url, new RegistrationData("Theo", "Tester", "theo@tester.de", "Testpw1"), Colleague.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.BAD_REQUEST); // since password is too short
        assertFalse(userDb.existsById("theo@tester.de"));
        assertTrue(colleagueDb.findByUsername("theo@tester.de").isEmpty());
    }

}