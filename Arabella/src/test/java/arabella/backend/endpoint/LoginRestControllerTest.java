package arabella.backend.endpoint;

import arabella.backend.model.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.BDDMockito.given;

public class LoginRestControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private LoginRestController loginRestController;

    @Test
    public void loginCorrect() throws Exception {
        User user = new User();
        user.setEmail("test@test.pl");
        user.setPassword("12345678");
    }

}