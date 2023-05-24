package com.levin.backend.community;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping
    public ResponseEntity<List<Community>> getAllCommunities() {
        return ResponseEntity.ok(communityService.findAll());
    }

    @PostMapping
    public ResponseEntity<Community> postCommunity(@RequestBody Community community) {
        return new ResponseEntity<>(communityService.saveNew(community), HttpStatus.CREATED);
    }
}
