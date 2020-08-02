package de.lunchbreakapp.lunchbreakbackend.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MailService {

    public void sendMatchMail(String firstNameOfMatchedUser, String firstNameOfLoggedUser) throws IOException {
        String mailContent = "Hallo " + firstNameOfMatchedUser + "!\n\n" + firstNameOfLoggedUser + " möchte ebenfalls mit Dir lunchen gehen.\n\n" +
                "Schaue in Dein Matchverzeichnis auf LunchBreak, um die Kontaktdaten und Lunchdays Deines Matches anzusehen.\n\n" +
                "Viel Spaß beim Lunchen!";
        Email from = new Email("match@lunchbreak.de");
        String subject = "Neues Lunch-Match!";
        Email to = new Email(System.getenv("TEST_MAIL"));
        Content content = new Content("text/plain", mailContent);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(System.getenv("SENDGRID_APIKEY"));
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }

}
