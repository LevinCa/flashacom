package com.levin.backend.cleaning_roster;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.findAllRooms());
    }

    @PostMapping
    public ResponseEntity<Room> postRoom(@RequestBody Room room) {
        return new ResponseEntity<>(roomService.saveNewRoom(room), HttpStatus.CREATED);
    }
}
