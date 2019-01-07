package arabella.backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Map {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String mapMarkers;

    @NotNull
    private String mapLines;

    @NotNull
    private Long lessonId;

    public void setId(Long id) {
        this.id = id;
    }

    public String getMapMarkers() {
        return mapMarkers;
    }

    public void setMapMarkers(String mapMarkers) {
        this.mapMarkers = mapMarkers;
    }

    public String getMapLines() {
        return mapLines;
    }

    public void setMapLines(String mapLines) {
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
