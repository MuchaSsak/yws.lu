# Handoff 2026-10-09 (PC → laptop)

> Everything a fresh Claude Code chat needs to continue the yws.lu revamp: setup on the new machine, what is done,
> what was running at the stop, what is next, and the facts that live only in this file or on the old PC.
> The live checklist stays [revamp-plan](revamp-plan.md); the brief is
> [research/2026-10-09-kickoff-prompt.md](research/2026-10-09-kickoff-prompt.md) (verbatim, § numbers below refer to it).

## 0. First steps on the laptop

1. `git fetch && git checkout revamp/2026-10` (the user pushes it to a dev branch; never commit to `main`).
2. **Copied by hand from the PC** (gitignored, not in git). `SKILLS/` was a temporary copy and is **not** carried
   over: the six skills come from the originals in `new-portfolio/.claude/skills/` (read-only):
   | Path on the PC | Size | Why |
   | --- | --- | --- |
   | `CLAUDE.local.md` (repo root) | 1 KB | personal rules, loaded every session (text in § 9 if lost) |
   | `.case-study/` (repo root) | 33 MB | the "before" evidence: Lighthouse reports + filmstrips, PSI attempt, build log |
   | `~/.claude/skills/start-project-info/` | | user-level skill used by P1; if the laptop lacks it, read it from `new-portfolio/.claude/skills/start-project-info/` |
   | `C:\Users\Mucha\Desktop\new-portfolio\` | | the reference implementation (read-only; never open its `context/`) |
3. Install: repo root `bun install` (Next app + QA devDeps), `bunx playwright install chromium firefox webkit`,
   then `cd web && bun install` (the Astro spike has **never been installed or built** yet).
4. Start the fresh chat with: *"Read `.claude/project-info/HANDOFF.md`, `revamp-plan.md` and `CLAUDE.local.md`, then
   continue the revamp from § 4 of the handoff without asking."*

## 1. The job (short)

Revamp yws.lu (Youth Work Synergy ASBL, Luxembourg non-profit: shared homes for young people 18–34 rented from
owners, plus youth projects) in phases P0–P8 of the brief: capture the "before" → AI framework (wiki, CLAUDE.md
router, hooks, skills, gates) → design system → stack spike Astro + Lingui vs Next, decide, migrate → code structure →
performance budgets → full SEO → page slices → "after" capture, compare, `.case-study/REPORT.md` (sections A–P).
Work autonomously in one go; the user's rules are in `CLAUDE.local.md`.

## 2. Decisions so far (with tags)

| Topic | Decision |
| --- | --- |
| Jobs page | retired: 308 → About us, no JobPosting; the 2 job PDFs 308 too [user 2026-10-09] |
| TEC page | kept, internal nav, prominent link to tecpractices.eu; event (9 Apr 2026) is past (Q8) [user 2026-10-09] |
| Previews | Vercel branch previews of the work branch allowed when a public URL is needed; local first [user 2026-10-09] |
| "Stop for compact" | end the turn at once (no tool call, commit or report); after /compact continue without asking [user 2026-10-09] |
| Stack (pending spike) | Astro 7.3.8 static + Lingui 6.9 + lingui-for-astro 0.7.1, React 19.3 islands only for 3D, Tailwind 4.3.3, no Vercel adapter; host-side rules in a generated `vercel.json` [research: stack] |
| Pins | `web/package.json` bumped per research: @astrojs/react 7.0.1, R3F 9.8.1, drei 10.7.9, three 0.186.1, native-tools 0.1.6, sitemap 3.7.4, engines node ≥ 22.19 |
| Slugs | housing `youth-housing`/`logement-jeunes`, owners `rent-your-property`/`louer-son-bien`, about `about-us`/`a-propos`, projects `youth-projects`/`projets-jeunes`, tec `tec-conference`/`conference-tec`, `privacy-policy`/`politique-de-confidentialite`, `legal-notice`/`mentions-legales` [research: audiences-keywords] (applied in `web/src/lib/routes.ts` + `scripts/capture/pages.mjs`) |
| hreflang | en, fr + x-default: home → `https://www.yws.lu/` (the 307 language redirect), other pages → English (Q19: English default [assumption], research suggested FR) |
| `/` | 307 by Accept-Language (`^fr` → `/fr/`, else `/en/`), never canonical; root `index.astro` = noindex meta-refresh safety net (logement.lu links to bare `/`, Q18) |
| Legacy URLs | 2025 PascalCase routes, job PDFs, old WordPress URLs → 308 to the English page (`LEGACY` in routes.ts → vercel.json, 46 redirects) |
| Licences | Aceternity (Vortex, Timeline…), GSAP, React Bits are outside the licence list → **rewritten as own code**, never ported line by line (Q23). Magic UI (MIT) adapted with notice. `grid.svg` (unknown origin) redrawn from its geometry |
| Buttons | orange with dark text (2025 white-on-orange was 2.9:1, fails AA) |

