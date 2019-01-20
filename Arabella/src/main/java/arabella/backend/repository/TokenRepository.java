package arabella.backend.repository;

import arabella.backend.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByValue (String token);

    void deleteAllByUserId(Long id);
}
