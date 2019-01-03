package arabella.backend.endpoint;

import arabella.backend.auth.SessionController;
import arabella.backend.model.Lesson;
import arabella.backend.model.School;
import arabella.backend.model.Student;
import arabella.backend.model.User;
import arabella.backend.repository.*;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;
import java.util.concurrent.TimeUnit;
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
    SchoolRepository schoolRepository;

    @Autowired
    SessionController sessionController;

    @PutMapping
    public ResponseEntity addLesson(@RequestHeader("Token") String givenToken, @Validated @RequestBody Lesson lesson) {

        User user = sessionController.getUserFromToken(givenToken);

        User student = userRepository.findById(lesson.getStudentId()).get();

        if (student != null) {
            if(sessionController.isStudentOfGivenSchool(student, sessionController.findSchoolOfGivenUser(user).getId())) {

                lesson.setInstructorId(sessionController.checkToken(givenToken).getUserId());
                lesson.setSchoolId(sessionController.findSchoolOfGivenUser(user).getId());

                if (!isDateFormatCorrect(lesson.getDate()) || !isDateFormatCorrect(lesson.getEndDate())) {
                    return new ResponseEntity<>("Date format should be: yyyy-mm-ddThh:mm:ss", HttpStatus.BAD_REQUEST);
                }

                lessonRepository.save(lesson);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>("User does not belong to the same school as Instructor", HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    private boolean isDateFormatCorrect(String date) {
        try {
            Timestamp.valueOf(date.replace("T"," "));
            return true;
        } catch (IllegalArgumentException ex) {
            return false;
        }
    }

    @GetMapping("/how/many/minutes/student/drove")
    public ResponseEntity getDroveMins(@RequestHeader("Token") String token) {
        User user = sessionController.getUserFromToken(token);

        School school = sessionController.findSchoolOfGivenUser(user);

        if (!sessionController.isStudentOfGivenSchool(user, school.getId())) {
            return new ResponseEntity<>("Endpoint only for students",HttpStatus.BAD_REQUEST);
        }

        List<Lesson> lessons = lessonRepository.findAllByStudentId(user.getId());

        long sum = sumDurationOfDrivesInMinutes(lessons);

        return new ResponseEntity<>(TimeUnit.MILLISECONDS.toMinutes(sum), HttpStatus.OK);
    }

    @GetMapping("/how/many/minutes/student/{studentId}/of/school/{schoolId}/drove")
    public ResponseEntity getDroveMinsOfStudent(@PathVariable("studentId") Long studentId, @PathVariable("schoolId") Long schoolId, @RequestHeader("Token") String token) {
        User user = sessionController.getUserFromToken(token);

        Optional<School> school = schoolRepository.findById(schoolId);

        if (!school.isPresent()) {
            return new ResponseEntity<>("Unknown school", HttpStatus.BAD_REQUEST);
        }

        if (!sessionController.isStudentOfGivenSchool(user, school.get().getId())
                && (sessionController.isOwnerOfGivenSchool(user, school.get().getId()))
                    ||  sessionController.isInstructorOfGivenSchool(user, school.get().getId())) {
            List<Lesson> lessons = lessonRepository.findAllByStudentId(studentId);

            long sum = sumDurationOfDrivesInMinutes(lessons);

            return new ResponseEntity<>(sum, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Endpoint only for instructor or school", HttpStatus.BAD_REQUEST);
        }
    }

    private long sumDurationOfDrivesInMinutes(List<Lesson> lessons) {
        long sum = 0;
        for (Lesson lesson : lessons) {
            String endDate = lesson.getEndDate().replace("T"," ");
            String startDate = lesson.getDate().replace("T"," ");
            sum += Timestamp.valueOf(endDate).getTime() - Timestamp.valueOf(startDate).getTime();
        }
        return TimeUnit.MILLISECONDS.toMinutes(sum);
    }

    @GetMapping("/students/drives/durations")
    public ResponseEntity getStudentsRide(@RequestHeader("Token") String token) {
        User user = sessionController.getUserFromToken(token);

        School school = sessionController.findSchoolOfGivenUser(user);

        if (school == null) {
            return new ResponseEntity("User doesn't belong to any school", HttpStatus.CONFLICT);
        }

        if (!sessionController.isStudentOfGivenSchool(user, school.getId())
                && (sessionController.isOwnerOfGivenSchool(user, school.getId()))
                ||  sessionController.isInstructorOfGivenSchool(user, school.getId())) {
            List<Student> students = studentRepository.findAllBySchoolId(school.getId());

            List<Lesson> lessons = lessonRepository.findAllBySchoolId(school.getId());

            List<Pair<Student, Long>> response = new LinkedList<>();

            for (Student student : students) {
                List<Lesson> studentLessons = lessons.stream()
                        .filter(lesson -> lesson.getStudentId().equals(student.getUserId()))
                        .collect(Collectors.toList());

                response.add(new Pair<>(student, sumDurationOfDrivesInMinutes(studentLessons)));
            }

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Endpoint only for instructor or school", HttpStatus.BAD_REQUEST);
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
