package arabella.backend.repository;

import arabella.backend.model.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    RefreshToken findByValue(String key);
    List<RefreshToken> findByUid(Long uid);
}