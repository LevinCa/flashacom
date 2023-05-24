package com.levin.backend.security;

public record MongoUserDTO(
        String id,
        String username,
        String flatmateId,
        String communityId
) {
}
