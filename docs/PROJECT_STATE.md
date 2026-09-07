# Guardian Tap Check-in Project State

Snapshot: 2026-09-07

## Current baseline
- Specialized current-student guardian self-check-in app.
- Grade/class/surname-initial/student selection followed by guardian and companion counts.
- Real roster imported locally from CSV and stored in browser localStorage.
- Check-in counts/history can be exported as CSV.
- GitHub Pages serves only the application assets, not real rosters.

## Governance work
This snapshot adds architecture/governance documents only. Application code, real roster data and deployment behavior are not changed.

## Immediate next work
1. Run Astra review using `docs/ASTRA_REVIEW_PACKAGE.md` only if a privacy/sync/product-merger decision is needed.
2. Keep routine usability improvements Sol-led.
3. Test on the actual touch device class used at reception.
4. Preserve explicit backup guidance before data cleanup.
