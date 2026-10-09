---
name: wiki-lint
description: "Health-check the .claude/project-info wiki of yws.lu: runs the mechanical lint (node .claude/hooks/wiki-check.mjs), then cross-file contradictions, claims the code contradicts, leftover filler, answered open questions, missing files. Fixes trivial drift in place, routes structural fixes to /start-project-info --repair (owner-run) and unknowns to open-questions.md, logs the pass. Use after any task that changed wiki files, or when asked to 'lint/check the wiki'."
model: claude-haiku-4-5
effort: medium
argument-hint: "[optional: files just changed, or focus area]"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash(node .claude/hooks/wiki-check.mjs:*)
  - Bash(grep:*)
  - Bash(date:*)
---

# /wiki-lint

Keep `.claude/project-info/` trustworthy. A stale or self-contradicting wiki is worse than none.

## Use when

- After any goal that changed `.claude/project-info/` files (the `code` skill, step 9).
- After `/start-project-info --repair` or a bulk wiki edit; on request ("lint the wiki", "vérifie le wiki").

## Read

- `$ARGUMENTS` (may narrow the scope).
- First the mechanical lint: `node .claude/hooks/wiki-check.mjs` (exit 1 on errors): routing-table paths in `CLAUDE.md`
  exist, every page is in `README.md`, titles and relative links resolve, `log.md` lines have the
  `## [YYYY-MM-DD] <area> | <summary>` shape, `lessons.md` keeps `## Rules` under 60, the JSON files parse, no
  key-shaped strings. Fix what it reports.
- Every page in the `README.md` map (root pages, `product/`, `content/`, `site/`, `design/`, `tech/` incl.
  `tech/usage/*.md`, `legal/`, `memory/`). Skip `research/` (raw, unrouted).
- Recent history: `grep "^## \[" .claude/project-info/log.md | tail -5`.

Cheap code spot-checks (only when the page exists):
- Locales: `LOCALES` / `DEFAULT_LOCALE` in `web/src/lib/locales.ts` vs `site/i18n.md`.
- Routes and slugs: `ROUTES` + `LEGACY` in `web/src/lib/routes.ts` vs `site/structure.md` § Sitemap and `site/i18n.md`.
- Commands: `scripts` in `web/package.json` (and the root `package.json`) vs `tech/technologies.md` § Commands and
  the commands quoted in `tech/usage/*.md` and the skills.
- Organisation facts: `web/src/data/organisation.ts` vs `content/content-model.md` (phones, addresses, email, socials).
- Storage: `localStorage` / `sessionStorage` / cookie use in `web/src` vs `legal/compliance-and-data.md`.
- Not-real markers: `grep -rn "PLACEHOLDER" web/src` vs the rows in `placeholders.md`.
- Assets: files in `web/public` + `web/src/assets` vs `design/assets.md` (every shipped asset has a licence row).

## Checks

1. **Contradictions** across ownership boundaries (one home per fact): a value quoted in a non-owning page matches the
   owner verbatim (budgets in `requirements.md`, tokens in `design.md`, slugs in `i18n.md`, facts in `content-model.md`).
2. **Code drift:** code wins for facts about the code; the owner's dated `[user]` decisions win for product facts.
3. **Leftovers:** filler (`TBD`, `<fill me>`, lorem), a `PLACEHOLDER` in code with no `placeholders.md` row (or a row
   whose marker is gone), a README "Not written yet" entry for a page that now exists.
4. **Answered open questions:** move the fact into its owning page, mark the row `answered <date>`.
5. **Missing files:** every README page and every routing-table path exists and is not filler.
6. **Locales:** en and fr are `[user]`; de / lb stay an open question (Q3) until the client decides. New French stays
   marked for review until a fluent reader approves it (`placeholders.md`).

## Operating rules

1. Never ask; never invent facts to fill a gap: route it.
2. Fix trivial drift directly (one-line corrections, verbatim re-quotes, answered questions, stale values the code
   disproves, broken routing paths).
3. Structural problems (ownership, a missing page, the hooks) → report them for `/start-project-info --repair`
   (owner-run).
4. Unresolvable items → a new `open-questions.md` row (question, blocks, who, default, status).
5. Finish with one `log.md` line: `## [YYYY-MM-DD] lint | <n> findings: <summary>` (or `clean`), then re-run
   `node .claude/hooks/wiki-check.mjs` and confirm exit 0.

## Output

≤ 15 lines: one per finding (`file: problem -> fixed | routed to --repair | open-questions.md`) plus a summary line.
Surgical edits only; nothing outside `.claude/project-info/` and the `CLAUDE.md` routing paths; no prose polishing.
