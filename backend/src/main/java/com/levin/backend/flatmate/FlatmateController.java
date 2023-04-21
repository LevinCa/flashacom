package com.levin.backend.flatmate;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
