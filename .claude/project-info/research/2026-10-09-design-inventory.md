# Design inventory of the 2025 site and the Astro spike (2026-10-09)

> Owns: the raw, counted inventory of every visual value the code uses today (colours, type, spacing, radii, shadows,
> borders, z-layers, breakpoints, motion, icons, imagery, 3D, backgrounds, component variants), with file, line and
> count. Input for `design/design.md` (the consolidated system) and `design/design-quality.md` (the rubric). Read from
> code only: nothing was rendered, so every "looks like" statement is a code reading, not a screenshot.

Method: I read every file under `app/`, `components/`, `canvases/`, `hooks/`, `lib/animations/`, `lib/icons/`,
`lib/fonts.ts`, `components.json`, and the spike's `web/src/**` + `web/scripts/{background,poster}.mjs`. Counts come
from a node script that regex-matches Tailwind classes and colour literals across `app components canvases hooks lib
contexts` (`lib/dictionary.tsx` counted separately); counts are occurrences in source, not rendered instances (a class
inside a `.map()` counts once). Tailwind palette values are read from the installed `node_modules/tailwindcss/theme.css`
(v4.3.0). Contrast ratios use the same oklch → sRGB maths as `web/src/styles/tokens.test.ts`; hex values next to oklch
tokens are that conversion. Tags: `[repo: path:line]`, `[research]`, `[assumption]`.

## 1. Colour

### 1a. Theme tokens (`app/globals.css` `:root`, shadcn "new-york", Tailwind 4 `@theme inline`)

`components.json` says `baseColor: "neutral"`, but the tokens are Tailwind **zinc** values [repo: components.json:10;
app/globals.css:164-197].

| Token | Value | = Tailwind | Hex | Used by | Source |
| --- | --- | --- | --- | --- | --- |
| `--background` | `oklch(1 0 0)` | white | #ffffff | body, `text-background` (white text) ×10, `bg-background/15` ×3, `/25`, `/50`, `/80` | [repo: app/globals.css:166] |
| `--foreground` | `oklch(0.141 0.005 285.823)` | zinc-950 | #09090b | body text, footer `bg-foreground/80`, picker `bg-foreground/25` ×3 | [repo: app/globals.css:167] |
| `--primary` / `--ring` | `oklch(0.705 0.213 47.604)` | orange-500 | #ff6900 | buttons, `text-primary` ×10, focus ring `ring-ring/50`, glare-card hover border | [repo: app/globals.css:172,183] |
| `--primary-foreground` | `oklch(0.98 0.016 73.684)` | orange-50 | #fff7ed | button text | [repo: app/globals.css:173] |
| `--secondary` | `oklch(41.206% 0.01327 285.76)` | (custom) | #4a4a52 | `variant="secondary"` button, once (home housing "Learn more") | [repo: app/globals.css:174; app/(components)/housing/HousingHeader.tsx:35] |
| `--secondary-foreground`, `--muted`, `--accent` | `oklch(0.967 0.001 286.375)` | zinc-100 | #f4f4f5 | secondary button text, menu title `text-muted` | [repo: app/globals.css:175-178] |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` | zinc-500 | #71717b | `text-muted-foreground` ×9 (card/dialog/sheet descriptions), picker bg `/40` `/60`, timeline dots | [repo: app/globals.css:177] |
| `--accent-foreground` | `oklch(0.21 0.006 285.885)` | zinc-900 | | shadcn hover states only | [repo: app/globals.css:179] |
| `--destructive` | `oklch(0.577 0.245 27.325)` | red-600 | | Button `destructive` variant: **never used** | [repo: app/globals.css:180] |
| `--border` | `oklch(86.686% 0.0001 271.152)` | (custom) | #d3d3d3 | every `border` (via `* { border-border }`) | [repo: app/globals.css:181,206] |
| `--input` | `oklch(0.92 0.004 286.32)` | zinc-200 | | no inputs exist (no forms) | [repo: app/globals.css:182] |
| `--chart-1..5`, `--sidebar*` (13 tokens) | orange-600, teal-600, cyan-900, `#ffb900`, amber-500 … | | | **never used** | [repo: app/globals.css:184-196] |
| `--radius` | `0.65rem` | | | radius scale (§ 4) | [repo: app/globals.css:165] |

Dead theme lines: `--font-sans: var(--font-geist-sans)` and `--font-mono` point at Geist variables that are never
defined (the body uses `montserratSans.className`) [repo: app/globals.css:10-11; app/layout.tsx:31]. `@custom-variant
dark` + 20 `dark:` classes in 6 files, but nothing ever sets `.dark` [repo: app/globals.css:4]. The `@layer base` block
is written twice and `@keyframes shine` twice [repo: app/globals.css:106,151,204-220,237-244].

### 1b. Orange (the identity colour)

