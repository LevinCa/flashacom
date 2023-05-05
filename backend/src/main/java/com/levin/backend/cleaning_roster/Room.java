package com.levin.backend.cleaning_roster;

import com.levin.backend.cleaning_roster.model.Task;
import org.springframework.data.annotation.Id;

import java.util.Map;

public record Room(
        @Id
        String id,
        String name,
        int imageIndex,
        int rowSpan,
        int columnSpan,
        Map<Task, String> assignments
) {

        public Room withId(String id) {
                return new Room(id, this.name, this.imageIndex, this.rowSpan, this.columnSpan, this.assignments);
        }
}
