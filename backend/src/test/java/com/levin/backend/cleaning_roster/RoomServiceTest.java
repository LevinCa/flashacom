package com.levin.backend.cleaning_roster;

import com.levin.backend.cleaning_roster.model.ImageProperties;
import com.levin.backend.service.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class RoomServiceTest {

    private final RoomRepository roomRepository = mock(RoomRepository.class);
    private final IdService idService = mock(IdService.class);
    private final RoomService roomService = new RoomService(roomRepository, idService);

    private Room dummyRoom;


    @BeforeEach
    void setup() {
        dummyRoom = new Room(
                "123",
                "Small Bathroom",
                new ImageProperties(
                        0,
                        0,
                        0,
                        false,
                        false,
                        false),
                0,
                0,
                Collections.emptyList()
        );
    }

    @Test
    void findAllRooms_expectEmptyList_whenNoRoomsAreSaved() {
        //Given
        when(roomRepository.findAll())
                .thenReturn(Collections.emptyList());

        //When
        List<Room> actual = roomService.findAllRooms();

        //Then
        verify(roomRepository).findAll();
        assertThat(actual).isInstanceOf(List.class).isEmpty();
    }

    @Test
    void findAllRooms_expectListWithRoom_whenOneRoomIsSaved() {
        //Given
        when(roomRepository.findAll())
                .thenReturn(List.of(dummyRoom));

        //When
        List<Room> actual = roomService.findAllRooms();

        //Then
        verify(roomRepository).findAll();
        assertThat(actual).isInstanceOf(List.class).contains(dummyRoom);
    }

    @Test
    void saveNewRoom_expectRoomSavedWithNewId() {
        //Given
        when(idService.createId())
                .thenReturn("777");
        when(roomRepository.save(dummyRoom.withId("777")))
                .thenReturn(dummyRoom.withId("777"));

        //When
        Room actual = roomService.saveNewRoom(dummyRoom);

        //Then
        verify(idService).createId();
        verify(roomRepository).save(dummyRoom.withId("777"));
        assertThat(actual).isEqualTo(dummyRoom.withId("777")).isNotEqualTo(dummyRoom);
    }

    @Test
    void editAssignments_expectRoomWithEditedAssignments_whenRoomExists() {
        //Given
        List<String> assignments = List.of("1");
        Room expected = dummyRoom.withAssignments(assignments);
        when(roomRepository.findById(dummyRoom.id()))
                .thenReturn(Optional.of(dummyRoom));
        when(roomRepository.save(dummyRoom.withAssignments(assignments)))
                .thenReturn(dummyRoom.withAssignments(assignments));

        //When
        Room actual = roomService.editAssignments(dummyRoom.id(), assignments);

        //Then
        verify(roomRepository).findById(dummyRoom.id());
        verify(roomRepository).save(dummyRoom.withAssignments(assignments));
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void editAssignments_expectNoSuchElementException_whenRoomDoesntExists() {
        //Given
        List<String> assignments = List.of("1");
        String nonExistentId = "does not exist";
        when(roomRepository.findById(nonExistentId))
                .thenReturn(Optional.empty());

        //When
        Throwable actual = catchThrowable(() -> roomService.editAssignments(dummyRoom.id(), assignments));

        //Then
        verify(roomRepository).findById(dummyRoom.id());
        assertThat(actual).isInstanceOf(NoSuchElementException.class);
    }
}