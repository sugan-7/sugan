package com.vertex;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class VertexApplicationTests {

    @Test
    void contextLoads() {
        // Verifies Spring application context initializes cleanly with test profile
    }
}
