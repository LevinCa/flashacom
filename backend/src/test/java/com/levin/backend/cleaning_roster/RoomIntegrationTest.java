package com.levin.backend.cleaning_roster;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levin.backend.cleaning_roster.model.ImageProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
class RoomIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;

    private Room dummyRoom;
    private String jsonRoom;
    private String jsonRoomWithoutId;

    @BeforeEach
    void setup() throws JsonProcessingException {
        dummyRoom = new Room(
                "1",
                "dummy",
                new ImageProperties(1, 1, 1, false, false, false),
                0,
                0,
                Collections.emptyMap()
        );
        jsonRoom = mapper.writeValueAsString(dummyRoom);
        jsonRoomWithoutId = """
                {
                "name":"dummy",
                "imageProperties":{
                    "index":1,
                    "hue":1,
                    "brightness":1,
                    "isInverted":false,
                    "isBlackAndWhite":false,
                    "isOverSaturated":false
                },
                "rowSpan":0,
                "columnSpan":0,
                "assignments":{}
                }
                """;
    }

    @Test
    void getAllRooms_expectEmptyList_WhenNoRoomAdded() throws Exception {
        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllRooms_expectListWithOneItem_WhenOneRoomAdded() throws Exception {
        mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRoom));

        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonRoomWithoutId + "]"));
    }

    @Test
    @DirtiesContext
    void postRoom_expectAddedRoom_WhenRoomIsAdded() throws Exception {
        String response = mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRoom))
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonRoomWithoutId))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Room actual = mapper.readValue(response, Room.class);
        Room expected = dummyRoom.withId(actual.id());

        assertThat(actual).isEqualTo(expected);
    }
}