package com.levin.backend.flatmate;

import com.levin.backend.flatmate.model.Availability;
import com.levin.backend.flatmate.model.Contact;
import com.levin.backend.flatmate.model.EatingHabits;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.Month;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class FlatmateServiceTest {

    private final FlatmateRepository flatmateRepository = mock(FlatmateRepository.class);
    private final FlatmateService flatmateService = new FlatmateService(flatmateRepository);

    private Flatmate dummyFlatmate;


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
    }


    @Test
    void findAllFlatmates_expectedEmptyList_WhenRepositoryIsEmpty() {
        //Given
        when(flatmateRepository.findAll())
                .thenReturn(Collections.emptyList());

        //When
        List<Flatmate> actual = flatmateService.findAllFlatmates();

        //Then
        assertThat(actual).isInstanceOf(List.class).isEmpty();
    }

    @Test
    void findAllFlatmates_expectedListWithOneEntry_WhenRepositoryContainsOneElement() {
        //Given
        when(flatmateRepository.findAll())
                .thenReturn(List.of(dummyFlatmate));

        //When
        List<Flatmate> actual = flatmateService.findAllFlatmates();

        //Then
        assertThat(actual).isInstanceOf(List.class).containsExactly(dummyFlatmate);
    }
}