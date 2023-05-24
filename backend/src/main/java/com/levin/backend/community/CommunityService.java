package com.levin.backend.community;

import com.levin.backend.cleaning_roster.Room;
import com.levin.backend.flatmate.Flatmate;
import com.levin.backend.security.MongoUserService;
import com.levin.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final IdService idService;
    private final MongoUserService userService;

    public List<Community> findAll() {
        return communityRepository.findAll();
    }

    public Community saveNew(Community community) {
        return communityRepository.save(community.withId(idService.createId()));
    }

    public Community findCurrentCommunity() {
        return communityRepository.findById(userService.findCurrentUser().communityId())
                .orElseThrow(NoSuchElementException::new);
    }

    public void addFlatmate(Flatmate flatmate) {
        Community community = findCurrentCommunity();
        Set<String> newFlatmateIds = new HashSet<>(community.flatmateIds());
        newFlatmateIds.add(flatmate.id());
        communityRepository.save(community.withNewFlatmates(newFlatmateIds));
    }

    public void addRoom(Room room) {
        Community community = findCurrentCommunity();
        Set<String> newRoomIds = new HashSet<>(community.roomIds());
        newRoomIds.add(room.id());
        communityRepository.save(community.withNewRooms(newRoomIds));
    }

    public void deleteFlatmate(Flatmate flatmate) {
        Community community = findCurrentCommunity();
        Set<String> newFlatmateIds = community.flatmateIds()
                .stream()
                .filter(id -> !id.equals(flatmate.id()))
                .collect(Collectors.toSet());
        communityRepository.save(community.withNewFlatmates(newFlatmateIds));
    }

    public void deleteRoom(Room room) {
        Community community = findCurrentCommunity();
        Set<String> newRoomIds = community.flatmateIds()
                .stream()
                .filter(id -> !id.equals(room.id()))
                .collect(Collectors.toSet());
        communityRepository.save(community.withNewRooms(newRoomIds));
    }
}
