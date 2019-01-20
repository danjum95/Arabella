package arabella.backend.repository;

import arabella.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    void deleteByUserId(Long id);

    Optional<Student> findByUserId(Long id);

    Optional<Student> findByUserIdAndSchoolId(Long userId, Long schoolId);

    List<Student> findAllBySchoolId(Long id);
}
