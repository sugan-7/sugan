# Antigravity Build Prompt 03 - Training Engine, Workout Execution, and Progress

Read the master prompt and the previous foundation/athlete-journey prompts. Inspect what is already implemented. Build the deterministic training and measurement slice that turns a completed athlete profile into a safe, explainable program and a usable daily workout loop.

## Objective

Implement the exercise database, rule-based performance classification, training engine, program generation, weekly schedule, workout execution, session feedback, basic recovery, training-load tracking, progress analytics, and personal-record calculations. Do not let an LLM invent workouts. AI explanations are handled in the next prompt and must consume structured outputs from this engine.

## Domain model and migrations

Add or complete the following entities with proper keys, relationships, timestamps, versioning, ownership, and auditability:

- exercises, exercise_categories, exercise_progressions
- training_rules or rule configurations
- training_programs, training_phases, weekly_plans
- workouts, workout_exercises, prescribed sets
- workout execution/set logs, performance_logs, exercise_logs, jump_performance_logs
- recovery_logs, training_load_logs, progress_metrics
- personal records and milestones where implemented

Do not expose JPA entities directly. Store a program-generation input snapshot, ruleset version, exercise selection rationale, output version, and source of any manual/coach override so a program can be reproduced or audited.

## Exercise library

Seed a clearly labelled development dataset for the following categories:

- Strength: squat variations, trap-bar deadlift, Romanian deadlift, split squat, lunge, step-up, hip thrust, calf raise, tibialis raise.
- Plyometrics: pogo, countermovement jump, squat jump, broad jump, bounds, tuck jump, depth drop/jump, hurdle hop, single-leg hop, lateral bound.
- Power: jump squat, loaded jump, medicine-ball throw, explosive movement variations.
- Jump technique: approach jump, penultimate-step, one-foot/two-foot takeoff, arm swing, max touch, rebound jump.
- Acceleration: short acceleration, sprint, first-step drills.
- Change of direction: lateral movement, deceleration, direction-change drills.
- Mobility/preparation: dynamic warm-up, ankle/hip mobility, movement preparation.
- Recovery: low-intensity movement, mobility, recovery sessions.

Every exercise record must support ID, name, slug, category/subcategory, difficulty, equipment, primary/secondary objectives, movement qualities, instructions, cues, common mistakes, contraindication flags, recommended experience, video/thumbnail placeholders, default sets/reps/duration/rest, progression, regression, tags, evidence references, status, and content version. Exercise descriptions must be editable through a controlled data/admin path, not hardcoded in frontend components or AI prompts.

Seed the complete exercise inventory from the master prompt, including all named strength, plyometric, power, jump-technique, acceleration, change-of-direction, mobility/preparation, and recovery exercises. Do not silently replace named exercises with generic placeholders. Mark missing media as unavailable/`Coming soon`.

Add fast search/filtering by goal, category, difficulty, equipment, experience, muscle group, and movement quality. Provide accessible exercise cards and a detail view. Use `Coming soon` for missing videos; do not invent media URLs.

## Deterministic training-engine pipeline

Implement this pipeline as testable domain services:

`athlete profile + assessment + goals + equipment + availability + basketball workload + previous training + recovery/safety constraints -> classification -> priority engine -> rules engine -> exercise selection -> volume/intensity/frequency -> program draft`

Inputs must include age, height, weight, experience, basketball level/position, standing/approach/one-foot/two-foot metrics where available, target, jump style, training days, session duration, equipment, season status, recent sessions, RPE, recovery, prior exposure, safety flags, and program phase.

Create platform-derived dimensions only when data supports them: vertical performance, lower-body strength, explosive power, reactive ability, single-leg power, jump technique, acceleration, change of direction, mobility, consistency, and recovery readiness. Store score inputs and a calculation version; label scores as internal indicators.

Create a performance-priority output with primary, secondary, and tertiary priorities plus a reason. Example priorities may be jump technique, reactive power, strength, power, acceleration, change of direction, or recovery management. Avoid unsupported biomechanical claims.

Rules must enforce:

- Beginner-safe exercise and plyometric progressions.
- No advanced plyometrics for every athlete.
- No excessive high-impact volume when basketball workload is high.
- No maximal-intensity work every day.
- Equipment compatibility.
- Session-duration and preferred-day constraints.
- Training/rest/basketball-day spacing.
- Safety restrictions from onboarding.
- Progressive overload, progression/regression, and appropriate deload/retest logic.
- A stable, deterministic result for the same versioned inputs.

Support Foundation, Strength + Elasticity, Power Development, and Jump Expression phases; choose based on data rather than forcing every athlete through the same phase. Support 4-, 6-, 8-, and 12-week duration; default MVP is 8 weeks.

## Program generation and weekly schedule

Implement:

