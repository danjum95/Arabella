package arabella.backend.endpoint;

import arabella.backend.model.Activation;
import arabella.backend.model.User;
import arabella.backend.repository.ActivationRepository;
import arabella.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/activate")
public class ActivationRestController {

    @Autowired
    ActivationRepository activationRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/account/{activationCode}")
    public ResponseEntity activateAccount(@PathVariable("activationCode") String activationCode) {
        Activation activation = activationRepository.findByActivationCode(activationCode);

        if (activation == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        Optional<User> user = userRepository.findById(activation.getUserId());

        if (!user.isPresent()) {
            return new ResponseEntity<>(String.format("Database error - activation code indicates on non existing user account (user id: %s)", activation.getUserId()) , HttpStatus.INTERNAL_SERVER_ERROR);
        }

        user.get().setActivated(Boolean.TRUE);
        userRepository.save(user.get());
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }
}
