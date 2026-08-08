# ADR-002: PostgreSQL as Source of Truth & Redis Cache Invalidation

## Status
Accepted

## Context
The platform requires fast response times for frequent athlete mobile check-ins while strictly guaranteeing data integrity, transaction boundaries, and state consistency.

## Decision
1. **PostgreSQL 16+** is the single source of truth for all persistent entities (users, profiles, assessments, programs, workouts, logs).
2. **Redis 7+** is strictly used as an auxiliary cache, rate limiter, and ephemeral state store. Redis is **never** authoritative.
3. Cache invalidation follows explicit domain write events (e.g., updating an assessment invalidates athlete summary caches).
4. The backend service is built with graceful degradation: if Redis is temporarily unreachable, cache lookups bypass Redis and query PostgreSQL directly without throwing fatal 500 errors to the athlete.

## Consequences
- **Positive**: Zero risk of data loss, transactional safety, resilient architecture.
- **Trade-off**: Requires careful cache key eviction management on domain mutations.
