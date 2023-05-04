package com.levin.backend.flatmate;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flatmate")
public class FlatmateController {

    private final FlatmateService flatmateService;
    private final FlatmateRepository flatmateRepository;

    @GetMapping
    public ResponseEntity<List<Flatmate>> getAllFlatmates() {
        return ResponseEntity.ok(flatmateService.findAllFlatmates());
    }

    @GetMapping("{id}")
    public ResponseEntity<Flatmate> getFlatmateById(@PathVariable String id) {
        return ResponseEntity.ok(flatmateService.findFlatmateById(id));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Flatmate> postFlatmate(@RequestBody Flatmate flatmate) {
        return new ResponseEntity<>(flatmateService.saveFlatmate(flatmate), HttpStatus.CREATED);
    }

    @PutMapping(value = "{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Flatmate> putFlatmate(@PathVariable String id, @RequestBody Flatmate flatmate) {
        if (flatmateRepository.existsById(id)) {
            return new ResponseEntity<>(flatmateService.updateFlatmate(flatmate), HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(flatmateService.saveFlatmate(flatmate), HttpStatus.CREATED);
    }
}