| Value | Where | Count | Source |
| --- | --- | --- | --- |
| `#fa8534` (BoxReveal box) | every hero H1/lede reveal | 17 in components + 20 in `lib/dictionary.tsx` = **37** | [repo: app/(components)/hero/HeroHeader.tsx:20; lib/dictionary.tsx:258] |
| `text-orange-gradient`: `linear-gradient(to left, rgb(253,154,0), rgb(245,74,0), rgb(239,177,0))` clipped to text | 15 section headings, 3 hero H1s (About, Housing, Jobs), the timeline title | **19** class uses (+1 same stops in `Highlight`) | [repo: app/globals.css:224-226; components/ui/hero-highlight.tsx:135] |
| `#ff6900` (= orange-500 = `--primary`) | 3D Suspense wireframe fallback ×3; spike `theme-color` | 3 + 1 | [repo: canvases/house/components/HouseCanvas.tsx:24; web/src/layouts/BaseLayout.astro:44] |
| `text-orange-600` (#f54900) | home H1 italic words "your property" | 3 | [repo: app/(components)/hero/HeroHeader.tsx:25,31,44] |
| `via-orange-700` (#ca3500) + `from-amber-300` | timeline beam | 1 + 1 | [repo: components/ui/timeline.tsx:77] |
| `text-orange-900` (#7e2a0c) | card icons (64 px) on About, Rent, TEC | 11 | [repo: app/AboutUs/(components)/ourMission/OurMissionCards.tsx:15] |
| `#ff7820` | Contact sparkles (with `#ffd120`), project shine border default + Get Your Home | 3 | [repo: app/(components)/contact/ContactInfo.tsx:17; app/WeSparkProjects/(components)/projectsList/ProjectsCard.tsx:34] |
| `#ffb900` | TEC folder (flags) colour; `--chart-4` (unused) | 2 | [repo: app/TecConference/(components)/globe/GlobeFlags.tsx:12] |
| `rgba(216,111,62,0.25)` | `::selection` | 1 | [repo: app/globals.css:201] |
| `rgb(251,100,21)` (as 0–1 floats) | cobe globe markers | 1 | [repo: components/magicui/globe.tsx:23] |
| `text-orange-500`, `text-orange-950`, `border-orange-500`, `bg-orange-500/85` | dead `BedroomModel` / `LoadingCube` | 7 | [repo: canvases/bedroom/components/BedroomModel.tsx] |

### 1c. Violet (the second accent)

| Value | Where | Count | Source |
| --- | --- | --- | --- |
| `#730bce` | LineShadow hatch colour (home H1) ×2; sparkles second colour ×3 | 5 | [repo: app/(components)/hero/HeroHeader.tsx:24] |
| `#b96ff9` | sparkles first colour (home tagline, We Spark H1, TEC H1) | 3 | [repo: app/WeSparkProjects/(components)/hero/HeroHeader.tsx:18] |
| `#9e7aff` / `#fe8bbb` | SparklesText defaults: every call passes colours, so **dead** | 2 | [repo: components/magicui/sparkles-text.tsx:89] |
| `#5046e6` | BoxReveal default: always overridden, **dead** | 1 | [repo: components/magicui/box-reveal.tsx:16] |
| `#5227ff`, `#ff9ffc` | React Bits defaults (ElectricBorder, Folder, LightPillar): all overridden, **dead** | 3 + 1 | [repo: components/ui/ElectricBorder.jsx:8] |

### 1d. Greys, blacks and whites (alpha)

Three grey families coexist: zinc (tokens), **neutral** (`text-neutral-800` ×4 timeline body, `via-neutral-200` beam
track, `text-neutral-200` dead parallax) and **slate** (`bg-slate-500` ×3 programme separators, `bg-slate-950` glare-card
base, overridden by `bg-background/15` through `cn`) [repo: app/LookingForHousing/(components)/howItWorks/HowItWorksTimeline.tsx:17;
app/TecConference/(components)/conferenceProgram/ConferenceProgramHeader.tsx:36; components/ui/glare-card.tsx:123].

| Class / value | Where | Count | Source |
| --- | --- | --- | --- |
| `text-white` | footer ×10 (hover states, icons), nav, buttons | 17 | [repo: components/layout/Footer.tsx] |
| `text-white/80`, `text-white/60` | footer text, footer address/contact lines | 1, 3 | [repo: components/layout/Footer.tsx:27,32,41,44] |
| `bg-black/25` | nav bar | 1 | [repo: components/layout/NavBar.tsx:51] |
| `bg-black/50` | dialog and sheet overlays | 2 | [repo: components/ui/dialog.tsx:39; components/ui/sheet.tsx:37] |
| `bg-black/10` | TEC globe text box below lg | 1 | [repo: app/TecConference/(components)/globe/GlobeSection.tsx:21] |
| `bg-foreground/80` + `backdrop-blur-xs` | footer | 1 | [repo: components/layout/Footer.tsx:27] |
| `bg-background/15` (+ glare foil) | the 3 GlareCard grids | 3 | [repo: app/RentYourProperty/(components)/whyRentToUs/WhyRentToUsCards.tsx:65] |
| `bg-background/25` + `backdrop-blur-lg` | project cards | 1 | [repo: app/WeSparkProjects/(components)/projectsList/ProjectsCard.tsx:45] |
| `bg-background/50` + `backdrop-blur-md`; `bg-background/80` + `backdrop-blur-sm` | menu sheet; dialog | 1; 1 | [repo: components/ui/sheet.tsx:59; components/ui/dialog.tsx:61] |
| `bg-muted-foreground/40`, `/60` | language picker trigger, list | 1, 1 | [repo: components/layout/LanguagePicker.tsx:32,48] |
| `#c8c8c8` | WarpBackground grid lines | 1 | [repo: app/(components)/whoWeAre/WhoWeAreSection.tsx:16] |
| `#fafafa` | body vignette edge | 1 | [repo: components/layout/BodyBackground.tsx:7] |
| `bg-muted-foreground/75` `h-0.5` | separators inside the credits text | 2 | [repo: lib/dictionary.tsx] |
| `opacity-50` on text | TEC hero quote | 1 | [repo: app/TecConference/(components)/hero/HeroHeader.tsx:39] |

### 1e. Decorative multi-colour sets

| Set | Values | Where | Source |
| --- | --- | --- | --- |
| BodyBackground glow | 7 radial gradients: `hsla(215,98%,61%)` at 27% 37% (stop 0 → transparent 0 %, so it paints nothing), `hsla(125,98%,72%)` 97% 21%, `hsla(354,98%,61%)` 52% 99%, `hsla(256,96%,67%)` 10% 29%, `hsla(38,60%,74%)` 97% 96%, `hsla(222,67%,73%)` 33% 50%, `hsla(343,68%,79%)` 79% 53%; layer `opacity-25 blur-[6.25rem] saturate-150`, `top-20`, `xl:w-1/2` | every page | [repo: components/layout/BodyBackground.tsx:11] |
| Project shine borders | `#ff7820` Get Your Home, `#2757f5` Locked Out, `#3bffaa` Safe Paths, `#8d30ff` Girlssective, `#f5276f` Mobile Learning, `#54f527` Sport, `#f2f527` Self Chronicle | We Spark cards | [repo: app/WeSparkProjects/(components)/projectsList/ProjectsList.tsx:29-90] |
| Group-photo shine | red-400, purple-500, amber-500, yellow-400 (oklch literals), 3 px | About hero photo | [repo: app/(components)/hero/HeroImage.tsx:21-27] |
| BackgroundLines | 21 Material-style reds/oranges/yellows `#ff6f00` … `#fff176`, stroke 2.3 | Rent your property hero | [repo: components/ui/background-lines.tsx:67-89,105] |
| Vortex particles | `hsla(300..400, 100%, 60%, life)` (baseHue 300 + 100 range: magenta → red → orange) | Looking for housing hero | [repo: app/LookingForHousing/(components)/hero/HeroBackground.tsx:16; components/ui/vortex.tsx:179] |
| Warp beams | random `hsl(0..359 80% 60%)` per beam | home "Who we are" | [repo: components/magicui/warp-background.tsx:30,40] |
| ColorBends | `#ff7373`, `#f0ffc2`, `#ff990a` | Jobs hero (page retired) | [repo: app/Jobs/(components)/hero/HeroBackground.tsx:10] |
| LightPillar | `#30c8ff` → `#1439ff`, `mix-blend-mode: exclusion` | TEC hero | [repo: app/TecConference/(components)/hero/HeroBackground.tsx:9-13] |
| GlareCard foil | rainbow `rgb(255,119,115)` … `rgb(216,117,255)`, diagonal `#0e152e` + `hsl(180,10%,60%)` | About, Rent, TEC cards (hover) | [repo: components/ui/glare-card.tsx:49-54] |
| Red gradient | `#5a0a1f`, `#7a0f2b`, `#9d174d` (`.text-red-gradient`) | Jobs offer titles only (page retired) | [repo: app/globals.css:228-230; app/Jobs/(components)/offer/OfferCard.tsx:45] |
| Folder papers | `#e6e6e6`, `#f2f2f2`, `#ffffff`, `#70a1ff`, `#4785ff` (CSS defaults; JS overrides with `#ffb900`) | TEC flags | [repo: components/ui/Folder.css:1-7] |

### 1f. Measured contrast (computed, not rendered; page background assumed white unless stated)

| Pair | Ratio | Verdict | Source of the pair |
| --- | --- | --- | --- |
| Button text orange-50 on orange-500 (shadcn default) | **2.73:1** | fails AA | [repo: components/ui/button.tsx:13] |
| White on orange-500 (ShimmerButton) | **2.89:1** | fails AA (HANDOFF's "2.9:1") | [repo: components/magicui/shimmer-button.tsx:45] |
| Foreground on orange-500 (spike `.btn`) | 6.88:1 | AA | [repo: web/src/styles/global.css:147-148] |
| Secondary button #f4f4f5 on #4a4a52 | 7.98:1 | AA | [repo: components/ui/button.tsx:19] |
| Body foreground on white / on vignette `#fafafa` | 19.89 / 19.06 | AA | |
| muted-foreground 2025 (zinc-500) on white / at the glow's peak | 4.83 / 3.44 | AA on white, **fails** at the glow peak [assumption: peak = colour at 25 % over white, an upper bound] | |
| muted-foreground spike (`oklch(0.47 …)`) on white / at glow peak | 6.85 / 4.89 | AA | [repo: web/src/styles/global.css:12] |
| Orange-gradient stops on white: 253,154,0 / 245,74,0 / 239,177,0 | **2.14 / 3.58 / 1.92** | two of three stops **fail even 3:1** (large text) | [repo: app/globals.css:225] |
| Same stops at the glow peak | 1.53–1.97 / 2.55–3.30 / 1.37–1.77 | fail | |
| `text-orange-600` (home H1 words, ≥ 48 px bold) on white / glow peak | 3.59 / 2.56 | passes 3:1 on white only | |
| `text-primary` (orange-500) on white (TEC inline emphasis, 18–20 px) | **2.89** | fails | [repo: app/TecConference/(components)/globe/GlobeSection.tsx:25] |
| orange-700 on white / glow peak | 5.23 / 3.73 | AA (normal) / 3:1 | |
| orange-900 (icons) on white / glow peak | 9.42 / 6.72 | AA | |
| violet `#730bce` / `#b96ff9` on white | 7.87 / 3.13 | AA / large only | |
| Nav: white on `black/25` over white | **1.83** | fails | [repo: components/layout/NavBar.tsx:51] |
| Language picker: white on `muted-foreground/40` over the nav | **2.61** | fails | [repo: components/layout/LanguagePicker.tsx:32] |
| Menu sheet: white links on `background/50` over the `black/50` overlay over white | **1.83** (title `text-muted`: 1.67) | fails | [repo: components/layout/HamburgerMenu.tsx:103,114] |
| Footer `white/80` / `white/60` on `foreground/80` over white | 7.91 / 5.24 | AA (but alpha text on a sticky, blurred bar: lesson) | [repo: components/layout/Footer.tsx:27,32] |
| TEC quote: foreground at `opacity-50` | **3.74** | fails (18 px) | [repo: app/TecConference/(components)/hero/HeroHeader.tsx:39] |
| Focus ring `ring-ring/50` (orange 50 % ≈ #ffb480) vs white | **1.74** | fails 3:1 non-text | [repo: components/ui/button.tsx:8] |
| Spike header white on `black/60` over white | 5.74 | AA (unit-tested) | [repo: web/src/styles/tokens.test.ts:75-77] |
| Spike focus outline orange-700 vs white / vs the header `black/60` / vs spike footer | 5.23 / **1.10** / 3.05 | fails on the dark header | [repo: web/src/styles/global.css:70-74] |
| `#fa8534` reveal box vs white (non-text) | 2.48 | decorative, transient | |

## 2. Type

**Family:** Montserrat via `next/font/google`, `subsets: ["latin"]`, no `weight` (variable) and no `style`
[repo: lib/fonts.ts:3-6]; Noto Color Emoji 400 for the flag emoji only [repo: lib/fonts.ts:8-12]. Weights used: 300,
400, 500, 600, 700, 900 (no 100/200/800). **Italic** is used in 8 places (home H1 LineShadow words, the
"better future" sparkles, the Rent hero highlight, menu title and menu footer, TEC quote, the project "Pictures
gallery:" label, the credits' "Creative Commons Attribution") but no italic face is loaded, so the browser synthesizes
it [assumption: `next/font` defaults to `style: normal`]. The spike self-hosts `@fontsource-variable/montserrat` `wght`
(normal only), preloads the latin woff2 and adds a metric-matched Arial fallback (`size-adjust 113.1 %`, ascent 96.8 %,
descent 25.1 %) [repo: web/src/layouts/BaseLayout.astro:6,9,50; web/src/styles/global.css:38-45].

Tailwind v4.3 sizes (rem, default line-height): xs .75/1.33 · sm .875/1.43 · base 1/1.5 · lg 1.125/1.56 · xl 1.25/1.4 ·
2xl 1.5/1.33 · 3xl 1.875/1.2 · 4xl 2.25/1.11 · 5xl 3/1 · 6xl 3.75/1 · 7xl 4.5/1 · 8xl 6/1; `leading-20` = 5 rem,
`leading-14` = 3.5 rem [repo: node_modules/tailwindcss/theme.css:347-370].

| Role | Phone (< 640) | ≥ 640 (≥ 1280) | Weight | Line height | Tracking | Files / count |
| --- | --- | --- | --- | --- | --- | --- |
| H1 hero, gradient (About, Housing, Jobs) | 36 | 72 (About: 96 at xl) | 900 | phone 40 px (1.11); ≥ 640 80 px: 1.11 at 72, **0.83 at 96** (lines overlap) | 0 | [repo: app/AboutUs/(components)/hero/HeroHeader.tsx:15] (3) |
| H1 home "Rent out your property" | 48 | 60 | 700 + italic orange-600 words | 1 | 0 | [repo: app/(components)/hero/HeroHeader.tsx:21] |
| H1 Rent your property | 36 | 60 | **600**, highlight 700 italic | phone 56 px (`leading-14`), 80 px | `tracking-tight` (−0.025 em) | [repo: app/RentYourProperty/(components)/hero/HeroHeader.tsx:16] |
| H1 We Spark / TEC (sparkles) | **60** / 30 (the h1 says `max-sm:text-5xl`, but SparklesText's own default `text-6xl` on the inner div wins on We Spark; TEC overrides it with `max-sm:text-3xl`) | 60 | 700 (`<strong>` inside sparkles) | 1 | 0 | [repo: app/WeSparkProjects/(components)/hero/HeroHeader.tsx:16-20; components/magicui/sparkles-text.tsx:133; app/TecConference/(components)/hero/HeroHeader.tsx:28] |
| Section heading (`<h1>` in 2025!) | 36 | 60 | 900 | phone 40 px, ≥ 640 80 px (1.33) | 0 | `font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20`: **15 headings** (Jobs' one at 72 px), the Contact heading (same size, sparkles instead of the gradient), the timeline title (30 → 48) |
| Home tagline (`<h2>`) | 24 | 36 | 700; sparkles words italic, `font-normal` on the wrapper but bold again through the inner `<strong>` | 1.33 / 1.11 | 0 | [repo: app/(components)/hero/HeroHeader.tsx:40] |
| Timeline step title | 24 | 36 (md) | 700 | 1.11 | 0 | [repo: components/ui/timeline.tsx:50,55] |
| Card title (`<h3>`) | 20 | 20 | 600 | 1.4 | 0 | 3 card grids [repo: app/AboutUs/(components)/ourMission/OurMissionCards.tsx:51] |
| Project card title | 24 | 24 | 600 (`leading-none`) | 1 | 0 | [repo: app/WeSparkProjects/(components)/projectsList/ProjectsCard.tsx:63] |
| Contact links | 24 | 24 | 600 | 1.33 | 0 | 5 + 2 [repo: app/(components)/contact/ContactLinks.tsx:17] |
| Lede / section description | 18 | 18 | 400 | 1.56 | 0 | `text-lg` ×29; widths `w-[25rem]` ×11, `[30rem]` ×5, `[32.5rem]` ×7, `[35rem]` ×9, `[40rem]` ×2 |
| Body (timeline, cards) | 16 | 16 | 400 / 500 (cards) | 1.5 | 0 | [repo: app/LookingForHousing/(components)/howItWorks/HowItWorksTimeline.tsx:17] |
| TEC body blocks | 20 | 20 | 600 (`text-xl font-semibold`) | 1.4 | 0 | [repo: app/TecConference/(components)/globe/GlobeSection.tsx:23] |
| Small (card/dialog descriptions, menu footer) | 14 | 14 | 400 | 1.43 | 0 | `text-sm` ×9 |
| Buttons | 14 | 14 | 500 → **600 on hover/focus** (width changes) | 1.43 | 0 | [repo: components/ui/button.tsx:8]; `hover:font-semibold` ×11 |
| Spike `.btn` | 16 (inherits) | 16 | 500 → 600 | normal | 0 | [repo: web/src/styles/global.css:139-157] |
| Nav links | 16 | 16 (links only ≥ 1280) | 500 | 1.5 | `tracking-wide` .025 em, **hover/focus `tracking-wider` .05 em** (shifts the row) | [repo: components/layout/NavBar.tsx:51,84] |
| Menu links | 18 | 24, 30 at md | 500, hover `tracking-wide` | | | [repo: components/layout/HamburgerMenu.tsx:114] |
| Menu title | 20 | 20 | 300 italic | | | [repo: components/layout/HamburgerMenu.tsx:103] |
| Footer | 16 | 16 | 400 (in `<h4>`/`<h5>` without size) | 1.5 | 0 | [repo: components/layout/Footer.tsx:29-67] |
| Dialog title | 24 | 24 | 700 ("Credits 💖") | `leading-none` | 0 | [repo: components/layout/CreditsDialog.tsx:21] |
| TEC Zoom link hover | 18 → **30 on hover**, uppercase, `tracking-widest` | | 700 | | .1 em | [repo: app/TecConference/(components)/hero/HeroHeader.tsx:73] |

Counts: `text-lg` 29, `max-sm:text-4xl` 21, `sm:text-6xl` 20, `text-2xl` 12, `text-xl` 11, `text-sm` 9, `sm:text-7xl` 4;
`font-semibold` 58, `font-black` 22, `font-bold` 14, `font-medium` 10, `font-normal` 5, `font-light` 1;
`sm:leading-20` 21; tracking classes 8 (5 of them hover/focus changes).

Heading tags: 25 files render an `<h1>` (one per section; HANDOFF § 5), 1 real `<h2>` (home tagline), `<h3>` in the 3
card grids and the timeline; footer uses `<h4>`/`<h5>` for plain text.

## 3. Spacing and layout

- **Gutter `.px-side`:** 16 px (< 640), 64 px (640–767), 96 px (≥ 768); 23 sections [repo: app/globals.css:232-234].
  Nav: 20 / 64 px [repo: components/layout/NavBar.tsx:51]. Footer: 20 / 64 / **192 px at ≥ 1280**
  [repo: components/layout/Footer.tsx:27]. Spike: `--pad-x: clamp(1rem, 6vw, 6rem)` (19 px at 320, 46 px at 768,
  86 px at 1440, 96 px from 1600) [repo: web/src/styles/global.css:49].
- **Max content width:** none. Only the timeline caps at `max-w-7xl` (80 rem) [repo: components/ui/timeline.tsx:37];
  header and footer are `w-screen`; `body` is `w-screen` + `overflow-x-hidden!` [repo: app/globals.css:214].
- **Section padding** (bottom unless stated): home sections `pb-32` (128 px) ×4; inner pages `pb-36` (144) ×6; TEC
  `pb-20`/`md:py-20`/`md:pb-10`/`max-md:py-16` (80/40/64) ×6; Who we are `pb-6` + Warp `p-20` + header `pb-32`.
  **Hero top:** `pt-48` 192 (home, and About/We Spark/Jobs/TEC at ≥ 1280), `py-36`/`pt-32`/`pt-36` 128–144 below 1280,
  **`py-64`/`pt-64` 256** (Housing, Rent at ≥ 1280) [repo: app/LookingForHousing/(components)/hero/HeroSection.tsx:8;
  app/RentYourProperty/(components)/hero/HeroSection.tsx:8].
- **Inner spacing (top counts):** `gap-2` 43, `px-4` 28, `pt-4` 26, `pb-6` 21, `gap-4` 15, `gap-2.5` 10, `gap-1.5` 6,
  `py-8` 4, `gap-6` 4, `gap-8` 3, `gap-12` 3. The header-stack recipe `pt-4 pb-6 … flex flex-col gap-2` repeats in
  every section header.
- **Grids:** card rows are `flex flex-wrap justify-center gap-6` of fixed 320 px GlareCards (aspect 17:21)
  [repo: components/ui/glare-card.tsx:72]; projects `grid [grid-template-columns:repeat(auto-fill,minmax(45rem,1fr))]`
  (a 720 px minimum track; cards are `max-md:w-[85vw]`) [repo: app/WeSparkProjects/(components)/projectsList/ProjectsList.tsx:97].
- **Fixed widths without a breakpoint:** `w-[25rem]` on the home Housing and Projects ledes (400 px inside a 358 px
  column at 390) → overflow, clipped by `overflow-x-hidden` [repo: app/(components)/housing/HousingHeader.tsx:23;
  app/(components)/projects/ProjectsHeader.tsx:22] (code reading, not verified in a render).

## 4. Radii, shadows, borders

| Radius | Value | Where (count) | Source |
| --- | --- | --- | --- |
| `rounded-sm` | `calc(.65rem − 4px)` = .4 rem | select items (1) | [repo: app/globals.css:41] |
| `rounded-md` | .525 rem | buttons, select (5) | [repo: app/globals.css:42] |
| `rounded-lg` | .65 rem | dialog, Lens, TEC mobile text box, hero-highlight (4) | [repo: app/globals.css:43] |
| `rounded-xl` | .9 rem | Card (1) | [repo: app/globals.css:44] |
| `rounded-2xl` | 1 rem (Tailwind default) | hero photo ×2, TEC banner, shimmer highlight (4) | |
| `rounded-full` | pill | carousel arrows, timeline dots (5 live + 3 dead) | |
| `rounded-xs` | .125 rem | dialog/sheet close (2) | |
| `0.5rem` | ShimmerButton on the housing hero (default `100px`) | 1 | [repo: app/LookingForHousing/(components)/hero/HeroHeader.tsx:40] |
| `48px` | GlareCard `--radius` | 3 grids | [repo: components/ui/glare-card.tsx:40] |
| `32px` | ElectricBorder around the TEC banner, whose image is `rounded-2xl` (16 px): mismatched corners | 1 | [repo: app/TecConference/(components)/hero/HeroHeader.tsx:100,105] |
| `10px` / `5px` | Folder parts | | [repo: components/ui/Folder.css] |

Spike radius tokens reproduce the 2025 scale: sm .4, md .525, lg .65, xl .9, 2xl 1 rem [repo: web/src/styles/global.css:26-30].

Shadows: `shadow-xs` 5 (buttons, select trigger), `shadow-sm` 1 (Card) + `shadow` 1 (project card, = sm in v4),
`shadow-md` 2 (GlareCard, select content), `shadow-lg` 2 (dialog, sheet), `shadow-xl` 1 (language list), `shadow-2xl`
1 (dead parallax), ShimmerButton inset highlights `inset 0 -8px 10px #ffffff1f` / `-6px #ffffff3f` / `-10px #ffffff3f`
[repo: components/magicui/shimmer-button.tsx:72-81]; ElectricBorder glows `blur(1px)`, `blur(4px)`, `blur(32px)` at 0.3
[repo: components/ui/ElectricBorder.css:46-66].

Borders: 1 px `border-border` (#d3d3d3) on Card, dialog, select, glare-card (hover `border-primary`); ShineBorder
animated 1 px (projects) / 3 px (photo); ShimmerButton `border-white/10`; separators `bg-slate-500 h-px` ×3 (TEC
programme) and `bg-muted-foreground/75 h-0.5` ×2 (credits); timeline track 2 px gradient `via-neutral-200`.

## 5. Z-layers

| Value | Where | Source |
| --- | --- | --- |
| −4, −3, −2 | BodyBackground grid / vignette / glow | [repo: components/layout/BodyBackground.tsx:5-11] |
| −1, −10 | Housing Vortex; Jobs ColorBends, TEC LightPillar | [repo: app/LookingForHousing/(components)/hero/HeroBackground.tsx:12] |
| 0, 1, 10, 20, 30 | effect internals (line shadow, shimmer, sparkles, lens, warp); Rent hero header `z-[1]`; TEC globe text `z-10` | |
| 40 | home photo ShineBorder; timeline sticky step titles (`top-40`) | [repo: components/ui/timeline.tsx:46] |
| 50 | nav (fixed), select content, sheet + overlay, GlobeFlags, **SplashCursor (fixed, full screen, after the nav in the DOM, so it paints over the nav)** | [repo: components/layout/NavBar.tsx:51; components/ui/SplashCursor.jsx:1236-1242] |
| `z-[99999998  ]` | dialog overlay: the spaces inside the brackets split the class, so **no z-index applies** | [repo: components/ui/dialog.tsx:39] |
| `z-[99999999]` | dialog content | [repo: components/ui/dialog.tsx:61] |
| spike: −4, 40, 50, 60 | body background; timeline titles; header; skip link | [repo: web/src/components/layout/BodyBackground.astro:24; web/src/layouts/BaseLayout.astro:63] |

## 6. Breakpoints

Tailwind defaults: sm 40 rem, md 48, lg 64, xl 80, 2xl 96 [repo: node_modules/tailwindcss/theme.css:327-331].
Prefix counts: `sm:` 84, `max-sm:` 75, `md:` 36, `max-xl:` 25, `xl:` 24, `max-md:` 20, `lg:` 18, `max-lg:` 12
(all in TEC), `2xl:` 5, `max-2xl:` 4 (dead bedroom). JS thresholds next to them: **1280** (3D canvases ×3, read from
`useViewportSize`, so the first render never has them) [repo: app/(components)/hero/HeroSection.tsx:9], **768** (menu
closes on resize, while its trigger shows up to 1279) [repo: components/layout/HamburgerMenu.tsx:30,97], **600**
(Vortex particle count) , **400** (language label) [repo: components/layout/NavBar.tsx:71], **1100** (dead bedroom).
Desktop nav links appear only at ≥ 1280 (`max-xl:hidden`); 640–1279 gets the menu.

## 7. Motion

Libraries: **motion** (`motion/react`, 15 files), **GSAP** (1 live call: the house intro; `gsapFadeInFromBottom` and
the bedroom are dead), **tw-animate-css** (dialog/sheet/select enter/exit), CSS keyframes in `globals.css`,
**react-fast-marquee**, R3F `useFrame`, raw canvas/WebGL loops (Vortex 2D, ElectricBorder 2D, SplashCursor, ColorBends,
LightPillar, cobe). Reduced-motion support in 2025: only `motion-safe:animate-shine` on the two ShineBorders; nothing
else checks `prefers-reduced-motion` [repo: grep `motion-safe|prefers-reduced|useReducedMotion`].

| What | Where | Duration / delay | Easing | Library | Source |
| --- | --- | --- | --- | --- | --- |
| BoxReveal: box sweeps right, content rises 75 px + fades | every hero H1 + lede lines (37 instances) | 0.5–1.3 s; content delay 0.25 s; `useInView` | box `easeIn`, content default | motion | [repo: components/magicui/box-reveal.tsx:39-56] |
| motionFadeIn (opacity) | 11 CTA rows, project cards | **2 s**, delay 0.25 (hero CTA **1.25 s**, housing hero 1 s, TEC 0.75) | default | motion | [repo: lib/animations/motionFadeIn.ts:21-24] |
| TextAnimate "fadeIn by word" (opacity + y 20) | 32 dictionary paragraphs (16 per locale) | items 0.3 s, stagger 0.65 / words | default | motion | [repo: lib/dictionary.tsx:293; components/magicui/text-animate.tsx:107-124] |
| Cards rise y 200 → 0 | 3 GlareCard grids | 0.75 s, delay 0.125 × i | `easeInOut` | motion | [repo: app/AboutUs/(components)/ourMission/OurMissionCards.tsx:45] |
| Project cards fade | We Spark | 2 s, delay 0.15 + 0.1 × i | default | motion | [repo: app/WeSparkProjects/(components)/projectsList/ProjectsList.tsx:101] |
| Home photo flies in (x 1000, y −500, rotate 120°) | About hero (group photo) | 2 s | `anticipate` | motion | [repo: app/(components)/hero/HeroImage.tsx:14-16] |
| Highlight background 0 → 100 % | Rent hero H1 | 2 s, delay 0.5 | linear | motion | [repo: components/ui/hero-highlight.tsx:117-128] |
| Sparkles: 7 stars, scale/rotate/opacity | 4 headings | 0.8 s loop, random delay 0–2 s; React state updated every **100 ms** | default | motion | [repo: components/magicui/sparkles-text.tsx:29,126] |
| LineShadow hatch drift | home H1 (2 words) | 15 s loop | linear | CSS | [repo: app/globals.css:45] |
| ShineBorder | photo, project cards | 14 s loop | linear | CSS | [repo: components/magicui/shine-border.tsx:57] |
| Shimmer button | housing hero Apply | 3 s slide alternate, 6 s spin | ease-in-out / linear | CSS | [repo: components/magicui/shimmer-button.tsx:21-25] |
| Aurora (rotate ±5°, scale .9–1.1) | TEC banner (lg), flags (sm) | 10 s / 15 s alternate | ease-in-out | CSS | [repo: app/globals.css:56-57] |
| Warp beams | home Who we are | 5 s loop, delays 0–3 s | linear | motion | [repo: app/(components)/whoWeAre/WhoWeAreSection.tsx:10-16] |
| BackgroundLines (42 SVG paths) | Rent hero | 10 s loop, random delay 0–9 s, repeat delay 2–11 s; SVG fade 1 s | linear | motion | [repo: components/ui/background-lines.tsx:110-116] |
| Timeline beam height = scroll | Housing "How it works" | scroll-linked (`start 50%`→`end 50%`) | — | motion | [repo: components/ui/timeline.tsx:27-33] |
| Lens zoom (hover) | About photo, TEC banner | 0.3 s in; brightness-50 over 0.5 s | `easeOut` | motion | [repo: components/ui/lens.tsx:59-72] |
| GlareCard tilt + foil (hover) | 3 grids | 300 ms (`ease`), 200 ms linear while hovering | ease / linear | CSS vars | [repo: components/ui/glare-card.tsx:37-41,121] |
| Marquee | partner logos | 25 px/s, endless; logos are links with `tabIndex={-1}` | linear | react-fast-marquee | [repo: app/(components)/hero/HeroPartneredLogos.tsx:45-47] |
| Dialog / sheet / select | credits, menu, language | dialog 200 ms; sheet 500 open / 300 close | tw-animate default / `ease-in-out` | tw-animate-css | [repo: components/ui/sheet.tsx:59] |
| Hover nudges | arrow `→` margin 0 → 0.5 rem (×11), contact text `translate-x-1.5`, logo `scale-105`, nav letter-spacing | Tailwind default **150 ms**, `cubic-bezier(.4,0,.2,1)` | | CSS | [repo: node_modules/tailwindcss/theme.css:492-493] |
| Globe | TEC | `phi += 0.005` per frame; scale 1 → 1.3 over the first 300 px of scroll (React state per scroll event) | spring (damping 30, stiffness 100) | cobe + motion | [repo: app/TecConference/(components)/globe/GlobeSection.tsx:10-18] |
| House 3D | home hero | intro 2 s `expo.out` from −4π to −6.2π when the hero is 90 % in view, then −0.1 rad/s | | GSAP + R3F | [repo: lib/animations/gsapRotateModel.ts:11-23; canvases/house/components/HouseModel.tsx:19] |
| Wardrobe / Rocket 3D | home | `sin(t × 0.35)` swing; embedded clip 0 | | R3F | [repo: canvases/wardrobe/components/WardrobeModel.tsx:14; canvases/rocket/components/RocketModel.tsx:11] |
| SplashCursor fluid | TEC, full screen, opacity 0.5 | per frame | | WebGL | [repo: components/ui/SplashCursor.jsx:5-18] |

Spike (already rewritten in CSS): `--ease-out cubic-bezier(.22,1,.36,1)`, `--ease-in cubic-bezier(.55,0,1,.45)`,
`--ease-anticipate cubic-bezier(.68,-.4,.32,1.4)` [repo: web/src/styles/global.css:32-34]; reveal box 0.5–1 s, rise
delay 0.25 s; in-view fade **2 s** with `--fade-delay` (hero CTA still **1.25 s**) [repo: web/src/components/home/HomeHero.astro:42];
word fade 0.3 s; marquee 46 s / 78 s (= 25 px/s), paused on hover/focus, wrapped under reduced motion
[repo: web/src/components/home/PartnerStrip.astro:59-67]; 3D canvas fade-in 0.6 s `ease` [repo: web/src/components/three/HouseScene.astro:55-67];
`.btn` transitions 0.15 s; global reduced-motion reset (durations 0.01 ms, delays 0, one iteration, no smooth scroll)
[repo: web/src/styles/global.css:75-87].

## 8. Icons

- **lucide-react 0.525** re-exported from `lib/icons/index.ts` [repo: lib/icons/index.ts:20]. Live icons: menu
  (House, NotepadText, BadgeDollarSign, Info, Phone, PersonStanding, Speech, BriefcaseBusiness at 28 px); cards
  (BookOpenCheck, PiggyBank, Armchair, HandCoins, DollarSign, HeartHandshake, LandPlot, BrushCleaning, Calendar1,
  Headset, NotebookPen at **64 px, orange-900**); TEC programme inline (MailPlus, Star, Presentation, NotebookText at
  24 px; `Clock` imported, unused); Jobs (SquareChartGantt, BookOpenText 48/64 px, red-900); shadcn internals (XIcon,
  Check, ChevronDown/Up, ArrowLeft/Right). `QuestionsAndAnswersCards` imports 7 icons it never renders.
- **Local copies** (Lucide paths, 24 px, stroke 2): Email, Phone, Facebook, Instagram, Linkedin (live: footer +
  contact), ArrowBigRight (function misnamed `Instagram`), ClipboardType, Download (dead, bedroom only)
  [repo: lib/icons/*.tsx; research/2026-10-09-licences.md § 4].
- **Emoji as icons:** flags 🇬🇧 🇫🇷 (language picker, Noto Color Emoji) [repo: lib/dictionary.tsx:30,36], 🇮🇹 🇩🇪 🇱🇺
  (TEC folder, `text-5xl`) [repo: app/TecConference/(components)/globe/GlobeFlags.tsx:15-17], "Credits 💖", "🙏" (dead toast).
- Text arrow `→` in 11 CTAs; `●` characters as bullets in the Jobs offers; `>` as bullets in the TEC hero.

## 9. Imagery

| Asset | Size | Shown | Source |
| --- | --- | --- | --- |
| `logo.png` | 10 KB, rendered 80 × 60 | nav; alt "Youth Work Synergy (YWS) Logo" | [repo: components/layout/NavBar.tsx:58-64] |
| `favicon.png` | 667 B | `<link rel="shortcut icon">` | [repo: app/layout.tsx:28] |
| `yws_group_photo.jpg` | 467 KB, 700 × 500 box | About hero (in Lens + ShineBorder, flies in); alt mentions "in the About us section" | [repo: app/(components)/hero/HeroImage.tsx:31-38] |
| Partner logos (7 live + `tec_compendium.png` unused) | 8–166 KB | marquee, 100 / 150 px wide; `fetchPriority="high"` on every logo | [repo: app/(components)/hero/HeroPartneredLogos.tsx:48-57] |
| Project logos (2) | 19–21 KB | project cards, 240 px | [repo: app/WeSparkProjects/(components)/projectsList/ProjectsCard.tsx:52-58] |
| Project photos `get-your-home/1-6.JPG`, `locked-out/1-4.JPG` | **25–31 MB each** | 240 px thumbnails, alt = the project description | [repo: app/WeSparkProjects/(components)/projectsList/ProjectsCard.tsx:92-100] |
| Safe Paths posters en / fr | 225 KB each | 400 px | [repo: app/WeSparkProjects/(components)/projectsList/ProjectsList.tsx:60-64] |
| `tec_conference_banner.png` | 333 KB | TEC hero (500 × 600, 256 px wide below lg); alt copied from the group photo | [repo: app/TecConference/(components)/hero/HeroHeader.tsx:104-111] |
| House pictures | Supabase bucket | About carousel, `h-[30rem]`, `object-contain`, index 0 skipped | [repo: app/AboutUs/(components)/realImpact/RealImpactCarousel.tsx:20-24] |
| `houses/*` (7), form screenshot | 28–67 KB | **unused** | |
| `grid.svg` | 1.6 KB | body grid (inverted, 50 %) | [repo: components/layout/BodyBackground.tsx:9] |
| Google Maps iframes | — | home contact (`h-[30rem]`, wrapped in a link); About houses map (`RealImpactMap`, **not imported**) | [repo: app/(components)/contact/ContactMap.tsx:12-23] |

## 10. 3D scenes and other canvases

| Scene | Page / section | Model (size) | Camera, light | Behaviour | Shown | Source |
| --- | --- | --- | --- | --- | --- | --- |
| House | home hero, right of the H1 | `house.glb` 90 KB (Draco + WebP) | fov 90, (0, 10, 25); ambient 2 | PresentationControls (polar −π/8..π/3), intro spin, auto-rotate | **≥ 1280 only**, box `xl:h-[32.5rem] 2xl:h-[40rem] flex-grow` | [repo: canvases/house/components/HouseCanvas.tsx:11-33] |
| Wardrobe | home "Looking for housing?" (left) | `wardrobe.glb` 1.46 MB | fov 90, (0, 5, 25); ambient **4** | PresentationControls `snap`, swing | ≥ 1280, `h-[36rem] flex-1` | [repo: canvases/wardrobe/components/WardrobeCanvas.tsx:9-31] |
| Rocket | home "Youth-Led Projects!" (right) | `rocket.glb` **6.10 MB** | fov 90, (0, 7.5, 15); ambient 2, directional `orangered` 4 at (−3,−3,3) + white 2.5 at (10,10,1) | clip 0 loops | ≥ 1280, `h-[36rem] w-full` | [repo: canvases/rocket/components/RocketCanvas.tsx:8-37] |
| Bedroom | none (**dead**) | `bedroom.glb` 5.29 MB; preloads missing `/models/loft_bedroom.glb` | fov 45, Bloom | — | never | [repo: canvases/bedroom/components/BedroomModel.tsx:248] |

All three live scenes: Suspense fallback = orange `#ff6900` wireframe cube (no poster), no `dpr` cap, render every
frame even offscreen, no reduced-motion path, three WebGL contexts on the home page at ≥ 1280. Below 1280 the home
page shows no 3D at all. Spike: house only, CSS-sized box with a WebP poster, loaded after `load` + idle + 200 px
near-visibility, `dpr [1, 2]`, final pose under reduced motion, intro rewritten as expo-out in `useFrame`
[repo: web/src/components/three/HouseScene.astro:14-53; web/src/components/three/house/HouseCanvas.tsx:12-53].

Other canvases: Vortex (2D, 700 particles / 400 at ≤ 600 px, `blur(8px)` + `blur(4px)` brightness 200 % per frame,
Housing hero) → spike `flow-field.ts` (own code, after idle, off under reduced motion) [repo: components/ui/vortex.tsx:210-216;
web/src/scripts/flow-field.ts:47]; ColorBends (three.js shader, Jobs); LightPillar (three.js shader, TEC);
ElectricBorder (2D, TEC banner); cobe globe (TEC, 16,000 samples, DPR 2); SplashCursor (WebGL fluid, TEC).

## 11. Backgrounds

- **Every page:** fixed full-screen layer at z −4: grid SVG (inverted, 50 %), vignette `radial-gradient(circle,
  rgba(2,0,36,0) 0, #fafafa 100%)`, and the glow (§ 1e) under a **live `blur(6.25rem)` + `saturate(150%)`**, 25 %
  opacity, full width below 1280 and half width centred above [repo: components/layout/BodyBackground.tsx:5-11].
  Spike: same three layers, glow pre-rendered to `public/bg/aurora-{mobile,desktop}.webp` (430 × 932 and 960 × 1080
  boxes + 200 px blur margin, WebP q 70) and the grid redrawn as a data-URI SVG from its geometry, `contain: strict`
  [repo: web/scripts/background.mjs:21-48; web/src/components/layout/BodyBackground.astro:9-70]. The WebPs are not
  generated yet (HANDOFF § 4.3).
- **Per hero:** Housing Vortex (35 rem tall band behind the H1), Rent BackgroundLines (`bg-white`, `md:h-screen`), Who
  we are WarpBackground (masked radial), Jobs ColorBends (`mask-b-from-10%`), TEC LightPillar (`mix-blend-mode:
  exclusion`) + SplashCursor + globe. Text sits directly on these with no scrim.

## 12. Component variants

| Family | Variants in code | Used | Notes / source |
| --- | --- | --- | --- |
| Button (shadcn) | default, secondary, outline, destructive, ghost, link × default / sm / lg / icon | default+lg (10), secondary+lg (1), outline+icon (carousel arrows), default (credits close) | destructive, ghost, link, `sm` unused; 12 CTAs are `<Link tabIndex={-1}>` around or inside a `<Button>` (keyboard-dead or nested) [repo: components/ui/button.tsx:11-29] |
| ShimmerButton | one | housing hero "Apply now" | white text on orange 2.89:1 [repo: app/LookingForHousing/(components)/hero/HeroHeader.tsx:37-45] |
| Text CTA | icon + 24 px semibold text, underline + nudge on hover | contact (5), Rent contact (2, plain `<span>`, not links) | email and phone are not links on home and Rent (HANDOFF § 5) |
| Cards | GlareCard (320 px, 17:21, radius 48, tilt + foil) ×3 grids; shadcn Card + ShineBorder (projects); OfferCard (Jobs, no surface) | | GlareCard is Aceternity (FLAG, rewrite) [research: licences § 1c] |
| Section header | `XHeader` (title + lede + optional CTA row) inside `XSection` (`<section class="px-side pb-…">`) | **21 Header + 25 Section files** | alignments: centred (most), right at ≥ 1280 (home Housing), **left title with a right-pushed lede** (home Projects: copied `xl:ml-auto` from Housing) [repo: app/(components)/projects/ProjectsHeader.tsx:15-22] |
| Hero header | BoxReveal-wrapped H1 + lede lines + CTA fade | 7 pages | the dictionary carries its own BoxReveal/TextAnimate wrappers (20 + 32 in `lib/dictionary.tsx`, half per locale) |
| Carousel | Embla (shadcn), loop, prev/next 32 px pills | About houses | arrows below on phones at 40 % / 60 % [repo: app/AboutUs/(components)/realImpact/RealImpactCarousel.tsx:38-39] |
| Dialog | credits only: `bg-background/80` + blur, `max-w-lg`, `p-6`, `rounded-lg`, close X 16 px at opacity 70 % | footer "See credits" (`cursor-help`) | [repo: components/layout/CreditsDialog.tsx; components/ui/dialog.tsx:61-74] |
| Sheet | right side only (left/top/bottom unused) | phone menu < 1280 | [repo: components/ui/sheet.tsx:60-68] |
| Select | language picker (flag emoji, native label > 400 px) | nav (< 1280 and ≥ 1280 copies), menu | becomes text links in the spike [repo: web/src/components/layout/SiteHeader.astro:47-63] |
| Timeline | sticky titles at `top-40`, 2 px beam | Housing "How it works" | Aceternity (rewritten in the spike as CSS scroll-driven) |
| Marquee | react-fast-marquee, `autoFill`, speed 25 | home partner strip | spike: CSS, two copies, pause on hover/focus |
| Text effects | BoxReveal, LineShadowText, SparklesText, TextAnimate (10 variants, only `fadeIn` by word used), Highlight | | spike: Reveal, LineShadow, Sparkles (seeded), WordFade |
| Toast | sonner `Toaster` in the layout | only by the dead `useResizeWarning` | ships `next-themes` without a provider [repo: components/ui/sonner.tsx:8] |

**Duplicates:** two `shine-border.tsx` (`components/magicui/` used by the photo, `components/ui/` used by project
cards; identical except formatting and class order) [repo: components/magicui/shine-border.tsx:57;
components/ui/shine-border.tsx:57]; `@keyframes shine` ×2 and `@layer base` ×2 in `globals.css`; the contact link list
×2 (`ContactLinks`, `InterestedInRentingContactLinks`); the card-grid motion wrapper ×3 (Mission, Why rent, Q&A);
the 1280 canvas gate ×3; `MIN_VIEWPORT_WIDTH_TO_RENDER_CANVAS_PX` ×3.

**Dead:** `hero-parallax.tsx`, `HeroHighlight` (only `Highlight` used), `RealImpactMap`, `BedroomCanvas` +
`BedroomModel` + `LoadingCube` + `ZoomController`, `useMousePosition`, `useResizeWarning` (+ sonner),
`gsapFadeInFromBottom`, `--animate-grid`, the chart/sidebar tokens, `dark:` variants,
Button destructive/ghost/link/sm, TextAnimate's 9 unused variants, `CardAction`, `DialogFooter`, Select group/label/
separator/value, `.text-red-gradient` once Jobs is retired.

## Not covered

- No rendering: no contact sheet or screenshots (P2 asks for one; this run was code-only by instruction, a Lighthouse
  run was in progress), so rendered sizes, the real glow intensity behind text, the overflow at 390 and the dialog
  stacking bug are code readings, not observations.
- Contrast at the glow "peak" is an upper bound (the colour at 25 % over white); real values need pixel sampling on shots.
- `lib/dictionary.tsx` counted only for animation wrappers and classes (62 `className`s), not every inline style.
- React Bits / Aceternity internals (shader uniforms, SplashCursor's 1,260 lines) were scanned for colours and
  positioning only.
- The live site was not compared with the code; `app/favicon.ico` and the `.glb` texture palettes were not inspected.
