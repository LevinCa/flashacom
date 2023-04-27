package com.levin.backend.flatmate;

import com.levin.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlatmateService {

    private final FlatmateRepository flatmateRepository;
    private final IdService idService;

    public List<Flatmate> findAllFlatmates() {
        return flatmateRepository.findAll();
    }

    public Flatmate saveFlatmate(Flatmate flatmate) {
        Flatmate newFlatmate = new Flatmate(
                idService.createId(),
                flatmate.firstName(),
                flatmate.lastName(),
                flatmate.photoUrl(),
                flatmate.dateOfBirth(),
                flatmate.eatingHabits(),
                flatmate.contact(),
                flatmate.availability()
        );
        return flatmateRepository.save(newFlatmate);
    }
}
