# Lessons: how to work in this project

> Mistakes already paid for, as one-line rules. `.claude/hooks/session-start.mjs` injects the "Rules" section into
> every session and after every compaction, so it stays short: no more than 60 rules and under the 8,000-character
> card, merged and pruned. How to add, place and promote one: `working-agreement.md` § 7. Product facts live in their
> own page. Generic rules ported from the owner's portfolio wiki on 2026-10-09 keep their original dates.

## Rules

### The owner's way of working
- No forms of any kind (contact, apply, newsletter, chat, booking): make email, phone, map and socials better instead - 2026-10-09.
- Keep the general feel (playful, colourful, 3D, warm), but a weak or unimpressive component may be replaced by a better one; list each swap in the report [user 2026-10-09] - 2026-10-09.
- Visuals come first: Mehdi (the owner of yws.lu) judges the finished look. Every interactive piece gets designed motion (the menu once opened with none), reviewed in shots as the client would see it [user 2026-10-09] - 2026-10-09.
- Keep every version for the case study: tag `history/*` before a big change, capture a look before replacing it - 2026-10-05.
- Commit only what the site ships: QA shots, clips and research screenshots stay local (gitignored) - 2026-10-08.
- Existing French is human text: keep the wording, fix typos, grammar and calques (« Apprendre encore plus » → « En savoir plus »), each fix in `placeholders.md`; new French is native and marked for review; same check for English microcopy [user] - 2026-10-09.
- Check every section built or edited in en and fr at phone, laptop and desktop; size boxes for French, never the English word - 2026-10-08.
- Heavy media loads near visibility and plays only when visible (a load-time loop cost 270–480 ms TBT) - 2026-10-05.
- Every hover has a tap, focus or scroll twin; phones get the same content - 2026-10-05.

### Code and quality
- A visible label must start the accessible name (WCAG 2.5.3): add hidden text after it, never a replacing `aria-label` - 2026-10-05.
- Never nest a link and a button; never `tabIndex={-1}` on the real control (the old CTAs were keyboard-dead) - 2026-10-09.
- One `<h1>` per page; sections start at `<h2>` (the old site used `<h1>` for every section) - 2026-10-09.
- Never mute text with `opacity` or `/60` alpha on busy or animated backgrounds (under 4.5:1 in one frame): use weight or size - 2026-10-08.
- Reduced motion keeps `animation-delay`: switch staged scenes off under reduced motion, or their entrances stay hidden - 2026-10-06.
- Scroll-driven CSS goes in longhands (`animation-name`, `-timeline`, `-range`…): the minifier folds the shorthand into one Chrome rejects; a unit test checks it - 2026-10-08.
- Cap media by `100svh - var(--header-h)`: a focus target taller than that always sits under the sticky header - 2026-10-06.
- Load cost hides in style, layout and paint: animate transform or opacity on an HTML wrapper, never an `<svg>` or `background-position`; draw canvas and WebGL in a worker (OffscreenCanvas; the house, globe and flow field cost 1.5–3 s of TBT on the main thread); `content-visibility: auto` below the fold. Find it with traces and a CSS A/B under Lighthouse (median of 3+) - 2026-10-09.
- Reading a WebGL program's link status blocks until it compiles: keep programs small, compile with `KHR_parallel_shader_compile`, measure the longest frame gap cold - 2026-10-09.
- Language links show a flag drawn as SVG beside the autonym [user 2026-10-09]; never flag emoji (Windows draws them as letters) - 2026-10-09.
- Render metadata on the server: the 2025 site's `window`-guarded helper shipped no `<title>` at all - 2026-10-09.
- Tailwind 4 emits a `@theme` variable only when the source names it literally: `` var(--color-${name}) `` is undefined and `--shadow-*` never is; print values or give a fallback - 2026-10-09.
- `contain-intrinsic-size: auto 1400px` sets the width too: a skipped (`content-visibility`) item 1400 px wide stretched a grid's `auto` track past the phone screen. Use `contain-intrinsic-height`, and `minmax(0, 1fr)` tracks around long content - 2026-10-09.
- JavaScript's `\s` matches the no-break space: splitting French text on `/\s+/` cut « logement ? » into spans (a triple gap, a `?` alone on a line). Split on `[^\S\u00A0\u202F]` - 2026-10-09.
- `repeat(auto-fill, minmax(a, b))` counts columns from a fixed `b` (a 15rem max gave one photo per row on a phone): two-up thumbnails are flex-wrap items `min(width, 50% - gap/2)` - 2026-10-09.
- `transform`, `scale` and off-screen entrances grow the scrollable area (TEC globe 390 → 428 px; about photo +995 px at 320): `overflow-x: clip` the section; check `scrollWidth` right after load and after scrolling to the end - 2026-10-09.
- A `w-max` (no-wrap) line is safe only where it fits (the French home hero was 949 px at 768): let it wrap - 2026-10-09.

