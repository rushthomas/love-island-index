# The Love Island Index

A catalog of made-up frameworks the group self-identifies on — least-to-most rankings,
1–10 scales, forced choices, quadrants, and a time-allocation breakdown — rendered as
one long, vintage-catalog-styled scroll.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · zero database.

Data lives in two places:

1. **Seed data** — `src/data/frameworks.ts`. Whatever's known up front (and the one
   manual nomination question) lives here directly.
2. **Live responses** — a Google Form → Google Sheet → published CSV, read at
   request time and overlaid on top of the seed data. See `/how-it-works` on the
   running site for the exact question list to paste into the Form, or read
   `src/lib/formSchema.ts` directly (it's the single source of truth both the site
   and that page read from).

Nothing is ever wiped by a partial submission — a person who hasn't answered a given
question just shows as "not yet submitted" for that one chart.

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Without a `SHEET_CSV_URL` env var set, the site runs entirely on seed data — that's
the default, and it's a fully working state.

## Wiring up live data

Set an environment variable:

```
SHEET_CSV_URL=https://docs.google.com/.../pub?output=csv
```

Full instructions (create the Form, link it to a Sheet, publish that Sheet as CSV)
are on the `/how-it-works` page, generated from `src/lib/formSchema.ts` so it never
drifts out of sync with what the code actually parses.

## Deploy

Push to GitHub, import the repo in Vercel, add `SHEET_CSV_URL` as an environment
variable (optional — omit it to launch on seed data and wire up the Form later),
deploy.

## Known open items

- **Martha's time-allocation numbers** were given as a combined bucket
  (micro-present + present as one 60%). Shown here all in "Present" — search for
  `annotations` on the `time-allocation` framework in `src/data/frameworks.ts` to
  split it.
- **The Google Drive nomination** ("who does Lindsey trust the least") has no answer
  yet — set it on the `drive-snoop` framework in `src/data/frameworks.ts`.
