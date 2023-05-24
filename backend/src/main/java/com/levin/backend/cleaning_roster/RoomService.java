package com.levin.backend.cleaning_roster;

import com.levin.backend.community.Community;
import com.levin.backend.community.CommunityService;
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
    private final CommunityService communityService;

    public List<Room> findAllRooms() {
        Community community = communityService.findCurrentCommunity();
        return roomRepository.findAllById(community.roomIds());
    }

    public Room saveNewRoom(Room room) {
        Room newRoom = room.withId(idService.createId());
        communityService.addRoom(newRoom);
        return roomRepository.save(newRoom);
    }

    public Room editAssignments(String id, List<String> assignments) {
        Room toUpdate = roomRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Room doesn't exist"));
        return roomRepository.save(toUpdate.withAssignments(assignments));
    }

    public void deleteRoom(String id) {
        Room toDelete = roomRepository.findById(id).orElseThrow(NoSuchElementException::new);
        communityService.deleteRoom(toDelete);
        roomRepository.deleteById(id);
    }
}
