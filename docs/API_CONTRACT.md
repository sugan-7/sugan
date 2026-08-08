# VERTEX - API Contract & OpenAPI Specification

Version: 2.1 (Phase 0 & 1 Baseline)

---

## 1. API Conventions

- **Version Prefix**: All domain endpoints are strictly versioned under `/api/v1`.
- **Response Format**: `application/json;charset=UTF-8`.
- **Correlation ID**: Every HTTP request propagates an `X-Correlation-Id` header (generated if absent) returned in all response headers and embedded in error envelopes.
- **Timestamp Standard**: ISO 8601 UTC format (`YYYY-MM-DD'T'HH:mm:ss.SSS'Z'`).

---

## 2. Standardized Envelope Contracts

### Successful Response Envelope (`ApiResponse<T>`)
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "correlationId": "c8b4e721-3a91-4c6e-82d3-982741982abc",
  "timestamp": "2026-08-08T10:15:30.123Z"
}
```

### Standardized Error Envelope (`ApiError`)
```json
{
  "success": false,
  "status": 400,
  "error": "VALIDATION_FAILED",
  "message": "Validation failed for one or more fields",
  "correlationId": "c8b4e721-3a91-4c6e-82d3-982741982abc",
  "timestamp": "2026-08-08T10:15:30.123Z",
  "fieldErrors": [
    {
      "field": "email",
      "rejectedValue": "invalid-email",
      "message": "Must be a well-formed email address"
    }
  ]
}
```

---

## 3. Core API Endpoint Catalog

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/actuator/health` | Spring Boot Actuator Health Check | No |
| `GET` | `/api/v1/health/ready` | Detailed readiness (DB, Redis, App) | No |
| `POST` | `/api/v1/auth/register` | Athlete registration | No |
| `POST` | `/api/v1/auth/login` | Email/Password login (issues JWT + refresh) | No |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token for new access token | No |
| `POST` | `/api/v1/auth/logout` | Revoke active refresh token | Yes (`Bearer`) |
| `GET` | `/api/v1/athletes/me` | Fetch authenticated athlete profile | Yes (`ROLE_ATHLETE`) |
| `PUT` | `/api/v1/athletes/me` | Update athlete physical / preferences | Yes (`ROLE_ATHLETE`) |
| `POST` | `/api/v1/assessments` | Submit movement & safety assessment | Yes (`ROLE_ATHLETE`) |
| `GET` | `/api/v1/assessments/latest` | Retrieve latest assessment & safety flags | Yes (`ROLE_ATHLETE`) |
| `POST` | `/api/v1/jumps` | Record Jump Lab manual test | Yes (`ROLE_ATHLETE`) |
| `GET` | `/api/v1/jumps/history` | Paginated jump measurement history | Yes (`ROLE_ATHLETE`) |
| `GET` | `/api/v1/exercises` | Search/filter curated exercise inventory | Yes |
| `GET` | `/api/v1/exercises/{id}` | Get exercise detail & cues | Yes |
| `POST` | `/api/v1/programs/generate` | Idempotent deterministic program generation | Yes (`ROLE_ATHLETE`) |
| `GET` | `/api/v1/programs/current` | Active training program & weekly structure | Yes (`ROLE_ATHLETE`) |
| `GET` | `/api/v1/workouts/today` | Today's scheduled workout session | Yes (`ROLE_ATHLETE`) |
| `POST` | `/api/v1/workouts/{id}/complete` | Idempotent workout completion & RPE log | Yes (`ROLE_ATHLETE`) |
| `POST` | `/api/v1/recovery` | Daily check-in (sleep, soreness, readiness) | Yes (`ROLE_ATHLETE`) |
| `GET` | `/api/v1/analytics/vertical` | Vertical jump progression time series | Yes (`ROLE_ATHLETE`) |
| `POST` | `/api/v1/ai/coach` | Constrained AI Coach Q&A | Yes (`ROLE_ATHLETE`) |
| `GET` | `/api/v1/ai/weekly-report` | Structured weekly progress report | Yes (`ROLE_ATHLETE`) |
