package arabella.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Contract {

    public static final class For {
        public static final String STUDENT = "student";

        public static final String INSTRUCTOR = "instructor";
    }

    @Id
    @GeneratedValue
    private Long id;

    private Long schoolId;

    private Long userId;

    @OneToOne(fetch = FetchType.EAGER,
            cascade =  CascadeType.ALL)
    @JoinColumn(name = "userId", referencedColumnName ="id", insertable = false, updatable = false)
    private User user;

    @OneToOne(fetch = FetchType.EAGER,
            cascade =  CascadeType.ALL)
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
}
