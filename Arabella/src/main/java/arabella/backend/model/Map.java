package arabella.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.sql.Array;
import java.util.List;

@Entity
public class Map {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Object[] mapMarkers;

    @NotNull
    private Object[] mapLines;

    @NotNull
    private Long lessonId;

    public void setId(Long id) {
        this.id = id;
    }

    public Object[] getMapMarkers() {
        return mapMarkers;
    }

    public void setMapMarkers(Object[] mapMarkers) {
        this.mapMarkers = mapMarkers;
    }

    public Object[] getMapLines() {
        return mapLines;
    }

    public void setMapLines(Object[] mapLines) {
        this.mapLines = mapLines;
    }

    public Long getId() {
        return id;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }
}
