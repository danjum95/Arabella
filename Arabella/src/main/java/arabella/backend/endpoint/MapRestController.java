package arabella.backend.endpoint;

import arabella.backend.model.Map;
import arabella.backend.repository.MapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/maps")
public class MapRestController {

    @Autowired
    MapRepository mapRepository;

    @GetMapping("/{lessonId}")
    public ResponseEntity getMap(@PathVariable("lessonId") Long id) {
        Optional<Map> map = mapRepository.findByLessonId(id);

        if(map.isPresent()) {
            return new ResponseEntity<>(map, HttpStatus.OK);
        }

        return new ResponseEntity<>("No map for given lessonId", HttpStatus.NOT_FOUND);
    }

    @PutMapping
    public ResponseEntity putMap(@Validated Map newMap) {
        Optional<Map> map = mapRepository.findByLessonId(newMap.getLessonId());
        if (map.isPresent()) {
            return new ResponseEntity<>("Map already exists for current lessonId", HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(mapRepository.save(newMap), HttpStatus.OK);
    }
}
