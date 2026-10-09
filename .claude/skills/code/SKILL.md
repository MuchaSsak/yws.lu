---
name: code
description: Use when the user asks to build, implement, add, fix, debug, refactor, improve, migrate, or otherwise change yws.lu code, or says "/code", "build", "implement", "fix", "debug", "refactor", "corrige", "ajoute".
argument-hint: "[the coding goal]"
---

# Coding goal (yws.lu)

The standard coding loop for this project. One concrete code goal at a time: a slice of the revamp, a bug fix, a
refactor, a UI change, a build script, tests. Pull project facts from the wiki (never assume the stack), match the
existing code, verify before calling it done, and report tersely and honestly.

## Operating modes

State the mode in one line at the start.

- **Present mode:** the owner is at the machine and can run what you cannot drive (a real phone, a screen reader,
  Safari on a Mac, the live deploy). The loop closes only when those checks pass for changes that need them.
- **Walk-away mode:** the owner told you to keep going alone. Run every check you can run, commit per
  `CLAUDE.local.md`, mark human/runtime-gated checks `PENDING` in the report. Never fake a result you did not see.

## Context across compactions

Compaction is not a stop: keep working until the goal meets the done criteria (`working-agreement.md` § 3). After a
compaction: re-read `revamp-plan.md`, re-read a file before editing it, check `git status` / `git diff` for what is
really done, re-run the last failing check. Only the owner pauses ("stop", "pause", "wait", an interrupt): commit (WIP
is fine: `chore(wip): <where>`), then two lines: where you stopped, what comes next. "Stop for compact" is not a pause:
end the turn at once, then continue after the compaction without asking.

## The loop

### 1. Load context (always first)

