# Antigravity Build Prompt 04 - AI Coach, Adaptation, Production Hardening, and Roadmap

Read the master prompt and prompts `01` through `03`. Inspect the repository and implement this scope incrementally. The deterministic training engine remains authoritative. AI explains structured outputs and may suggest only constrained adjustments; it must not generate arbitrary unsafe programs.

## Part A: MVP AI Coach and weekly report

Create an `AIService` abstraction with provider adapters such as `OpenAIProvider` and `GeminiProvider`. Keep provider choice configurable and do not couple domain logic to one vendor.

Implement structured context assembly containing only relevant, minimum-necessary data:

`athlete profile summary, current assessment, recent performance, recovery, current program, goals, constraints, engine priorities, and known data gaps`

Do not send passwords, JWTs, secrets, unnecessary identity information, or entire database dumps. Prefer athlete IDs/anonymized context. Add request/response schemas, timeout, retry, provider-error, rate-limit, token-budget, and fallback behavior. Never log sensitive prompts or full personal data unnecessarily.

AI Coach must be able to answer:

- Why is my vertical not improving?
- Why did my performance decrease?
- What is today's workout?
- Why am I doing this exercise?
- How is my progress?
- What changed this week?
- What should I focus on?
- How close am I to my goal?

Every response must:

- Use only supplied structured data.
- Explain what is known, what is inferred, and what is uncertain.
- Distinguish research-supported principle, platform heuristic, AI explanation, and user-specific recommendation.
- Respect rules-engine output, safety flags, equipment, workload, and readiness constraints.
- Never diagnose injury/illness, prescribe treatment/medication, invent measurements/statistics/citations, or guarantee results.
- Say `I don't have enough data to determine that` when appropriate.
- Explain missing data and tell the athlete what to record next.

Create a weekly report with overall summary, vertical change, strength change, jump performance, adherence, recovery, workload, goal progress, positive development, limitation, and next-week focus. Store report input snapshot, model/provider metadata, generation status, data version, and created time for auditability. Add regenerate behavior that does not duplicate or overwrite history without a clear version.

Implement `/api/v1/ai/coach` and `/api/v1/ai/weekly-report` with authenticated ownership checks, safe error states, usage limits, and a feature flag. Add a non-AI fallback summary for provider outage or disabled AI.

## Part B: adaptive programming

Implement this as a feature-flagged, versioned service. In the MVP release, it may collect signals and produce a disabled/dry-run preview; automatic weekly program mutation is Version 2 behind `ADAPTIVE_PROGRAMMING` and must be disabled by default until explicitly enabled.

Implement a weekly adaptation service that collects:

- Vertical performance.
- Workout adherence/completion.
- RPE and session feedback.
- Strength performance.
- Recovery/readiness.
- Basketball workload.
- Athlete notes/feedback.

Classify only when enough data exists:

- `PROGRESSING`
- `MAINTAINING`
- `PLATEAU`
- `RECOVERY_CONCERN`
- `INSUFFICIENT_DATA`

Support constrained responses: maintain, progress, reduce volume, change emphasis, increase recovery, retest, or request more data. Store signals, thresholds, rule version, old plan, new plan, reason, confidence/data sufficiency, and actor. If there is insufficient data, do not invent a cause.

Make adaptation deterministic and reviewable before AI explanation. Preserve historical completed workouts. Use idempotency and locking so a weekly job cannot apply the same adjustment twice. Allow a coach/admin override later without losing the original recommendation.

Respect the rollout boundary: MVP may collect signals, version rules, and produce a disabled/dry-run adaptation preview; full automatic weekly program mutation is Version 2 behind `ADAPTIVE_PROGRAMMING`. Never enable automatic adaptation by default in production, never mutate completed history, and never adapt when the classification is `INSUFFICIENT_DATA`.

## Part C: coach and admin foundations

Behind `COACH_MODE`, implement the data/API boundaries for:

- Coach registration/profile.
- Athlete invitations and coach-athlete authorization.
- Athlete list/detail.
- Program assignment and modification.
- Progress/adherence/recovery overview.
- Notes and communication boundary.
- Visibility into why a recommendation was made.
- Coach override capturing original recommendation, modified recommendation, actor, timestamp, and reason.

Behind admin authorization, implement or prepare:

- User management.
- Exercise/content/video management.
- Training-rule management.
- AI configuration.
- System settings.
- Audit-log review.
- Feature flags.

Never allow a coach to access athletes outside an explicit relationship. Never let an admin UI bypass auditability.

## Part D: notifications, gamification, and education

Implement only the safe core needed for MVP/Version 2:

- Notification preferences and event model for workout reminder, workout completion, weekly report, personal best, phase change, goal milestone, and coach message.
- In-app notifications first; provider-backed email/push can be an adapter.
- Moderate gamification: streaks, XP, badges, milestones, personal records, goal progress. Avoid manipulative loops, shame, gambling-like mechanics, or compulsive engagement.
- Educational content model for vertical-jump fundamentals, strength, power, plyometrics, recovery, basketball movement, jump technique, and consistency. Every article labels evidence, platform recommendation, and general education separately.

Do not build social/community features, anonymous leaderboards, public progress posts, or payment integration in this prompt unless explicitly requested. Social features require moderation, privacy, abuse-prevention, and reporting design first.

## Part E: privacy, uploads, observability, and production hardening

