package com.levin.backend.cleaning_roster;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levin.backend.cleaning_roster.model.ImageProperties;
import com.levin.backend.community.Community;
import com.levin.backend.community.CommunityRepository;
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

import static org.assertj.core.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class RoomIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private MongoUserRepository userRepository;
    @Autowired
    CommunityRepository communityRepository;

    private Room dummyRoom;
    private String jsonRoom;
    private String jsonRoomWithoutId;

    @BeforeEach
    void setup() throws JsonProcessingException {
        communityRepository.save(new Community("123", "Test", "", Collections.emptySet(), Collections.emptySet()));
        userRepository.save(new MongoUser("1", "Levin", "Levin1", "", "123"));
        dummyRoom = new Room(
                "1",
                "dummy",
                new ImageProperties(1, 1, 1, false, false, false),
                0,
                0,
                Collections.emptyList()
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
                "assignments":[]
                }
                """;
    }

    @Test
    @WithMockUser(username = "Levin", password = "Levin1")
    void getAllRooms_expectEmptyList_WhenNoRoomAdded() throws Exception {
        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void getAllRooms_expectListWithOneItem_WhenOneRoomAdded() throws Exception {
        mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRoom).with(csrf()));

        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + jsonRoomWithoutId + "]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void postRoom_expectAddedRoom_WhenRoomIsAdded() throws Exception {
        String response = mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRoom)
                        .with(csrf()))
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

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void putRoomAssignments_expectRoomWithAssignments() throws Exception {
        String postResponse = mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRoom)
                        .with(csrf()))
                .andReturn().getResponse().getContentAsString();
        Room before = mapper.readValue(postResponse, Room.class);
        Room after = before.withAssignments(List.of("1"));
        String jsonAfter = mapper.writeValueAsString(after);

        mockMvc.perform(put("/api/room/".concat(before.id()))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(List.of("1")))
                        .with(csrf()))
                .andExpect(status().isAccepted())
                .andExpect(content().json(jsonAfter));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void deleteRoom_expectDeleted_whenRoomExists() throws Exception {
        String response = mockMvc.perform(post("/api/room")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRoom).with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();

        Room savedRoom = mapper.readValue(response, Room.class);

        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + response + "]"));

        mockMvc.perform(delete("/api/room/" + savedRoom.id()).with(csrf()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/room"))
                .andExpect(content().json("[]"));
    }
}