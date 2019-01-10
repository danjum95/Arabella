package arabella.backend.model;

import javax.persistence.*;
import java.util.concurrent.TimeUnit;

@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long uid;
    @Column(unique=true)
    private String value;
    private Long expDate;

    public RefreshToken() {
    }

    public RefreshToken(String value, Long uid) {
        this.value = value;
        this.uid = uid;
        this.expDate = System.currentTimeMillis() + TimeUnit.DAYS.toMillis(30);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

    public Long getExpDate() {
        return expDate;
    }

    public void setExpDate(Long expDate) {
        this.expDate = expDate;
    }
}

