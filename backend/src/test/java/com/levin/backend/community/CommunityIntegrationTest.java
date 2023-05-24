package com.levin.backend.community;

import org.junit.jupiter.api.Test;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
class CommunityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;
    private Community dummyCommunity;
    private String jsonCommunity;
    private String jsonCommunityWithoutId;

    @BeforeEach
    void setup() throws JsonProcessingException {
        dummyCommunity = new Community(
                "123",
                "Test",
                "",
                Collections.emptySet(),
                Collections.emptySet());
        jsonCommunity = mapper.writeValueAsString(dummyCommunity);
        jsonCommunityWithoutId = """
                {
                "name": "Test",
                "logoUrl": "",
                "roomIds": [],
                "flatmateIds": []
                }
                """;
    }


    @Test
    void getAllCommunities_expectEmptyList_whenNoCommunitiesAreSaved() throws Exception {
        mockMvc.perform(get("/api/community"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllCommunities_expectListWithOneCommunity_whenOneCommunitiesIsSaved() throws Exception {
        String response = mockMvc.perform(post("/api/community")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonCommunity)
                        .with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();

        mockMvc.perform(get("/api/community"))
                .andExpect(status().isOk())
                .andExpect(content().json("[" + response + "]"));
    }

    @Test
    @DirtiesContext
    void postCommunity_expectAddedCommunity() throws Exception {
        String response = mockMvc.perform(post("/api/community")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonCommunity)
                        .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonCommunityWithoutId))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Community actual = mapper.readValue(response, Community.class);
        Community expected = dummyCommunity.withId(actual.id());

        assertThat(actual).isEqualTo(expected);

        mockMvc.perform(get("/api/community"))
                .andExpect(content().json("[" + response + "]"));
    }
}