## 3. Done

**P0 (before capture)**
- Tag `history/baseline-2026-10-09` on main's HEAD; branch `revamp/2026-10`; `.case-study/` gitignored.
- QA devDeps at root (Playwright 1.63, axe, lighthouse 13.5, chrome-launcher, sharp, gltf-transform, knip).
- Baseline `next build` (log `.case-study/before/next-build.log`).
- Capture scripts in `scripts/capture/`: `pages.mjs` (manifest, widths, flags), `lighthouse.mjs` (median of 3,
  filmstrips, now with a per-run hard limit `--run-limit`, fresh Chrome after a hang, summary merge across reruns),
  `browser.mjs` (shots, clips, axe, seo, hosts tasks), `psi.mjs`, `repo-metrics.mjs`.
- Lighthouse local, 6 of 7 pages done (§ 6). Live Lighthouse of home only in `.case-study/before/lighthouse-live-2026-10-09/` (don't overwrite).
- PSI API: quota exhausted anonymously → use the PSI web UI (or `PSI_API_KEY`).

**P1 (framework), partial**
- Research notes, all 6 in `research/`: audiences-keywords, comparable-sites, legal-asbl-luxembourg,
  seo-structured-data, stack, licences (+ the kickoff prompt).
- Wiki pages written: `revamp-plan.md`, `working-agreement.md`, `lessons.md`, `open-questions.md` (Q1–Q23),
  `placeholders.md`, `log.md`, `product/project-brief.md`, `product/requirements.md` (budgets),
  `content/content-model.md`, `tech/usage/astro.md`, `tech/usage/lingui.md`, `tech/usage/three.md`.
- `CLAUDE.local.md` (personal rules) written on the PC; memory "stop for compact".

**P3 spike (code written, never installed/built)** in `web/`:
- Config: `astro.config.mjs`, `lingui.config.ts`, `tsconfig.json`, `vitest.config.ts`, `package.json`.
- `src/lib/{locales,routes,i18n}.ts`, `src/middleware.ts`, `src/data/{organisation,supabase}.ts` (copied mechanically).
- Layout: `BaseLayout.astro` (head, hreflang, OG, font preload, skip link, in-view script), `SiteHeader.astro`,
  `SiteFooter.astro` (spike-minimal), `BodyBackground.astro` (pre-rendered glow + grid drawn from geometry).
- Effects (CSS/Astro): `Reveal` (BoxReveal), `WordFade` (TextAnimate), `LineShadow`, `Sparkles`, `ButtonLink`
  (+ shimmer); CSS in `global.css` (buttons, shimmer, line shadow, sparkles, in-view fades, scroll-driven timeline
  beam, marquee); `src/scripts/inview.ts`; `src/scripts/flow-field.ts` (own particle streaks for the housing hero).
- Pages: `[locale]/index.astro` (HomeHero + PartnerStrip), `[locale]/[page].astro` (housing only: HousingHero,
  HowItWorks, WhoGetsPriority), root `index.astro`.
- 3D: `components/three/HouseScene.astro` (poster + idle/visible loader), `house/mount.tsx`, `house/HouseCanvas.tsx`
  (same camera/light/motion as 2025, GSAP intro replaced by expo-out in `useFrame`).
- Scripts: `background.mjs` (glow WebP), `poster.mjs` (3D posters), `serve.mjs` (Vercel-like static server: redirects
  with header conditions, headers, trailing slash, brotli, 404), `vercel-config.ts` (writes/checks `vercel.json`).
- Tests: `src/lib/routes.test.ts`, `src/styles/tokens.test.ts` (AA from the @theme tokens).
- Partner logos copied to `src/assets/partners/` (Fondation **Sommer** spelling fixed in name and file).

## 4. Was running at the stop / next, in order

1. **Lighthouse baseline, finish:** jobs desktop + tec-conference (mobile + desktop) are missing. Jobs hangs under
   SwiftShader (2 of 3 mobile runs hung > 180 s: a finding for the report). Rerun on the laptop **on the same
   machine as the rest of the baseline only if numbers must be comparable**; otherwise rerun all 7 pages on the laptop:
   `bun x next build && bun x next start -p 3100`, then
   `node scripts/capture/lighthouse.mjs --phase before --base http://localhost:3100 --out .case-study/before/lighthouse-local --only jobs,tec-conference --run-limit 180000`.
   Run Lighthouse alone (no builds/shots/agents in parallel).
2. **P0 rest:** `node scripts/capture/browser.mjs --phase before --base http://localhost:3100 --tasks seo,axe`;
   same with `--base https://www.yws.lu --tasks seo,hosts`; `node scripts/capture/repo-metrics.mjs` (baseline devDeps
   from `git show history/baseline-2026-10-09:package.json`); `--tasks shots`; `--tasks clips`; outside tools (Rich
   Results Test, Schema validator, PSI web UI, an OG preview: home + 1 inner page); check `.case-study/before/owner/`
   for the user's screenshots (ask in P8 if missing); write `.case-study/before/README.md` + `metrics.json` and
   `.claude/project-info/memory/baseline.md` (committed, numbers from § 6).
3. **Spike:** `cd web && bun install`; `bun run i18n:extract`; fill `src/locales/fr/messages.po` with the **verbatim**
   French from `lib/dictionary.tsx` (same keys in `DICTIONARY.en` / `.fr`; JSX entries by hand); add
   `src/locales/catalogs.test.ts`; re-encode the house:
   `bunx gltf-transform optimize ../public/models/house.glb public/models/house.glb --compress meshopt --texture-compress webp --texture-size 1024 --simplify false`;
   `bun run background` equivalent (`node scripts/background.mjs`) for `public/bg/aurora-*.webp`; `bun run build`;
   `bun run preview` (port 4322); `bun run poster`; rebuild; `bun run test`; then measure like P0:
   `node ../scripts/capture/lighthouse.mjs --phase after --only home,looking-for-housing --base http://localhost:4322 --out .case-study/spike/lighthouse`
   (the spike home = hero + partner strip only: say so when comparing). Screenshot both at 390/1440 vs the baseline.
4. **Decide** (table in `tech/technologies.md`: Astro spike vs Next baseline vs Next 16 + Lingui fallback; Next 15.3.8
   has 31 open advisories, 15.x support ends ~2026-10-21 [research: stack § 3.3]); tag `history/pre-migration`.
5. **P1 rest:** wiki pages still to write: `README.md`, `product/audience.md`, `product/brand.md`, `site/structure.md`,
   `site/i18n.md`, `site/seo.md` (+ § Launch runbook for the owner), `design/design.md`, `design/design-quality.md`,
   `design/design-references.md`, `design/assets.md`, `tech/technologies.md`, `tech/conventions.md`,
   `tech/usage/visual-qa.md`, `legal/compliance-and-data.md`, `memory/{baseline,run-notes,slice-costs}.md`, and
   `THIRD_PARTY_NOTICES.md` at the root. Three drafting agents were started for audience/brand/design-references,
   seo/i18n/structure and compliance/assets/notices, and were **stopped before writing anything**: rerun them (sources
   = the research files + `lib/dictionary.tsx` + the decisions in § 2; shape from the portfolio's pages; templates in
   `start-project-info/references/page-templates.md`).
   Then `CLAUDE.md` (router < 150 lines, invariants from brief § 2, commands), hooks
   (`node ~/.claude/skills/start-project-info/scripts/install-hooks.mjs <repo>`), routing test (8 prompts, 3 French, 1
   noise), `routing-synonyms.json`, `wiki-check.json`; gates (`check`, `e2e`, `e2e:xb`, `lhci`, `shots`, launch/SEO
   gate in `build`; one route list), port the portfolio's e2e specs; create the 6 project skills in `.claude/skills/` (`code`,
   `commit`, `lighthouse-qa`, `awwwards`, `search-registry-items`, `wiki-lint`) adapted from the originals in
   `new-portfolio/.claude/skills/` (the `commit` skill must commit as the user's identity, not Claude's); `SKILLS/`
   stays gitignored and is never committed; `wiki-check` 0 errors; commit
   `chore(ai): add project wiki, router, hooks, skills and QA gates`.