### Privacy of inputs
- Never type a key, id or URL from memory: copy it mechanically from its source file (a script), or it is invented - 2026-10-09.
- Never read `.env*` or secrets; name env vars only. Never open `new-portfolio/context/`; `new-portfolio` is read-only - 2026-10-09.
- Research screenshots of third-party sites stay local (gitignored) - 2026-10-05.

### Tools and environment
- Bash heredocs break on quotes and lose backslashes: write scripts with Write, use absolute paths. Write, Edit and the Bash command text all decode `\uXXXX` into the character: to put an escape in a file, build it from `chr(92)` in a script - 2026-10-09.
- Python on Windows writes CRLF: always `open(..., "w", newline="\n")` - 2026-10-05.
- Git Bash: prefix URL-path arguments with `MSYS_NO_PATHCONV=1` (`/en/` → `P:/Git/en/`); give node `C:/...` paths, never `/c/...` - 2026-10-09.
- Use your own ports (3100 Next, 4322 Astro); stop a server by its port's PID (`netstat -ano | grep :<port>` → `taskkill //F //PID <pid>`), never by image name, never one you didn't start - 2026-10-09.
- When a change does not move a shot, `curl` the served HTML before judging the CSS (serve.mjs once served stale pages) - 2026-10-09.
- Read every check's whole output: `bun run check` stops at the first red task, and the launch gate once hid real errors behind 85 expected ones - 2026-10-09.
- e2e role queries match substrings: pass `exact: true` for short names; landmark tests query roles (`banner`), not tags - 2026-10-09.
- Playwright WebKit on Windows is not Safari (fonts, AV1, CSP noise): check a WebKit-only finding against the live site first - 2026-10-09.
- Lighthouse renders WebGL with SwiftShader; shots use the GPU (`--use-angle=d3d11 --enable-gpu`). Full-page shots: device scale 1 past ~16,384 px (black), and `content-visibility` content shoots blank unless forced visible (shots.mjs does) - 2026-10-09.
- Measure WebGL cost with Lighthouse itself (`lh-probe`): Playwright's headless shell showed 3 short tasks where Lighthouse's Chrome had a 1.3 s one - 2026-10-09.
- A busy machine fakes regressions: run Lighthouse alone (no shots, builds or agents in parallel), check the load, rerun - 2026-10-07.
- The PageSpeed Insights API without a key hits "Quota exceeded" at once: use the PSI web UI, or set `PSI_API_KEY` - 2026-10-09.
- `next dev` writes into `.next`, and the next `next start` answered 500 on every route without a log line: rebuild before serving a baseline; captures preflight every page's status - 2026-10-09.
- QA page walks jump with `scrollTo({ top, behavior: "instant" })`: under `scroll-behavior: smooth` the walk never gets down the page - 2026-10-09.
- WebSearch has a budget shared by parallel agents; prefer WebFetch of known URLs, then Playwright - 2026-10-05.
- Aceternity, GSAP and React Bits code is rewritten from the idea, never translated line by line: a faithful port keeps its licence (`research/2026-10-09-licences.md`, Q23) - 2026-10-09.
- A gate's comment is not its code: the text-fit probe never checked paint order, which made 80 of the 122 first-run failures. Read a probe's code before trusting or blaming it - 2026-10-09.
