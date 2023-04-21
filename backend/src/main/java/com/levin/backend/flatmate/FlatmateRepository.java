package com.levin.backend.flatmate;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlatmateRepository extends MongoRepository<Flatmate, String> {
}