6. **P2–P8** as in the brief (§ 6), slices in the order of `revamp-plan.md`.

## 5. Baseline findings to carry into the slices and the report

- No server-rendered metadata (`generateTranslatedMetadata` returns undefined on the server); `<html lang="en">`
  fixed; robots.txt and sitemap.xml 404; Google shows the logo alt "Youth Work Synergy (YWS) Logo" as the home title.
- Footer `tel:` holds both numbers in one link; contact email/phone on home and Rent your property are plain spans;
  footer h4/h5 used as text, `text-white/60`, icon-only social links; nav `bg-black/25` + white text fails contrast.
- `<Button><Link tabIndex=-1>` / `<Link tabIndex=-1><Button>` make CTAs keyboard-dead or nested; every section
  heading is an `<h1>`; white on orange buttons ~2.9:1; BoxReveal hides the H1 until hydration (huge LCP).
- 3D only at ≥ 1280 px; dead code: BedroomCanvas + bedroom.glb (5.3 MB) + brochure.pdf (only linked from it),
  BedroomModel preloads a missing `/models/loft_bedroom.glb` (404); unused: useResizeWarning (+ sonner), hero-parallax,
  face-api.js, rough-notation, split-type, mini-svg-data-uri, next-themes, ogl, `public/images/houses/*`, the form
  screenshot, `tec_compendium.png`; ReactQueryDevtools ships in production; postprocessing/three peer mismatch.