Treat body measurements, training history, performance, recovery, notes, and videos as sensitive personal data. Implement or document:

- Privacy notice and consent records.
- Data access/export where appropriate.
- Account deletion and athlete-data deletion semantics.
- Minimum collection and access control.
- Explicit video-upload consent, retention policy, private-by-default storage, signed URLs, expiration, MIME/size validation, malware-scanning boundary, and deletion.
- No public video exposure by default.
- Audit events for login, program generation/modification, coach override, assessment update, data deletion, video upload/delete, AI recommendation, and account deletion.
- Correlation IDs and structured logs with redaction.
- Error tracking, API/database monitoring, and AI usage monitoring at a sensible MVP level.
- Backups/restore runbook and migration rollback/forward policy.
- Rate limits for auth, AI, generation, uploads, and expensive analytics.
- Feature-flag kill switches for AI, video analysis, coach mode, social, wearables, and research mode.

Add a security checklist covering secrets, JWT/refresh-token rotation, authorization, CORS, secure headers, input validation, SQL injection, uploads, logging, and dependency scanning. Never expose production stack traces or secrets.

## Part F: future feature boundaries

Document and scaffold interfaces, but do not fake implementations:

### Computer vision / video analysis

Future pipeline: upload -> private object storage -> processing service -> frame extraction -> pose estimation -> landmark detection -> jump-event detection -> biomechanical features -> analysis -> feedback. Possible technologies include MediaPipe, MoveNet, YOLO pose, or OpenPose. Future metrics may include jump height estimate, takeoff/landing detection, knee/hip/trunk angle, symmetry, contact time, and approach characteristics. Every result must show method, confidence, and limitations. Until implemented, show `Coming soon`.

### Wearables

Future adapters for Apple Health, Google Health Connect, Garmin, Fitbit, and WHOOP for sleep, heart rate, training load, and recovery. Require consent, provider scopes, data minimization, disconnect/revoke, and import provenance.

### Research mode

Future models for study, participant, intervention, assessment schedule, measurement, session, and outcome. Support CSV/JSON export with consent, de-identification, schema version, and provenance. The product must never claim causal effectiveness without a proper study design and analysis.

### Nutrition

Future education/hydration/protein tracking only; no medical nutrition prescriptions or unsupported supplement claims.

### Internationalization and offline resilience

Keep UI text localization-ready for English, Tamil, Hindi, Telugu, and future languages. Use UTC internally and athlete-local display time. Preserve incomplete workout state locally during temporary network loss and reconcile idempotently when online.

## Release and verification gate

Implement in small slices and verify after each one. Required checks include:

- Backend build, unit/integration tests, security/authorization tests, migration tests.
- Frontend build, lint, accessibility checks, component tests, and end-to-end flows.
- AI service contract tests with mocked providers; no live secrets in tests.
- Adaptive-rule tests for progress, plateau, recovery concern, and insufficient data.
- Audit-log assertions for high-risk actions.
- Rate-limit and idempotency tests.
- API/OpenAPI updates and docs updates.
- Mobile workout flow check.
- Secrets and fake-data scan.

Before calling the MVP complete, demonstrate this end-to-end flow, with the adaptation step represented as a dry-run/preview unless `ADAPTIVE_PROGRAMMING` is explicitly enabled:

`register -> onboarding -> safety -> assessment -> goal -> deterministic program -> weekly schedule -> today's workout -> complete sets -> RPE/recovery -> progress chart -> weekly AI report -> next-block adaptation when sufficient data exists`

If any data is missing, show the correct empty state instead of inventing an output. Return a release checklist, changed files, migrations, tests/results, known limitations, rollout flags, and the next recommended roadmap item.

## Roadmap and completeness requirements

Keep the planned product roadmap explicit:

- Version 1: assessment, program generation, workout, progress, AI Coach.
- Version 2: adaptive programming, advanced recovery/load, coach dashboard, dunk progression, advanced analytics, personal records, notifications.
- Version 3: video uploads, pose estimation, jump analysis, technique feedback, camera-based measurement.
- Version 4: team management, coach organizations, athlete comparison, research mode, advanced analytics, wearable integrations.
- Version 5: broader commercial sports-performance platform.

Keep pricing as a future boundary: Free for basic assessment/program/tracking, Pro for AI Coach/adaptive programs/advanced analytics/video/reports, and Coach for athlete/team/program tools. Do not add payments or entitlements without an explicit request.

Track product events separately from athlete performance truth: account created, assessment completed, program generated, first workout, workout completion, weekly active athletes, adherence, vertical change, goal progression, program completion, week-1/week-4/week-8 retention, and feature usage. Do not claim effectiveness from engagement metrics alone.

Maintain an evidence-reference model with title, authors, year, journal, DOI/URL, evidence type, topic, summary, and relevant training principle. Maintain education boundaries for vertical jump fundamentals, strength, power, plyometrics, recovery, basketball movement, jump technique, and consistency; label evidence, platform recommendation, and general education separately.

For future research mode, preserve the data contract for study, participant, intervention, assessment schedule, measurement, session, and outcome, with consented/de-identified CSV/JSON export, schema version, and provenance. Do not claim causal effectiveness without appropriate study design. For future social, nutrition, and wearable features, do not implement beyond documented interfaces and safeguards: moderation/reporting/privacy, non-medical education only, and consent/scopes/revocation/provenance respectively.
