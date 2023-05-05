package com.levin.backend.cleaning_roster;

import com.levin.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