- Content: TEC page English-only and hard-coded, event past but still "Register"; Safe Paths workshops (Apr–May 2026)
  past; 3 project texts (Girlssective, Mobile Learning, Sport) are French inside the English dictionary; FR "Learn
  more" = "Apprendre encore plus" (keep verbatim, propose a fix); typo "éduacteur"; "Fondation Summer" → "Sommer";
  home "up to 90%" vs research: 90 % flat from tax year 2024 (Q17); the carousel skips index 0 (`.emptyFolderPlaceholder`).
- Licences (research: licences): root `LICENSE` is Babel's MIT text (Q20); Aceternity/GSAP/React Bits not allowed
  (Q23); SplashCursor derives from Pavel Dobryakov's MIT fluid sim without notice; outline Lucide social icons break
  brand rules; `erasmus.svg` is the old 2014–20 logo, EU emblem rules (Q21); 5 Sketchfab models CC BY 4.0, "Heart in
  Love" credit has no model (remove), house.glb needs "modified".
- SEO research: FAQ rich results gone (2026-05-07); no Event rich results for LU/FR; favicon must be ICO/PNG ≥ 48 px;
  `public/ms32821332.txt` (Microsoft 365 verification) must be carried over; NAP varies across the web (…597312 vs
  …597315, a third address on Av. de la Porte-Neuve); RCS F14106 (confirm on lbr.lu, Q1); YWS is on the Ministry's
  official GLS list; never "GLS" alone in titles; housing page must state eligibility (18–34).
- Legal research: ASBL law of 7 Aug 2023 art. 20 mentions; Vercel Inc. address for the privacy policy; the My Maps
  iframe sets `NID` on load → click-to-load facade; GDPR digital consent age 16 in LU.

## 6. Baseline Lighthouse (local `next start`, Lighthouse 13.5, median of 3, SwiftShader, en)

