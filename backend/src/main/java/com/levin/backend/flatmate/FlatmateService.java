package com.levin.backend.flatmate;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlatmateService {

    private final FlatmateRepository flatmateRepository;

    public List<Flatmate> findAllFlatmates() {
        return flatmateRepository.findAll();
    }
}
