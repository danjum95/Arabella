package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.School;
import arabella.backend.model.User;
import arabella.backend.repository.SchoolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/schools")
public class SchoolRestController {

    @Autowired
    SchoolRepository schoolRepository;

    @Autowired
    SessionController sessionController;

    @PutMapping
    public ResponseEntity createSchool(@RequestHeader("Token") String givenToken, @Validated(School.Add.class) @RequestBody School newSchool) {
        User user = sessionController.getUserFromToken(givenToken);

        if (schoolRepository.findByOwnerId(user.getId()) != null) {
            newSchool.setOwnerId(user.getId());
            return new ResponseEntity<>(schoolRepository.save(newSchool), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Already a school", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping
    public ResponseEntity getAllSchools() {
        return new ResponseEntity<>(schoolRepository.findAll(), HttpStatus.OK);
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
