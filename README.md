# VERTEX - Basketball Athletic Performance Platform

> **Production-grade, AI-assisted basketball athletic performance system.**  
> *Vertical Jump, Explosive Power, Reactive Strength, Acceleration & Injury Risk Mitigation.*

---

## 🏀 Product Identity & Philosophy

VERTEX is built around the continuous, evidence-informed athletic loop:
```
ASSESS -> ANALYZE -> PLAN -> TRAIN -> MEASURE -> RECOVER -> LEARN -> ADAPT -> IMPROVE
```

### Core Tenets
1. **Deterministic Training Engine Authority**: The Java rules engine and curated exercise database are the authoritative source for training prescriptions. LLMs never invent arbitrary workouts.
2. **Measurement Provenance & Truth**: No fabricated stats, no fake PRs, no unverified claims. When data is missing, we display `Insufficient data`.
3. **Safety First**: VERTEX is not a medical device. We never diagnose injuries or guarantee performance outcomes.

---

## 🛠 Tech Stack

- **Backend**: Java 21/23, Spring Boot 3.4.x, Spring Security 6 (JWT + Refresh Token Rotation), Spring Data JPA, Flyway, Lettuce Redis, Springdoc OpenAPI 3.0.
- **Frontend**: Next.js 15+ (App Router), React 19, TypeScript, Tailwind CSS, Radix UI Primitives, Lucide Icons.
- **Database & Cache**: PostgreSQL 16+ (Authoritative Source of Truth), Redis 7+ (Rate Limiting, Cache, Ephemeral State).
- **Tooling & Infrastructure**: Docker, Docker Compose, GitHub Actions CI/CD.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v20+ (tested with v24)
- **Java**: JDK 21+ (tested with JDK 23)
- **Maven**: 3.9+
- **Docker & Docker Compose**: Recommended for local PostgreSQL & Redis

### 2. Environment Setup
Copy the example environment files:
```bash
cp .env.example .env
```

### 3. Start Infrastructure via Docker Compose
```bash
docker compose up -d postgres redis
```

### 4. Run Backend Service
```bash
cd backend
mvn spring-boot:run
```
- API Base: `http://localhost:8080/api/v1`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health Check: `http://localhost:8080/actuator/health`

### 5. Run Frontend Application
```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:3000`

---

## 🧪 Testing & Verification

### Backend Tests
```bash
cd backend
mvn clean test
```

### Frontend Lint & Build
```bash
cd frontend
npm run lint
npm run build
```

---

## 📖 Documentation
- [System Architecture](docs/ARCHITECTURE.md)
- [Database Schema & Migrations](docs/DATABASE_SCHEMA.md)
- [API Contract & OpenAPI](docs/API_CONTRACT.md)
- [Architecture Decision Records (ADRs)](docs/ADR/)
