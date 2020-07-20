package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
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

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LoginControllerTest {

    @LocalServerPort
    public int port;

    @Autowired
    public TestRestTemplate restTemplate;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    public UserMongoDb userDb;

    @Autowired
    public JWTUtils jwtUtils;

    @BeforeEach
    public void resetDb() {
        userDb.deleteAll();
    }

    @Test
    public void loginWithValidCredentials() {
        // GIVEN
        LunchBreakUser testUser = new LunchBreakUser("test@test.de", passwordEncoder.encode("testpw"), "user");
        userDb.save(testUser);

        // WHEN
        String url = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> postResponse = restTemplate.postForEntity(url, new LoginData("test@test.de", "testpw"), String.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.OK);
        assertTrue(jwtUtils.validateToken(postResponse.getBody(), "test@test.de"));
    }

    @Test
    public void loginWithInvalidCredentials() {
        // GIVEN
        LunchBreakUser testUser = new LunchBreakUser("test@test.de", passwordEncoder.encode("testpw"), "user");
        userDb.save(testUser);

        // WHEN
        String url = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> postResponse = restTemplate.postForEntity(url, new LoginData("test@testing.de", "testpw"), String.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.BAD_REQUEST);
    }

}