package arabella.backend.repository;

import arabella.backend.model.Map;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MapRepository extends JpaRepository<Map, Long> {
    Optional<Map> findByLessonId(Long id);
}
