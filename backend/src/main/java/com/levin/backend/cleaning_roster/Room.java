package com.levin.backend.cleaning_roster;

import com.levin.backend.cleaning_roster.model.ImageProperties;
import org.springframework.data.annotation.Id;

import java.util.List;

public record Room(
        @Id
        String id,
        String name,
        ImageProperties imageProperties,
        int rowSpan,
        int columnSpan,
        List<String> assignments
) {

        public Room withId(String id) {
                return new Room(id,
                        this.name,
                        this.imageProperties,
                        this.rowSpan,
                        this.columnSpan,
                        this.assignments
                );
        }

        public Room withAssignments(List<String> assignments) {
                return new Room(
                        this.id,
                        this.name,
                        this.imageProperties,
                        this.rowSpan,
                        this.columnSpan,
                        assignments
                );
        }
}
