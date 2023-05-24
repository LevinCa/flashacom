package com.levin.backend.community;

import org.springframework.data.annotation.Id;

import java.util.Set;

public record Community(
        @Id
        String id,
        String name,
        String logoUrl,
        Set<String> flatmateIds,
        Set<String> roomIds
) {
        public Community withId(String id) {
               return new Community(
                        id,
                       this.name,
                       this.logoUrl,
                       this.flatmateIds,
                       this.roomIds
                );
        }

        public Community withNewFlatmates(Set<String> flatmateIds) {
            return new Community(
                    this.id,
                    this.name,
                    this.logoUrl,
                    flatmateIds,
                    this.roomIds
            );
        }

    public Community withNewRooms(Set<String> roomIds) {
        return new Community(
                this.id,
                this.name,
                this.logoUrl,
                this.flatmateIds,
                roomIds
        );
    }
}
