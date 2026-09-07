# ASTRA REVIEW PACKAGE — Guardian Tap Check-in

## Mode
ASTRA ARCHITECTURE REVIEW

## Current design
- Specialized guardian self-check-in app with a deliberately short tap flow.
- Real student roster is local-only and never published.
- No server-side roster sync in the current design.
- Guardian and companion counts are distinct operational categories.
- The richer `school-visitor-checkin` remains a separate product.

## Inspect
- `README.md`
- current roster import/localStorage/export paths
- `docs/REQUIREMENTS.md`
- `docs/MASTER_ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/PROJECT_STATE.md`
- `AGENTS.md`
- relevant architecture in `school-visitor-checkin`

## Questions for Astra
1. Should this app remain fully standalone, or is a shared non-UI core with the general reception system justified?
2. If future cross-device synchronization is required, what minimal anonymous model preserves the current privacy boundary?
3. What is the safest event data lifecycle from roster import through backup and device cleanup?
4. Which features must remain excluded to protect first-time usability?

## Required output
Classify proposed deltas Maintain / Modify / Retire / Hold. Do not auto-adopt major changes. Return findings, product-boundary recommendation, privacy risks, migration implications if any, docs to update and SOL HANDOFF.
