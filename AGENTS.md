# AGENTS.md — Guardian Tap Check-in

## Governance
- Astra: Chief Architect for privacy/data/sync/product-boundary architecture.
- Sol: Main Operator for routine UX, tap flow, labels/counts, analysis, docs, Codex tasks and review.
- Codex: Repository Implementer.

## Read first
- `README.md`
- `docs/REQUIREMENTS.md`
- `docs/MASTER_ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/PROJECT_STATE.md`

## Invariants
- Keep the app deliberately simple and touch-first.
- Never commit/publish real student rosters or personal sample data.
- Current roster/check-in data is browser-local.
- Preserve guardian vs companion count semantics.
- Do not automatically merge this app into `school-visitor-checkin`.

## Web app delivery
- Public entry point remains `index.html`.
- Required CSS/JS/images/assets stay in the repository so the repo root is deployable as a complete static app.
- Do not require users to rename files for deployment.

## Escalation
Do not independently add server-side PII storage, cross-device sync, redefine the identity model, or merge/shared-core the product with the general reception system. Report to Sol for Astra escalation.

## Change control
Classify major proposals Maintain / Modify / Retire / Hold. Major changes require explicit user acceptance.

## Verification
Prefer minimal diffs. Test the complete tap path, roster import, counts, export and persistence on touch-size layouts. Inspect the full diff and report anything not verified.
