# yws.lu: bring in the AI working framework, then revamp SEO, performance, design and code, and bring back the evidence

You are working in `C:\Users\Mucha\Desktop\yws.lu`. This is a long, autonomous, multi-phase task. It is meant to be a
lot. Work through it end to end. Compaction is not a stop: keep going until every phase below is done or I say stop.
Read this whole message before you act, then save it verbatim to `.claude/project-info/research/2026-10-09-kickoff-prompt.md`
once the wiki folder exists, so it survives compactions.

---

## 0. Who, what, why

- I'm **Mateusz Muszarski** (GitHub `MuchaSsak`), a full-stack developer. In 2025 I built **yws.lu** in under a week
  (the README says so) for **Youth Work Synergy ASBL**, a Luxembourg non-profit: housing for young people, landlords
  renting their property to the organisation, jobs, the TEC Conference and "We Spark" projects. Stack today: Next.js
  15.3 (App Router), React 19, bun, Tailwind 4, shadcn/ui + Magic UI + React Bits-style components, React Three Fiber +
  drei + postprocessing, GSAP, motion, ogl, cobe, Supabase, en + fr via a hand-made client-side dictionary.
  Live at https://yws.lu (Vercel). 111 commits. A GitHub Action (`.github/workflows/release.yml`) builds releases from
  Conventional Commits on pushes to `main`.
- Since then I built my portfolio (`C:\Users\Mucha\Desktop\new-portfolio`) with a mature **AI working framework**: a
  wiki in `.claude/project-info/`, a `CLAUDE.md` router, session hooks, a lessons loop, and hard QA loops
  (Playwright screenshots at many widths, a text-fit probe for every locale, axe, Lighthouse median-of-3 with budgets,
  a launch gate for SEO). **Bring that framework here, then use it to improve this site.**
- **Goals, in priority order:**
  1. The framework: wiki + router + hooks + lessons + skills + gates, adapted to this project.
  2. **The best SEO we can get**, and **ready for Google Search Console** (and Bing).
  3. Performance and accessibility within the budgets in § 7.
  4. A **design system** documented from the current look, made more stable, coherent and professionally presentable.
  5. **Objective** visual and UX improvements on every page, researched (Mobbin, Awwwards, registry, web), keeping the feel.
  6. Cleaner, better-structured, scalable code. Migrating to **Astro + Lingui** is the default if the spike in § 6 P3 wins.
  7. **Evidence:** before/after numbers, screenshots and clips, and a final report (§ 10) that I will paste into my
     portfolio session, where we will write a case study of these improvements (maybe also a Claude Motion video for the client).
- **The feel stays.** It is a playful, colourful 3D site for a youth organisation. Keep its identity, its 3D moments and its
  warmth. Improve what is objectively better (speed, legibility, hierarchy, consistency, mobile ergonomics, accessibility,
  findability). Anything that changes the feel noticeably is a proposal with before/after shots, not a silent change (§ 6 P7).

---

## 1. What I already saw (read-only look on 2026-10-09). Verify each item before you act on it

Live site (checked with curl on 2026-10-09):
- **No `<title>`, no meta description, no canonical, no hreflang, no JSON-LD** on `/` and `/AboutUs`. Cause, from the code:
  `generateTranslatedMetadata()` in `lib/utils.ts` returns `undefined` on the server (`typeof window === "undefined"`), so
  Next renders no metadata at all.
- **`robots.txt` and `sitemap.xml` don't exist:** the apex 308s them to `https://www.yws.lu/…`, where both render Next's
  404 page (with `noindex`). Find out which host is primary in Vercel; one canonical host everywhere.
- **French is invisible to Google:** the language comes from `navigator.language` on the client (`contexts/LanguageContext.tsx`),
  same URL for both languages, `<html lang="en">` fixed. The fr dictionary (in `lib/dictionary.tsx`, ~1,289 lines, en + fr)
  is never indexable.
- The footer phone link is broken: `href="tel:286622 • 661597312"` (two numbers in one link).
- Footer: `<h4>`/`<h5>` used for plain text (heading order), text faded with `text-white/60` (contrast risk), icon-only
  social links with no accessible name, `sticky` + backdrop blur. The language picker shows a flag emoji only (no text label).
- Routes are PascalCase (`/AboutUs`, `/LookingForHousing`, `/RentYourProperty`, `/WeSparkProjects`, `/Jobs`,
  `/TecConference`). The nav's "TEC Conference" links out to `tecpractices.eu` although `/TecConference` exists: find out why.

