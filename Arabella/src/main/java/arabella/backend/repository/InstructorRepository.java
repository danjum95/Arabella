package arabella.backend.repository;

import arabella.backend.model.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {

    Optional<Instructor> findByUserId(Long id);

    Optional<Instructor> findByUserIdAndSchoolId(Long userId, Long schoolId);

    List<Instructor> findAllBySchoolId(Long id);
}
