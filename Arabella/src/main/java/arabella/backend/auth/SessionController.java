package arabella.backend.auth;

import arabella.backend.model.*;
import arabella.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestClientException;

import java.util.Optional;
import java.util.Random;

@Controller
public class SessionController {

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SchoolRepository schoolRepository;

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private StudentRepository studentRepository;

    public School findSchoolOfGivenUser(User user) {
        Long schoolId = -1L;

        Optional<Student> student = studentRepository.findByUserId(user.getId());
        if (student.isPresent()) {
            schoolId = student.get().getSchoolId();
        }

        Optional<Instructor> instructor = instructorRepository.findByUserId(user.getId());
        if (instructor.isPresent()) {
            schoolId = instructor.get().getSchoolId();
        }

        Optional<School> school = schoolRepository.findById(schoolId);

        return school.orElse(schoolRepository.findByOwnerId(user.getId()));
    }

    public boolean isStudentOfGivenSchool(User user, Long schoolId) {
        Optional<Student> student = studentRepository.findByUserIdAndSchoolId(user.getId(), schoolId);
        if (student.isPresent()) {
            return true;
        }
        return false;
    }

    public boolean isInstructorOfGivenSchool(User user, Long schoolId) {
        if (instructorRepository.findByUserIdAndSchoolId(user.getId(), schoolId).isPresent()) {
            return true;
        }
        return false;
    }

    public boolean isOwnerOfGivenSchool(User user, Long schoolId) {
        if (schoolRepository.findByOwnerIdAndId(user.getId(), schoolId).isPresent()) {
            return true;
        }
        return false;
    }

    public boolean ifGivenUserIdExists(Long id) {
        if (userRepository.findById(id).isPresent()) {
            return true;
        }
        return false;
    }

    public User getUserFromToken(String token) {
        Optional<User> user = userRepository.findById(checkToken(token).getUserId());

        if(user.isPresent()) {
            if (user.get().getActivated() == Boolean.FALSE) {
                throw new RestClientException("User not activated!");
            }

            return user.get();
        }

        throw new RestClientException("Token indicating on non-existing user");
    }

    public Token checkToken(String tokenValue) {
        System.out.println("tokenValue:" + tokenValue);
        if ( tokenRepository == null ) {
            System.out.println("tokenRepository error: is null");
        }
        Optional<Token> token = tokenRepository.findByValue(tokenValue);
        if (token.isPresent()) {
            return token.get();
        }
        throw new RestClientException("Token not found");
    }

    public static synchronized String generateTokenValue() {
        long longToken = Math.abs( new Random().nextLong() );
        return Long.toString( longToken, 16 );
    }
}
