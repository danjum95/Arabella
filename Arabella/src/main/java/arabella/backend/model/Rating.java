package arabella.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Rating {

    public static class Type {
        public static int SCHOOL = 0;

        public static int INSTRUCTOR = 1;
    }

    @Id
    @GeneratedValue
    private Long id;

    private Long givenBy;

    private Long receivedBy;

    private Integer typeOfRating;
}