- `POST /api/v1/programs/generate` with authenticated ownership checks.
- `GET /api/v1/programs/current` and version/history access where useful.
- Idempotency key or equivalent protection so retries do not create duplicate programs.
- Program goal, start/end dates, phase, training days, rest days, basketball days, weekly structure, progression rules, deload/recovery logic, and retesting schedule.
- A generation result containing structured priorities, selected exercises, weekly plans, workouts, constraints applied, data limitations, and an explanation payload for the AI layer.
- Conflict detection for preferred training days versus basketball games/practices.
- Draft/published/archived state and safe regeneration behavior. Never silently overwrite completed historical workouts.

The engine must return `Insufficient data` plus the missing fields when it cannot safely generate a plan. It must never fill unknown athlete values with plausible-looking defaults in a production flow.

## Daily workout execution

Implement:

- `GET /api/v1/workouts/today` and `GET /api/v1/workouts/{id}`.
- Start workout, warm-up, exercise detail, set completion, rest timer, next set/exercise, pause/resume, and complete states.
- Load guidance, reps/duration, rest, cues, common mistakes, and video/thumbnail state.
- Idempotent set completion and workout completion to handle double taps and retries.
- Completion status, timestamps, actual reps/load/duration, notes, and skipped/modified reasons.
- Mobile-first UI with large touch targets, minimal typing, visible progress, network retry, and safe local draft state so a temporary connection issue does not lose a workout.

After completion collect session RPE 1-10, energy, fatigue, soreness, duration, notes, and relevant performance. Validate ranges and allow incomplete-session recovery without corrupting data.

## Recovery and training load

Implement basic recovery endpoints/UI for sleep duration, sleep quality, fatigue, soreness, stress, readiness input, and training RPE. Compute a clearly labelled platform-level readiness indicator only from documented inputs and expose the inputs and calculation version.

Use readiness rules:

- High: normal session.
- Moderate: normal session with optional volume reduction.
- Low: recovery or reduced-load recommendation.

Never label this as a diagnosis or medical measurement.

Track workout duration, session RPE, frequency, jump contacts, plyometric volume, strength volume, basketball sessions/games, and recovery. If session load is used, define it transparently as `session RPE x session duration` and mark it platform-derived.

## Progress, goal gap, and records

Implement analytics data and UI for:

- Baseline/current/personal-best standing vertical.
- Approach vertical, one-foot, and two-foot history.
- Target vertical and transparent goal gap.
- Vertical over time with date/cm axes and baseline/current/personal-best/goal markers.
- Training adherence, workout completion, consistency, streak, weekly training load, recovery trend, RPE trend, basketball workload, strength progression, and goal progression.
- Personal records for vertical, strength, adherence, streak, and weekly consistency only when calculated from stored logs.
- Explicit empty/insufficient-data states.

Provide `/api/v1/analytics/vertical`, `/api/v1/analytics/training-load`, `/api/v1/analytics/adherence`, and any additional endpoints needed. Use pagination/time windows for histories and athlete-local display time.

## Tests and quality gate

Add backend unit/integration tests for:

- Exercise filtering and equipment/experience rules.
- Vertical and goal-gap calculations.
- Priority classification.
- Deterministic program generation and idempotent regeneration.
- Beginner/high-workload/safety constraints.
- Phase progression and deload/retest rules.
- Schedule conflict detection.
- Set/workout completion idempotency.
- RPE/readiness/training-load calculations.
- Adherence, trends, personal-best, and insufficient-data behavior.

Add frontend tests for exercise search, program generation loading/error states, weekly schedule, workout execution, timer/pause/resume, retry/offline draft behavior, RPE/recovery forms, charts, empty states, and mobile layouts. Add an end-to-end test covering onboarding handoff -> program generation -> today workout -> completion -> analytics.

Verification is required: build, lint, migrations, API tests, frontend tests, and end-to-end tests. Update docs with domain contracts, calculations, rules, seed-data policy, and known limitations. Return changed files and test results. Do not implement AI-generated programming or computer vision in this prompt.

## Completeness requirements

The athlete dashboard must expose greeting, primary goal, today's workout, current vertical, personal best, baseline change, target, goal gap, streak, readiness, performance profile, recent workouts, vertical chart, and truthful AI/report placeholders. Do not show a card with invented data.

Add moderate adherence gamification from real events only: streaks, XP, badges, milestones, personal records, goal progress, and weekly consistency. Suggested milestones are first workout, 10 workouts, 100 jump contacts, personal best, +5 cm club, rim touch, rim grab, and dunk. Never award a record or milestone without stored evidence, and avoid manipulative engagement loops.

Support the optional dunk journey data contract: touch rim, grab rim, dunk, one-hand dunk, and two-hand dunk; current reach, target height, estimated required jump, current gap, milestone state, calculation version, and a disclaimer that reach does not guarantee a dunk.

Keep exercise content admin-editable through a controlled data/content boundary. Keep all UI text localization-ready for English, Tamil, Hindi, Telugu, and future languages. Store UTC timestamps and display athlete-local times. Preserve incomplete workout state locally and reconcile it idempotently after temporary network loss. Use `Coming soon` for future camera-based measurement and unavailable media.
