package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
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
    private ColleagueMongoDb colleagueDb;

    @BeforeEach
    public void resetDb() {
        colleagueDb.deleteAll();
    }


    @Test
    public void registerNewUserWithValidData() {
        // GIVEN
        Colleague testColleague = new Colleague("test@test.de", "Testpw123", "Theo", "Tester", "", "", "", "", "", "", new HashMap<>(), false, "");

        // WHEN
        String url = "http://localhost:" + port + "/auth/register";
        ResponseEntity<Colleague> postResponse = restTemplate.postForEntity(url, new RegistrationData("Theo", "Tester", "test@test.de", "Testpw123"), Colleague.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.OK);
        assertEquals(postResponse.getBody(), colleagueDb.findByUsername("test@test.de").get());
        postResponse.getBody().setPassword("Testpw123");
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
        assertTrue(colleagueDb.findByUsername("theo@tester.de").isEmpty());
    }


}