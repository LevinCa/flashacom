package com.levin.backend.security;

import org.springframework.data.annotation.Id;

public record MongoUser(
        @Id
        String id,
        String username,
        String password,
        String flatmateId,
        String communityId
) {
        public MongoUserDTO withoutPassword() {
                return new MongoUserDTO(
                        this.id,
                        this.username,
                        this.flatmateId,
                        this.communityId
                );
        }

        public MongoUser withId(String id) {
                return new MongoUser(
                        id,
                        this.username,
                        this.password,
                        this.flatmateId,
                        this.communityId
                );
        }
}
