package com.levin.backend.flatmate;

import com.levin.backend.community.Community;
import com.levin.backend.community.CommunityService;
import com.levin.backend.flatmate.model.Availability;
import com.levin.backend.flatmate.model.Contact;
import com.levin.backend.flatmate.model.EatingHabits;
import com.levin.backend.service.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.Month;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class FlatmateServiceTest {

    private final FlatmateRepository flatmateRepository = mock(FlatmateRepository.class);
    private final IdService idService = mock(IdService.class);
    private final CommunityService communityService = mock(CommunityService.class);
    private final FlatmateService flatmateService = new FlatmateService(flatmateRepository, idService, communityService);

    private Flatmate dummyFlatmate;
    private Community dummyCommunity;


    @BeforeEach
    void setup() {
        dummyFlatmate = new Flatmate(
                "1",
                "Levin",
                "Cagatay",
                "",
                LocalDate.of(1995, Month.JULY, 7),
                new EatingHabits(false, false, List.of("Sucuk", "Pizza"), List.of("Banana"), Collections.emptyList()),
                new Contact("levin.cagatay@gmx.de", "12345678", "paypal.me/levincagatay"),
                Availability.AT_HOME
        );
        dummyCommunity = new Community(
                "1",
                "Test",
                "",
                Collections.emptySet(),
                Collections.emptySet()
        );
    }


    @Test
    void findAllFlatmates_expectedEmptyList_WhenRepositoryIsEmpty() {
        //Given
        when(communityService.findCurrentCommunity())
                .thenReturn(dummyCommunity);
        when(flatmateRepository.findAllById(dummyCommunity.flatmateIds()))
                .thenReturn(Collections.emptyList());

        //When
        List<Flatmate> actual = flatmateService.findAllFlatmates();

        //Then
        verify(communityService).findCurrentCommunity();
        verify(flatmateRepository).findAllById(Collections.emptySet());
        assertThat(actual).isInstanceOf(List.class).isEmpty();
    }

    @Test
    void findAllFlatmates_expectedListWithOneEntry_WhenRepositoryContainsOneElement() {
        //Given
        when(communityService.findCurrentCommunity())
                .thenReturn(dummyCommunity.withNewFlatmates(Set.of(dummyFlatmate.id())));
        when(flatmateRepository.findAllById(Set.of(dummyFlatmate.id())))
                .thenReturn(List.of(dummyFlatmate));

        //When
        List<Flatmate> actual = flatmateService.findAllFlatmates();

        //Then
        verify(communityService).findCurrentCommunity();
        verify(flatmateRepository).findAllById(Set.of("1"));
        assertThat(actual).isInstanceOf(List.class).containsExactly(dummyFlatmate);
    }

    @Test
    void saveFlatmate_expectNewFlatmate_WhenFlatmateIsAdded() {
        //Given
        when(idService.createId())
                .thenReturn("1");
        when(flatmateRepository.save(dummyFlatmate))
                .thenReturn(dummyFlatmate);

        //When
        Flatmate actual = flatmateService.saveFlatmate(dummyFlatmate);

        //Then
        verify(idService).createId();
        verify(flatmateRepository).save(dummyFlatmate);
        assertThat(actual).isEqualTo(dummyFlatmate);
    }

    @Test
    void findFlatmateById_expectFlatmateWithId_whenFlatmateExists() {
        //Given
        when(flatmateRepository.findById(dummyFlatmate.id()))
                .thenReturn(Optional.ofNullable(dummyFlatmate));

        //When
        Flatmate actual = flatmateService.findFlatmateById(dummyFlatmate.id());

        //Then
        verify(flatmateRepository).findById(dummyFlatmate.id());
        assertThat(actual).isEqualTo(dummyFlatmate);
    }

    @Test
    void findFlatmateById_expectThrowsNoSuchElementException_whenFlatmateDoesntExists() {
        //Given
        String nonExistentId = "123456abcdef";
        when(flatmateRepository.findById(nonExistentId))
                .thenReturn(Optional.empty());

        //When
        Throwable actual = catchThrowable(() -> flatmateService.findFlatmateById(nonExistentId));

        //Then
        verify(flatmateRepository).findById(nonExistentId);
        assertThat(actual).isInstanceOf(NoSuchElementException.class).hasMessageContaining(nonExistentId);
    }

    @Test
    void updateFlatmate_expectUpdatedFlatmate_whenFlatmateExists() {
        //Given
        when(flatmateRepository.save(dummyFlatmate))
                .thenReturn(dummyFlatmate);

        //When
        Flatmate actual = flatmateService.updateFlatmate(dummyFlatmate);

        //Then
        verify(flatmateRepository).save(dummyFlatmate);
        assertThat(actual).isEqualTo(dummyFlatmate);
    }

    @Test
    void deleteFlatmate_expectNoSuchElementException_whenFlatmateDoesntExist() {
        //Given
        String nonExistentId = "Non Existent ID";
        when(flatmateRepository.findById(nonExistentId))
                .thenReturn(Optional.empty());

        //When
        Throwable actual = catchThrowable(() -> flatmateService.deleteFlatmate(nonExistentId));

        //Then
        verify(flatmateRepository).findById(nonExistentId);
        assertThat(actual).isInstanceOf(NoSuchElementException.class);
    }
}