package com.levin.backend.cleaning_roster;

import com.levin.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final IdService idService;

    public List<Room> findAllRooms() {
        return roomRepository.findAll();
    }

    public Room saveNewRoom(Room room) {
        return roomRepository.save(room.withId(idService.createId()));
    }

    public Room editAssignments(String id, List<String> assignments) {
        Room toUpdate = roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Room doesn't exist"));
        return roomRepository.save(toUpdate.withAssignments(assignments));
    }

    public void deleteRoom(String id) {
        roomRepository.deleteById(id);
    }
}
