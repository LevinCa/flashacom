package com.levin.backend.flatmate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levin.backend.flatmate.model.Availability;
import com.levin.backend.flatmate.model.Contact;
import com.levin.backend.flatmate.model.EatingHabits;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.Month;
import java.util.Collections;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FlatmateIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private FlatmateRepository flatmateRepository;
    @Autowired
    private ObjectMapper mapper;
    private Flatmate dummyFlatmate;
    private String jsonDummyFlatmate;

    @BeforeEach
    void setup() throws JsonProcessingException {
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
        jsonDummyFlatmate = mapper.writeValueAsString(dummyFlatmate);
    }

    @Test
    void getAllFlatmates_expectEmptyList() throws Exception {
        mockMvc.perform(get("/api/flatmate"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllFlatmates_expectListWithDummyFlatmate() throws Exception {
        flatmateRepository.save(dummyFlatmate);
        mockMvc.perform(get("/api/flatmate"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonDummyFlatmate + "]"));
    }
}