package de.lunchbreakapp.lunchbreakbackend.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class MailService {

    private final String sendGridPlaceholder;
    private final String mailPlaceholder;

    public MailService(@Value("${sendgrid.apikey}") String sendGridPlaceholder, @Value("${test.mail}") String mailPlaceholder) {
        this.sendGridPlaceholder = sendGridPlaceholder;
        this.mailPlaceholder = mailPlaceholder;
    }

    public void sendMatchMail(String firstNameOfMatchedUser, String firstNameOfLoggedUser) {
        String mailContent = "Hallo " + firstNameOfMatchedUser + "!\n\n" + firstNameOfLoggedUser + " möchte ebenfalls mit Dir lunchen gehen.\n\n" +
                "Schaue in Dein Matchverzeichnis auf LunchBreak, um die Kontaktdaten und Lunchdays Deines Matches anzusehen.\n\n" +
                "Viel Spaß beim Lunchen!";
        Email from = new Email("match@lunchbreak.de");
        String subject = "Neues Lunch-Match!";
        Email to = new Email(mailPlaceholder);
        Content content = new Content("text/plain", mailContent);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(sendGridPlaceholder);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            log.info(response.getBody());
            log.info("E-mail notification successfully delivered.");
        } catch (IOException ex) {
            throw new IllegalStateException("E-mail notification could not be delivered.");
        }
    }

}
