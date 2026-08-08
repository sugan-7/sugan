package com.vertex.health;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class HealthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldReturnReadinessStatusWithCorrelationHeader() throws Exception {
        mockMvc.perform(get("/api/v1/health/ready")
                        .header("X-Correlation-Id", "test-corr-12345")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(header().string("X-Correlation-Id", "test-corr-12345"))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.service").value("vertex-backend"))
                .andExpect(jsonPath("$.data.status").value("UP"));
    }
}
