# ADR-001: Deterministic Training Engine Authority vs. Constrained AI

## Status
Accepted

## Context
VERTEX is an AI-assisted basketball performance platform. A critical design decision is whether workout generation, load progression, and safety screening should be performed dynamically by a Large Language Model (LLM) or by a deterministic, rule-based algorithmic engine.

## Decision
1. The **Deterministic Training Engine** (implemented in Java/Spring Boot) and curated exercise database are the **sole authoritative sources** for program generation, weekly scheduling, exercise selection, and volume/intensity calculation.
2. Large Language Models (LLMs) **shall never** invent, generate, or mutate workouts independently.
3. The AI layer is strictly constrained to explaining the outputs of the deterministic engine, synthesizing recovery trends, answering educational questions, and framing progress summaries based on research-informed principles.

## Consequences
- **Positive**: Absolute safety, determinism, reproducibility, auditability, zero risk of LLM hallucinations prescribing dangerous plyometric volumes or invalid biomechanical movements.
- **Trade-off**: Requires structured rule configuration and comprehensive domain modeling in Java rather than prompt-based orchestration.
