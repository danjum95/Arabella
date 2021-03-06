package arabella.backend.repository;

import arabella.backend.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    void deleteAllByUserId(Long id);

    List<Contract> findAllBySchoolId(Long id);

    List<Contract> findByUserId(Long id);
}
