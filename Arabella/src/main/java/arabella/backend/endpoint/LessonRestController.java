package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.Lesson;
import arabella.backend.model.Student;
import arabella.backend.model.User;
import arabella.backend.repository.InstructorRepository;
import arabella.backend.repository.LessonRepository;
import arabella.backend.repository.StudentRepository;
import arabella.backend.repository.UserRepository;
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
@RequestMapping("/api/lessons")
public class LessonRestController {

    @Autowired
    LessonRepository lessonRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    SessionController sessionController;

    @PutMapping
    public ResponseEntity addLesson(@RequestHeader("Token") String givenToken, @Validated @RequestBody Lesson lesson) {

        Long instructorId = sessionController.checkToken(givenToken).getUserId();

        Long schoolId = instructorRepository.findByUserId(instructorId).get().getSchoolId();

        User student = userRepository.findById(lesson.getStudentId()).get();

        if (student != null) {
            if(sessionController.isStudentOfGivenSchool(student, schoolId)) {

                lesson.setInstructorId(sessionController.checkToken(givenToken).getUserId());
                lesson.setSchoolId(schoolId);

                return new ResponseEntity<>(lessonRepository.save(lesson), HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User does not belong to the same school as Instructor", HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/of/school/{schoolId}")
    public ResponseEntity getLessons(@PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String givenToken) {
        User user = sessionController.getUserFromToken(givenToken);

        if (sessionController.isStudentOfGivenSchool(user, schoolId)) {
            return new ResponseEntity<>(lessonRepository.findAllByStudentId(user.getId()), HttpStatus.OK);
        }

        if (sessionController.isInstructorOfGivenSchool(user, schoolId)) {
            return new ResponseEntity<>(lessonRepository.findAllByInstructorId(user.getId()), HttpStatus.OK);
        }

        if (sessionController.isOwnerOfGivenSchool(user, schoolId)) {
            return new ResponseEntity<>(lessonRepository.findAllBySchoolId(schoolId), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
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
