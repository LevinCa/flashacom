package com.levin.backend.cleaning_roster;

import com.levin.backend.cleaning_roster.model.ImageProperties;
import com.levin.backend.cleaning_roster.model.Task;
import org.springframework.data.annotation.Id;

import java.util.Map;

public record Room(
        @Id
        String id,
        String name,
        ImageProperties imageProperties,
        int rowSpan,
        int columnSpan,
        Map<Task, String> assignments
) {

        public Room withId(String id) {
                return new Room(id, this.name, this.imageProperties, this.rowSpan, this.columnSpan, this.assignments);
        }
}
