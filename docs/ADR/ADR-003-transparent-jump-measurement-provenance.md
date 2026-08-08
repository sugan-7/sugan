# ADR-003: Transparent Jump Measurement Provenance & Calculation Integrity

## Status
Accepted

## Context
Athlete trust in VERTEX depends on accurate, verifiable vertical jump and athleticism metrics. Generic fitness apps frequently invent numbers, use opaque formulas, or present speculative PRs.

## Decision
1. All vertical jump measurements store raw input values, units (`cm` or `inches`), test source (`MANUAL_TOUCH`, `VERTEC`, etc.), timestamp (UTC), and calculation version.
2. Calculations are completely transparent:
   - `Standing Vertical = Maximum Standing Touch - Standing Reach`
   - `Approach Vertical = Maximum Approach Touch - Standing Reach`
   - `Approach Advantage = Approach Vertical - Standing Vertical`
3. Personal records (PRs) and milestone badges are **never** rendered unless derived from authenticated, stored historical logs.
4. When required data is missing, the UI renders `Insufficient data` and specifies the missing input field rather than displaying fabricated estimates.

## Consequences
- **Positive**: High scientific and athletic credibility; complete auditability.
- **Trade-off**: Requires strict validation and rejection of physically impossible inputs (e.g. standing touch < standing reach).
