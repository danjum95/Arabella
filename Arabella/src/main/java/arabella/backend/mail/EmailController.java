package arabella.backend.mail;

import arabella.backend.util.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Controller
public class EmailController {

    private final EmailSender emailSender;
    private final TemplateEngine templateEngine;

    @Autowired
    public EmailController(EmailSender emailSender,
                           TemplateEngine templateEngine){
        this.emailSender = emailSender;
        this.templateEngine = templateEngine;
    }

    public void sendActivationEmailToNewUser(String email, String name, String activationLink){
        //throw new RuntimeException("Wyłączono wysylanie maili!");
        Context context = new Context();
        context.setVariable("title", "Dokończenie rejestracji w serwisie Arabella");
        context.setVariable("name", name);
        context.setVariable("key", activationLink);

        String body = templateEngine.process("mail/finish.registration", context);
        emailSender.sendEmail(email, "Rejestracja w systemie Arabella", body);
    }

    public void sendLoginDataToInstructor(String email, String name, String password){
        //throw new RuntimeException("Wyłączono wysylanie maili!");
        Context context = new Context();
        context.setVariable("title", "Dokończenie rejestracji w serwisie Arabella");
        context.setVariable("name", name);
        context.setVariable("key", password);

        String body = templateEngine.process("mail/registerInstructor", context);
        emailSender.sendEmail(email, "Rejestracja w systemie Arabella", body);
    }
}