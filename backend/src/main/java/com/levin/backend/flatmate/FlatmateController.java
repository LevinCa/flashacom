package com.levin.backend.flatmate;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/flatmate")
public class FlatmateController {

    private final FlatmateService flatmateService;

    @GetMapping
    public ResponseEntity<List<Flatmate>> getAllFlatmates() {
        return ResponseEntity.ok(flatmateService.findAllFlatmates());
    }

    @GetMapping("{id}")
    public ResponseEntity<Flatmate> getFlatmateById(@PathVariable String id) {
        return ResponseEntity.ok(flatmateService.findFlatmateById(id));
    }

    @PostMapping
    public ResponseEntity<Flatmate> postFlatmate(@RequestBody Flatmate flatmate) {
        return new ResponseEntity<>(flatmateService.saveFlatmate(flatmate), HttpStatus.CREATED);
    }
}
