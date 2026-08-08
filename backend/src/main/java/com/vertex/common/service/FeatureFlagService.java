package com.vertex.common.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class FeatureFlagService {

    private final Map<String, Boolean> localFlagOverrides = new ConcurrentHashMap<>();

    @Value("${vertex.feature-flags.ai-coach:false}")
    private boolean aiCoachDefault;

    @Value("${vertex.feature-flags.adaptive-programming:false}")
    private boolean adaptiveProgrammingDefault;

    @Value("${vertex.feature-flags.video-analysis:false}")
    private boolean videoAnalysisDefault;

    @Value("${vertex.feature-flags.coach-mode:false}")
    private boolean coachModeDefault;

    @Value("${vertex.feature-flags.social:false}")
    private boolean socialDefault;

    @Value("${vertex.feature-flags.wearables:false}")
    private boolean wearablesDefault;

    @Value("${vertex.feature-flags.research-mode:false}")
    private boolean researchModeDefault;

    public boolean isEnabled(String flagKey) {
        if (localFlagOverrides.containsKey(flagKey)) {
            return localFlagOverrides.get(flagKey);
        }

        return switch (flagKey) {
            case "AI_COACH" -> aiCoachDefault;
            case "ADAPTIVE_PROGRAMMING" -> adaptiveProgrammingDefault;
            case "VIDEO_ANALYSIS" -> videoAnalysisDefault;
            case "COACH_MODE" -> coachModeDefault;
            case "SOCIAL" -> socialDefault;
            case "WEARABLES" -> wearablesDefault;
            case "RESEARCH_MODE" -> researchModeDefault;
            default -> false;
        };
    }

    public void setOverride(String flagKey, boolean enabled) {
        log.info("Setting runtime feature flag override: {} = {}", flagKey, enabled);
        localFlagOverrides.put(flagKey, enabled);
    }
}
