# Antigravity Build Prompt 02 - MVP Athlete Journey

Read `00_VERTEX_MASTER_PROMPT/PROMPT.md` and `01_FOUNDATION_PHASE_0_1/PROMPT.md` first. Inspect the current repository and implement only the athlete identity, onboarding, safety, assessment, goals, and Jump Lab slice. Preserve existing architecture and complete the vertical slice end-to-end.

## Objective

Make it possible for a new athlete to register, create a secure profile, complete onboarding, enter basketball/training/equipment data, pass through the safety screen, record a manual jump assessment, choose a goal, and see a trustworthy athlete profile/dashboard state ready for program generation.

## Backend and database scope

Implement versioned `/api/v1` endpoints and migrations for the minimum necessary entities:

- users and roles
- athlete_profiles
- athlete_goals
- basketball_profiles
- training_preferences
- equipment_profiles
- assessments and jump_tests
- audit events needed for registration, login, assessment update, consent, and data deletion

Use DTOs rather than exposing persistence entities. Add validation, authorization, pagination where relevant, timestamps, UUIDs where suitable, foreign keys, indexes, and consistent error responses. Store units, source, timestamp, and calculation/version metadata for measurements.

## Authentication

Implement:

- Email/password registration.
- Secure password hashing.
- Login with short-lived JWT access token.
- Refresh token with rotation and revocation on logout.
- Secure authentication middleware.
- Role checks for ATHLETE, COACH, and ADMIN, even if coach/admin screens remain feature-flagged.
- Account recovery boundary and session revocation behavior documented if a full email provider is not available.
- Rate limits and safe errors for login/register attempts.

Do not put tokens in logs. Do not expose whether an email exists in a way that enables account enumeration unless the product explicitly chooses that behavior.

## Multi-step onboarding

Create a resumable, validated flow with progress and save/continue behavior. Required steps:

1. Basic information: name, email, age, timezone, height, weight.
2. Basketball profile: position, years playing, level, practices/week, games/week, practice duration, season status.
3. Training experience: beginner/intermediate/advanced, resistance experience, plyometric experience, previous structured training, current frequency.
4. Equipment: no equipment/bodyweight/bands/dumbbells/kettlebells/barbell/rack/box/medicine ball/trap bar/full gym.
5. Manual jump assessment.
6. Goals: primary and secondary goals, target vertical or dunk journey where applicable.
7. Training availability: days/week, preferred days, session duration.
8. Safety screening.
9. Athlete performance-profile placeholder generated only from available data.
10. Handoff to the program-generation phase without pretending a program already exists.

Make the form mobile-first, accessible, keyboard-friendly, and resilient to refresh/back navigation. Show field-level validation and clear units. Avoid collecting unnecessary personal data.

## Safety screen behavior

Ask about current pain affecting movement/training, recent injury, medical restriction, surgery/recovery, and other conditions limiting training.

If a concerning response exists:

- Flag the profile and create a visible safety status.
- Do not diagnose or prescribe treatment.
- Recommend professional evaluation where appropriate.
- Restrict or simplify future high-impact programming through a machine-readable constraint.
- Explain that VERTEX is not a medical device and the AI coach is not a doctor.
- Permit continuation only within safe product boundaries.

Do not let a later UI or LLM bypass this constraint.

If minors are allowed, add an age/guardian-consent state and document the policy boundary. Do not quietly treat minor data like adult data.

## Jump assessment and Jump Lab

MVP supports manual entry only. Store raw measurements and calculate:

- Standing vertical = maximum standing touch - standing reach.
- Approach vertical = maximum approach touch - standing reach.
- Approach advantage = approach vertical - standing vertical.

Support standing reach, standing vertical, approach vertical, one-foot jump, two-foot jump, preferred takeoff, maximum touch height, assessment date, measurement unit, test source, and notes. Reject impossible/inconsistent values with a useful validation message; never auto-correct silently.

Create Jump Lab UI/API for:

