package arabella.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class User {

    public static class Type {
        public static final int ANY = -1;

        public static final int SCHOOL = 0;

        public static final int STUDENT = 2;

        public static final int INSTRUCTOR = 1;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @NotNull(
            groups = New.class
    )
    private String firstName;

    @NotNull(
            groups = New.class
    )
    private String lastName;

    @NotNull(
            groups = New.class
    )
    private String email;

    @NotNull(
            groups = New.class
    )
    private String password;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return firstName + " " + lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public interface New {
        // intentionally empty
    }

    public interface Existing {
        // intentionally empty
    }
}
