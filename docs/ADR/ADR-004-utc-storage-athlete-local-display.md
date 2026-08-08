# ADR-004: UTC Storage & Athlete-Local Display Formatting

## Status
Accepted

## Context
Athletes train globally across diverse time zones. Daily training schedules, workout completions, recovery check-ins, and rest windows are sensitive to local circadian rhythms and basketball game schedules.

## Decision
1. All timestamp columns in the database are stored in UTC using standard ISO 8601 representation.
2. The athlete's preferred timezone (e.g. `America/New_York`, `Asia/Kolkata`, `Europe/London`) is captured during onboarding and stored in the athlete profile.
3. API endpoints accept and return UTC timestamps.
4. The frontend presentation layer formats timestamps and daily calendars according to the athlete's configured timezone.

## Consequences
- **Positive**: Consistent internationalized scheduling, daylight savings resilience, unambiguous log timestamps.
- **Trade-off**: Requires timezone conversion logic in the client and daily schedule boundary calculations.
