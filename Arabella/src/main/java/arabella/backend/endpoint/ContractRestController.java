package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.Instructor;
import arabella.backend.model.Student;
import arabella.backend.model.User;
import arabella.backend.repository.InstructorRepository;
import arabella.backend.repository.SchoolRepository;
import arabella.backend.repository.StudentRepository;
import arabella.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/contract")
public class ContractRestController {

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

    @PutMapping("/student/of/school/{schoolId}")
    public ResponseEntity becomeStudent(@PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String givenToken) {
        User user = sessionController.getUserFromToken(givenToken);

        if (!sessionController.isInstructorOfGivenSchool(user, schoolId)
            && !sessionController.isStudentOfGivenSchool(user, schoolId)
            && !sessionController.isOwnerOfGivenSchool(user, schoolId)) {

            Student student = new Student();
            student.setSchoolId(schoolId);
            student.setUserId(user.getId());

            return new ResponseEntity<>(studentRepository.save(student), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/instructor/of/school/{schoolId}")
    public ResponseEntity becomeInstructor(@PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String givenToken) {
        User user = sessionController.getUserFromToken(givenToken);

        if (!sessionController.isInstructorOfGivenSchool(user, schoolId)
                && !sessionController.isStudentOfGivenSchool(user, schoolId)
                && !sessionController.isOwnerOfGivenSchool(user, schoolId)) {

            Instructor instructor = new Instructor();
            instructor.setSchoolId(schoolId);
            instructor.setUserId(user.getId());

            return new ResponseEntity<>(instructorRepository.save(instructor), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
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