| Page | Mode | Runs | Perf | A11y | BP | SEO | FCP ms | LCP ms | CLS | TBT ms | SI ms | KB | Req | JS KB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | mobile | 3 | 41 | 78 | 100 | 82 | 6836 | 49721 | 0.02 | 681 | 7216 | 9096 | 57 | 974 |
| home | desktop | 3 | 30 | 78 | 100 | 82 | 1423 | 8337 | 0.178 | 3252 | 2129 | 9195 | 70 | 1070 |
| looking-for-housing | mobile | 3 | 35 | 81 | 100 | 82 | 4965 | 45776 | 0.036 | 1950 | 5122 | 8556 | 35 | 539 |
| looking-for-housing | desktop | 3 | 65 | 81 | 100 | 82 | 899 | 7670 | 0.006 | 227 | 1448 | 8657 | 44 | 637 |
| rent-your-property | mobile | 3 | 36 | 84 | 100 | 82 | 5117 | 33619 | 0.021 | 1149 | 7006 | 6530 | 33 | 541 |
| rent-your-property | desktop | 3 | 68 | 84 | 100 | 82 | 948 | 3129 | 0.001 | 364 | 1584 | 8669 | 44 | 637 |
| about-us | mobile | 3 | 30 | 82 | 100 | 82 | 4982 | 19160 | 0.019 | 2708 | 7437 | 9123 | 46 | 609 |
| about-us | desktop | 3 | 60 | 82 | 100 | 82 | 901 | 7898 | 0.03 | 371 | 1764 | 8899 | 53 | 637 |
| we-spark-projects | mobile | 3 | 34 | 81 | 100 | 82 | 5068 | 35255 | 0 | 1587 | 6093 | 8929 | 46 | 533 |
| we-spark-projects | desktop | 3 | 66 | 81 | 100 | 82 | 1033 | 7887 | 0.007 | 395 | 1722 | 8811 | 57 | 637 |
| jobs | mobile | **1** | 27 | 80 | 100 | 82 | 5040 | 19148 | 0 | 6712 | 10031 | 8555 | 35 | 537 |

Missing: jobs desktop (run 1 hung > 180 s, then stopped), tec-conference (both). Measured on the PC (Windows 11);
laptop numbers are not comparable with these: either finish on the PC or rerun all pages on the laptop and say so.
Targets: mobile perf ≥ 95 (floor 90), LCP ≤ 2.0 s, TBT ≤ 100 ms, CLS ≤ 0.05, a11y/BP/SEO 100 ([requirements](product/requirements.md)).

## 7. Open questions that block most (full list: [open-questions](open-questions.md))

Q1 legal name / RCS / president (legal notice) · Q2 which phone is which · Q8 TEC past-tense copy · Q17 90 % vs 75 %
· Q19 x-default · Q20 code owner + LICENSE · Q21 EU emblem · Q23 replacements (decided by rule).

## 8. Environment gotchas (also in [lessons](lessons.md))

- Windows 11, Git Bash + PowerShell. Heredocs with backticks/`$` inside `cat <<'EOF'` broke once: write files with the Write tool.
- The user may run `next dev` on :3000: use your own ports (3100 Next, 4322 Astro); never kill processes you didn't
  start; never wipe `.next` under a running dev server.
- Lighthouse: SwiftShader flags (deterministic); shots/clips: GPU flags; run Lighthouse alone.
- Never type a key, id or URL from memory: copy it mechanically (a fabricated Supabase key was caught once).

## 9. Personal rules (the content of the gitignored `CLAUDE.local.md`, if it can't be copied)

Reply in English; code, commits, wiki in English. Work until done; ask only when blocked on a decision that is
genuinely the user's; compaction is not a pause. On "stop"/"pause"/"wait" and when a task is finished: commit
everything (WIP fine), then two lines (where you stopped, what's next). "Stop for compact": end the turn at once, then
continue after the compaction without asking. Commit as the user's global git identity (MuchaSsak), Conventional
Commits, push only when asked, never to `main`; Vercel branch previews allowed when a public URL is needed. Reports
short, real numbers, say what was not verified. Never change Vercel, DNS or Supabase settings: write the steps.
Never open `C:\Users\Mucha\Desktop\new-portfolio\context\`; `new-portfolio` is read-only.
