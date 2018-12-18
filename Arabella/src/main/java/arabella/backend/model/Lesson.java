package arabella.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Lesson {

    @Id
    @GeneratedValue
    private Long id;

    private Long instructorId;

    private Long schoolId;

    @NotNull
    private Long studentId;

    @NotNull
    private Long startTimestamp;

    @NotNull
    private Integer duration;

    @OneToOne(fetch = FetchType.EAGER,
            cascade =  CascadeType.ALL)
    @JoinColumn(name = "instructorId", referencedColumnName ="id", insertable = false, updatable = false)
    private User instructor;

    @OneToOne(fetch = FetchType.EAGER,
            cascade =  CascadeType.ALL)
    @JoinColumn(name = "studentId", referencedColumnName ="id", insertable = false, updatable = false)
    private User student;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(Long instructorId) {
        this.instructorId = instructorId;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getStartTimestamp() {
        return startTimestamp;
    }

    public void setStartTimestamp(Long startTimestamp) {
        this.startTimestamp = startTimestamp;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }
}
