# Lessons: how to work in this project

> Mistakes already paid for, as one-line rules. `.claude/hooks/session-start.mjs` injects the "Rules" section into
> every session and after every compaction, so it stays short: no more than 60 rules and under the 8,000-character
> card, merged and pruned. How to add, place and promote one: `working-agreement.md` § 7. Product facts live in their
> own page. Generic rules ported from the owner's portfolio wiki on 2026-10-09 keep their original dates.

## Rules

### The owner's way of working
- No forms of any kind (contact, apply, newsletter, chat, booking): make email, phone, map and socials better instead - 2026-10-09.
- Keep the feel (playful, colourful, 3D, warm): objective fixes ship; feel changes are `comps/` proposals listed in the report - 2026-10-09.
- Keep every version for the case study: tag `history/*` before a big change, capture a look before replacing it - 2026-10-05.
- Commit only what the site ships: QA shots, clips and research screenshots stay local (gitignored) - 2026-10-08.
- Existing French is human text: keep it verbatim; new French is native (never literal) and marked for review - 2026-10-09.
- Every section built or edited is checked in en and fr at phone, laptop and desktop; boxes are sized for French, never the English word - 2026-10-08.
- Heavy media loads near visibility and plays only when visible (a load-time loop cost 270–480 ms TBT) - 2026-10-05.
- Every hover has a tap, focus or scroll twin; phones get the same content - 2026-10-05.

### Code and quality
- A visible label must start the accessible name (WCAG 2.5.3): add hidden text after it, never a replacing `aria-label` - 2026-10-05.
- Never wrap a link in a button or a button in a link; never `tabIndex={-1}` on the real control (the old CTAs were keyboard-dead) - 2026-10-09.
- One `<h1>` per page; sections start at `<h2>` (the old site used `<h1>` for every section) - 2026-10-09.
- Never mute text with `opacity` or `/60` alpha on busy or animated backgrounds: it falls under 4.5:1 in one frame; use weight or size - 2026-10-08.
- Reduced motion keeps `animation-delay`: staged entrances stay hidden; switch staged scenes off under reduced motion - 2026-10-06.
- Scroll-driven CSS goes in longhands (`animation-name`, `-timeline`, `-range`…): the minifier folds the shorthand pair into one Chrome rejects; a unit test checks it - 2026-10-08.
- A focus target taller than the viewport minus the header always sits under the sticky header: cap media by `100svh - var(--header-h)`; `scroll-padding-top` for the rest - 2026-10-06.
- Load cost hides in style and layout: animate an HTML wrapper, never an `<svg>`; no inherited custom property toggled on big subtrees; find it with traces and CSS A/B - 2026-10-07.
- Reading a WebGL program's link status blocks until it compiles: keep programs small, compile with `KHR_parallel_shader_compile`, measure the longest frame gap cold - 2026-10-09.
- Flag emoji render as two letters on Windows: language switchers use text labels (English / Français), never flag emoji - 2026-10-06.
- A server-rendered page needs its metadata on the server: a helper that returns `undefined` when `window` is missing ships no `<title>` at all (the 2025 site) - 2026-10-09.

### Privacy of inputs
- Never type a key, id or URL from memory: copy it mechanically from its source file (a script), or it is invented - 2026-10-09.
- Never read `.env*` or secrets; name env vars only. Never open `new-portfolio/context/`; `new-portfolio` is read-only - 2026-10-09.
- Research screenshots of third-party sites stay local (gitignored) - 2026-10-05.

### Tools and environment
- Bash heredocs break on quotes and lose backslashes: write scripts with Write, use absolute paths; Write/Edit decode `\uXXXX` - 2026-10-05.
- Python on Windows writes CRLF: always `open(..., "w", newline="\n")` - 2026-10-05.
- Git Bash rewrites URL-path arguments (`/en/` → `P:/Git/en/`): prefix with `MSYS_NO_PATHCONV=1` - 2026-10-05.
- Node reads a Git Bash path `/c/Users/...` as `C:\c\Users\...`: give node scripts `C:/...` paths - 2026-10-09.
- Stop a server by its port's PID (`netstat -ano | grep :<port>` → `taskkill //F //PID <pid>`), never by image name - 2026-10-08.
- Read every check's result: a red first task can hide a later failure (`bun run check` stops at the first) - 2026-10-06.
- e2e role queries match substrings: pass `exact: true` for short names - 2026-10-06.
- Playwright WebKit on Windows is not Safari (fonts, AV1, CSP noise on screenshots): check a WebKit-only finding against the live site first - 2026-10-09.
- Headless WebGL: Lighthouse runs SwiftShader (deterministic, same before/after); shots and clips use the GPU (`--use-angle=d3d11 --enable-gpu`), SwiftShader frames look broken - 2026-10-08.
- Full-page shots past ~16,384 device px go black: shoot long pages at device scale 1 or in segments (the capture script stitches) - 2026-10-08.
- A busy machine fakes regressions: run Lighthouse alone (no shots, builds or agents' scripts in parallel), check the load, rerun - 2026-10-07.
- The PageSpeed Insights API without a key hits "Quota exceeded" at once: use the PSI web UI, or set `PSI_API_KEY` - 2026-10-09.
- Another session or the owner may run a dev server on :3000: use your own port (3100 Next, 4322 Astro), never kill a process you didn't start, never wipe `.next` under a running dev server - 2026-10-09.
- WebSearch has a budget shared by parallel agents; prefer WebFetch of known URLs, then Playwright - 2026-10-05.
