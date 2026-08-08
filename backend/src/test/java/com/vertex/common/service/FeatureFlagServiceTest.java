package com.vertex.common.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class FeatureFlagServiceTest {

    @Test
    void shouldDefaultDangerousFlagsToFalse() {
        FeatureFlagService service = new FeatureFlagService();
        assertFalse(service.isEnabled("AI_COACH"));
        assertFalse(service.isEnabled("ADAPTIVE_PROGRAMMING"));
        assertFalse(service.isEnabled("VIDEO_ANALYSIS"));
        assertFalse(service.isEnabled("COACH_MODE"));
        assertFalse(service.isEnabled("NON_EXISTENT_FLAG"));
    }

    @Test
    void shouldSupportRuntimeOverrides() {
        FeatureFlagService service = new FeatureFlagService();
        assertFalse(service.isEnabled("AI_COACH"));

        service.setOverride("AI_COACH", true);
        assertTrue(service.isEnabled("AI_COACH"));

        service.setOverride("AI_COACH", false);
        assertFalse(service.isEnabled("AI_COACH"));
    }
}
