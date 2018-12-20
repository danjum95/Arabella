package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.*;
import arabella.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/messages")
public class MessageRestController {

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    SchoolRepository schoolRepository;

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SessionController sessionController;

    @PutMapping
    public ResponseEntity sendMessage(@RequestHeader("Token") String givenToken, @Validated @RequestBody Message message) {

        message.setSenderId(sessionController.checkToken(givenToken).getUserId());
        message.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(messageRepository.save(message), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMessages(@RequestHeader("Token") String givenToken) {
        List<Message> messages = messageRepository.findAllByReceiverId(sessionController.checkToken(givenToken).getUserId());
        messages.addAll(messageRepository.findAllBySenderId(sessionController.checkToken(givenToken).getUserId()));
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity getUsersToWhichCanSendMessages(@RequestHeader("Token") String givenToken) {
        //TODO map with names of users

        User user = sessionController.getUserFromToken(givenToken);
        School school = sessionController.findSchoolOfGivenUser(user);

        if (school != null) {
            List<User> users = new LinkedList<>();

            users.addAll(instructorRepository.findAllBySchoolId(school.getId()).stream().map(Instructor::getUser).collect(Collectors.toList()));
            users.add(school.getUser());
            users.addAll(studentRepository.findAllBySchoolId(school.getId()).stream().map(Student::getUser).collect(Collectors.toList()));

            return new ResponseEntity<>(users, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Can't find school of given user", HttpStatus.INTERNAL_SERVER_ERROR);
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