Read the root `CLAUDE.md` and follow its routing table (the prompt hook lists the routed pages). Apply the
`lessons.md` Rules (the session card carries them). Always read `.claude/project-info/memory/run-notes.md` (measured
timings: how long build, e2e, shots and Lighthouse really take here). For a page slice also read
`memory/slice-costs.md` (what earlier slices spent of the budgets), `site/structure.md` (the page's sections and CTAs),
`site/seo.md` (its metadata row) and `design/design.md`.

Load only what the goal touches. A missing or vague page: note the gap, proceed on the facts you have, never invent
project facts. Never read real `.env*` files or secrets; name env vars, never values.

### 2. Scan existing patterns

Inspect the folder you will touch and its nearest siblings; write as if the original author wrote it. Binding
conventions (`tech/conventions.md`, `tech/usage/astro.md`):

- **The site lives in `web/`** (Astro 7, `output: "static"`, Tailwind 4 tokens in `web/src/styles/global.css`,
  aliases `~/` → `web/src/`). The 2025 Next app at the repo root is the reference until each route reaches parity;
  never extend it.
- **One route map** (`web/src/lib/routes.ts`: `pathTo`, `alternates`, `LEGACY`) feeds links, hreflang, the sitemap,
  the e2e route list and the redirects. **One data source** for the organisation's facts (`web/src/data/organisation.ts`).
- **Islands only for 3D** (React 19 + R3F, `client:visible`/idle via `HouseScene`-style loaders with a poster);
  everything else is `.astro` + CSS. Effects from Aceternity, GSAP or React Bits are rewritten as own code, never
  ported line by line (Q23, `research/2026-10-09-licences.md`).
- **No forms, ever.** Contact is email, phone, map and socials.
- **Placeholders:** a value that is not real yet is marked `PLACEHOLDER` in code/data, gets a row in
  `.claude/project-info/placeholders.md` and one line in chat. A launch build fails while any marker ships.

### 3. Plan (no halt unless irreversible)

State the goal, the files, how you will verify, and any assumption (tag it `[assumption]` in the wiki). Do not stop for
approval on routine work (`CLAUDE.local.md`). Stop only for an irreversible fork that is genuinely the owner's call.
Slices go one at a time, each looped to done before the next (`working-agreement.md` § 9).

### 4. Build or fix

Smallest coherent change that meets the goal.

- **Bug:** reproduce or localise first, fix the root cause, add a focused regression test.
- **Migrating a route:** keep a parity checklist (every section, string, link, image, 3D moment, data value of the
  2025 route) and tick it in the slice's plan; old URLs keep working through `LEGACY` (308).
- **Copy:** every user-facing string goes through Lingui with English as the source (`site/i18n.md`,
  `tech/usage/lingui.md`): `lingui-for-astro` macros in `.astro`, Lingui macros in TSX. After adding or changing
  strings run `bun run i18n:extract` (from `web/`), then fill `web/src/locales/fr/messages.po`. **Existing French is
  human text: copy it verbatim from `lib/dictionary.tsx`** (fix only obvious typos, listed in `placeholders.md`). New
  French is written natively, never literally, and listed for review. The production build fails on a missing fr message.

### 5. Coverage

Vitest unit tests next to the code (`web/src/**/*.test.ts`: data shapes, routes, token contrast, catalogs complete,
scroll-driven CSS longhands); Playwright specs in `web/e2e/`. Every new route is added to the route map, so the a11y,
layout, text-fit, i18n and redirect gates sweep it automatically.

### 6. Static verification (read the real output)

From `web/`: `bun run check` (astro check + ESLint + Vitest), `bun run build` (strict Lingui compile + astro build +
the SEO/launch gate) whenever routes, config, catalogs or content changed, `bun run e2e` against the built site (the
Vercel-like server `scripts/serve.mjs` on 4322; it serves `dist/`, so rebuild first).

**Never block a shell waiting:** long commands (`bun run preview`, full e2e, Lighthouse) go to the background; no sleep
loops. Iterate narrow (`bun run e2e e2e/<file>.spec.ts`, `bun run e2e --last-failed`, `bunx vitest run <file>`), then
run `check`, `build` and `e2e` in full once at the end. Use your own ports (3100 Next, 4322 Astro); never kill a
process you did not start.

### 7. Visual QA (any change that can move a pixel)

Build, serve on 4322 in the background, then shoot each changed route in **en and fr** (`tech/usage/visual-qa.md`):

```bash
MSYS_NO_PATHCONV=1 node scripts/shots.mjs --paths /en/,/fr/ --widths 390,1024,1440,1920 [--full] [--reduced]
```

Read every shot: overflow, text under the sticky header, text over busy media without a scrim, a label on two lines in
one locale only (boxes are sized for French), uneven cards, ultrawide emptiness. Score each view with
`design/design-quality.md` and iterate until ≥ 8 with the weakest point named. Then the 320 and 2560 sweep, one
`--reduced` pass when anything animates, `bun run e2e:xb` when focus, scrolling or sticky layout changed. Shots stay
local (gitignored); log accepted views in `screenshots/VISUAL-QA.md`. Skip only when the diff provably renders nothing.

### 7b. Lighthouse QA (when a score can move)

Media, fonts, metadata, a new route, an embed or an island: run the `lighthouse-qa` skill (`bun run lhci`, median of 3,
mobile + desktop, exits 1 on a budget miss). Record the slice's cost in `memory/slice-costs.md`.

### 8. Human/runtime-gated checks

Present mode: give the owner the exact command, read the pasted output, loop. Walk-away mode: mark them `PENDING`.

### 9. Commit

If the goal changed any `.claude/project-info/` file, run `/wiki-lint` first. Place durable learnings per
`working-agreement.md` § 7 (numbers → `memory/run-notes.md`, gotchas → `lessons.md`). Update the page that describes
the behaviour and append one `log.md` line (`## [YYYY-MM-DD] <area> | <what changed>`) in the same commit, tick the box
in `revamp-plan.md`, then use the `commit` skill: Conventional Commit, the owner's git identity, never `--no-verify`,
**never push unless the owner asks**, never on `main`.

### 10. Done criteria

The bar is `working-agreement.md` § 2: static + build gate + e2e + text fit in en and fr + shots at 390/1024/1440/1920
(+ 320/2560) + reduced motion + axe + Lighthouse when a score can move + design score ≥ 8 + wiki and `log.md` in the
same commit. Never say "done and verified" when only static checks ran. Report per `working-agreement.md` § 6 with
numbers from real output.

## Hard rules

1. One coding goal per invocation; note adjacent work as deferred.
2. Never claim a check passed without seeing its output. Never weaken a gate to pass: fix the page.
3. Match existing patterns over your own preferences.
4. Specific Conventional Commits, never "claude: changes".
5. A change to a documented contract or decision updates its wiki page (+ `log.md`) first, then the code.
6. Bug fixes and refactors preserve behaviour unless the goal says otherwise; prove refactors with shot diffs and e2e.
7. Truth: no invented facts, numbers, dates, partners or testimonials; client facts come from the client.
