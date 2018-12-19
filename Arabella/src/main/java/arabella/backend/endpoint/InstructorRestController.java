package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.User;
import arabella.backend.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/instructors")
public class InstructorRestController {

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    SessionController sessionController;

    @GetMapping("/of/school/{schoolId}")
    public ResponseEntity getInstructorsList(@PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String token) {
        User user = sessionController.getUserFromToken(token);

        if (sessionController.isInstructorOfGivenSchool(user, schoolId)
                || sessionController.isOwnerOfGivenSchool(user, schoolId)
                || sessionController.isStudentOfGivenSchool(user, schoolId)) {
            return new ResponseEntity<>(instructorRepository.findAllBySchoolId(schoolId), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }
}