- Current values and baseline.
- Personal best calculated from stored tests.
- History and retesting.
- Comparison of standing/approach/one-foot/two-foot values.
- Goal gap in the same unit.
- Transparent calculation details.
- Empty state: `Insufficient data` when a calculation cannot be made.
- Future camera measurement shown as `Coming soon`, with no fabricated CV result.

For dunk goals, calculate and display the required reach/gap using explicit inputs and a standard rim-height configuration. Clearly state that reach does not guarantee a dunk because technique, timing, approach, hand size, and ball control also matter.

## Athlete profile and dashboard shell

Create a profile summary with:

- Primary/secondary goals.
- Basketball and training profile.
- Equipment and availability.
- Safety status.
- Latest jump metrics.
- Platform-derived indicator placeholders only when enough data exists.
- Readiness placeholder marked unavailable until recovery data exists.
- Clear next step: generate a personalized program.

Create the dashboard shell with empty/loading/error states for current vertical, personal best, baseline change, target, goal gap, today's workout, readiness, vertical chart, recent workouts, AI insight, and weekly report. Do not render fake values. Use seeded/demo values only in an explicitly labelled development mode.

## API contract to implement or document

At minimum:

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/athletes/me`
- `PUT /api/v1/athletes/me`
- `POST /api/v1/assessments`
- `GET /api/v1/assessments/latest`
- `POST /api/v1/jumps`
- `GET /api/v1/jumps/history`
- Goal/profile/onboarding endpoints as required by the chosen design.

Document request/response schemas, authentication requirements, error cases, validation rules, and examples in OpenAPI.

## Tests and acceptance criteria

Add backend tests for registration/login/refresh/logout, authorization, validation, onboarding persistence, safety flags, vertical calculations, goal-gap calculations, personal-best selection, and insufficient-data behavior. Add frontend tests for registration, login, resumable onboarding, validation, assessment entry, Jump Lab history, empty/error states, and protected routes. Add at least one end-to-end happy path if the test setup supports it.

The phase is complete only when a test athlete can:

1. Register and log in.
2. Complete or resume all onboarding steps.
3. Enter physical, basketball, training, equipment, availability, and goal data.
4. Complete the safety screen and see the correct constraint.
5. Save manual jump measurements and see transparent calculations.
6. View baseline/current/personal-best/goal-gap states without fabricated data.
7. See the next-step handoff to training-program generation.

Return changed files, migrations, API examples, tests run, screenshots or route verification if available, and known gaps. Do not implement the training engine in this prompt except for a typed handoff contract.

## Journey completeness requirements

Keep the following routes aligned with the master contract: public `/`, `/about`, `/how-it-works`, `/exercises`, `/pricing`, `/login`, `/register`; onboarding `/onboarding`, `/onboarding/profile`, `/onboarding/basketball`, `/onboarding/training`, `/onboarding/equipment`, `/onboarding/assessment`, `/onboarding/goals`, `/onboarding/safety`; athlete `/dashboard`, `/profile`, `/assessment`, `/jump-lab`, `/program`, `/workout`, `/progress`, `/analytics`, `/recovery`, `/ai-coach`, `/exercises`, `/goals`, `/settings`; future coach/admin routes protected by role and feature flag.

The landing page should use `HOW HIGH CAN YOU GO?`, the VERTEX product promise, `START YOUR ASSESSMENT`, and `EXPLORE HOW IT WORKS`, with sections for the problem, how it works, assessment, program, daily training, analytics, AI Coach, future video analysis, evidence, future pricing, and footer. Keep pricing informational only and do not add billing. Use only truthful content and licensed/supplied media.

Create consent and privacy boundaries for account creation, athlete data use, optional future video, data export, and account/data deletion. If the product accepts minors, do not finish onboarding without the configured age/guardian-consent state. Store consent version and timestamp. Add audit events for registration, login, onboarding completion, assessment changes, consent changes, and deletion requests.
