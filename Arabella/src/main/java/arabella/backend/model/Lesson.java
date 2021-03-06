package arabella.backend.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    private String date;

    @NotNull
    private String endDate;

    @Column(name = "ENABLED", nullable = false)
    private Boolean isDone = false;

    private String title;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instructorId", referencedColumnName ="id", insertable = false, updatable = false)
    private User instructor;

    @OneToOne(fetch = FetchType.EAGER)
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

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Boolean getDone() {
        return isDone;
    }

    public void setDone(Boolean done) {
        isDone = done;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return String.format("Kursant: %s, Instruktor: %s", student.getName(), instructor.getName());
    }
}
