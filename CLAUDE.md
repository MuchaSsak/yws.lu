# yws.lu - Youth Work Synergy ASBL's website (2026-10 revamp)

The website of Youth Work Synergy ASBL, a Luxembourg non-profit that rents homes from private owners and sublets
furnished rooms in shared houses to young people (18–34), and runs youth projects. Built in 2025 on Next.js; the
2026-10 revamp (branch `revamp/2026-10`) moves it to **Astro + Lingui in `web/`** with en + fr on real URLs, full SEO,
budgets, a design system and QA gates. Mental model: **text first, 3D second, one tap to act.** The knowledge lives in
the wiki at `.claude/project-info/` (map: `.claude/project-info/README.md`). This file is the router and the
non-negotiables: read only the pages your task needs. Paths are plain text on purpose (no @imports).

## Routing table

| Task touches | Read |
| --- | --- |
| **How a session works here**: new chats, quality bar, definition of done, compaction, pausing, reports, lessons, slices, one slice at a time, polish loop | `.claude/project-info/working-agreement.md` (+ `.claude/project-info/lessons.md`) |
| **The revamp**: phases P0–P8, what is done, what is next, resume after compaction, checklist, handoff between machines | `.claude/project-info/revamp-plan.md` (+ `.claude/project-info/HANDOFF.md`) |
| The brief, goals, scope, priorities, what we are NOT building, stakeholders, risks | `.claude/project-info/product/project-brief.md` |
| Young people, tenants, property owners, landlords, partners, funders, practitioners, audiences, what they search, objections | `.claude/project-info/product/audience.md` |
| Copy, microcopy, wording, voice, tone, headlines, H1, CTA labels, site name, claims never to make | `.claude/project-info/product/brand.md` |
| Features, acceptance criteria, budgets, performance targets, Lighthouse score, LCP, Core Web Vitals, accessibility, a11y, WCAG | `.claude/project-info/product/requirements.md` |
| Organisation facts, address, phone, email, socials, statistics, Supabase data, house pictures, content sources, dictionary | `.claude/project-info/content/content-model.md` |
| Pages, sitemap, sections, hero, header, navigation, menu, footer, contact, CTA, apply for housing, map, 404, jobs retired, TEC conference page | `.claude/project-info/site/structure.md` |
| Locales, translation, French, English, language switcher, hreflang, x-default, URL prefix, slugs, catalogs | `.claude/project-info/site/i18n.md` |
| SEO, Google, Search Console, Bing, IndexNow, metadata, titles, descriptions, JSON-LD, structured data, OG images, link previews, sitemap, robots, canonical, host, redirects, launch runbook | `.claude/project-info/site/seo.md` |
| Design system, tokens, colours, typography, spacing, motion, animation, buttons, components, 3D rules, backgrounds, specimen | `.claude/project-info/design/design.md` |
| Design score, quality rubric, score a view, weakest point, instant fail | `.claude/project-info/design/design-quality.md` |
| Inspiration, references, comparable sites, Mobbin, Awwwards, patterns, registry components | `.claude/project-info/design/design-references.md` |
| Assets, images, photos, models, glb, fonts, logos, icons, licences, credits dialog, third-party notices, compression | `.claude/project-info/design/assets.md` |
| Legal, legal notice, mentions légales, privacy policy, GDPR, cookies, consent, processors, photo rights, ASBL | `.claude/project-info/legal/compliance-and-data.md` |
| Stack, Astro, Next, framework decision, spike, versions, hosting, Vercel, vercel.json, env vars, commands, build, deploy | `.claude/project-info/tech/technologies.md` |
| Code style, folders, naming, git, commits, branches, tags, testing bar, do-not list | `.claude/project-info/tech/conventions.md` |
| Writing Astro pages and components, BaseLayout, Tailwind classes, tokens in code, islands, static server | `.claude/project-info/tech/usage/astro.md` |
| Translatable copy, add a translation, Lingui macros, .po files, extract, French catalog | `.claude/project-info/tech/usage/lingui.md` |
| 3D, three.js, React Three Fiber, house model, posters, WebGL, shaders, gltf-transform | `.claude/project-info/tech/usage/three.md` |
| Screenshots, visual QA loop, e2e gates, Playwright, axe, text fit, layout sweep, accept proof | `.claude/project-info/tech/usage/visual-qa.md` |
| Measured numbers, baseline, before numbers, run notes, command timings, slice costs, budget left | `.claude/project-info/memory/run-notes.md` (+ `.claude/project-info/memory/baseline.md`, `.claude/project-info/memory/slice-costs.md`) |
| Placeholders, copy for approval, typo fixes, not real, wrap up, go to prod, launch | `.claude/project-info/placeholders.md` (+ `.claude/project-info/open-questions.md`) |
| Anything unresolved, unknowns, blockers, questions for the owner or the client | `.claude/project-info/open-questions.md` |
| Research evidence, sources, why we decided X | `.claude/project-info/research/2026-10-09-kickoff-prompt.md` (+ the other `research/2026-10-09-*.md`) |
| Wiki history, what changed when | `.claude/project-info/log.md` |

