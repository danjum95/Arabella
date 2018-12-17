package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.Token;
import arabella.backend.model.User;
import arabella.backend.repository.TokenRepository;
import arabella.backend.repository.UserRepository;
import io.micrometer.core.instrument.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("**")
@RequestMapping("/api/login")
public class LoginRestController {

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public ResponseEntity tryToLogin(@RequestBody User user) {
        String email = user.getEmail();
        String password = user.getPassword();

        if (StringUtils.isEmpty(email)) {
            return new ResponseEntity<>("No email field or value", HttpStatus.BAD_REQUEST);
        }

        if (StringUtils.isEmpty(password)) {
            return new ResponseEntity<>("No password field or value", HttpStatus.BAD_REQUEST);
        }

        User dbUser = userRepository.findByEmail(email);

        if (dbUser == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        if (!dbUser.getPassword().equals(password)) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        Token token = new Token();
        token.setUserId(dbUser.getId());
        token.setValue(SessionController.generateTokenValue());
        tokenRepository.save(token);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

}
