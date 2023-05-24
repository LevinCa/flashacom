package com.levin.backend.security;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.logout;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserIntegrationTest {


    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;

    private MongoUser dummyUser;
    private String jsonUser;
    private String jsonUserWithoutIdAndPassword;

    @BeforeEach
    void setup() throws JsonProcessingException {
        dummyUser = new MongoUser(
                "1",
                "Levin",
                "Levin1",
                "1",
                "123"
        );
        jsonUser = mapper.writeValueAsString(dummyUser);
        jsonUserWithoutIdAndPassword = """
                {
                    "username": "Levin",
                    "flatmateId": "1",
                    "communityId": "123"
                }
                """;
    }


    @Test
    void getMe_expectedAnonymousUser_whenNoUserLoggedIn() throws Exception {
        mockMvc.perform(get("/api/user/me"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                                {
                                                "username": "anonymousUser"
                                                }
                                                """));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void getMe_expectedLoggedInUser_whenUserIsLoggedIn() throws Exception {
        String response = mockMvc.perform(post("/api/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser)
                .with(csrf()))
                .andReturn()
                .getResponse()
                .getContentAsString();

        MongoUserDTO expected = mapper.readValue(response, MongoUserDTO.class);

        mockMvc.perform(post("/api/user").with(csrf()));

        String response2 = mockMvc.perform(get("/api/user/me"))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonUserWithoutIdAndPassword))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        MongoUserDTO actual = mapper.readValue(response2, MongoUserDTO.class);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void loginUser_expectedMongoUserDTO_whenUserExists() throws Exception {
        mockMvc.perform(post("/api/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser)
                .with(csrf()));

        mockMvc.perform(post("/api/user").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonUserWithoutIdAndPassword));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "Levin", password = "Levin1")
    void logout_expectUserLoggedOut() throws Exception {
        mockMvc.perform(post("/api/user/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonUser)
                        .with(csrf()));

        mockMvc.perform(post("/api/user")
                .with(csrf()));

        mockMvc.perform(get("/api/user/me"))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonUserWithoutIdAndPassword))
                .andExpect(jsonPath("$.id").isNotEmpty());

        mockMvc.perform(logout("/api/user/logout"));

        mockMvc.perform(get("/api/user/me"))
                .andExpect(content().json("""
                                                        {
                                                            "username": "anonymousUser"
                                                        }
                                                    """));
    }

    @Test
    @DirtiesContext
    void signUp_expectNewUser() throws Exception {
        String response = mockMvc.perform(post("/api/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonUser)
                .with(csrf()))
                .andExpect(status().isCreated())
                .andExpect(content().json(jsonUserWithoutIdAndPassword))
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        MongoUserDTO actual = mapper.readValue(response, MongoUser.class).withoutPassword();
        MongoUserDTO expected = dummyUser.withId(actual.id()).withoutPassword();

        assertThat(actual).isEqualTo(expected);
    }
}