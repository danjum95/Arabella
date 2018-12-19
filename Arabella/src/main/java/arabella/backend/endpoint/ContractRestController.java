package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.Contract;
import arabella.backend.model.Instructor;
import arabella.backend.model.Student;
import arabella.backend.model.User;
import arabella.backend.repository.*;
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
@RequestMapping("/api/contract")
public class ContractRestController {

    @Autowired
    ContractRepository contractRepository;

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

    @PutMapping("/change/status/of/{contractId}")
    public ResponseEntity changeStatus(@PathVariable("contractId") Long contractId, @RequestHeader("Token") String givenToken, @Validated @RequestBody Contract givenContract) {
        User user = sessionController.getUserFromToken(givenToken);

        if (!sessionController.isOwnerOfGivenSchool(user, contractId)) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }

        Optional<Contract> contract = contractRepository.findById(contractId);

        if (!contract.isPresent()) {
            return new ResponseEntity<>("Contact with that id doesn't exists", HttpStatus.NOT_FOUND);
        }

        if (contract.get().getStatus() == givenContract.getStatus()) {
            return new ResponseEntity<>("Lower status can't be set", HttpStatus.CONFLICT);
        }

        contract.get().setStatus(givenContract.getStatus());

        if (Contract.Status.ACCEPTED == contract.get().getStatus()) {
            if (makeMemberOfSchool(userRepository.findById(contract.get().getUserId()).get(),
                    contract.get().getSchoolId(), contract.get().getTypeOfAccount()) ) {
                return new ResponseEntity<>("User is member of school now", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Something gone wrong with making user a member of school", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(contractRepository.save(contract.get()), HttpStatus.OK);
    }

    private boolean makeMemberOfSchool(User user, Long schoolId, int typeOfAccount) {
        if (!sessionController.isInstructorOfGivenSchool(user, schoolId)
                && !sessionController.isStudentOfGivenSchool(user, schoolId)
                && !sessionController.isOwnerOfGivenSchool(user, schoolId)) {

            if (User.Type.STUDENT == typeOfAccount) {
                Student student = new Student();
                student.setSchoolId(schoolId);
                student.setUserId(user.getId());

                studentRepository.save(student);

                return true;
            }

            if (User.Type.INSTRUCTOR == typeOfAccount) {
                Instructor instructor = new Instructor();
                instructor.setSchoolId(schoolId);
                instructor.setUserId(user.getId());

                instructorRepository.save(instructor);

                return true;
            }

            return false;
        }
        return false;
    }

    @PutMapping("/student/of/school/{schoolId}")
    public ResponseEntity becomeStudent(@PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String givenToken) {
        User user = sessionController.getUserFromToken(givenToken);

        if (makeMemberOfSchool(user, schoolId, User.Type.STUDENT)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }


    @PutMapping("/instructor/of/school/{schoolId}")
    public ResponseEntity becomeInstructor(@PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String givenToken) {
        User user = sessionController.getUserFromToken(givenToken);

        if (makeMemberOfSchool(user, schoolId, User.Type.INSTRUCTOR)) {
            return new ResponseEntity<>(HttpStatus.OK);
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
