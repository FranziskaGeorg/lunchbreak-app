package de.lunchbreakapp.lunchbreakbackend.controller;

import de.lunchbreakapp.lunchbreakbackend.db.ColleagueMongoDb;
import de.lunchbreakapp.lunchbreakbackend.db.UserMongoDb;
import de.lunchbreakapp.lunchbreakbackend.model.Colleague;
import de.lunchbreakapp.lunchbreakbackend.model.LunchBreakUser;
import de.lunchbreakapp.lunchbreakbackend.model.dto.LoginData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ColleagueControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @MockBean
    private ColleagueMongoDb colleagueDb;

    @MockBean
    private UserMongoDb userDb;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void resetDatabase() {
        colleagueDb.deleteAll();
        userDb.deleteAll();
    }

    public String loginToken() {
        LunchBreakUser testUser = new LunchBreakUser("hanni@nanni.de", passwordEncoder.encode("testpw"), "user");
        when(userDb.findById("hanni@nanni.de")).thenReturn(Optional.of(testUser));

        Colleague testColleague = new Colleague("123", "hanni@nanni.de", "Hanni", "Nanni", "", "", "", "", "", "");
        when(colleagueDb.findByUsername("hanni@nanni.de")).thenReturn(Optional.of(testColleague));

        String url = "http://localhost:" + port + "/auth/login";
        ResponseEntity<String> postResponse = restTemplate.postForEntity(url, new LoginData("hanni@nanni.de", "testpw"), String.class);
        return postResponse.getBody();
    }

    @Test
    // getColleagueByUsername
    public void shouldReturnColleagueMatchingUsernameFromToken() {
        // GIVEN
        Colleague testColleague = new Colleague("123", "hanni@nanni.de", "Hanni", "Nanni", "", "", "", "", "", "");
        String userToken = loginToken();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(userToken);
        HttpEntity httpEntity = new HttpEntity(httpHeaders);

        // WHEN
        String url = "http://localhost:" + port + "/api/profile";
        ResponseEntity<Colleague> postResponse = restTemplate.exchange(url, HttpMethod.GET, httpEntity, Colleague.class);
        HttpStatus responseStatus = postResponse.getStatusCode();

        // THEN
        assertEquals(responseStatus, HttpStatus.OK);
        assertEquals(postResponse.getBody(), testColleague);
    }

}