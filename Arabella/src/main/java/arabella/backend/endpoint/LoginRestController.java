package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.RefreshToken;
import arabella.backend.model.Token;
import arabella.backend.model.User;
import arabella.backend.repository.RefreshTokenRepository;
import arabella.backend.repository.TokenRepository;
import arabella.backend.repository.UserRepository;
import io.micrometer.core.instrument.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.TimeUnit;

@RestController
@CrossOrigin("**")
@RequestMapping("/api/login")
public class LoginRestController {

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

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

        if (dbUser.getActivated() == Boolean.FALSE) {
            return new ResponseEntity<>("User not activated", HttpStatus.UNAUTHORIZED);
        }

        Token token = new Token();
        token.setUserId(dbUser.getId());
        token.setValue(SessionController.generateTokenValue());
        token.setExpDate(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(2));
        tokenRepository.save(token);

        RefreshToken newUserRefreshToken = new RefreshToken(generateToken(), dbUser.getId());
        refreshTokenRepository.save(newUserRefreshToken);

        Map<String, String> respond = new HashMap<>();
        respond.put("token", token.getValue());
        respond.put("userId", String.valueOf(token.getUserId()));
        respond.put("refresh-token", newUserRefreshToken.getValue());

        return new ResponseEntity<>(respond, HttpStatus.OK);
    }

    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public ResponseEntity checkTokenIfExists(@RequestHeader("Token") String token) {
        Map<String, String> respond = new HashMap<>();

        Optional<Token> userToken = tokenRepository.findByValue(token);

        if (!userToken.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            respond.put("userId", userToken.get().getUserId().toString());
            return new ResponseEntity<>(respond, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/renew", method = RequestMethod.POST)
    public ResponseEntity renewToken(@RequestHeader("Refresh-token") String refreshToken) {
        Map<String, String> respond = new HashMap<>();

        RefreshToken userRefreshToken = refreshTokenRepository.findByValue(refreshToken);

        if(Objects.isNull(userRefreshToken)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            Token newUserToken = new Token();
            newUserToken.setUserId(userRefreshToken.getUid());
            newUserToken.setValue(SessionController.generateTokenValue());
            newUserToken.setExpDate(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(2));
            tokenRepository.save(newUserToken);
            RefreshToken newUserRefreshToken = new RefreshToken(generateToken(), userRefreshToken.getUid());
            refreshTokenRepository.save(newUserRefreshToken);

            refreshTokenRepository.delete(refreshTokenRepository.findByValue(refreshToken));

            respond.put("uid", userRefreshToken.getUid().toString());
            respond.put("new-token", newUserToken.getValue());
            respond.put("new-refresh-token", newUserRefreshToken.getValue());
            return new ResponseEntity<>(respond, HttpStatus.OK);
        }
    }

    public static String generateToken(){
        Random random = new Random(System.currentTimeMillis());
        Long _long = Math.abs(random.nextLong());
        return Long.toString(_long, 16);
    }
}
