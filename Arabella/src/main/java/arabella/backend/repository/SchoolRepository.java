package arabella.backend.repository;

import arabella.backend.model.School;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SchoolRepository extends JpaRepository<School, Long> {
    School findByOwnerId(Long id);

    Optional<School> findByOwnerIdAndId(Long ownerId, Long schoolId);
}
