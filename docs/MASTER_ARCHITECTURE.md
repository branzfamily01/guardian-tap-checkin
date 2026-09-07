# Guardian Tap Check-in Master Architecture

Status: approved baseline consolidated by Sol; Astra architecture review pending
Last updated: 2026-09-07

## 1. Product role
This repository is the specialized low-friction guardian self-check-in app. Its value comes from a short, obvious tap sequence rather than feature breadth.

## 2. Data boundary
Real student roster data is imported locally at the event device and remains browser-local under the current architecture. GitHub/GitHub Pages deployment contains no real roster.

Check-in state and counts are local event data and can be exported for operational record keeping.

## 3. Interaction architecture
The canonical interaction is a progressive narrowing path:
Grade → Class → Surname initial → Student → Guardian count → Companion count → Completion.

The UI should minimize typing, branching and staff explanation. Additional capabilities must not obscure this core path.

## 4. Product separation
`school-visitor-checkin` is the general reception engine with richer lookup/sync capabilities. This repository is not a reduced branch that must automatically converge back into it. Product-level merger or shared-core extraction is an architectural decision.

## 5. Privacy
- No real roster in source/public assets.
- No personal sample data in defaults.
- Local deletion/cleanup only after operational backup expectations are clear.
- Introducing server-side roster storage or synchronization is a root privacy change.

## 6. Governance
- Astra: privacy/data/identity architecture, synchronization, product merger/shared-core architecture.
- Sol: tap flow, visual hierarchy, wording, counts, bounded local features, docs and Codex tasks.
- Codex: scoped implementation/tests.

## 7. Escalation
Astra review is required before moving roster PII server-side, adding cross-device sync, redefining guardian/companion semantics across products, or merging this product into the general reception system.
