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
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.Month;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
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
    private String jsonWithoutId;

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
        jsonWithoutId = """
                        {
                        "firstName":"Levin",
                        "lastName":"Cagatay",
                        "photoUrl":"",
                        "dateOfBirth": "1995-07-07",
                        "eatingHabits":{
                            "vegetarian":false,
                            "vegan":false,
                            "likes":["Sucuk", "Pizza"],
                            "dislikes":["Banana"],
                            "allergies":[]
                        },
                        "contact":{
                            "eMail":"levin.cagatay@gmx.de",
                            "phone":"12345678",
                            "payPal": "paypal.me/levincagatay"
                        },
                        "availability":"AT_HOME"
                        }
                """;
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

    @Test
    @DirtiesContext
    void postFlatmate_expectFlatmateWithRandomId_whenFlatmateIsAdded() throws Exception {
        String response = mockMvc.perform(post("/api/flatmate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonDummyFlatmate))
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonWithoutId))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Flatmate actual = mapper.readValue(response, Flatmate.class);
        Flatmate expected = new Flatmate(
                actual.id(),
                dummyFlatmate.firstName(),
                dummyFlatmate.lastName(),
                dummyFlatmate.photoUrl(),
                dummyFlatmate.dateOfBirth(),
                dummyFlatmate.eatingHabits(),
                dummyFlatmate.contact(),
                dummyFlatmate.availability()
        );

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DirtiesContext
    void getFlatmateById_expectFlatmateWithId_whenFlatmateWithIdExists() throws Exception {
        String flatmateJson = mockMvc.perform(post("/api/flatmate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonDummyFlatmate))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Flatmate expected = mapper.readValue(flatmateJson, Flatmate.class);

        mockMvc.perform(get("/api/flatmate/" + expected.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonWithoutId))
                .andExpect(jsonPath("$.id").value(expected.id()));
    }
}