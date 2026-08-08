# ADR-005: Feature Flagging & Safe Phased Rollout Boundary

## Status
Accepted

## Context
VERTEX has an extensive roadmap including AI Coach, Adaptive Programming, Computer Vision / Video Analysis, Coach Portal, Wearables, and Research Mode. Releasing unfinished or unvalidated features to athletes prematurely risks safety, user experience, and platform stability.

## Decision
1. A database-backed and environment-configurable **Feature Flag Registry** (`feature_flags` table + `FeatureFlagService`) controls access to experimental or future domains:
   - `AI_COACH`: AI question-answering and weekly reports.
   - `ADAPTIVE_PROGRAMMING`: Automatic weekly load and volume adjustments (dry-run mode by default).
   - `VIDEO_ANALYSIS`: Video upload, pose estimation, and jump kinematics.
   - `COACH_MODE`: Multi-athlete management and coach program overrides.
   - `SOCIAL`: Leaderboards and community interaction (disabled by default).
   - `WEARABLES`: HealthKit, Google Health Connect, and Garmin integration.
   - `RESEARCH_MODE`: De-identified participant cohort exports.
2. Unimplemented or flagged-off routes display `Coming soon` placeholders rather than broken pages or hidden errors.

## Consequences
- **Positive**: Strict production safety, modular codebase evolution, zero risk of premature feature exposure.
- **Trade-off**: Requires feature flag checks in UI components and backend route handlers.
