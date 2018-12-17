package arabella.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
}
