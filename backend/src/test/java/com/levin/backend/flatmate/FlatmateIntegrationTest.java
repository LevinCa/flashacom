package com.levin.backend.flatmate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levin.backend.community.Community;
import com.levin.backend.community.CommunityRepository;
import com.levin.backend.flatmate.model.Availability;
import com.levin.backend.flatmate.model.Contact;
import com.levin.backend.flatmate.model.EatingHabits;
import com.levin.backend.security.MongoUser;
import com.levin.backend.security.MongoUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.Month;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
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
    @Autowired
    private MongoUserRepository userRepository;
    @Autowired
    private CommunityRepository communityRepository;
    private Flatmate dummyFlatmate;
    private String jsonDummyFlatmate;
    private String jsonWithoutId;

    @BeforeEach
    void setup() throws JsonProcessingException {
        communityRepository.save(new Community("123", "Test", "", Set.of("1"), Collections.emptySet()));
        userRepository.save(new MongoUser("1", "Levin", "Levin1", "", "123"));
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
    @WithMockUser(username = "Levin", password = "Levin1")
    void getAllFlatmates_expectEmptyList() throws Exception {
        mockMvc.perform(get("/api/flatmate"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void getAllFlatmates_expectListWithDummyFlatmate() throws Exception {
        flatmateRepository.save(dummyFlatmate);
        mockMvc.perform(get("/api/flatmate"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonDummyFlatmate + "]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void postFlatmate_expectFlatmateWithRandomId_whenFlatmateIsAdded() throws Exception {
        String response = mockMvc.perform(post("/api/flatmate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonDummyFlatmate)
                        .with(csrf()))
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
    @WithMockUser(username = "Levin", password = "Levin1")
    void getFlatmateById_expectFlatmateWithId_whenFlatmateWithIdExists() throws Exception {
        String flatmateJson = mockMvc.perform(post("/api/flatmate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonDummyFlatmate)
                        .with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Flatmate expected = mapper.readValue(flatmateJson, Flatmate.class);

        mockMvc.perform(get("/api/flatmate/" + expected.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonWithoutId))
                .andExpect(jsonPath("$.id").value(expected.id()));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void putFlatmate_expectUpdateFlatmate_whenFlatmateAlreadyExists() throws Exception {
        String jsonResponse = mockMvc.perform(post("/api/flatmate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonDummyFlatmate)
                        .with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Flatmate response = mapper.readValue(jsonResponse, Flatmate.class);
        Flatmate expected = new Flatmate(
                response.id(),
                "New First Name",
                response.lastName(),
                response.photoUrl(),
                response.dateOfBirth(),
                response.eatingHabits(),
                response.contact(),
                response.availability()
        );
        String jsonExpected = mapper.writeValueAsString(expected);

        String jsonActual = mockMvc.perform(put("/api/flatmate/" + expected.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonExpected)
                        .with(csrf()))
                .andExpect(status().isAccepted())
                .andExpect(content().json(jsonExpected))
                .andReturn()
                .getResponse()
                .getContentAsString();
        Flatmate actual = mapper.readValue(jsonActual, Flatmate.class);

        assertThat(actual).isEqualTo(expected).isNotEqualTo(dummyFlatmate);
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void putFlatmate_expectCreateFlatmate_whenFlatmateDoesntExists() throws Exception {
        String jsonActual = mockMvc.perform(put("/api/flatmate/" + dummyFlatmate.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonDummyFlatmate)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonWithoutId))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();
        Flatmate actual = mapper.readValue(jsonActual, Flatmate.class);
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

        assertThat(actual).isEqualTo(expected).isNotEqualTo(dummyFlatmate);
    }


    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void deleteFlatmate_expectDeleted_whenFlatmateExists() throws Exception {
        String response = mockMvc.perform(post("/api/flatmate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonDummyFlatmate)
                        .with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Flatmate toDelete = mapper.readValue(response, Flatmate.class);

        mockMvc.perform(delete("/api/flatmate/" + toDelete.id()).with(csrf()))
                .andExpect(status().isNoContent());
    }


    @Test
    @WithMockUser(username = "Levin", password = "Levin1")
    void deleteFlatmate_expectNoSuchElementException_whenFlatmateDoesntExist() {
        Throwable actual = catchThrowable(() -> mockMvc.perform(delete("/api/flatmate/" + "Non Existent ID").with(csrf()))
                .andExpect(status().isNotFound()));

        assertThat(actual.getCause()).isInstanceOf(NoSuchElementException.class);
    }
}