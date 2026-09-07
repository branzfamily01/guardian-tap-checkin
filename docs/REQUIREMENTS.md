# Guardian Tap Check-in Requirements

Status: current approved baseline, 2026-09-07

## Purpose
A deliberately simple self-check-in application for guardians of current students at school events, optimized for first-time touch use under reception pressure.

## Core flow
1. Select grade.
2. Select class.
3. Select surname kana initial.
4. Select student.
5. Select guardian count.
6. Select companion count.
7. Confirm check-in.

Definitions:
- Guardian = parents/guardians in the parent role.
- Companion = grandparents, siblings/children, and other accompanying visitors.

## UX requirements
- Large tap targets and high visual clarity.
- Touch-PC/iPad use is a first-class target.
- Avoid unnecessary text entry and hidden navigation.
- Keep the flow understandable without training.
- Do not add general-purpose reception complexity unless it is demonstrably needed for this specialized flow.

## Privacy and data lifecycle
- Real student rosters are never committed to GitHub or included in public deployment artifacts.
- A roster CSV is loaded locally on the reception device and stored only in browser-local storage under the current design.
- Check-in totals/history can be exported as CSV.
- Operators must back up required records before clearing browser/site data.
- Personal data must not be introduced into demo/default repository data.

## Product boundary
`guardian-tap-checkin` remains a specialized simple experience. `school-visitor-checkin` remains the richer general reception application. Shared code may be extracted later if justified, but product flows are not automatically merged.

## Governance
Astra owns privacy/data architecture, server-side synchronization, identity model, or any proposal to merge the product into the general reception engine. Sol owns routine UX, tap flow, labels, counts and bounded improvements. Codex implements approved changes.
