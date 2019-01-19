package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.Instructor;
import arabella.backend.model.School;
import arabella.backend.model.Student;
import arabella.backend.model.User;
import arabella.backend.repository.InstructorRepository;
import arabella.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentRestController {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    InstructorRepository instructorRepository;

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

    @PostMapping("/disable/{studentId}")
    public ResponseEntity disableStudent(@RequestHeader("Token") String token, @PathVariable("studentId") Long studentToDisableId) {
        User user = sessionController.getUserFromToken(token);

        School school = sessionController.findSchoolOfGivenUser(user);

        if (school == null ) {
            return new ResponseEntity<>("You doesn't belong to school", HttpStatus.BAD_REQUEST);
        }

        if (!sessionController.isOwnerOfGivenSchool(user, school.getId())) {
            return new ResponseEntity<>("You doesn't have sufficient permissions to disable student",HttpStatus.UNAUTHORIZED);
        }

        Optional<Student> studentToDisable = studentRepository.findById(studentToDisableId);

        if (!studentToDisable.isPresent()) {
            return new ResponseEntity<>("Student to disable not found", HttpStatus.NOT_FOUND);
        }

        if (!studentToDisable.get().getSchoolId().equals(school.getId())) {
            return new ResponseEntity<>("Not the same school", HttpStatus.BAD_REQUEST);
        }

        studentToDisable.get().setActive(Boolean.FALSE);
        studentRepository.save(studentToDisable.get());

        return new ResponseEntity(HttpStatus.OK);
    }
}
