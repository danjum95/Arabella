package arabella.backend.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Contract {

    public static final class For {
        public static final String STUDENT = "student";

        public static final String INSTRUCTOR = "instructor";
    }

    public static final class Status {
        public static final int NEW = 0;

        public static final int REJECTED = 1;

        public static final int ACCEPTED = 2;

        public static final int CANCELED_BY_USER = 3;
    }

    @Id
    @GeneratedValue
    private Long id;

    private Long schoolId;

    private Long userId;

    private Integer typeOfAccount;

    @NotNull
    private Integer status;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId", referencedColumnName ="id", insertable = false, updatable = false)
    private User user;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "schoolId", referencedColumnName ="id", insertable = false, updatable = false)
    School school;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public School getSchool() {
        return school;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getTypeOfAccount() {
        return typeOfAccount;
    }

    public void setTypeOfAccount(Integer typeOfAccount) {
        this.typeOfAccount = typeOfAccount;
    }
}
