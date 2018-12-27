package arabella.backend.model;

import org.junit.Test;

import static org.junit.Assert.*;

public class UserTest {
    @Test
    public void isValid() {
        User user = new User();
        user.setEmail("test@test.pl");
        user.setPassword("1234567");
        user.setId(Long.valueOf(5));
    }
}