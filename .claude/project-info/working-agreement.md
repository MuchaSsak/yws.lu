# Working agreement: how every session works here

> Read once per session: the SessionStart hook points here at startup and after every compaction.
> This page owns HOW we work; WHAT the project is lives in the routed pages. Personal rules:
> `CLAUDE.local.md`. The latest explicit instruction beats both.

## 1. Start

1. Read the pages the prompt hook lists and the routing-table rows the task touches, then the code.
   The code wins over a page (then fix the page).
2. Apply `lessons.md` (the session card carries its Rules). Unfinished work (uncommitted files, a plan in progress):
   read `revamp-plan.md` and `git status` before touching it.
3. Dated decisions in pages are settled. A new instruction that contradicts one updates that page and `log.md`.
4. Coding tasks follow the `code` skill (`.claude/skills/code/SKILL.md`).

## 2. Quality bar

- **Do the whole ask**, including messages that arrive mid-task (fold them in, say so in one line).
- **Work in slices** (§ 9), one at a time, each looped until finished.
- **Done means** [user 2026-10-09]:
  - static: `bun run check` (typecheck + lint + unit) and the SEO/launch gate inside `bun run build`
  - browser: `bun run e2e` (axe WCAG 2.2 AA, layout 320–2560, chrome, i18n, motion, old-URL redirects, text fit)
  - **UI:** screenshots at **390 / 1024 / 1440 / 1920** (+ the 320 and 2560 sweep), **en and fr side by side**, actually
    read: overflow, text under the sticky header, text over busy media without a scrim, a label on two lines in one
    locale only, uneven cards, ultrawide emptiness (`tech/usage/visual-qa.md`)
  - reduced motion (final state, nothing hidden), keyboard path, visible focus
  - **Lighthouse** when a change can move a score (`lighthouse-qa` skill): mobile ≥ 95 target, floor 90
  - **design score ≥ 8/10** (`design/design-quality.md`) with the weakest point named
  - the wiki page that describes the change + one `log.md` line in the same commit; a lesson if something tripped you
  - skip the visual loops only when the diff cannot move a pixel or a score
- **i18n:** en and fr both render on their own URLs; the strict Lingui build has no missing ids; new French is marked
  for review (`site/i18n.md`).
- **Edge cases are part of the feature:** very short and very long text (French runs longer), 320 px phones without
  horizontal overflow, no WebGL, reduced motion, keyboard and screen reader.
- **Nothing fake presented as real.** Placeholders are marked `PLACEHOLDER` in code/data, logged in `placeholders.md`,
  mentioned in chat, and block "done for production" (the launch gate fails on them).
- **Research before design** (Mobbin, the `awwwards` skill, `search-registry-items`, `design-references.md`); a source
  behind every number shown to users.
- **Practicality ≥ wow:** impressive within 3 s AND usable in 1 tap on a phone. 3D and effects never gate content.
- **The feel stays:** objective fixes ship; changes to the feel are proposals in `comps/` (desktop + phone, current vs
  proposed), shipped only if they score higher and keep the identity, listed in the report.
- **Ask only when blocked** on a decision that is genuinely the owner's; otherwise take the default, tag it
  `[assumption]` and say so.

## 3. Long tasks and compaction

- Context compacts automatically. Compaction is not a stop: keep working on the current task.
- After a compaction: re-read `revamp-plan.md`, re-read a file before editing it, check `git status` / `git diff` for
  what is really done, re-run the last failing check.
- Keep the state recoverable: docs updated with the change, plan boxes current, long commands in the background (never a
  foreground sleep/poll loop).

## 4. Pausing and resuming

- Only the user pauses ("stop", "pause", "wait", an interrupt). At a pause and at a finished task: commit per
  `CLAUDE.local.md` (WIP is fine), then two lines: where you stopped, what comes next.
- "continue" / "go" resumes from that next step without asking again.

## 5. Finishing a task

1. Verify at the scale of the change and read the real output (every check's, not only the last).
2. Docs in the same change: the page that describes the behaviour + a `log.md` line. The Stop hook blocks a session
   that changed code without the wiki.
3. Lessons (§ 7).
4. Commit as a Conventional Commit (`tech/conventions.md`); author and push per `CLAUDE.local.md`. Never skip hooks.
5. Report (§ 6).

## 6. The report

- Short, in English. Order: what changed (as the user sees it) → decisions made for them, with the reason → what was NOT
  verified → what they must do (exact commands, env vars, deploy order) → what still blocks release.
- Numbers from real output ("e2e 84/84", "LH mobile 96"), never "should work". Lab vs field always labelled.

## 7. The lessons loop

- **When:** the user corrected you, a tool or approach failed and you found what works, you lost time rediscovering
  something, or a check caught a mistake you would make again.
- **Where:** a product fact or decision → its routed page; a measured number → `memory/<topic>.md`; how to work here
  (tool gotcha, process, a preference) → `lessons.md` `## Rules`.
- **Shape:** one imperative line, why, the date. Cap 60 rules: merge duplicates, delete what stopped being true.
- **Promote:** a lesson that keeps coming back becomes a mechanical check (test, lint rule, gate); point the line at it.

## 8. The machinery

| Piece | Does |
| --- | --- |
| `CLAUDE.md` | routing table + invariants + this page's pointer; loaded every session, kept through compaction |
| `CLAUDE.local.md` | personal rules, gitignored, loaded the same way |
| `.claude/hooks/session-start.mjs` (SessionStart) | at startup, resume, clear and after every compaction: this page's pointer, the lessons, the in-flight git state |
| `.claude/hooks/wiki-context.mjs` (UserPromptSubmit) | the ≤ 5 routed pages for each prompt (`routing-synonyms.json` adds French stems) |
| `.claude/hooks/wiki-check.mjs` (Stop + by hand) | code changed without the wiki: blocks the stop once (`wiki-check.json` names the page per code area); lints the wiki |
| `.claude/skills/` | `code`, `commit`, `lighthouse-qa`, `awwwards`, `search-registry-items`, `wiki-lint` |

## 9. Slices: one at a time [user 2026-10-09]

Order: foundation (layout shell, tokens, i18n, SEO infra, gates) → header + language switcher → footer → home → looking
for housing → rent your property → about us → We Spark projects → jobs (retired: redirects) → TEC conference → 404 →
legal pages. Never start slice Y while slice X has a failing check or a known polish item; a later slice that breaks an
earlier one reopens it first. Live status: `revamp-plan.md`.

**The loop for every slice** (repeat until every check passes and one more pass finds nothing worth fixing):
1. **Research** the section (Mobbin, `awwwards`, registry, `research/2026-10-09-comparable-sites.md`): a short plan
   naming the adopted patterns and why they are objectively better (fewer taps, hierarchy, legibility, contrast, speed).
2. **Build** with real content; every placeholder logged.
3. **Evaluate:** shots at every width, en + fr side by side, text fit, axe, keyboard, reduced motion, Lighthouse,
   design score ≥ 8 with the weakest point named; record the slice's cost in `memory/slice-costs.md`.
4. **Fix** the weakest point, evaluate again.
5. **Close:** one Conventional Commit per slice (scope = the page), a `log.md` line, the plan box ticked.