What people see today (my screenshots, 2026-10-09):
- **Google** (`yws luxembourg site:yws.lu`): the home page's title in Google is **"Youth Work Synergy (YWS) Logo"**
  (with no `<title>`, Google most likely took the logo's alt text, "Youth Work Synergy (YWS) Logo", from the live HTML). The site name flips between "Youth - Work - Synergy" and
  "Youth Work Synergy". The About us snippet is the footer's address text. The other results are titled from H1s
  ("We Spark Projects", "Much More Than a Method"). URLs show the PascalCase paths on `www.yws.lu`. Only English appears.
- **Discord:** a pasted `https://yws.lu/` link shows **no preview card at all** (no Open Graph tags, no image).

Repo (read in code, unverified):
- `public/images` is **~265 MB**: ten JPGs of **25–30 MB each** in `public/images/projects/{get-your-home,locked-out}/`.
  `public/models` is 13 MB (`rocket.glb` 6.1 MB, `bedroom.glb` 5.3 MB).
- `face-api.js` is a dependency with no import found. `@tanstack/react-query-devtools` is a dependency. Two
  `shine-border.tsx` (in `components/magicui/` and `components/ui/`). `SplashCursor` (WebGL fluid cursor) on the TEC page.
  `hooks/useResizeWarning.ts`: check what it does to users.
- `middleware.ts` runs Supabase `updateSession` on every request. If the site has no auth, that is pure latency.
- Supabase serves house pictures and the "real impact" statistics (`services/`, `hooks/tanstack/`).
- A fixed full-screen background with seven radial gradients under `blur-[6.25rem]` on every page (`BodyBackground.tsx`):
  measure its paint cost.
- No tests, no Playwright, no Lighthouse, no ESLint config beyond `next lint`, no `.env.example` (check).
- `public/ms32821332.txt`: probably a verification file. Find out what it is and keep it working.

---

## 2. Non-negotiables (they go into `CLAUDE.md` § Invariants)

- **Practicality ≥ wow:** every page impressive within 3 s AND usable in 1 tap on a phone. No preloader, gate or
  scroll-jacking. Same content on mobile.
- **Text first:** the H1 is the LCP. 3D, shaders, video and maps load after it, near visibility, with a static fallback
  and full `prefers-reduced-motion` support. Heavy loops play only when visible.
- **Truth:** no invented facts, numbers, testimonials, dates, addresses, legal numbers or partner names. The client's
  content and statistics come from the client (constants, dictionary, Supabase). New copy (titles, descriptions, alt text,
  microcopy) is factual and close to the client's words, and is listed in the report for the client to approve.
  Placeholders are allowed while building: mark them `PLACEHOLDER` in code/data, log them in
  `.claude/project-info/placeholders.md`, and mention each in chat.
- **French that already exists is human text:** keep it verbatim (fix only obvious typos, and list them). New French
  strings are written natively, never literally, and marked for review.
- **Licences (my hard rule):** every font, image, texture, model, icon, sound, library and copied component must be free
  for commercial use (OFL, Apache, MIT, BSD, ISC, CC0, CC BY with its credit shown) or the client's / my own work.
  Unknown licence = not used. Check each one's actual LICENSE (Magic UI, Aceternity-style components, React Bits-style
  components, the four `.glb` models, Montserrat, every npm dependency) and record it in `assets.md`. The existing
  "See credits" dialog must stay correct.
