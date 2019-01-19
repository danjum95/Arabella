package arabella.backend.repository;

import arabella.backend.model.Activation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivationRepository extends JpaRepository<Activation, Long> {
    Activation findByActivationCode(String activationCode);
}
