package com.levin.backend.service;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {

    public String createId() {
        return UUID.randomUUID().toString();
    }
}