- **Privacy of inputs:** never read real `.env*` files or secrets; name env vars, never values. Never open
  `C:\Users\Mucha\Desktop\new-portfolio\context\` (private). Treat `new-portfolio` as **read-only**: never write to it.
  Research screenshots of third-party sites stay local (gitignored).
- **No forms, by design** [user 2026-10-09: "we deliberately decided not to have internal forms on the website"]:
  no contact form, application form, newsletter sign-up, chat widget or booking flow, and no other data-collecting
  feature. Contact stays email, phone, map and socials. Make those **more impressive, intuitive and higher-converting**
  (clear primary actions per audience, modern UI, one tap on a phone), never by adding a form.
- **Improve, don't add features:** the work is quality, speed, findability and design on the content and journeys that
  exist. New pages only where SEO needs a real HTML home for existing content (e.g. a job offer that is only a PDF today).
- **Never touch production:** work on a branch (§ 4). Never push unless I ask. Never change Vercel, DNS or Supabase
  settings yourself; write the steps for me instead.
- **Never weaken a gate to pass.** Fix the page.
- **Keep every version** (for the case study): tag before each big change (`history/*`), never delete a superseded look
  without capturing it first.

---

## 3. Personal rules: write these into `CLAUDE.local.md` (gitignored), already answered

- Language: reply and report in English; code, commits and the wiki in English.
- Autonomy: work until the task is done; ask only when blocked on a decision that is genuinely mine. Compaction is not a pause.
- Pausing: when I pause you ("stop", "pause", "wait", an interrupt) and when a task is finished: commit everything
  (WIP is fine), then two lines: where you stopped, what's next.
- Commits: you commit, using my global git identity (MuchaSsak), as Conventional Commits; **push only when I ask**.
- Reports: short; real numbers from real output; say what was not verified.
- A later explicit instruction in the chat wins.

So **skip the intake interview** of `start-project-info` (Batch A and B are answered here and in § 4). Facts you can't
find go to `open-questions.md` as `Unknown`, with a default marked `[assumption]`. Don't block on them.

---

## 4. Decisions already made (defaults; record each in the wiki with its tag)

| Topic | Decision | Tag |
| --- | --- | --- |
| Branch | Before anything: `git tag history/baseline-2026-10-09` on `main`'s HEAD, then work on `revamp/2026-10`. Never commit to `main` | [user] |
| Stack | Default: migrate to **Astro + Lingui** (the stack my portfolio proved), **if the spike in § 6 P3 beats the measured Next baseline**. If it doesn't, stay on Next and move to server-rendered i18n with Lingui | [user 2026-10-09: "migrate the silly dictionary to Lingui", "maybe even switch to Astro for faster loading"] |
| i18n | en + fr, both server-rendered and indexable: locale-prefixed URLs (`/en/…`, `/fr/…`), `<html lang>` per locale, reciprocal hreflang + `x-default`, a real switcher with text labels ("English", "Français"). `/` redirects by `Accept-Language` (307, never canonical) the way my portfolio does it (its `i18n.md`) | [assumption, mirrors the portfolio] |
| More locales | None now (German / Luxembourgish is the client's call: open question). Build so adding one is a catalog + a config line | [assumption] |
| URLs | Lowercase kebab-case slugs, **localized per locale** from the keyword research (e.g. `/en/apply-for-housing/` ↔ `/fr/<the French slug people's queries suggest>/`), all from one route map. **Every old URL keeps working with a 308** to its English page (what Google indexed), both hosts, with and without trailing slash, tested | [user 2026-10-09: "localize the searches … as we like to do"] |
| SEO per locale | Keyword research per locale, then per page × locale: its own title, description, H1 agreement, slug, Open Graph image with localized text, `og:locale` + alternates, JSON-LD `inLanguage`. All static, generated at build | [user 2026-10-09] |
| Forms | None, ever (§ 2) | [user 2026-10-09] |
| Host | One canonical host (find which one Vercel serves as primary; the evidence says `www.yws.lu`). The other host 308s to it | [assumption: verify] |
| Author credit | Keep the existing credits dialog. No new "site by" link or `creator` markup pointing at my site until I confirm the client's OK (open question) | [user] |
| Analytics | None added without my OK (privacy policy first). Search Console and Bing need no cookies | [assumption] |
| Case study | Comes after everything here is finished. Your job is to collect the evidence (§ 10) | [user] |

---

## 5. The reference implementation: read it, adapt it, never copy its content

My portfolio is the working example of everything below. Read the files, port the **mechanics**, and write this project's
**own content**. Its brand, colours, fonts, "Poster" art direction, anti-slop taste list, owner facts and copy do not
apply here. Don't copy files you haven't read.

| Piece | Where (all under `C:\Users\Mucha\Desktop\new-portfolio\` unless absolute) |
| --- | --- |
| **The skill that builds the framework** | `C:\Users\Mucha\.claude\skills\start-project-info\SKILL.md` (+ `references\page-templates.md`, `scripts\install-hooks.mjs`, `scripts\past-messages.mjs`). It is user-invoked only, so read the file and follow it: I am explicitly asking you to |
| Router example | `CLAUDE.md` (routing table, invariants, "how every session works", commands) |
| Wiki map + rules | `.claude\project-info\README.md` |
| How sessions work | `.claude\project-info\working-agreement.md` (quality bar, done criteria, compaction, pausing, finishing, report, lessons loop, the slice loop § 9) |
| Lessons | `.claude\project-info\lessons.md`: port the **generic** ones (tools and environment, Windows/Git Bash quirks, Playwright, WebGL, a11y, CSS performance, locales); skip the ones about my portfolio |
| Visual QA loop | `.claude\project-info\tech\usage\visual-qa.md` |
| Design score rubric | `.claude\project-info\design\design-quality.md` (keep the structure: craft rules, accessibility floor, instant-fail list, weights, caps, quick diagnostic; rewrite the content for yws) |
| Design system page | `.claude\project-info\design\design.md`, `design-references.md`, `assets.md` (shape only) |
| SEO | `.claude\project-info\site\seo.md`, `site\i18n.md`, `site\structure.md` (footer, sitemap, CTA inventory) |
| Stack docs | `.claude\project-info\tech\technologies.md`, `conventions.md`, `usage\astro.md`, `usage\lingui.md` |
| Budgets | `.claude\project-info\product\requirements.md` (§ Non-functional) |
| Legal facts | `.claude\project-info\legal\compliance-and-data.md` |
| Measured numbers | `.claude\project-info\memory\run-notes.md`, `memory\slice-costs.md` |
| Skills | **I already copied them, temporarily, into `SKILLS/` at this repo's root** (untracked): `awwwards`, `code`, `commit`, `lighthouse-qa`, `search-registry-items`, `wiki-lint`, `start-project-info`. In your first message, acknowledge them. Then move the first six into `.claude\skills\` and adapt each (commands, paths, stack, this project's wiki pages; nothing about my portfolio left in them). `start-project-info` is a user-level operator skill already in `C:\Users\Mucha\.claude\skills\`: use it, don't keep a project copy. Finally delete `SKILLS/` and make sure it was never committed. Originals for comparison: `new-portfolio\.claude\skills\` |
| QA scripts | `apps\web\scripts\shots.mjs` (screenshots), `lighthouse.mjs` (median-of-3 + budgets, exits 1 on a miss), `launch-gate.mjs` + `launch.mjs` (SEO/launch gate), `og.mjs` (share images per page × locale), `sitemap-images.mjs`, `not-found.mjs` |
| e2e gates | `apps\web\e2e\a11y.spec.ts` (axe WCAG 2.2 AA), `layout.spec.ts` (overflow 320–2560), `text-fit.ts` + `text-fit.spec.ts` (text spilling, clipping, split words in every locale and state), `chrome.spec.ts` (header, menu, footer, focus not under the header), `i18n.spec.ts` (head, hreflang, switcher, console + CSP errors), `motion.spec.ts`, `pages.spec.ts`, `routes.ts` (every route, one list) |
| SEO code | `apps\web\src\lib\schema.ts` (JSON-LD graph with stable `@id`s), `src\lib\routes.ts` (one path builder → links, hreflang, sitemap), `src\components\layout\BaseLayout.astro` (head), `src\pages\robots.txt.ts`, `src\pages\llms.txt.ts`, `src\pages\[locale]\rss.xml.ts`, `apps\web\vercel.json` (redirects), `src\middleware.ts` |
| A professional footer | `apps\web\src\components\layout\SiteFooter.astro` + `structure.md` § Footer (mechanics: data from one source, real links, accessible names) |

---

## 6. The phases

Keep a live plan with checkboxes in `.claude/project-info/revamp-plan.md` and update it as you go (it is how you
resume after a compaction). Use subagents for parallel research and audits; keep the main thread for decisions and code.

### P0. Capture the "before" (do this first, change nothing)

Everything here is evidence for the case study. Same scripts and settings will run again in P8.

1. `git tag history/baseline-2026-10-09`, create the branch, add `.case-study/` to `.gitignore` (heavy media stays local).
2. Install the QA tooling as devDependencies (Playwright + Chromium/Firefox/WebKit, `@axe-core/playwright`, `lighthouse`,
   `sharp`, `@gltf-transform/cli`, `knip`). Commit only the tooling.
3. Build the baseline locally (`bun run build && bun run start`, or a static export if it works) and measure:
   - **Lighthouse** mobile (median of 3) + desktop on every route: scores, FCP, LCP, CLS, TBT, Speed Index, transfer KB,
     request count, JS KB. Keep each JSON report and the **filmstrip thumbnails** (a load filmstrip is the clearest
     "it got faster" picture for a non-technical reader).
   - **Live, already captured:** my portfolio session ran Lighthouse 13.5 on the live `https://www.yws.lu` routes on
     2026-10-09 (mobile + desktop, 3 runs each, median run kept, HTML + JSON reports, filmstrips, final screenshots) into
     `.case-study/before/lighthouse-live-2026-10-09/` (start with its `README.md` and `summary.json`). Don't overwrite it;
     it is the "before" of the live site. Gitignore `.case-study/` before your first commit (the folder already exists, untracked).
   - **Live, field data:** PageSpeed Insights API on `https://www.yws.lu/` and every route, mobile + desktop
     (`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=…&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`),
     with CrUX field data if any exists (say so if none).
   - **axe** violations per route (count + rules), keyboard path notes, focus visibility.
   - **SEO audit** per route: title, description, canonical, hreflang, `lang`, H1 count and heading tree, JSON-LD, OG
     tags, image alts, robots.txt, sitemap, status codes, redirect chains, host consistency, broken links.
   - **Weights:** repo `public/` size, each image and model, total page weight per route, fonts, JS per route
     (gz), the dependency count, `knip` unused files/exports/deps, TypeScript errors, lint errors, lines of code.
4. **Screenshots** of every route, en and fr (switch the language the way a visitor would), at 320 / 390 / 768 / 1024 /
   1440 / 1920 / 2560, full page (at device scale 1 for long pages: full-page shots past ~16,384 device px go black),
   plus reduced motion. WebGL in headless Chromium needs `--use-angle=swiftshader --enable-unsafe-swiftshader`.
5. **Clips** (Playwright `recordVideo`, then ffmpeg to mp4 if available): the first 5 s of each page loading at 390 and 1440,
   a scroll through each page, the mobile menu, the language switch.
6. **How the site looks outside the site:** run the live URLs through real tools and screenshot them: the Rich Results
   Test, the Schema.org validator, PageSpeed Insights, and a link-preview checker (e.g. LinkedIn Post Inspector or an
   Open Graph preview tool) for the home page and one inner page. I will drop my own screenshots (the Google `site:`
   search and the empty Discord preview from § 1) into `.case-study/before/owner/`: list and caption them if they are there,
   and ask me for them in the P8 progress note if they aren't. Don't scrape Google results with a bot.
7. Save everything under `.case-study/before/` with a `README.md` index and a machine-readable `.case-study/before/metrics.json`.
   Put the key numbers in the wiki too: `.claude/project-info/memory/baseline.md` (committed).

### P1. The framework (wiki + router + hooks + skills + gates)

Follow `start-project-info` (mode *new*), with § 3 and § 4 as the intake answers. In order:

1. **Read the room:** manifests, configs, every route and component, `lib/constants.ts` (the organisation's facts),
   `lib/dictionary.tsx`, `services/`, `canvases/`, git history (`git log` is the project's timeline), the live site.
   Recover earlier Claude sessions on this repo if any: `node C:\Users\Mucha\.claude\skills\start-project-info\scripts\past-messages.mjs <this repo> --rules`.
2. **Research** (parallel subagents, raw notes in `research/2026-10-09-<topic>.md` with URLs and dates, "Not covered:" at the end):
   - the organisation and its audiences: young people looking for housing in Luxembourg, property owners, partners and
     funders, job applicants, conference attendees; what each searches for (fr / en / de / lb queries) and what they need to find in one tap;
   - comparable sites (Luxembourg social housing agencies and youth organisations, European housing non-profits): structure,
     trust signals, CTAs, footers, what they do better and worse;
   - SEO for a Luxembourg non-profit (local SEO, Google Business Profile, multilingual), current Google docs for every
     structured data type you plan to use (check what still earns rich results in 2026; don't promise any);
   - legal facts for an ASBL site in Luxembourg (GDPR, cookies, legal notice); facts only, never a compliance claim;
   - the stack: current Astro, Lingui, R3F-in-Astro, Next 15/16 notes, Vercel adapter; versions and the date checked.
3. **Write the wiki** in `.claude/project-info/` with the portfolio's folder layout. Pages this project needs:
   `README.md`, `working-agreement.md`, `lessons.md`, `open-questions.md`, `placeholders.md`, `log.md`, `revamp-plan.md`;
   `product/` (`project-brief.md`, `requirements.md` with budgets, `audience.md`, `brand.md`: voice per locale from the
   current copy); `content/content-model.md` (the organisation's facts as one data source, pages' content, Supabase data);
   `site/` (`structure.md`, `i18n.md`, `seo.md`, `analytics.md` only if analytics are added); `design/` (`design.md`,
   `design-quality.md`, `design-references.md`, `assets.md`); `tech/` (`technologies.md`, `conventions.md`, `usage/visual-qa.md`
   + one usage page per stack piece you actually touch: `usage/astro.md` or `usage/next.md`, `usage/lingui.md`, `usage/three.md`);
   `legal/compliance-and-data.md`; `memory/` (`baseline.md`, `run-notes.md`, `slice-costs.md`). Only pages with real content.
4. **Wire it:** `CLAUDE.md` (router + invariants from § 2 + "how every session works" + commands, under ~150 lines,
   plain paths, no `@imports`), `CLAUDE.local.md` from § 3, hooks via
   `node C:\Users\Mucha\.claude\skills\start-project-info\scripts\install-hooks.mjs <repo>`. Test routing with at least
   eight realistic prompts (three in French, e.g. "corrige le pied de page", "ajoute une page offre d'emploi") and one
   noise prompt that must route nowhere. Add `routing-synonyms.json` and `wiki-check.json` (code areas → pages).
5. **Move the skills** from `SKILLS/` into `.claude/skills/` (`code`, `commit`, `lighthouse-qa`, `awwwards`,
   `search-registry-items`, `wiki-lint`), adapted to this stack and these paths; delete `SKILLS/` (§ 5).
6. **Port the gates** (§ 7) as scripts + `package.json` commands: `check` (typecheck + lint + unit), `e2e`, `e2e:xb`,
   `lhci`, `shots`, the launch/SEO gate inside `build`. A route list in one file feeds every sweep.
7. `node .claude/hooks/wiki-check.mjs` → 0 errors. Commit: `chore(ai): add project wiki, router, hooks, skills and QA gates`.

### P2. The design system, written from the current state

1. **Inventory what exists** from the code and the rendered pages: colours (every hex/hsl/Tailwind colour actually used),
   type (families, sizes, weights, line heights, letter spacing per role), spacing, radii, shadows, borders, z-layers,
   breakpoints, motion (durations, easings, what animates where), icons, imagery, 3D scenes, backgrounds, component variants
   (buttons, cards, section headers, carousels, dialogs, timeline, select). Screenshot a contact sheet of them.
2. **Consolidate:** one token set (Tailwind 4 `@theme` + CSS custom properties), one type scale (`clamp()` with real
   maxima), one spacing scale, one radius/shadow set, one motion set (custom ease-out curves, 200–900 ms, reduced-motion
   rules), one section-header pattern, one button system with a visible focus ring. Merge duplicates (the two
   `shine-border`s), delete dead variants. Colour contrast AA on every surface (a unit test checks the tokens).
3. **Document** it in `design/design.md`: the identity in a few lines (what makes yws feel like yws), tokens, type, layout
   grid, components, motion, imagery, 3D rules (when, how heavy, fallback), do/don't. Write `design-quality.md`: the
   portfolio's rubric structure with **yws's own** rules and instant-fails (contrast, text over busy backgrounds without a
   scrim, motion with no reduced-motion path, cursor effects that hide the pointer, a 3D scene that blocks content on
   mobile, contact or "apply" more than one tap away, etc.). Don't import my portfolio's taste list (it bans fonts and
   effects that are part of yws's identity).
4. Build a **specimen page** (noindex, out of the sitemap, built only in review builds) that renders every token and component.
5. Apply the consolidated system with **no visual change except bug fixes**; prove it with screenshot diffs against P0.
   Tag `history/design-system-v1`.

### P3. The stack: spike, decide, then migrate (or modernise in place)

1. **Spike** (time-boxed, on a throwaway branch or folder): port one text-heavy page (`/LookingForHousing`) and the home
   hero with its 3D moment to **Astro + Lingui** (React islands for R3F with `client:visible`/`client:idle`, the 3D after
   the H1, a static poster). Measure it exactly like P0: Lighthouse median of 3, JS KB, LCP, TBT, CLS, HTML weight.
2. **Decide** with the numbers: Astro wins if it clearly beats the Next baseline on JS and LCP/TBT with no functional loss.
   Write the decision table (options, numbers, rejected and why) in `technologies.md`. Tag `history/pre-migration`.
3. **Migrate route by route** (each route is a slice, § 6 P7 loop), keeping a feature-parity checklist per route:
   - Lingui: move every dictionary string into catalogs (`en` source, `fr` from the existing dictionary verbatim), the
     extract → compile → strict check loop from my `usage/lingui.md`; a missing id fails the build.
   - Supabase data: fetch at build time where possible (statistics, house pictures), with a sane refresh path (a Vercel
     deploy hook, ISR, or a small client refresh over a server-rendered value). Document the choice.
   - Remove the per-request Supabase middleware if nothing needs a session.
   - Images through the framework's image pipeline (AVIF/WebP, real `widths`/`sizes`, eager + `fetchpriority="high"` only
     for the LCP image, lazy below the fold, `aspect-ratio` reserved).
   - Old routes keep working: 308s for every old URL, tested in e2e.
   - Every route passes the gates before the old Next route is deleted. The Next app lives until parity.
4. **If Astro loses:** stay on Next, but do the same modernisation: Server Components by default and client islands only
   where needed, `app/[locale]/` with `generateMetadata` per locale, Lingui for Next (SWC plugin, server-side i18n),
   `generateStaticParams`, metadata routes (`sitemap.ts`, `robots.ts`), static rendering wherever possible.

### P4. Code structure (better organised, scalable)

- One **data layer** for the organisation's facts (`src/data/organisation.ts`: legal name, addresses, phones as proper
  `tel:` values with +352, emails, socials, hours if real) that the footer, contact section, legal pages and JSON-LD all read.
  One **route map** (path builder) that links, hreflang, the sitemap and redirects all read.
- Feature folders per page with shared section primitives (the current `XHeader` + `XSection` pattern is a good start),
  no copy-paste components, strict TypeScript, ESLint (flat config) + Prettier, no dead code (`knip` clean), no unused
  dependencies (`face-api.js`, devtools in production), heavy libraries only where used (dynamic imports).
- Tests: unit (data, routes, tokens contrast, catalogs complete), e2e (§ 7). A `.env.example` with names only.
- Behaviour-preserving: refactors are proven by screenshot diffs and the e2e suite, not by reading the diff.

### P5. Performance (to the budgets in § 7)

Work structurally, then stop tuning (the `lighthouse-qa` skill's rule):
- Images: resize the 25–30 MB originals to the largest size actually displayed (≤ 2560 px), modern formats, responsive
  sets. Keep the originals out of the shipped site (they stay in git history; don't rewrite history).
- 3D: compress models (`gltf-transform optimize` with meshopt or Draco, textures to WebP/KTX2, resized), check them
  visually before/after, load scenes near visibility after LCP, pause offscreen, a poster under reduced motion and on
  weak devices, keep each shader program small, measure the longest frame gap on a cold load.
- Fonts: self-hosted, subset, `woff2`, preloaded, `font-display` with metric-matched fallback (CLS). The flag-emoji font
  goes away with text labels.
- Backgrounds and effects: measure the fixed blurred gradient layer, `SplashCursor`, `ColorBends`, `LightPillar`,
  `ElectricBorder`, the cobe globe, marquees and GSAP timelines (Performance panel traces, CSS A/B). Keep the look, cut
  the cost (a pre-rendered image instead of a live blur, animation only in view, `content-visibility` where safe).
- Third parties: Google Maps embed behind a click-to-load facade (privacy + weight), nothing on the LCP path.
- Record each slice's cost (JS KB, LCP/CLS/TBT delta) in `memory/slice-costs.md`.

### P6. SEO, the full set, and Search Console ready

Build all of this, then prove it with the launch/SEO gate (fails the build on any miss):

- **Host and URLs:** one canonical host, the other 308s; lowercase kebab slugs; old URLs 308; trailing-slash policy
  consistent; no redirect chains; a crafted 404 (noindex, links back to the main journeys) per locale.
- **Head per page × locale:** unique static `<title>` (≤ ~60 chars, native per locale, H1 agrees), meta description
  (≤ ~155 chars, factual), absolute self-canonical, reciprocal hreflang (`en`, `fr`, `x-default`), `<html lang>`, OG +
  Twitter (`og:image` 1200×630 generated at build per page × locale with `og:image:alt`, `og:locale` + alternates,
  `summary_large_image`), `max-image-preview:large`, theme colour.
- **The name Google shows:** fix the two things from my Google screenshot (§ 1): a real `<title>` per page × locale (the
  home page must stop being "Youth Work Synergy (YWS) Logo"; the logo's alt text becomes plain "Youth Work Synergy"), and
  one consistent site name through `WebSite` JSON-LD (`name` "Youth Work Synergy", `alternateName` "YWS") on the home page,
  matching `og:site_name` and the title suffix. Descriptions written per page so Google stops quoting the footer address.
- **Link previews:** every page × locale shares as a proper card (Discord, WhatsApp, Slack, LinkedIn, Facebook, X): a
  localized 1200×630 image, title, description, site name. Check them with a real preview tool after the build.
- **Structured data** (JSON-LD graph, stable `@id`s, markup matching the visible text, validated with the Rich Results
  Test and the Schema.org validator): `NGO`/`Organization` (legal name, alternate name "YWS", logo, both addresses,
  email, telephones, `sameAs` Facebook/Instagram/LinkedIn, `areaServed` Luxembourg), `WebSite`, `WebPage` per page,
  `BreadcrumbList`; `Event` for the TEC Conference **only with real dates and place**; `JobPosting` **only** for open
  offers with real fields (the offers are PDFs today: give each a real HTML page, keep the PDF as a download, and remove or
  expire the markup when an offer closes). FAQ markup only if it still makes sense (Google limits FAQ rich results; check).
- **Crawl:** `robots.txt` (allow all, `Sitemap:` line), a sitemap index with hreflang alternates and `<image:image>` for
  the real photos, `lastmod` from real dates; review/preview builds `noindex` behind one env flag (like my
  `IS_FULL_PRODUCTION`), the production build indexable; legal pages `noindex,follow` if you follow my portfolio's choice
  (decide and record).
- **Feeds:** RSS for content that is dated and list-shaped (job offers, projects, conference news). Don't invent a blog to have a feed.
- **Favicons:** ICO/PNG ≥ 48 px, SVG, apple-touch 180, web manifest 192/512.
- **Content signals:** one H1 per page, a clean heading tree, descriptive link text, alt text on every meaningful image,
  crawlable `<a href>` navigation, internal links between the journeys (housing ↔ owners ↔ projects ↔ contact),
  NAP identical in the footer, contact section, JSON-LD and (owner step) Google Business Profile.
- **Extras:** `llms.txt` (cheap, zero expectation), `humans.txt` (credits; my name only with the client's OK).
- **Search Console + Bing readiness:**
  - Verification: a Domain property via DNS TXT is the best (my step: write the exact record type and where to add it).
    Also support an optional `google-site-verification` meta and a Bing `msvalidate.01` meta from env vars (names only;
    I fill the values), and keep any existing verification file (`public/ms32821332.txt`?) served at its path.
  - IndexNow: a key file in `public/` and a post-deploy ping script.
  - A **launch runbook** in `placeholders.md` (or `site/seo.md` § Launch) for me: merge order, Vercel primary domain,
    env flags, verify GSC, submit the sitemap index, URL Inspection on the home page and each main page in both locales,
    Bing import from GSC, IndexNow ping, Google Business Profile NAP check, re-check with PageSpeed Insights.
- Put target queries (from the P1 research), the metadata table per page × locale, and the entity plan in `seo.md`.

### P7. Page by page: research, improve, loop (one slice at a time)

Order: **foundation** (layout shell, tokens, i18n, SEO infra, gates) → **header + language switcher** → **footer** →
home → `/looking-for-housing` → `/rent-your-property` → `/about-us` → `/we-spark-projects` → `/jobs` (+ job pages) →
`/tec-conference` → 404 → legal pages (privacy policy, legal notice / mentions légales; facts only, marked PLACEHOLDER
until the client approves).

The loop for every slice (repeat until every check passes **and** one more pass finds nothing worth fixing):
1. **Research** the section: Mobbin (`mcp__mobbin__search_screens`, `search_sections`, `search_flows`), the `awwwards`
   skill, the component registry (`search-registry-items`), comparable sites from P1, my portfolio's patterns. Write a
   short plan naming the adopted patterns and why they are **objectively** better (fewer taps, clearer hierarchy,
   legibility, contrast, consistency, speed), not just different.
2. **Build** with real content.
3. **Evaluate** (§ 7): shots at every width, en + fr side by side, text-fit, axe, keyboard, reduced motion, Lighthouse,
   design score ≥ 8/10 with the weakest point named.
4. **Fix** the weakest point, evaluate again.
5. **Close:** commit (one Conventional Commit per slice, scope = the page), log it, update the plan.

Rules for visual changes:
- **Objective fixes ship directly:** contrast, legibility, spacing consistency, alignment, hierarchy, CTA clarity, tap
  targets, focus states, mobile ergonomics, text over media without a scrim, overflow, broken links, layout shift.
- **Changes to the feel are proposals:** render the current and the proposed version side by side (desktop + phone) in
  `comps/` (local, with `comps/HISTORY.md`), pick the one that scores higher on the rubric, ship it only if it keeps the
  identity, and list it in the report so I can revert it. Never strip the 3D moments or the playfulness to win a score:
  make them cheaper and safer instead.
- **The footer must become robust and professional:** the organisation block (logo, one-line mission, legal name),
  link columns per journey (housing, owners, organisation, contact), both addresses with map links, each phone as its
  own `tel:` link, email, socials with accessible names, the language switcher, a legal row (©, privacy policy, legal
  notice, credits), all from the one data source; correct landmarks and no fake headings; it never covers content.
- **Contact, without forms:** each audience (a young person looking for housing, a property owner, a partner, a job
  applicant) sees its one clear next step: email with a useful prefilled subject, a call button, the map, socials,
  office hours if real. Copy-to-clipboard for the email and address, a map behind a click-to-load facade. Make it
  look modern and inviting and measure it with the rubric; never add a form (§ 2).
- **The header:** every journey one tap away on a phone (Apply for housing, Rent your property, Contact), the switcher
  with text labels, a focus-trapped accessible menu, nothing under the sticky header after an anchor jump.

### P8. "End of the day": fix everything, capture the "after", commit

1. Full sweep on a fresh production build: every route × every locale × every width; every gate green
   (`check`, `e2e`, `e2e:xb`, Lighthouse on every route, the SEO gate). Fix what fails. No known polish item left open
   without a reason in the report.
2. Re-run **exactly** the P0 capture with the same scripts and settings into `.case-study/after/` (+ `metrics.json`),
   and on the live/preview URL if I deployed one (ask me for the preview URL at this point; if I haven't, say so in the report).
3. Build the comparison: `.case-study/compare/` with side-by-side before/after images per page (desktop + phone, same
   viewport), the Lighthouse filmstrips side by side, and the numbers table. Pick the 8–12 strongest pairs.
4. `wiki-lint` pass, `log.md` lines, lessons, placeholders register current, open questions current.
5. Commit everything, `git tag history/after-2026-10`, and tell me the branch is ready to push (don't push).
6. Write the report (§ 10) to `.case-study/REPORT.md` and print it in the chat.

---

## 7. Gates, budgets and the evaluate step

| Gate | Fails on |
| --- | --- |
| static (`check`) | type errors, lint, unit tests (data, routes, token contrast AA, catalogs complete, scroll-driven CSS written in longhands) |
| browser (`e2e`) | axe WCAG 2.2 AA on every route and locale, skip link, horizontal overflow 320–2560, content capped at ultrawide, header and menu, footer, focus never under the sticky header, reduced motion (final state, nothing hidden), head/hreflang/switcher, console + CSP errors, old-URL 308s, forms and key flows |
| text fit (`e2e text-fit`) | in **every locale**, at every gate width, in the first paint and every switchable state (menu, carousels, dialogs, tabs): text spilling out of its box, clipped, past the screen edge, a word split across lines, text on text |
| cross-browser (`e2e:xb`) | Firefox: functional + axe + text fit; WebKit: functional + layout (WebKit on Windows has artifacts: check against the live site before fixing) |
| Lighthouse (`lhci`, median of 3, mobile + desktop) | perf < 95 target (floor 90), a11y / best practices / SEO < 100, LCP > 2.0 s target (floor 2.5 s), CLS > 0.05, TBT > 100 ms target (floor 200 ms) |
| SEO / launch (inside `build`) | missing title, description or canonical; more than one origin across canonicals, hreflang, `og:url`, sitemap; invalid JSON-LD; broken internal links or anchors; a missing share image; in a production build, any `PLACEHOLDER` or a wrong robots value |

Budgets (`requirements.md`): initial JS ≤ 150 KB gz per route, fonts ≤ 100 KB, initial page ≤ 1 MB, the 3D chunk
≤ ~300 KB gz, 3D assets ≤ 2 MB per scene, every image sized and in a modern format.

The eyes, for what machines can't judge: read every screenshot (en and fr side by side; French runs longer: boxes are sized
for the longest locale, never the English word), look for overflow, text under fixed chrome, unreadable text over media,
orphans, uneven card heights, a label on two lines in one locale only, ultrawide emptiness, generic look. Score each view
with `design-quality.md`, name the weakest point, log accepted views in `screenshots/VISUAL-QA.md` (the shots themselves
stay local and gitignored; only images the site ships are committed).

Done for any change = static + e2e + text fit in both locales + shots at 390 / 1024 / 1440 / 1920 (+ the 320 and 2560
sweep) + reduced motion + axe + Lighthouse when a score can move + design score ≥ 8 + the wiki page and `log.md` updated
in the same change + a lesson if something tripped you.

---

## 8. Environment notes (Windows 11, Git Bash + PowerShell)

- Git Bash rewrites URL-path arguments (`/en/` → `P:/Git/en/`): prefix with `MSYS_NO_PATHCONV=1`.
- Node reads a Git Bash path `/c/Users/...` as `C:\c\Users\...`: give node scripts `C:/...` paths.
- Python on Windows writes CRLF: `open(..., "w", newline="\n")`. Bash heredocs break on quotes: write scripts with the Write tool.
- Stop a server by its port's PID (`netstat -ano | grep :<port>` → `taskkill //F //PID <pid>`), never by image name.
- Long commands in the background, never a foreground sleep loop. Read every check's result, not only the last one.
- More gotchas are in the portfolio's `lessons.md` and `memory/run-notes.md`: port the ones that apply.

---

## 9. How to work through all of this

- Phases in order; P5–P7 happen **per slice** inside the migration (each route ported, improved, sped up and made
  SEO-complete in one loop), after the foundation slice. Never start a new slice while the current one has a failing
  check or a known polish item. A later slice that breaks an earlier one reopens it first.
- Commit at the end of every slice and every phase (Conventional Commits, scopes like `seo`, `perf`, `design`, `i18n`,
  `a11y`, `refactor`, `ai`, `home`, `footer`). The release Action runs only on `main`, so the branch is safe.
- Every behaviour change updates its wiki page + one `log.md` line in the same commit (the Stop hook checks this).
- When I correct you, or a tool trips you, add a lesson. When a lesson keeps recurring, turn it into a check.
- Short progress notes in chat at each phase boundary: what's done, numbers, what's next. Don't stop to ask unless a
  decision is genuinely mine; take the default, record it as `[assumption]`, and keep going.

---

## 10. The final report (print it in the chat as one message, and save it to `.case-study/REPORT.md`)

I will paste it into my portfolio session to write a case study that **non-technical readers understand** (including the
client, who may receive it). So: real numbers only (from the files), the same conditions before and after, lab vs field
always labelled, every claim traceable to a file, no images in the text (absolute file paths instead). Use exactly these
sections:

**A. Header:** repo path, branch, first and last commit, tags, dates, final stack, commands to reproduce the numbers.

**B. In plain words (for the client, no jargon, 5–8 bullets):** what is better for the people who use the site and for
the organisation (e.g. "Google can now read the name and summary of every page in English and French").

**C. Before → after table:** metric | before | after | change | what it means in plain words | how measured | source file.
At least: Lighthouse mobile + desktop per category (home + the average of all routes), LCP, CLS, TBT, Speed Index, page
weight and requests per route, JS shipped, images and models total weight, the repo's `public/` size, axe violations,
SEO checklist score (items passed out of the total), pages Google can index (by locale), structured data types,
TypeScript and lint errors, unused deps/files, tests (count, passing), lines of code, dependencies.

**D. Page by page:** for each route: what changed and why (one line each), the score before/after, the best
before/after screenshot pair (absolute paths, desktop + phone), and any proposal I should look at.

**E. SEO and Search Console:** the checklist before vs after (each item ✓/✗); how the site shows up before vs after,
in words a client understands: the Google result (before: my `site:` screenshot, "…Logo" as the title, the address as
the snippet, English only; after: the title, description and site name each page will now give Google, per locale) and a
shared link (before: no card on Discord; after: the card, from a real preview tool); hreflang, structured data with Rich
Results Test results; the localized keyword targets per locale; and my launch runbook steps in order.

**F. Accessibility:** violations before/after by rule, what a keyboard or screen-reader user can now do.

**G. Performance:** where the weight went (images, models, JS, fonts, effects), each structural fix with its measured gain.

**H. Code and stack:** the spike numbers and the decision (table with the rejected option), structure before/after (a
short tree), what was removed, what was added (tests, gates, data layer), how adding a page or a language works now.

**I. The design system:** the identity in 3 lines, tokens summary, what was unified, the specimen page path.

**J. Decisions:** decision | chosen | rejected | why | tag (`[user]` / `[assumption]`).

**K. The AI framework installed:** the wiki pages, hooks, skills, gates and the loop, in a few lines each (the case
study has a "how I work with AI" part).

**L. Timeline:** one line per phase/slice from `log.md` (date, what, verdict), including what was tried and rejected.

**M. Honest limits:** what was not verified (real devices, Safari on a Mac/iPhone, the live deploy, field data), what is
left, the placeholders still open, the open questions, what **I** must do and what **the client** must approve (new copy,
French reviews, legal texts, author credit, new locales).

**N. Media inventory:** every before/after screenshot, filmstrip and clip with its absolute path and a one-line caption,
grouped by page; mark the 8–12 best pairs for the case study.

**O. Claude Motion storyboard** (I may turn it into a 45–60 s animated explainer for the client in the Claude app):
8–10 scenes; for each: duration, on-screen headline (≤ 8 plain words), the visual (absolute file path: a before/after pair,
a filmstrip, a clip), the one number shown (with its source), the transition. Then one paragraph I can paste into Claude
Motion as the brief (audience: the organisation's team, non-technical; tone: warm, factual, no jargon).

**P. Raw data:** paths to every `metrics.json`, Lighthouse JSON, axe output and the comparison folder.

---

## 11. Start now

1. Read this message fully. Read the `start-project-info` skill and the portfolio files in § 5 as you need them.
2. Run P0 (the baseline) before changing a single file except `.gitignore` and the dev tooling.
3. Then P1 → P8 in order, committing as you go. Post a short progress note at each phase boundary.
4. Finish with the report in § 10.
