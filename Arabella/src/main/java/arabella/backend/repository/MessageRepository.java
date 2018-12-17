package arabella.backend.repository;

import arabella.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllById(Long userId);

    List<Message> findAllByReceiverId(Long id);

    List<Message> findAllBySenderId(Long id);

    List<Message> findAllBySenderIdAndReceiverId(Long senderId, Long receiverId);
}
