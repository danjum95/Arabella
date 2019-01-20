package arabella.backend.repository;

import arabella.backend.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    void deleteAllByStudentId(Long id);

    void deleteAllByInstructorId(Long id);

    List<Lesson> findAllByStudentId(Long id);

    List<Lesson> findAllByInstructorId(Long id);

    List<Lesson> findAllBySchoolId(Long id);
}
