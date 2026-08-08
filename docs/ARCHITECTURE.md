# VERTEX - System Architecture & Technical Specification

Version: 2.1 (Phase 0 & 1 Baseline)

---

## 1. System Overview & Vision

VERTEX is a production-grade, AI-assisted basketball athlete-performance platform built around the continuous, evidence-informed closed loop:

```
ASSESS -> ANALYZE -> PLAN -> TRAIN -> MEASURE -> RECOVER -> LEARN -> ADAPT -> IMPROVE
```

### Core Outcomes
- **Vertical Jump Performance**: Standing vertical, approach vertical, approach advantage, one-foot and two-foot mechanics.
- **Athletic Performance**: Lower-body maximal & explosive strength, reactive strength index (RSI), acceleration, change of direction, and movement preparation.
- **Explainable & Safe Adaptation**: Structured training prescriptions derived exclusively from the deterministic training engine, accompanied by explainable AI summaries constrained by research principles and safety boundaries.

---

## 2. Invariant Architecture Principles

1. **Deterministic Training Engine Authority**:
   - The Java/Spring Boot training engine and curated exercise database are the single authority for structured programming.
   - Large Language Models (LLMs) **never** generate, invent, or mutate workouts independently. AI is strictly constrained to explaining structured engine outputs, summarizing trends, and providing educational context.
2. **Data Integrity & Provenance**:
   - Data beats assumptions. Never fabricate measurements, progress statistics, personal records, research citations, or AI conclusions.
   - Missing data must always be represented truthfully as `Insufficient data`. Unimplemented or future features must be labelled `Coming soon`.
3. **Safety & Medical Disclaimers**:
   - VERTEX is not a medical device. The AI coach is not a physician or physical therapist.
   - The platform never diagnoses injuries, prescribes treatments, or claims guaranteed outcomes (e.g., "guaranteed 6-inch vertical increase" or "dunk guarantee").
4. **PostgreSQL as Single Source of Truth**:
   - PostgreSQL is the authoritative datastore.
   - Redis is strictly utilized for caching, rate limiting, temporary session state, and expensive analytics rollups. The system must remain resilient if Redis is temporarily unreachable.
5. **Timezone Storage & Localization**:
   - All timestamps are stored internally in UTC (`TIMESTAMPTZ`).
   - All presentation layers format timestamps in the athlete's configured local timezone.

---

## 3. High-Level System Context Diagram

```
+-----------------------------------------------------------------------------------------+
|                                    ATHLETE / COACH / ADMIN                              |
|                         (Mobile Browser, Tablet, Desktop Web Viewport)                  |
+-----------------------------------------------------------------------------------------+
                                             |
                                    HTTPS / WSS / REST
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                             NEXT.JS 15+ FRONTEND APPLICATION                             |
|  - Server-Rendered Public & Marketing Pages (SEO Optimized)                              |
|  - Athlete Dashboard, Jump Lab, Mobile Workout Player, Recovery & Analytics Shells       |
|  - Typed API Client with JWT Bearer Token & Correlation ID Tracking                      |
+-----------------------------------------------------------------------------------------+
                                             |
                                     REST API (/api/v1)
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                           SPRING BOOT 3.4+ BACKEND SERVICE                              |
|  - Security & JWT Auth Filter with Refresh Token Rotation                                |
|  - CorrelationIdFilter, RateLimitFilter, GlobalExceptionHandler                          |
|  - Deterministic Training Engine & Rules Classifier                                     |
|  - AIService Abstraction (OpenAIProvider / GeminiProvider / Safe Fallback)              |
+-----------------------------------------------------------------------------------------+
           |                                   |                              |
           v                                   v                              v
+-----------------------+           +--------------------+         +----------------------+
|   POSTGRESQL 16+ DB   |           |    REDIS 7+ CACHE  |         | EXTERNAL AI PROVIDER |
| (Authoritative Store, |           | (Rate Limits, TTL  |         | (OpenAI / Gemini API |
|  Flyway Migrations)   |           |  Caches, Sessions) |         |  Constrained Context)|
+-----------------------+           +--------------------+         +----------------------+
```

---

## 4. Domain & Package Taxonomy

The backend service is partitioned into explicit domain boundaries under `com.vertex`:

| Package | Responsibility |
| :--- | :--- |
| `com.vertex.common` | Shared DTOs (`ApiResponse`, `ApiError`), correlation filter, security config, global exception handling, feature flags. |
| `com.vertex.auth` | Authentication, registration, JWT token generation, refresh token rotation, password hashing. |
| `com.vertex.user` | User entity management, roles (`ROLE_ATHLETE`, `ROLE_COACH`, `ROLE_ADMIN`), user preferences. |
| `com.vertex.athlete` | Athlete profile, physical measurements, basketball background, training preferences, equipment inventory. |
| `com.vertex.assessment`| Assessment ingestion, movement screening, safety questionnaire, contraindication flags. |
| `com.vertex.jump` | Jump Lab manual measurements, standing reach, touch heights, standing/approach vertical, approach advantage. |
| `com.vertex.exercise` | Curated exercise database, movement qualities, equipment requirements, progressions/regressions, evidence links. |
| `com.vertex.training` | Deterministic classification engine, priority rules, volume/intensity logic, phase assignment. |
| `com.vertex.program` | Multi-week program generator (4, 6, 8, 12 weeks), weekly plans, workout definitions. |
| `com.vertex.workout` | Daily workout execution, warm-ups, set-by-set completion, rest timers, offline draft recovery. |
| `com.vertex.performance`| Set logs, load/reps tracking, personal records calculation, exercise historical performance. |
| `com.vertex.recovery` | Daily check-in (sleep, soreness, fatigue, stress, session RPE), platform-derived readiness indicator. |
| `com.vertex.analytics` | Vertical progression over time, goal gap, training consistency, workload rollups. |
| `com.vertex.ai` | `AIService` abstraction, context assembler, prompt safety sanitization, token budget, weekly report generation. |
| `com.vertex.coach` | Coach dashboard, athlete assignment, program overrides (feature-flagged `COACH_MODE`). |
| `com.vertex.admin` | Exercise library management, training rule parameters, audit log inspection. |
| `com.vertex.audit` | Audit log recording for authentication, assessment updates, program generation, and data deletion. |
| `com.vertex.notification`| Athlete notification preferences and event dispatcher. |

---

## 5. Security, Privacy & Compliance Architecture

### Authentication & Tokens
- **Access Tokens**: Short-lived JWTs (15-minute expiration) signed with HMAC-SHA256 or RSA. Contains athlete ID, username, and assigned roles.
- **Refresh Tokens**: Long-lived (7-day expiration), securely hashed in PostgreSQL, rotated upon every refresh request. Immediate revocation on logout.

### Privacy & Data Minimization
- Athlete measurements, performance logs, and recovery notes are classified as sensitive personal data.
- Never transmit passwords, refresh tokens, or unnecessary PII to external AI providers.
- Video analysis is private-by-default with pre-signed ephemeral URLs (feature-flagged `VIDEO_ANALYSIS`).

### Audit Logging
The `audit_logs` table records actor, timestamp (UTC), IP address, action (`LOGIN`, `ASSESSMENT_UPDATE`, `PROGRAM_GENERATE`, `COACH_OVERRIDE`, `ACCOUNT_DELETE`), and entity references for compliance and security forensics.
