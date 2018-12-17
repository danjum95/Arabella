package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.School;
import arabella.backend.model.User;
import arabella.backend.repository.UserRepository;
import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    Gson gson = new GsonBuilder().setExclusionStrategies(new ExclusionStrategyImpl()).create();

    @Autowired
    UserRepository userRepository;

    @Autowired
    SessionController sessionController;

    @PutMapping
    public ResponseEntity addUser(@Validated(User.New.class) @RequestBody User newUser){
        if (!checkIfUserExists(newUser)) {
            userRepository.save(newUser);
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/change/password")
    public ResponseEntity changePassword(@RequestHeader("Token") String token, @RequestBody User changesOfUser) {
        User user = sessionController.getUserFromToken(token);

        if (user.getPassword().equals(changesOfUser.getPassword())) {
            return new ResponseEntity(HttpStatus.NOT_MODIFIED);
        }

        user.setPassword(changesOfUser.getPassword());

        userRepository.save(user);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/change/email")
    public ResponseEntity changeEmail(@RequestHeader("Token") String token, @RequestBody User changesOfUser) {
        User user = sessionController.getUserFromToken(token);

        if (user.getEmail().equals(changesOfUser.getEmail())) {
            return new ResponseEntity(HttpStatus.NOT_MODIFIED);
        }

        if (userRepository.findByEmail(changesOfUser.getEmail()) != null) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }

        user.setEmail(changesOfUser.getEmail());

        userRepository.save(user);

        return new ResponseEntity(HttpStatus.OK);
    }


    public boolean checkIfUserExists(User user) {
        return userRepository.findByEmail(user.getEmail()) != null;
    }

    @GetMapping("/{id}")
    public ResponseEntity getUser(@PathVariable("id") Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()) {
            return new ResponseEntity<>(gson.toJson(user.get()),HttpStatus.OK);
        }
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/which/school")
    public ResponseEntity getSchoolOfUser(@RequestHeader("Token") String givenToken) {
        User user = sessionController.getUserFromToken(givenToken);

        School school = sessionController.findSchoolOfGivenUser(user);

        if (school != null) {
            return new ResponseEntity<>(school, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User doesn't belong to any school", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/which/type/of/user")
    public ResponseEntity getTypeOfUser(@RequestHeader("Token") String givenToken) {
        User user = sessionController.getUserFromToken(givenToken);

        School school = sessionController.findSchoolOfGivenUser(user);

        if (school != null) {
            Integer type = -1;

            if (sessionController.isStudentOfGivenSchool(user, school.getId())) {
                type = User.Type.STUDENT;
            }

            if (sessionController.isInstructorOfGivenSchool(user, school.getId())) {
                type = User.Type.INSTRUCTOR;
            }

            if (sessionController.isOwnerOfGivenSchool(user, school.getId())) {
                type = User.Type.SCHOOL;
            }

            if (type.equals(-1)) {
                return new ResponseEntity<>("User belongs to school but can't found type of user", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return new ResponseEntity<>(type, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Not belong to school", HttpStatus.NOT_FOUND);
        }
    }

    private class ExclusionStrategyImpl implements ExclusionStrategy {
        @Override
        public boolean shouldSkipField(FieldAttributes f) {
            if (f.getName().equals("password")) {
                return true;
            }
            return false;
        }

        @Override
        public boolean shouldSkipClass(Class<?> clazz) {
            return false;
        }
    }

    @ExceptionHandler
    public ResponseEntity<Map<String, String>> handleException(MethodArgumentNotValidException exception) {

        Map<String, String> errorMsg = new HashMap<>();
        errorMsg.put("Missing fields", exception.getBindingResult().getFieldErrors().stream()
                .map(FieldError::getField)
                .collect(Collectors.joining(", ")));

        return new ResponseEntity<>(errorMsg, HttpStatus.NOT_FOUND);
    }
}
