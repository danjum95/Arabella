package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.User;
import arabella.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentRestController {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    SessionController sessionController;

    @GetMapping("/of/school/{schoolId}")
    public ResponseEntity getStudentList(@PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String token) {
        User user = sessionController.getUserFromToken(token);

        if (!sessionController.isInstructorOfGivenSchool(user, schoolId)
                && !sessionController.isOwnerOfGivenSchool(user, schoolId)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(studentRepository.findAllBySchoolId(schoolId), HttpStatus.OK);
    }
}
