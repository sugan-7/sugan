# VERTEX Antigravity Prompt Pack

This pack converts the complete VERTEX project master context into five sequential prompts for Antigravity. The master prompt is version 2.1 and has been re-audited against all 105 sections of the supplied specification. VERTEX is an AI-assisted basketball athlete-performance platform, not a generic fitness site, exercise library, or free-form workout chatbot.

## Use order

1. Paste `00_VERTEX_MASTER_PROMPT/PROMPT.md` first and keep it as the persistent project context.
2. Paste the prompts in folders `01` through `04` in order.
3. After each prompt, require Antigravity to inspect the existing repository, implement only the stated scope, run the verification gates, and report files changed, tests run, and known gaps.
4. Do not ask Antigravity to build all future features in one pass. Use the MVP boundary and feature flags.

## Pack map

- `00_VERTEX_MASTER_PROMPT`: product constitution, architecture rules, safety, AI boundaries, UX principles, roadmap, and execution contract.
- `01_FOUNDATION_PHASE_0_1`: repository inspection, architecture documentation, Next.js/Spring Boot/PostgreSQL/Redis foundation, Docker, Flyway, OpenAPI, CI, and health checks.
- `02_MVP_ATHLETE_JOURNEY`: authentication, onboarding, athlete/basketball/training profiles, safety screen, jump assessment, Jump Lab, goals, dashboard shell, and core data contracts.
- `03_MVP_TRAINING_WORKOUT_PROGRESS`: exercise database, deterministic training engine, program generation, weekly schedule, workout execution, RPE, recovery, progress, analytics, and records.
- `04_AI_ADAPTIVE_PRODUCTION_ROADMAP`: AI Coach and weekly report, adaptive programming, production hardening, admin/coach foundations, notifications, privacy, observability, and future feature boundaries.

## Important operating rule

The prompts are implementation prompts, not permission to invent requirements. If the repository already contains working architecture, preserve it unless a documented reason requires a change. If a requirement cannot be safely implemented with available data, show `Insufficient data` or `Coming soon`; never fabricate a measurement, result, scientific citation, or AI conclusion.