## Invariants (break none)

- **Practicality ≥ wow:** every page impressive within 3 s AND usable in 1 tap on a phone. No preloader, gate or
  scroll-jacking; same content on mobile (`.claude/project-info/design/design.md`).
- **Text first:** the H1 is the LCP. 3D, shaders, video and maps load after it, near visibility, with a static
  fallback and full `prefers-reduced-motion` support; heavy loops play only when visible (`.claude/project-info/tech/usage/three.md`).
- **Truth:** no invented facts, numbers, testimonials, dates, addresses, legal numbers or partner names. Client facts
  come from the client. Placeholders: marked `PLACEHOLDER`, logged in `.claude/project-info/placeholders.md`, said in chat.
- **French that exists is human text:** keep the client's wording; fix typos, grammar and literal (calqued) microcopy,
  each fix listed. New French is native, never literal, and marked for review (`.claude/project-info/site/i18n.md`).
- **Licences:** every font, image, model, icon, library and copied component is free for commercial use (OFL, Apache,
  MIT, BSD, ISC, CC0, CC BY with credit) or the client's / owner's own work. Unknown = not used. Aceternity, GSAP and
  React Bits code is rewritten as own code (`.claude/project-info/design/assets.md`).
- **No forms, ever:** no contact, application, newsletter, chat or booking form; contact is email, phone, map, socials.
- **Improve, don't add features.** New pages only where SEO needs an HTML home for existing content.
- **Never touch production:** work on `revamp/2026-10`, never commit to `main`, push only when asked; Vercel, DNS and
  Supabase settings are owner steps (`.claude/project-info/site/seo.md` § Launch).
- **Never weaken a gate to pass:** fix the page. **Keep every version:** tag `history/*` before a big change.
- **Privacy of inputs:** never read `.env*` or secrets (name env vars only); never open the portfolio's `context/`.

## How every session works

- Start: read the routed pages (the prompt hook lists them) and apply the lessons (the session card carries them).
- Keep working through compactions until the task is done or the owner says stop; resume from `revamp-plan.md`.
- One slice at a time, looped until every gate passes (`.claude/project-info/working-agreement.md` § 9).
- Finish: verify → update the page + `log.md` → lessons → commit (owner's identity, never push) → short report.
- Details: `.claude/project-info/working-agreement.md`. Personal rules: `CLAUDE.local.md` (gitignored).

## Commands

| Do | Run |
| --- | --- |
| Lint the wiki / test routing | `node .claude/hooks/wiki-check.mjs` · `node .claude/hooks/wiki-context.mjs --test "<prompt>"` |
| Install / dev (site in `web/`) | `cd web && bun install` · `bun run dev` (4321) |
| Typecheck + lint + unit | `cd web && bun run check` |
| Build (+ SEO/launch gate) / serve like Vercel | `bun run build` · `bun run preview` (4322) |
| e2e / cross-browser / Lighthouse / shots | `bun run e2e` · `bun run e2e:xb` · `bun run lhci` · `bun run shots` (all: `.claude/project-info/tech/technologies.md` § Commands) |
| Case-study capture (repo root) | `node scripts/capture/lighthouse.mjs --phase after …` · `node scripts/capture/browser.mjs …` |
