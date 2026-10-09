# yws.lu - project info

> The knowledge base for people and agents working on yws.lu (Youth Work Synergy ASBL). Root `CLAUDE.md` routes
> tasks to these pages; this file maps them. Created 2026-10-09 for the 2026-10 revamp.

## Layout

```
project-info/
├─ README.md · working-agreement.md · lessons.md · open-questions.md · placeholders.md · log.md   (root: hooks expect these)
├─ revamp-plan.md · HANDOFF.md   the revamp's live checklist and the PC → laptop handoff
├─ product/    WHY + WHAT: brief, requirements and budgets, audiences, brand voice
├─ content/    WHAT THE SITE SAYS: the organisation's facts (one source), page content sources, statistics and house pictures
├─ site/       HOW IT IS ORGANISED + FOUND: structure, i18n, SEO (+ the launch runbook)
├─ design/     HOW IT LOOKS: design system, quality rubric, references, assets and licences
├─ tech/       HOW IT IS BUILT: technologies, conventions, usage/ library
├─ legal/      the facts behind the legal notice and the privacy policy
├─ memory/     measured numbers (baseline, run notes, slice costs)
└─ research/   raw dated research (unrouted; conclusions live in the pages above)
```

## Map

Root:
- `working-agreement.md` - how every session runs: start, quality bar, compaction, pausing, finishing, report, lessons, slices
- `lessons.md` - one-line lessons, injected into every session
- `open-questions.md` - every Unknown, who answers it, what it blocks, the default used meanwhile
- `placeholders.md` - the not-real register: PLACEHOLDER markers, new copy for the client to approve, typo fixes
- `log.md` - history of this wiki and the revamp
- `revamp-plan.md` - phases P0–P8 with checkboxes: the resume point after a compaction
- `HANDOFF.md` - the 2026-10-09 move from the PC to the laptop: setup, decisions, baseline findings

product/:
- `project-brief.md` - why the site exists, the revamp's goals in priority order, scope, constraints, risks
- `requirements.md` - audiences' next steps, features F01–F13 with acceptance criteria, budgets (non-functional)
- `audience.md` - young people, property owners, partners, practitioners: queries per language, objections → evidence
- `brand.md` - identity, voice per locale, microcopy rules, name rules, claims never to make

content/:
- `content-model.md` - the organisation's facts (one data source), external links, statistics and house pictures, page content sources

site/:
- `structure.md` - sitemap, sections per page, navigation, footer, CTA inventory, embeds, 404, redirects
- `i18n.md` - locales, URL scheme and slugs, the `/` redirect, hreflang, the switcher, Lingui workflow, French rules
- `seo.md` - target queries, entity plan, JSON-LD graph, metadata table per page × locale, crawl, verification, § Launch runbook

design/:
- `design.md` - the yws identity, tokens, type, layout, components, motion, 3D rules, backgrounds, do/don't
- `design-quality.md` - the 0–10 rubric for a rendered view: craft rules, accessibility floor, instant fails, diagnostic
- `design-references.md` - patterns per section from comparable sites and Mobbin, each with why it is objectively better
- `assets.md` - sourcing policy, every asset with size, use, source, licence and action; 3D credits; dependency licences

tech/:
- `technologies.md` - stack and versions, the spike's numbers and the decision, hosting, env var names, commands
- `conventions.md` - code style, folders, git, testing bar, do-not list
- `usage/astro.md` - how pages, layout, islands, images and hosting work in `web/`
- `usage/lingui.md` - writing translatable copy, the extract → translate → build loop
- `usage/three.md` - 3D and canvas effects: loading rule, scenes, models, posters
- `usage/visual-qa.md` - the evaluate step: gates, screenshots, text fit, scoring, accepting proof

legal/:
- `compliance-and-data.md` - GDPR scope, data touchpoints, device storage, processors, legal-notice mentions, photo rights

memory/:
- `baseline.md` - the "before" numbers (Lighthouse on the laptop, weights, SEO and axe findings) with their files
- `run-notes.md` - measured command timings and tool gotchas on this project's machines
- `slice-costs.md` - what each closed slice spent of the JS / LCP / CLS budgets, and accepted Lighthouse skips

research/ (raw, unrouted): `2026-10-09-kickoff-prompt.md` (the brief, verbatim), `-audiences-keywords`, `-comparable-sites`,
`-seo-structured-data`, `-legal-asbl-luxembourg`, `-stack`, `-licences`, `-design-inventory`.

## Not written yet

- `site/analytics.md`: only if the owner adds analytics (Q5).

## Rules

- Read only what the task needs (routing table in `CLAUDE.md`). The code wins over a page: fix the page.
- One home per fact; link instead of copying. Update the page in the same change as the code.
- **Basenames are unique across the wiki,** so a bare name in backticks (`requirements.md`) is unambiguous. Paths in
  backticks are relative to `.claude/project-info/`.
- A new page gets a routing-table row in `CLAUDE.md` and a line here, in the right folder.
- Append one line to `log.md` per change. Never put secrets in a page.
- Source tags on facts: `[user]` `[repo: path]` `[file: name]` `[web: url]` `[research]` `[assumption]`.
