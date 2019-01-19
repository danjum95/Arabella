package arabella.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Activation {

    @Id
    @GeneratedValue
    private Long id;

    private Long userId;

    private Long activationCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getActivationCode() {
        return activationCode;
    }

    public void setActivationCode(Long activationCode) {
        this.activationCode = activationCode;
    }
}
