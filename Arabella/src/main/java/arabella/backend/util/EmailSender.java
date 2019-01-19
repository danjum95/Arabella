package arabella.backend.util;

public interface EmailSender {
    void sendEmail(String to, String subject, String content);
}
