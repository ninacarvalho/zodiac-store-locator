package com.zodiac.storelocator.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zodiac.storelocator.data.dto.StoreDto;
import com.zodiac.storelocator.exception.StoreNotFoundException;
import com.zodiac.storelocator.service.StoreService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = StoreController.class,
        excludeAutoConfiguration = {
                org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
                org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration.class
        }
)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class StoreControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StoreService storeService;

    private StoreDto dto;

    @BeforeEach
    void setup() {
        dto = StoreDto.builder()
                .id(1L)
                .name("Target")
                .rating(4)
                .description("Desc")
                .latitude(43.7)
                .longitude(-79.3)
                .imageUrl("img.jpg")
                .build();
    }

    @Test
    void getStore_shouldReturnDto() throws Exception {
        when(storeService.getStore(1L)).thenReturn(dto);

        mockMvc.perform(get("/stores/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Target"));
    }

    @Test
    void getAllStores_shouldReturnList() throws Exception {
        when(storeService.findAllStores()).thenReturn(List.of(dto));

        mockMvc.perform(get("/stores"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void createStore_shouldReturnCreatedDto() throws Exception {
        when(storeService.createStore(any())).thenReturn(dto);

        mockMvc.perform(post("/stores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void patchStore_shouldReturnUpdatedDto() throws Exception {
        StoreDto patch = StoreDto.builder().description("Updated").build();
        when(storeService.updateStorePartial(eq(1L), any())).thenReturn(dto);

        mockMvc.perform(patch("/stores/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(patch)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void deleteStore_shouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/stores/1"))
                .andExpect(status().isNoContent());

        verify(storeService).deleteStore(1L);
    }

    @Test
    void getStore_shouldReturn404WhenNotFound() throws Exception {
        when(storeService.getStore(999L)).thenThrow(new StoreNotFoundException(999L));

        mockMvc.perform(get("/stores/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.error").value("Not Found"))
                .andExpect(jsonPath("$.message").value("Store with ID 999 not found."));
    }

    @Test
    void createStore_shouldReturn500OnUnexpectedError() throws Exception {
        when(storeService.createStore(any())).thenThrow(new RuntimeException("Boom"));

        mockMvc.perform(post("/stores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(dto)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.status").value(500))
                .andExpect(jsonPath("$.error").value("Internal Server Error"))
                .andExpect(jsonPath("$.message").value("Boom"));
    }

    @TestConfiguration
    static class MockConfig {
        @Bean
        @Primary
        StoreService mockStoreService() {
            return mock(StoreService.class);
        }
    }
}