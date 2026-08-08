# Antigravity Build Prompt 01 - Foundation and Architecture

Read `00_VERTEX_MASTER_PROMPT/PROMPT.md` first. This is the first implementation prompt for VERTEX.

## Objective

Inspect the repository and establish a clean, production-oriented foundation for VERTEX. Implement only Phase 0 and Phase 1. Do not implement advanced AI, computer vision, adaptive training, social features, payments, wearables, nutrition prescriptions, or a full coach/team system in this task.

## Step 1: repository audit before edits

Inspect and report:

- Existing frontend, backend, database, authentication, routes, components, dependencies, Docker, environment files, tests, CI, and documentation.
- Current framework and version choices.
- Existing working architecture to preserve.
- Missing foundation pieces.
- Conflicts or risky assumptions.

If a repository already has a sound stack, adapt the plan to it rather than replacing it. Do not create duplicate apps, duplicate design systems, or duplicate API clients.

## Step 2: Phase 0 documentation

Create or update `/docs` and the root README with:

- Product overview, problem statement, vision, and MVP boundary.
- System-context diagram and logical architecture.
- Frontend/backend/database/cache boundaries.
- Domain/module map for auth, user, athlete, assessment, jump, exercise, training, program, workout, performance, recovery, analytics, AI, coach, notification, admin, and common.
- Initial data model and entity relationships.
- API versioning and error-response conventions.
- Authentication, authorization, privacy, safety, and AI data-flow boundaries.
- Local development, environment variables, Docker, testing, deployment, and roadmap.
- Architecture decision records for material choices.

Make it clear that PostgreSQL is authoritative and Redis is cache/temporary state only. Document UTC storage plus athlete-local display time. Document units and measurement provenance for jump metrics.

## Step 3: Phase 1 repository foundation

Implement the smallest complete foundation needed to run the system locally and in CI.

### Backend

- Java/Spring Boot service with clean package boundaries under `com.vertex`.
- Configuration profiles for local, test, staging, and production.
- PostgreSQL connection using environment variables.
- Flyway enabled with an initial migration strategy. If domain tables are not yet needed, create only safe foundation tables and document the next migration plan.
- Redis connection/configuration without making Redis the source of truth.
- Basic health/readiness endpoints for application, database, and Redis where practical.
- OpenAPI/Swagger with a versioned `/api/v1` convention.
- DTO, validation, service, repository, controller, and global-exception-handler conventions.
- Structured JSON error envelope with correlation/request ID, status, code, message, and field errors where applicable. Never expose stack traces in production.
- Secure baseline headers, CORS configuration, logging, and placeholder rate-limiting boundary.

### Frontend

- Next.js/React/TypeScript foundation using the repository's existing routing model where sound.
- Tailwind/shadcn-compatible design tokens and feature-based folder structure.
- Reusable primitives for Button, Card, MetricCard, Form, Modal/Dialog, Tabs, Badge, LoadingState, EmptyState, ErrorState, Skeleton, and ProgressBar.
- Responsive shell with a premium sports-performance visual direction, but no fake athlete metrics or testimonials.
- Route groups/placeholders for public, onboarding, athlete, coach, and admin areas with protected-route boundaries documented.
- Typed API client boundary using `NEXT_PUBLIC_API_URL`; do not hardcode URLs.
- Accessible defaults: semantic HTML, keyboard focus, labels, contrast, reduced-motion support, and responsive layout.

### Infrastructure

- Dockerfiles for client and server as appropriate.
- `docker compose up -d` for PostgreSQL, Redis, backend, and frontend if useful.
- Safe `.env.example` files containing names only, never secrets.
- GitHub Actions for install, lint, unit tests, integration tests where available, build, and Docker build. Use separate development/staging/production configuration boundaries.
- Local test setup; use Testcontainers for backend integration tests if the project supports it.
- Pin or document dependency versions and avoid unnecessary dependencies.

## Required implementation safeguards

- Never commit API keys, database passwords, JWT secrets, OAuth secrets, or storage secrets.
- Do not seed fake testimonials, fake scientific statistics, or fake performance results.
- Keep seed/demo data isolated from production athlete data.
- Add a feature-flag mechanism or explicit configuration boundary for `AI_COACH`, `ADAPTIVE_PROGRAMMING`, `VIDEO_ANALYSIS`, `COACH_MODE`, `SOCIAL`, `WEARABLES`, and `RESEARCH_MODE`.
- Add a minimal audit/event boundary so later phases can record login, assessment changes, program generation, data deletion, AI recommendations, and account deletion.
- Add idempotency/concurrency guidance for future generation and logging endpoints; no duplicate programs or duplicate completion events should be created by accidental retries.
- Add a migration and API-change policy to the documentation.

## Verification gate

Before declaring this prompt complete:

1. Build backend and frontend.
2. Run lint and all available tests.
3. Start local dependencies and verify health/readiness endpoints.
4. Verify database connectivity and Flyway behavior.
5. Verify Redis connectivity without using it as the source of truth.
6. Verify OpenAPI renders and includes the error contract.
7. Verify the frontend loads on desktop and mobile breakpoints.
8. Check that secrets are absent from tracked files.
9. Update README and `/docs`.

## Response format

Return:

- Repository audit.
- Implementation plan and assumptions.
- Files changed.
- Commands/tests run and results.
- Architecture decisions.
- Known gaps and the exact next prompt/phase to run.

Stop after Phase 0 and Phase 1 are stable. Do not silently continue into feature implementation.

## Foundation completeness requirements

Also document the intended initial deployment shape: Next.js on Vercel or equivalent, Dockerized Spring Boot on Render or equivalent, managed PostgreSQL, managed Redis, and private Cloudinary/S3-compatible storage for future media. Define `www.<domain>` and `api.<domain>` CORS boundaries, backup/restore expectations, migration forward/rollback policy, correlation IDs, log redaction, and release rollback steps.

The only committed environment files are examples containing variable names: `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `REDIS_URL`, `AI_API_KEY`, `CORS_ALLOWED_ORIGINS`, `STORAGE_PROVIDER`, `STORAGE_BUCKET`, `STORAGE_API_KEY`, `STORAGE_API_SECRET`, and `NEXT_PUBLIC_API_URL`.

Create the initial public route shell for `/`, `/about`, `/how-it-works`, `/exercises`, `/pricing`, `/login`, and `/register`, plus protected route-group boundaries for onboarding, athlete, coach, and admin. Reserve landing-page sections for assessment, personalized program, daily training, progress analytics, AI Coach, future video analysis, research/evidence, future pricing, and footer. Use no fake testimonials, endorsements, metrics, or scientific claims.

Create a feature-flag registry for `AI_COACH`, `ADAPTIVE_PROGRAMMING`, `VIDEO_ANALYSIS`, `COACH_MODE`, `SOCIAL`, `WEARABLES`, and `RESEARCH_MODE`, and a minimal consent/audit boundary for login, assessment updates, program generation, AI recommendations, video upload/delete, data deletion, and account deletion. Keep future upload storage private-by-default even though video is not part of this phase.

Use the repository-compatible test matrix from the master prompt: JUnit, Mockito, Spring Boot Test, and Testcontainers for backend coverage; Vitest or Jest, React Testing Library, and Playwright for frontend coverage. Establish placeholders for authentication, authorization, migration, health, onboarding, protected-route, and responsive smoke tests.

Add baseline performance practices without premature optimization: image optimization, lazy loading, code splitting, server rendering where appropriate, caching, minimal client JavaScript, database indexes, pagination, efficient queries, connection pooling, and Redis only where measured/justified. Document what is deferred until profiling.
