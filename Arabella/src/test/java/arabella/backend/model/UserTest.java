package arabella.backend.model;

import org.junit.Test;

import static org.junit.Assert.*;

public class UserTest {
    @Test
    public void isValid() {
        User user = new User();
        user.setEmail("test@test.pl");
        user.setPassword("1234567");
        user.setFirstName("Testuje");
        user.setLastName("Testuj");
        user.setId(Long.valueOf(5));
    }

    @Test
    public void isInvalid() {
        User user = new User();
        user.setEmail("testest.pl");
        user.setPassword("");
        user.setFirstName("");
        user.setLastName("");
        user.setId(Long.valueOf(-5));
    }
}