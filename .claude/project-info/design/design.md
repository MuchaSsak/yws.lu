# Design system: yws

> Owns: what makes yws look like yws, the one token set (colour, type, spacing, radius, shadow, z, motion), layout,
> the section-header pattern, the button system, the component list (kept / merged / rewritten / deleted), imagery,
> 3D and background rules, and do/don't. Scoring a rendered view: `design-quality.md`. Raw counted values this page
> is built from: `research/2026-10-09-design-inventory.md`. Reference patterns: `design-references.md`. Licences and
> credits: `assets.md`, `research/2026-10-09-licences.md`. Voice and labels: `product/brand.md`. Budgets:
> `product/requirements.md`.
> **History:** the 2025 look was built in under a week on shadcn/ui + Magic UI + Aceternity + React Bits [repo:
> README]. P2 (2026-10-09) consolidated it from the inventory into `web/src/styles/global.css`: the tokens reproduce
> the 2025 values (stepped at Tailwind's breakpoints), so applying them moves nothing; fluid steps are proposals.
> Every token and component renders on the review-only specimen (§ Specimen). Rule for every change below: **objective fixes
> ship** (contrast, targets, focus, overflow, hierarchy, speed); anything that moves the look noticeably is marked
> **proposal (comps/)** and is shown current-vs-proposed before it ships [user 2026-10-09; lessons].

## Identity (what makes yws feel like yws)

- **A light, airy page with colour at the edges:** white, a faint 10 px grid, a soft rainbow glow (blue, green, red,
  violet, sand, pink) and a vignette behind everything [repo: components/layout/BodyBackground.tsx:5-11].
- **Orange is the voice:** heavy Montserrat Black headings in an orange gradient, an orange box that sweeps off every
  hero line, orange buttons [repo: app/globals.css:224-226; inventory § 1b: `#fa8534` ×37].
- **Violet is the wink:** a hatched violet shadow drifting behind words, violet sparkles twinkling around them
  [repo: app/(components)/hero/HeroHeader.tsx:23-48].
- **Toys next to the copy:** a cat house, a wardrobe and a cosmonaut on a rocket turning slowly on the home page,
  draggable [repo: canvases/*].
- **Warm and direct:** big centred section headings, a short lede, one clear next step (Apply, Learn more, Contact)
  [repo: 21 `*Header.tsx`]. Serious where money and trust are at stake (owners) [product/brand.md].

Not: a ministry form, a dark tech site, a poster portfolio. The owner's portfolio taste list (bans on Montserrat,
sparkles, gradients, glows) does **not** apply here: those are yws's identity [user 2026-10-09, brief § P2.3].

## Tokens

One file: `web/src/styles/global.css` (Tailwind 4 `@theme` for utilities + `:root` custom properties for the rest).
`web/src/styles/tokens.test.ts` checks every text/background pair below for AA (17 pairs: text, buttons and their
hovers, chrome surfaces, focus ring per surface, every gradient stop); a new role adds a row [repo: web/src/lib/contrast.ts].

```css
@theme {
  /* Neutrals: the 2025 shadcn zinc tokens */
  --color-background: oklch(1 0 0);                        /* #ffffff */
  --color-foreground: oklch(0.141 0.005 285.823);          /* zinc-950 #09090b */
  --color-muted: oklch(0.967 0.001 286.375);               /* zinc-100 #f4f4f5 */
  --color-muted-foreground: oklch(0.47 0.016 285.938);     /* spike #5a5a64 (2025: zinc-500) */
  --color-border: oklch(86.686% 0.0001 271.152);           /* #d3d3d3, decorative edges only */
  --color-secondary: oklch(41.206% 0.01327 285.76);        /* #4a4a52 */
  --color-secondary-foreground: oklch(0.967 0.001 286.375);
  /* Orange */
  --color-primary: oklch(0.705 0.213 47.604);              /* orange-500 #ff6900: fills, decoration */
  --color-primary-foreground: oklch(0.141 0.005 285.823);  /* dark ink on orange */
  --color-primary-strong: oklch(0.553 0.195 38.402);       /* orange-700 #ca3500: orange text, focus on light */
  --color-ink-orange: oklch(0.408 0.123 38.172);           /* orange-900 #7e2a0c: icons, small orange text */
  --color-reveal: #fa8534;                                 /* the reveal box */
  /* Violet */
  --color-violet: #730bce;
  --color-violet-soft: #b96ff9;                            /* decoration only */

  --font-sans: "Montserrat Variable", "Montserrat Fallback", ui-sans-serif, system-ui, sans-serif;

  /* Type: three steps at the 2025 phone sizes, one jump at 640 px (the :root override below);
     xl / lg / base / sm stay Tailwind's (1.25 / 1.125 / 1 / 0.875 rem) */
  --text-display: 2.25rem;  --text-display--line-height: 2.5rem;  /* 36 / 40 → 72 / 80 px */
  --text-h2: 2.25rem;       --text-h2--line-height: 2.5rem;       /* 36 / 40 → 60 / 80 px */
  --text-h3: 1.5rem;        --text-h3--line-height: 2rem;         /* 24 / 32 → 36 / 40 px */

  --radius-sm: 0.4rem;
  --radius-md: 0.525rem;
  --radius-lg: 0.65rem;
  --radius-xl: 0.9rem;
  --radius-2xl: 1rem;
  --radius-feature: 3rem;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in: cubic-bezier(0.55, 0, 1, 0.45);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-anticipate: cubic-bezier(0.68, -0.4, 0.32, 1.4);
}

:root {
  --header-h: 4rem;            /* 64 px, 80 px from 1280 (structure.md § Header; 2025: 80 everywhere) */
  --pad-x: 1rem;               /* 2025 .px-side: 16 → 64 px at 640 → 96 px at 768 */
  --content-max: 96rem;
  --measure: 35rem;
  --measure-hero: 25rem;
  --space-section: 9rem;       /* 144 px, the inner pages' pb-36; home's 128 merges into it */
  --space-hero-top: 8rem;      /* 128 → 192 px at 1280 */

  --dur-1: 200ms;  --dur-2: 300ms;  --dur-3: 500ms;  --dur-4: 750ms;  --dur-5: 900ms;

  --z-bg: -4;  --z-sticky: 40;  --z-header: 50;  --z-skip: 60;

  --focus-ring: var(--color-primary-strong);
  --gradient-heading: linear-gradient(to left, #ca3500, rgb(245 74 0), #ca3500); /* § Colour: every stop ≥ 3:1 */
}
@media (min-width: 640px)  { :root { --pad-x: 4rem; /* + the large sizes of the three type steps */ } }
@media (min-width: 768px)  { :root { --pad-x: 6rem; } }
@media (min-width: 1280px) { :root { --header-h: 5rem; --space-hero-top: 12rem; } }
.surface-dark { --focus-ring: #fff; }
```

### Colour roles and contrast (computed; inventory § 1f)

| Role | Token | On | Ratio | Status | Source |
| --- | --- | --- | --- | --- | --- |
| Body text | foreground | white / vignette `#fafafa` | 19.89 / 19.06 | keep | [repo: app/globals.css:167] |
| Secondary text | muted-foreground (spike) | white / glow peak | 6.85 / 4.89 | keep the spike value (2025 zinc-500 drops to 3.44 at the glow peak) | [repo: web/src/styles/global.css:12] |
| Primary button | primary-foreground on primary | | 6.88 (hover `primary/90`: 7.52) | keep, the decision [user: "Buttons: orange with dark text"; HANDOFF § 2] | 2025 2.73 / 2.89 failed |
| Secondary button | secondary-foreground on secondary | | 7.98 | keep | [repo: components/ui/button.tsx:19] |
| Orange text ≥ 18.66 px bold / 24 px | primary-strong (orange-700) | white / glow peak | 5.23 / 3.73 | use for orange words and inline emphasis | replaces `text-primary` (2.89) on TEC [repo: app/TecConference/(components)/globe/GlobeSection.tsx:25] |
| Home H1 italic words | orange-600 | white / glow peak | 3.59 / 2.56 | keep at ≥ 48 px bold; confirm over the glow in shots | [repo: app/(components)/hero/HeroHeader.tsx:25] |
| Icons, small orange text | ink-orange (orange-900) | white | 9.42 | keep | [repo: app/AboutUs/(components)/ourMission/OurMissionCards.tsx:15] |
| Violet text | violet `#730bce` | white | 7.87 | allowed for text; violet-soft (3.13) decoration only | |
| Chrome text | foreground on the header's `white/75` + blur; white on the footer's `foreground/90` | header / footer | ≥ 15 / ≥ 11.84 | light header [user 2026-10-09]; the header's Apply pill: orange-700 on an orange tint, ≥ 4.5 | [repo: web/src/components/layout/SiteHeader.astro; SiteFooter.astro:18] |
| Focus ring | `--focus-ring` | white page / dark chrome | 5.23 (orange-700) / white on the footer | per-surface ring (the light header uses orange-700) | [repo: web/src/styles/global.css:70-74] |
| Section headings | `--gradient-heading` | white | stops 2.14 / 3.58 / 1.92 | **fails 3:1**: fix below | [repo: app/globals.css:225] |

**Heading gradient: proposal (comps/), but the fix itself is not optional** (it is an instant fail in
`design-quality.md`). Two variants to render side by side, both from colours already in the code:
(A) *deep gradient*: `linear-gradient(to left, #ca3500, rgb(245 74 0), #ca3500)` (orange-700 ends, the 2025 middle
stop; 5.23 / 3.58 / 5.23 on white) keeps the orange gradient heading; (B) *ink heading*: foreground (19.89) with the
2025 gradient moved under the words as a `Highlight`-style marker bar [repo: components/ui/hero-highlight.tsx:117-136].
The test asserts every stop ≥ 3:1 on white; the shot review checks the rendered glow behind it.

Rules: text never takes alpha (`/60`, `opacity-50`) or a gradient stop under its ratio; status is never colour-only;
the three grey families of 2025 (zinc tokens, `neutral-*`, `slate-*`) collapse into the zinc tokens; `--destructive`,
`--input`, chart and sidebar tokens are deleted (no forms, no charts) [inventory § 1a, 1d].

## Typography

- **One family: Montserrat Variable** (OFL), self-hosted latin woff2, preloaded, metric-matched Arial fallback
  (size-adjust 113.1 %) [repo: web/src/layouts/BaseLayout.astro:6-9,50; web/src/styles/global.css:38-45]. The flag
  emoji font goes: language labels are text ("English", "Français") [lessons 2026-10-06].
- **Italic:** used in 8 places and synthesized today (no italic file) [inventory § 2]. Keep synthesized unless the
  italic file fits the 100 KB font budget: open value (§ Open values).
- **Weights:** 900 display and section headings · 700 h3, tagline, emphasis · 600 card titles, buttons, contact actions ·
  500 nav and labels · 400 body. 300 (menu title) is dropped.

| Role | Token | Size (min → max) | Line height | Weight | Tracking | Was (2025) |
| --- | --- | --- | --- | --- | --- | --- |
| Page H1 (hero) | `text-display` | 36 → 72 px at 640 | 40 → 80 px | 900 | 0 | identical for Housing / About / Jobs; the other heroes keep their 2025 sizes until the H1 proposal below [inventory § 2] |
| Section heading `<h2>` | `text-h2` | 36 → 60 px at 640 | 40 → 70 px | 900 | 0 | 2025: 80 px from 640, a word-sized gap when a heading wraps (split sections, French); 70 px (1.17) since 2026-10-09 |
| Tagline, step title, menu links | `text-h3` | 24 → 36 px at 640 | 32 → 40 px | 700 (menu 500) | 0 | identical for the home tagline; 18–30 for menu links |
| Project card title, contact action, dialog title | `text-2xl` | 24 px | 1.33 | 600 (dialog 700) | 0 | same |
| Card title | `text-xl` | 20 px | 1.4 | 600 | 0 | same |
| Lede | `text-lg` | 18 px | 1.56 | 400 | 0 | same (`text-lg` ×29) |
| Body | `text-base` | 16 px | 1.5 | 400 / 500 in cards | 0 | same |
| Small | `text-sm` | 14 px | 1.43 | 400 | 0 | same |
| Button | `text-base` | 16 px | 1.25 | 600 | 0 | 14 px, 500 → 600 on hover |
| Nav | `text-base` | 16 px | 1.5 | 500 | 0.025 em | same, without the hover tracking change |

- Sizes off this scale (`text-3xl`, `5xl`, `7xl`, `8xl`, `xs`, `hover:text-3xl`) are not used in new code; the
  2025 one-offs (home H1 48 → 60, the timeline title 30 → 48) stay until their proposal ships.
- **proposal (comps/):** fluid steps (`clamp()`: display 36 → 72, h2 36 → 60, h3 24 → 36 px, growing until 1280 px)
  instead of the one jump at 640 px, where a 640 px phone in landscape gets the full 72 px.
- Display-to-lede ratio: 4:1 at ≥ 1280 (72 / 18), 2:1 at 320–390 (36 / 18), the 2025 proportions.
- `text-wrap: balance` on headings, `pretty` on ledes; boxes sized for French (it runs longer), never the English word.
- **proposal (comps/):** one H1 weight (900) and size for every hero: the home H1 goes 48 → 36 px and the We Spark
  H1 60 → 36 px on phones, Rent 600 → 900, About 96 → 72 px (its 96 px on an 80 px line box overlaps lines).
- **proposal (comps/):** buttons at 600 and 16 px at rest (the 2025 hover weight) instead of the 500 → 600 swap, which
  changes the button's width on hover; alternative: keep the swap and reserve the bold width.

## Spacing and layout

- **Base:** Tailwind's 4 px spacing. Stack steps in use: 0.5 · 1 · 1.5 · 2 · 3 rem (`gap-2`, `pt-4`, `pb-6`, `gap-8`,
  `gap-12`); odd steps (`gap-1.5`, `gap-2.5`, `mr-0.5`) stay inside component internals only [inventory § 3].
- **Section rhythm:** every section `padding-block-end: var(--space-section)` (144 px; 2025: 128 home, 144 inner
  pages, 80 TEC: home's 128 merges into 144, +16 px); a page hero starts at `var(--space-hero-top)` (128, then 192 px
  from 1280) below the fixed header (content at the 2025 height). **proposal (comps/):** a fluid rhythm (80 → 144 px)
  so phones scroll less; Housing and Rent heroes drop from 256 to 192 px at ≥ 1280 (their CTA moves up the fold).
- **Gutters:** `--pad-x` for header, sections and footer alike: the 2025 section gutter, 16 / 64 / 96 px (< 640 /
  ≥ 640 / ≥ 768). 2025 had 20/64 in the nav and 192 px in the footer at xl; both merge into it. **proposal (comps/):**
  a fluid `clamp(1rem, 6vw, 6rem)` (46 px at 768 instead of 96).
- **Max content width:** `--content-max` centres every section's content; fields and backgrounds bleed full width.
  2025 had none (only the timeline's 80 rem). Required by the ultrawide gate; **proposal (comps/)** for the value
  (96 rem vs 80 rem, open value).
- **Measure:** ledes `max-width: var(--measure)` (35 rem, merges 30 / 32.5 / 35 rem) and `var(--measure-hero)`
  (25 rem) beside a visual; always `max-width`, never a fixed `w-[25rem]` (it overflows at 390 [repo:
  app/(components)/housing/HousingHeader.tsx:23]).
- **Grids:** split sections (text + 3D or media) are two equal columns from 1280 px and stack below, text first;
  card rows `repeat(auto-fit, minmax(min(100%, 20rem), 1fr))` (20 rem = the 2025 card width); project list
  `minmax(min(100%, 45rem), 1fr)` (2025's 45 rem minimum track is wider than a phone [repo:
  app/WeSparkProjects/(components)/projectsList/ProjectsList.tsx:97]).
- **Breakpoints:** Tailwind's sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536. Behaviour switches live in CSS media
  queries, not `useViewportSize` (2025 had JS thresholds at 400, 600, 768, 1280 [inventory § 6]). Desktop nav from
  1280 (as 2025), menu below.
- **Chrome:** header 4 rem below 1280 px, 5 rem above, fixed; `scroll-padding-top: calc(var(--header-h) + 1rem)` so anchors (`#contact`) never
  land under it [repo: web/src/styles/global.css:55].

## Radius, shadow, border, z

| Token | Value | For | Merges (2025) |
| --- | --- | --- | --- |
| `rounded-md` | 0.525 rem | buttons | ShimmerButton 0.5 rem |
| `rounded-lg` | 0.65 rem | dialog, menu panel, map frame, popover | |
| `rounded-xl` | 0.9 rem | cards (project cards) | |
| `rounded-2xl` | 1 rem | photos, banners, carousel images | ElectricBorder 32 px around a 16 px image |
| `rounded-feature` | 3 rem | feature cards (the 2025 GlareCard look) | |
| `rounded-full` | pill | icon buttons, timeline dots | |

Shadows: Tailwind `xs` (buttons), `sm` (cards; was `shadow` / `shadow-sm`), `md` (feature cards), `lg` (dialog, menu,
popovers; was `lg` / `xl`); the shimmer button's inset highlights stay inside `.btn-shimmer` [repo:
web/src/styles/global.css:217-222]. No glow shadows on text. Borders: 1 px `--color-border` for decorative edges;
the project ShineBorder (one CSS implementation, § Components). Separators: 1 px `--color-border` (replaces
`bg-slate-500` and `bg-muted-foreground/75`).

Z: `--z-bg` (the one fixed background), `--z-sticky` (timeline step titles), `--z-header`, `--z-skip`. Dialogs and the
menu use the browser top layer (`<dialog>`, `popover`), so no `z-[99999999]` (the 2025 overlay class was malformed
and never applied [repo: components/ui/dialog.tsx:39]).

## Motion

- **Libraries:** CSS first (keyframes, transitions, scroll-driven timelines in longhands [lessons]); small vanilla
  scripts (in-view); canvas and 3D loops in workers (flow field, house, globe). No GSAP (licence) and no `motion` on static pages.
- **Durations:** 200–900 ms for everything a visitor waits for: `--dur-1` hover/press · `--dur-2` word fade, overlay ·
  `--dur-3` reveal box, menu open, poster → canvas cross-fade, card rise (ease-out, 80 ms apart; it starts as the
  card's place enters the screen [user 2026-10-09]) · `--dur-4` · `--dur-5` the longest entrance.
  Continuous loops sit outside that range and run at constant speed: marquee 25 px/s, line shadow 15 s, shine 14 s,
  shimmer 3 s, aurora 10 / 15 s, sparkle 0.8 s, 3D turn 0.1 rad/s [inventory § 7].
- **Easing:** `--ease-out` for entrances and hover, `--ease-in` for the reveal box leaving, `--ease-anticipate` for the
  one playful overshoot, `--ease-in-out` for alternating loops; `linear` only for constant-speed loops.
- **First screen:** the H1 is painted from the first frame; the reveal box may cover it for ≤ 500 ms (CSS, starts at
  first paint, no opacity or transform on the text itself) [repo: web/src/styles/global.css:111-136]; only non-LCP
  lines rise. The first-screen CTA is visible by 900 ms (2025 and the spike fade it in from 1.25 s over 2 s
  [repo: web/src/components/home/HomeHero.astro:42]); objective fix, the first tap is the point of the page.
- **Below the fold:** `[data-inview]` fades and word fades; hidden only when scripting is on and motion is allowed, so a
  failed script hides nothing [repo: web/src/styles/global.css:260-271]. The 2 s fades become `--dur-5`.
- **Reduced motion:** final state at once (box off, fades off, words visible, beam full, highlight full), loops off
  (marquee wraps into a still row, sparkles hidden, line shadow still), 3D final pose or poster, flow field and hero
  canvases off, no smooth scroll. The global reset zeroes `animation-delay` too, so staged entrances can't stay hidden
  [repo: web/src/styles/global.css:75-87; lessons 2026-10-06].
- **Loops:** run only while their section is near the viewport; never on the load path.
  **Cost (measured 2026-10-09, `memory/slice-costs.md`):** loops animate `transform` or `opacity` on an HTML element so
  the compositor runs them: each sparkle star is a `<span>` that scales around its own `<svg>` (an animated `<svg>`
  re-styled the page every frame), the shine is a 300 % gradient layer translated inside the masked border ring (it
  animated `background-position`, a repaint per frame), and both stay paused until `[data-loop]` marks them in view.
  The flow field draws in a worker on an OffscreenCanvas. Sections (`Section`), project cards and the footer carry
  `content-visibility: auto` with an intrinsic **height** (`contain-intrinsic-height`: the `-size` shorthand sets the
  width too, and a skipped 1400 px-wide project chapter widened a phone page), so the off-screen page skips layout, including the re-layout when
  the web font swaps in; its paint containment clips anything that overflows the box, so decorations stay inside, and a
  card's rise entrance is clipped at its section's edge for its half second.
  **proposal (comps/):** one site-wide "Pause animations" control (footer) for loops longer than 5 s (WCAG 2.2.2);
  the marquee already pauses on hover and focus.
- **Menu:** bars → cross (300 ms), the sheet drops in (opacity + 12 px + a top-down clip, 320 ms ease-out), links
  35 ms apart, the page dims to `zinc-900/35`; closing is the same backwards, faster [user 2026-10-09: "the menu
  doesn't even have an animation"] [repo: web/src/components/layout/SiteHeader.astro].
- **Hover:** never changes layout (no letter-spacing or weight swaps that resize); every hover has a focus twin and,
  where it carries meaning, a tap twin.

## Section header pattern

One component, `SectionHeader` (replaces the 21 `XHeader` files and the copy-pasted recipe [inventory § 12]), inside
one `Section` wrapper (replaces the 25 `XSection` files) [repo: web/src/components/ui/SectionHeader.astro,
web/src/components/ui/Section.astro]. Props: `id`, `title` (or slot `title` with `effect="plain"` for sparkles or line
shadow), `align`; the lede is the default slot, the actions slot `actions`. The markup it renders:

```
<section aria-labelledby={id} class="px-side" style="padding-block-end: var(--space-section)">
  <div class="mx-auto max-w-(--content-max)">
    <header class="section-header" data-align="center | start | end">
      <h2 id={id} class="text-h2 font-black heading-gradient">{title}</h2>
      <div class="lede">…</div>           <!-- text-lg, max-width var(--measure), gap 0.5rem, 1rem below the title -->
      <div class="actions">…</div>        <!-- flex-wrap gap-4, 1.5rem below the lede -->
    </header>
    <slot />                               <!-- cards, timeline, media -->
  </div>
</section>
```

- Levels: the page hero owns the only `<h1>`; sections are `<h2>`, cards and steps `<h3>` [lessons 2026-10-09].
- Alignment: centred by default; in a split section at ≥ 1280 the text aligns toward its visual (home Housing: end;
  home Projects: start, title and lede on the same edge, fixing the 2025 mismatch [repo:
  app/(components)/projects/ProjectsHeader.tsx:15-22]); centred below 1280.
- One title effect per header at most: gradient **or** sparkles **or** line shadow **or** highlight.

## Buttons and links

Decision: orange with dark text [user, HANDOFF § 2]. A link that goes somewhere is an `<a class="btn">`
(`ButtonLink`); an action is a `<button class="btn">`. Never a link inside a button, never `tabindex="-1"` on the real
control (12 keyboard-dead CTAs in 2025 [inventory § 12]).

| Variant | Look | When | Source |
| --- | --- | --- | --- |
| `.btn` primary | `primary` fill, dark ink, 500 (600 on hover/focus, as 2025; proposal below), 16 px, min-height 2.75 rem (44 px), padding 0.5 / 1.5 rem, `rounded-md`, `shadow-xs`; text arrow `→` (aria-hidden) nudges 0.5 rem on hover/focus over `--dur-1 --ease-out`; hover fill `primary/90`; press 1 px down (shimmer only so far) | one per block: Apply, Learn more, See for yourself | [repo: web/src/styles/global.css:139-164; components/ui/button.tsx:13,27] |
| `.btn-shimmer` | primary + the white spark sweeping the edge (3 s), inset highlight | the hero's first action only, at most one per page | [repo: web/src/styles/global.css:166-222] |
| `.btn-secondary` | `secondary` fill, `secondary-foreground` text, hover `secondary/80`; `ButtonLink secondary` | the second action beside a primary (home Housing "Learn more" next to "Apply now") | [repo: app/(components)/housing/HousingHeader.tsx:32-41] |
| `.btn-icon` | 2.75 rem pill, outline, icon 16–20 px + sr-only label | carousel previous / next (2025: 32 px) | [repo: components/ui/carousel.tsx:188] |
| Contact action | Lucide icon 24 px + `text-2xl` 600 label; hover underline and the label nudges 6 px; real `mailto:` (prefilled subject) / `tel:` (E.164) / copy button | contact block, owners' contact | [repo: app/(components)/contact/ContactLinks.tsx:17] |
| Inline link | underlined at rest (not colour-only), `primary-strong` or inherit | body text, credits, footer | |

- **Focus:** `outline: 3px solid var(--focus-ring); outline-offset: 3px` on every control; `.surface-dark` (the
  footer) switches the ring to white; the light header and menu keep the orange-700 ring (5.23:1 on white). Never removed, never under the sticky header.
- **Targets:** ≥ 44 px for buttons, menu and switcher items on touch; ≥ 24 px anywhere (WCAG 2.5.8).
- **Labels:** the visible label starts the accessible name; external links open in a new tab and say so
  ("(opens in a new tab)", sr-only) [repo: web/src/components/ui/ButtonLink.astro:17-28]. Labels come from the
  catalogs; boxes are sized for French.
- Deleted: shadcn `destructive`, `outline` (except `.btn-icon`), `ghost`, `link`, size `sm`.

## Components

| Component | Decision | Notes |
| --- | --- | --- |
| Header (`NavBar` + `HamburgerMenu` + `LanguagePicker`) | **merged** → `SiteHeader` | links ≥ 1280, menu below as a disclosure panel; language as flag + name links; a light frosted bar (`white/75` + blur, dark text, the logo in ink) with an orange-tinted Apply pill [user 2026-10-09] [repo: web/src/components/layout/SiteHeader.astro]; Apply and Contact one tap away on phones (`design-references.md`) |
| Footer | **rewritten** → `SiteFooter` | real landmarks, no `<h4>`/`<h5>` as text, one `tel:` per number, named social links, credits trigger; full-strength text (§ Colour) |
| BodyBackground | **kept**, pre-rendered | § Backgrounds |
| Credits dialog | **kept**, native `<dialog>` | focus trap, Esc, 44 px close button (2025: 16 px icon at 70 % opacity) |
| Toaster (sonner), Providers, React Query devtools | **deleted** | only the dead resize warning used toasts |
| Select, Sheet | **deleted** | language = links, menu = disclosure |
| Button (shadcn) + ShimmerButton (Magic UI, MIT) | **merged** → `.btn` + `ButtonLink` | § Buttons |
| Card (shadcn) | **kept** as a surface for project cards; **swapped** 2026-10-09 for full-width project chapters + "at a glance" tiles [user: "improve the projects subpage and layout"] | chapters: glass, the shine border, the project's colour in a corner glow, the gradient number, labels and list dots; a side column sticky from 1024 px. Tiles: 4 px top border in the colour, gradient number faded by its gradient (not `opacity`), lift on hover/focus |
| GlareCard (Aceternity) | **rewritten** → `FeatureCard` (own code, Q23) | keeps the 3 rem radius, ink-orange 64 px icon, centred title + text; tilt/foil as an optional hover layer with a focus twin; grid instead of fixed 320 px boxes |
| ShineBorder ×2 (Magic UI) | **merged** → one CSS `.shine-border` | 1 px project cards, 3 px photo frame; `motion-safe` only |
| BoxReveal, LineShadowText, SparklesText, TextAnimate (Magic UI) | **kept** as CSS (`Reveal`, `LineShadow`, `Sparkles`, `WordFade`) | done in the spike [repo: web/src/components/effects/*]; TextAnimate's 9 unused variants are not ported. The box sweeps in-out, ≤ 0.8 s (2025: ease-in up to 1.1 s, the lede covered for most of a second) [2026-10-09]. `WordFade` splits at breaking spaces only, so French no-break spaces stay in their word |
| Highlight (Aceternity) | **rewritten** as a CSS marker (`background-size` 0 → 100 %, `--dur-5`) | Rent hero |
| Timeline (Aceternity) | **rewritten** → `HowItWorks` (ordered list, CSS scroll-driven beam) | done in the spike |
| Carousel (Embla) | **kept**, accessible | labelled region, `.btn-icon` arrows, no autoplay, first picture shown (2025 skipped index 0) |
| Marquee (react-fast-marquee) | **rewritten** → `PartnerStrip` (CSS) | logos named; the EU emblem static outside it [research: licences § 5] |
| WarpBackground (Magic UI, MIT) | **rewritten** in CSS (grid + beams), adapted with notice | home "Who we are"; the text on a glass card at the tunnel's end (2026-10-09; in 2025 the beams ran through the words), as in Magic UI's demo |
| BackgroundLines (Aceternity), Vortex (Aceternity) | **rewritten** (own SVG/CSS; `flow-field.ts`) | Rent, Housing heroes |
| Lens (Aceternity) | **removed** (About us, TEC) | hover-only zoom with no tap twin; the photos show at full quality instead |
| ElectricBorder, Folder, LightPillar, ColorBends, SplashCursor (React Bits) | ColorBends **deleted** (Jobs retired); SplashCursor **removed** (paints over text, z 50 above the nav, no reduced-motion path; React Bits + WebGL-Fluid code, Q23; design-references.md § TEC "skip"); LightPillar, ElectricBorder, Folder **rewritten** in CSS, own code [repo: web/src/components/tec/] | the pillar is two blurred bands in the colours the 2025 `exclusion` blend showed on white (orange to yellow), swaying; the border an orange line whose glow layer flickers (opacity only); the folder's sheets name the three countries (text, no flag emoji). Each loops only on screen (data-loop) and stops under reduced motion. TEC is a past-event page now (Q8) |
| Globe (cobe, MIT) | **kept**, as a small vanilla island (no React) | `TecGlobe.astro`: a CSS sphere holds the place, cobe is imported when idle and near the screen, fades in, turns only on screen; under reduced motion it never loads (no canvas: the CSS sphere is the poster, e2e motion gate); markers moved from the Magic UI demo's ten world cities to the partner countries; three columns and the scroll growth (1 → 1.3) from 1280 only (at 390 it pushed the page 38 px wide) |
| Hero parallax, HeroHighlight, RealImpactMap, Bedroom scene, LoadingCube, ZoomController, `useMousePosition`, `useResizeWarning`, `gsapFadeInFromBottom`, OfferCard/OffersList | **deleted** (dead or retired) | inventory § 12 |
| 3D: House, Wardrobe, Rocket | **kept** | § 3D |

## Imagery

- Real photos of YWS only (group photo, project photos, the 7 house pictures); no stock or AI people; no fake
  screenshots. Every CC BY asset credited in the credits dialog, "modified" when re-encoded [research: licences § 2].
- Through the image pipeline: AVIF/WebP, real `widths` / `sizes`, ≤ 2560 px, `aspect-ratio` reserved, lazy below the
  fold; `fetchpriority="high"` only for an LCP image (the H1 is the LCP, so usually none; 2025 set it on every
  partner logo [repo: app/(components)/hero/HeroPartneredLogos.tsx:56]). The 25–31 MB originals never ship.
- Frames: `rounded-2xl`; one decorative frame effect per view (the shine border).
- Alt text says what the image shows, per locale: logo "Youth Work Synergy"; partner logos by partner name (Fondation
  **Sommer**); project photos by what is in them, not the project description; decorative images `alt=""`.
- Icons: Lucide outline, 24 px, stroke 2, `currentColor`; feature icons 64 px in ink-orange; social icons from each
  brand's official glyph [research: licences § 4]; no emoji as icons or bullets; the text arrow `→` stays (aria-hidden).

## 3D

| Rule | Value | Why |
| --- | --- | --- |
| Where | home only: hero house, Housing wardrobe, Projects rocket | the 2025 scenes [inventory § 10] |
| When | after `load` + idle, when the box is within 200 px of the viewport, from 1280 px (as 2025) | text first [repo: web/src/components/three/ToyScene.astro] |
| Below 1280 | **proposal (comps/):** the still poster (2025 showed nothing) | same feel on phones at zero WebGL cost |
| Weight | 3D chunk ≤ 300 KB gz; each model ≤ 2 MB after meshopt + WebP 1024 px (house 105 KB, wardrobe 178 KB from 1.46 MB, rocket 667 KB from 6.10 MB) | budgets [product/requirements.md] |
| Fallback | transparent WebP poster at the final pose in a CSS-sized box (no CLS), shown before load, under reduced motion, without WebGL; no orange wireframe Suspense cube | [repo: web/scripts/poster.mjs] |
| Contexts | the home's three toys share one worker (three.js loads once) with a WebGL context each, created only near the screen from 1280 px; each draws only while on screen (browsers allow about 16 live contexts) [decision 2026-10-09] | three.md § Rules |
| Running | `dpr` ≤ 2; renders only while visible and the tab is visible | 2025 rendered every frame offscreen |
| Motion | as in 2025: the house spins in (≤ 2 s ease-out) then turns 0.1 rad/s; the wardrobe swings (`sin(t × 0.35)`) and springs back after a drag; the rocket plays its own clip; reduced motion: the poster's pose, nothing moves | [repo: web/src/components/three/toy-scene.ts, toys.ts] |
| Input | drag on fine pointers; on touch no drag that captures vertical scroll (`touch-action: pan-y`) | scroll-jacking is an instant fail |
| Semantics | box `aria-hidden`; nothing essential lives only in 3D | |

## Backgrounds

- **Body:** one fixed layer, `contain: strict`: the grid drawn from its geometry, the vignette, and the glow as a
  pre-rendered WebP (mobile 430 × 932, desktop 960 × 1080 box + 200 px blur margin) instead of a live 100 px blur;
  nothing animates, so scrolling never repaints it [repo: web/src/components/layout/BodyBackground.astro;
  web/scripts/background.mjs].
- **Hero backgrounds:** at most one per page, behind the hero only; start after idle, run only while visible, off under
  reduced motion; never under body text without a scrim (a soft white plate behind the text block) when any frame
  drops text below AA.
- No new background effects; no `mix-blend-mode` over text; no full-screen fixed canvases (2025 SplashCursor).

## Do / Don't

| Do | Don't |
| --- | --- |
| Orange gradient headings that pass 3:1 at every stop | The 2025 stops (1.92–2.14:1) or alpha-faded text |
| Dark ink on orange buttons, one primary per block | White on orange, two equal buttons with no first action |
| One title effect per heading (gradient, sparkles, line shadow or highlight) | Stacking reveal + sparkles + shimmer + line shadow in one view's heading |
| Effects on words and frames, after the first paint | Effects on body text above the fold; an H1 hidden until JS |
| Static pre-rendered glow, loops only when visible | Live blur layers, offscreen loops, a fluid cursor over the text |
| Real `<a>` CTAs, visible focus, 44 px targets | `tabindex="-1"`, a link inside a button, 16 px close icons |
| Text labels for languages ("English", "Français") | Flag emoji as the only label |
| `max-width` boxes sized for French | Fixed `w-[25rem]` boxes that overflow at 390 |
| 3D beside the copy, poster first | 3D on the LCP path or blocking content on phones |
| Email, phone, map and socials as the contact | Any form [user 2026-10-09] |

## Specimen

`/en/specimen/` and `/fr/specimen/` [repo: web/src/pages/[locale]/specimen.astro]: every colour token with its
contrast on white and on ink, the gradient heading, the type steps with the site's own catalog strings (so the French
page shows French box sizes), layout, radius, shadow, motion and layer tokens, the buttons on the page and on dark
chrome, the four effects and the section header in its three alignments. Review builds only: a launch build makes no
paths, the launch gate fails if one ships, and it is noindex, outside the sitemap and without canonical or share card
[repo: web/scripts/launch-gate.mjs]. Shoot it with `bun run shots --paths /en/specimen/,/fr/specimen/ --full`.

## Open values (not resolved here)

- Real contrast of the heading gradient and the orange-600 H1 words over the rendered glow: computed upper bounds only;
  needs pixel sampling on shots.
- `--content-max`: 96 rem (in place: nothing moves below 1728 px) or 80 rem (comps at 1920 and 2560).
- Italic: synthesized (today) or the Montserrat italic file (bytes not measured against the 100 KB font budget).
- How three home scenes respect "one live context": mount/unmount by proximity vs one shared canvas.
- Button label 14 px (2025) vs 16 px (spike, chosen here): confirm in the P2 screenshot diff.
