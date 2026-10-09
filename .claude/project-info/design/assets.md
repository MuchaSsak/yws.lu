# Assets

> Owns: the sourcing policy, where assets live, the inventory of every shipped or committed asset with its rights and
> its fate in the revamp, the 3D model credits, fonts, icons, copied components and the dependency licence summary.
> Evidence: `research/2026-10-09-licences.md` (every file opened, Sketchfab API, LICENSE files; 2026-10-09). Rights to
> photos of people and privacy: [compliance-and-data](../legal/compliance-and-data.md). Notices:
> [`THIRD_PARTY_NOTICES.md`](../../../THIRD_PARTY_NOTICES.md). Temporary items are rows in
> [placeholders](../placeholders.md).

## Sourcing policy

- **Hard rule** [user 2026-10-09, brief § 2]: every font, image, texture, model, icon, sound, library and copied
  component is free for commercial use (OFL, Apache, MIT, BSD, ISC, CC0, CC BY with its credit shown) or the client's /
  owner's own work. **Unknown licence = not used.**
- **Allowed:** the client's material (logos, photos, posters) while its status is "client material, unconfirmed" (Q10,
  Q11, Q22 defaults: kept as published today [assumption]); code-drawn SVG/CSS/canvas made for this site; CC BY 3D
  models with the credit (and "modified" once re-encoded) in the credits dialog, en + fr; OFL fonts, self-hosted;
  npm packages on the list; official partner and brand files, unmodified, within each brand's rules.
- **Not used:** Aceternity UI (proprietary), GSAP (Webflow "no charge" licence), React Bits (MIT + Commons Clause):
  rewritten from the idea as own code, never ported line by line (Q23, decided by rule); files of unknown origin
  (`grid.svg` → redrawn); stock or AI-generated people; screenshots of Google Maps as the map facade (Google's content,
  no licence on the list); Vercel's default favicon.
- **Build and test tools** outside the list by name (MPL-2.0, BlueOak-1.0.0, Python-2.0, LGPL binaries, CC-BY data) are
  allowed only when nothing of them is served to visitors (table below).
- **Notices:** MIT/OFL code and fonts in `THIRD_PARTY_NOTICES.md`; adapted Magic UI code carries a header comment;
  CC BY credits in the on-site credits dialog (brief: it "must stay correct").
- **Who approves:** the client for anything showing a person, a partner or a funder; the owner for licences.

## Formats (revamp)

- Every raster a page shows goes through `astro:assets` (`<Image>` / `<Picture>`): WebP (AVIF where it wins), widths
  the layout needs, `sizes`, lazy below the fold, eager + `fetchpriority="high"` only for the LCP image, reserved aspect
  ratio [brief § P3]. Sources may stay JPEG/PNG in `web/src/assets/`.
- PNG only for favicons and the generated 1200×630 share images ([seo](../site/seo.md)).
- Models: `gltf-transform optimize … --compress meshopt --texture-compress webp --texture-size 1024 --simplify false`
  (2048 only where the camera gets close), loaded with `useGLTF(url, false, true)`; ≤ 2 MB per scene
  ([requirements](../product/requirements.md)); posters WebP ([three](../tech/usage/three.md)).
- Metadata (EXIF) is dropped on re-encode [assumption: sharp default; check one output on the first build].
- Sizes on this page: bytes from `ls -l`, shown with KB = 1,000 bytes and MB = 1,000,000 bytes.

## Folders

| Path | Holds | In git? |
| --- | --- | --- |
| `public/` | the 2025 Next app's assets (278 MB on disk by `du -sh`, 275.5 MB of it the 10 project JPGs) | yes; stays until the Next app is removed at parity, then lives in history (never rewritten) |
| `web/public/` | served as is: `favicon.png`, `logo.png` (copies); next: `ms32821332.txt`, the favicon set, `og/` | yes |
| `web/public/models/`, `posters/`, `bg/` | re-encoded models, scene posters (`bun run poster`), pre-rendered glow (`scripts/background.mjs`): **referenced by the spike, not generated yet** (spike never built) | yes once generated (they ship) |
| `web/src/assets/` | sources for `astro:assets`: `partners/` (7 logos), `houses/` (7, from the retired Supabase bucket), `photos/` (the group photo), `projects/` (10 photos re-encoded to 2560 px JPEG q82 with EXIF dropped by `web/scripts/project-photos.mjs`: 275.5 MB → 2.9 MB; 2 logos and 2 posters byte copies; 3.4 MB in all) | yes |
| `.case-study/`, `comps/`, `screenshots/` | evidence, comps, QA shots | no (gitignored) |

## Inventory: `public/` (2025) and `web/`

"Unused" means no reference in `app/`, `components/`, `canvases/`, `lib/`, `contexts/`, `hooks/`, `services/` (grep
2026-10-09). Rights "client" = provided by YWS, permission and authorship not confirmed.

| File | Kind | Size | Where used (2025 → revamp) | Source | Licence / rights holder | Credit | Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `public/favicon.png` | PNG 32×32, black "y" | 0.7 KB | `app/layout.tsx` `<link rel="shortcut icon">` → `web/public/favicon.png` (`BaseLayout`, root `index.astro`) | YWS mark [assumption] | client | — | **redraw** as a set from a master logo: ICO/PNG ≥ 48 px, SVG, apple-touch 180, manifest 192/512 [research: seo]; master needed (Q33) |
| `app/favicon.ico` | ICO 16/32/48/256 | 25.9 KB | Next serves it at `/favicon.ico` (file convention) | create-next-app default: its 256 px frame is Vercel's triangle (extracted 2026-10-09); initial commit `2a1e453` | Vercel's mark, not YWS's | — | **remove** (not carried over) |
| `public/logo.png` | PNG 300×200 RGBA, white | 10.2 KB | `NavBar.tsx`; dictionary `og:image`, `twitter:image`, JSON-LD `logo` → `web/public/logo.png` (`SiteHeader.astro`) | YWS | client | — | keep; ask for a vector master; share images become generated cards ([seo](../site/seo.md)) |
| `public/ms32821332.txt` | text | 205 B | served at `/ms32821332.txt`; not referenced | Microsoft 365 domain verification [HANDOFF § 5] | — | — | keep: **copy to `web/public/`** (missing there) |
| `public/files/brochure.pdf` | PDF | 584.8 KB | only `canvases/bedroom/components/BedroomModel.tsx` (dead code) | client | client | — | **remove** from the shipped site (Q14; history keeps it) |
| `public/files/CDD_(possible_CDI)_éducateur_trice.pdf` | PDF | 74.4 KB | Jobs page (retired) | client | client | — | **remove**; `/files/CDD_*` 308 → About us (`LEGACY` in `web/src/lib/routes.ts`) |
| `public/files/CDD_de_6_mois_-_Gestionnaire_du_parc_immobilier_20h_par_semaine.pdf` | PDF | 71.1 KB | same | client | client | — | **remove** (same 308) |
| `public/images/grid.svg` | SVG tile 100×100 | 1.6 KB | `components/layout/BodyBackground.tsx` | Adobe XD export (`id="download"`) | **unknown origin** | — | **redrawn** (done): the same 1 px lines every 10 px from 15 to 95, 5 % black, as a data URI in `web/src/components/layout/BodyBackground.astro`; not copied |
| `public/images/houses/` (assel.webp 533×799, limpertsberg.webp 594×799, mondercange.jpg, oberanven.jpg, oberkorn.jpg, soleuvre.jpg, spinkange.jpg; 450–800 px) | 2 WebP + 5 JPEG | 370.2 KB total (27.8–63.4 KB each) | **unused** (no `/images/houses` reference; the site lists the Supabase bucket of the same 7 names) | client | client | — | **remove** (not copied) |
| `public/images/partners-logos/andre_losch_logo.png` | PNG 1354×409 | 20.9 KB | home marquee (`HeroPartneredLogos.tsx`) → `web/src/assets/partners/` (`PartnerStrip.astro`) | André Losch Fondation | partner's mark; permission Unknown (Q11) | — | keep; `astro:assets` 100/150/300 w |
| `…/partners-logos/erasmus.svg` | SVG 312×89 mm | 8.2 KB | marquee → `web/src/assets/partners/erasmus.svg` | the **2014–20** "EU flag + Erasmus+" lock-up | EU; 2021–27 emblem rules: no programme logo, emblem unmodified, ≥ the largest other logo | — | keep meanwhile (Q21 default); **replace** by the "Co-funded by the European Union" emblem, static (not in the marquee), on the EU-funded projects' pages once the client confirms (Q21) |
| `…/partners-logos/esc.png` | PNG 574×150 | 24.5 KB | marquee → `web/src/assets/partners/` | European Solidarity Corps logo | EU; ESC visual guidelines (colour, protection area); permission Unknown (Q11) | — | keep; prefer the official file from the ESC "Components" package |
| `…/partners-logos/gestion_locative_sociale.png` | PNG 1503×873 | 165.9 KB | marquee → `web/src/assets/partners/` | Ministry of Housing scheme | LU government logotype (charter logo.public.lu, files from the SIP); permission Unknown (Q11) | — | keep; **compress** (`astro:assets` widths) |
| `…/partners-logos/ministry_of_housing.png` | PNG 907×520 | 33.3 KB | same | Ministry of Housing | LU government logotype; Q11 | — | keep |
| `…/partners-logos/ministry_of_justice_logo.png` | PNG 1050×245 | 25.0 KB | same | Ministry of Justice | LU government logotype; Q11 | — | keep |
| `…/partners-logos/tec_compendium.png` | PNG 500×500 | 18.0 KB | **unused** | client or partner | Unknown | — | **remove** (not copied) |
| `public/images/projects/fondation_summer_logo.png` | PNG 1541×420 | 16.1 KB | marquee (alt "Fondation Summer") → `web/src/assets/partners/fondation_sommer_logo.png` (name fixed) | Fondation Sommer | partner's mark; Q11 | — | keep |
| `…/projects/get_your_home_logo.png` | PNG 1289×483 | 21.3 KB | We Spark (`ProjectsList.tsx`) | client (designer Unknown) | client; Q22 | — | keep; `astro:assets` |
| `…/projects/locked_out_logo.png` | PNG 936×656 | 18.6 KB | same | client | client; Q22 | — | keep |
| `…/projects/get-your-home/1–6.JPG` | JPEG 7952×5304 | 25.1–30.6 MB each, **170.9 MB** total | We Spark carousel | client; EXIF Sony ILCE-7RM2, 2025-09-30, `Artist` tag set (a photographer's handle), no GPS | client; photographer's rights and consent of the people shown Unknown (Q10, Q22) | photographer credit if the client wants one | **resized** 2026-10-09: one 2560 px master each (`web/scripts/project-photos.mjs`, EXIF and the `Artist` tag dropped) in `web/src/assets/projects/get-your-home/`, then `astro:assets` widths; originals stay in history only |
| `…/projects/locked-out/1–4.JPG` | JPEG 7728×5152 | 25.4–26.5 MB each, **104.6 MB** total | same | client; EXIF Fujifilm X-E5, 2025-11-29, no GPS | as above (Q10, Q22) | as above | **resized** (same, `web/src/assets/projects/locked-out/`) |
| `…/projects/safe-paths/image_en.jpg`, `image_fr.jpg` | JPEG 2109×2956 | 227.5 KB, 224.9 KB | We Spark, one per locale | client poster (flat illustrations; Ministry of Justice and "Muse." logos) | illustration source Unknown (Q22) | — | keep; `astro:assets`; the poster's text also in alt/visible text |
| `…/projects/tec_conference_banner.png` | PNG 1080×1920 | 332.6 KB | TEC hero (inside Lens + ElectricBorder) | client poster (NINFEA / Kultur Nest e.V. logos, EU emblem) | illustration source Unknown (Q22) | — | keep; **compress** (`astro:assets` WebP) |
| `public/images/yws_apply_for_housing_form_screenshot.jpg` | JPEG 1514×982 | 67.5 KB | **unused** | the client's Google Form | client | — | **remove** |
| `public/images/yws_group_photo.jpg` | JPEG 2560×1707, no EXIF | 467.5 KB | About us hero (`HeroImage` imported by `app/AboutUs/(components)/hero/HeroSection.tsx` only); also baked into `bedroom.glb` | client | client; consent Unknown (Q10) | — | keep; **compress** (`astro:assets` widths) |
| `public/models/house.glb` | glTF, glTF-Transform v4.1.0, Draco + WebP + unlit | 90.6 KB | home hero (`HouseCanvas`) → `web/src/components/three/house/HouseCanvas.tsx` | Sketchfab "Cat House" | CC BY 4.0 | yes (below) | **compress**: re-encode meshopt → `web/public/models/house.glb` (no Draco decoder from gstatic) |
| `public/models/rocket.glb` | glTF, Sketchfab-12.67.0 export, 9 textures (4 JPEG, 5 PNG), 1 animation | 6.10 MB | home projects section (`RocketCanvas`) | Sketchfab "Cosmonaut on a rocket" | CC BY 4.0 | yes | **compress** to ≤ 2 MB (textures are 93 %; WebP 1024); check the animation after `--flatten/--join` |
| `public/models/wardrobe.glb` | glTF, Sketchfab-15.22.0 export, 3 textures | 1.46 MB | home housing section (`WardrobeCanvas`) | Sketchfab "Stylized Wardrobe" | CC BY 4.0 | yes | **compress** (textures 96 %) |
| `public/models/bedroom.glb` | glTF, Blender I/O v4.3.47, Draco, 26 images (7 YWS house photos, `Untitled-1` "Our Homes" lettering on wood, `Untitled-2` "Our Journey" with the group photo) | 5.29 MB | **not rendered**: `BedroomCanvas` imported by nothing; `BedroomModel` also preloads a missing `/models/loft_bedroom.glb` | Sketchfab "Loft Bedroom", retextured | CC BY 4.0 (modification not credited); wood texture and fonts Unknown | yes today | **remove** with `canvases/bedroom/` and its credit |
| Supabase bucket `houses-pictures` (7 images: assel.webp, limpertsberg.webp, mondercange, oberanven, oberkorn, soleuvre, spinkange .jpg) → **`web/src/assets/houses/yws-shared-house-1…7`** (byte copies, 2026-10-09) | repo | 28–63 KB each | About us gallery, through `astro:assets`, alt per locale (`web/src/data/houses.ts`) | client | client | — | keep; skip `.emptyFolderPlaceholder` (the 2025 carousel skipped index 0) |
| `web/src/assets/partners/*` (7) | copies | same bytes as the originals | `PartnerStrip.astro` | as the rows above | as above | — | as above |
| `web/public/posters/house.webp` | WebP render of the house scene | not generated | `HouseScene.astro` poster | own render of the CC BY model | CC BY 4.0 (an adaptation of "Cat House") | covered by the model's credit ("modified") | generate (`bun run poster`) |
| `web/public/bg/aurora-{mobile,desktop}.webp` | WebP | not generated | `BodyBackground.astro` | own render of the 2025 CSS gradients (`scripts/background.mjs`) | own work | — | generate |
| Inline SVG star in `web/src/components/effects/Sparkles.astro` | SVG path | — | Sparkles effect | Magic UI SparklesText | MIT (Magic UI) | header comment + notices | keep |

## 3D models: the credits (exactly as in `lib/dictionary.tsx` `creditsDescription`, EN lines 98–221, FR from 721)

All five Sketchfab records: `license.slug: "by"`, "Author must be credited. Commercial use is allowed." [research:
licences § 2]. Each dialog line reads `"<title>" (<short link>) by <author> is licensed under Creative Commons
Attribution (http://creativecommons.org/licenses/by/4.0/).`

| Title | Short link in code | Author in code | Canonical source (`.glb` `asset.extras` or Sketchfab API) | File state | Revamp credit |
| --- | --- | --- | --- | --- | --- |
| "Cat House" | https://skfb.ly/oOAM6 | Roman_Nilikovskii | https://sketchfab.com/3d-models/cat-house-3ccdeded08134525acfa5b59a734a6d3 · author https://sketchfab.com/Roman_Nilikovskii | already re-encoded (Draco, WebP) | keep + **"modified (optimised)"** |
| "Cosmonaut on a rocket" | https://skfb.ly/o6AyV | Yury Misiyuk | https://sketchfab.com/3d-models/cosmonaut-on-a-rocket-e93cbbdb9a2144fb9f63d062566f3e63 · author https://sketchfab.com/Tim0 | unmodified export | keep + "modified (optimised)" once re-encoded |
| "Stylized Wardrobe" | https://skfb.ly/oGSTF | stefan | https://sketchfab.com/3d-models/stylized-wardrobe-66aa34d1c9964289860e4c557036d99e · author https://sketchfab.com/stefanhagewoud | unmodified export | keep + "modified (optimised)" once re-encoded |
| "Loft Bedroom" | https://skfb.ly/oznqR | dylanheyes | https://sketchfab.com/3d-models/loft-bedroom-7e9b8fa98c254b01b040992205fd7545 (metadata stripped from the file) | retextured, not rendered | **remove** (model removed) |
| "Heart in Love" | https://skfb.ly/6SusI | Azamuki | https://sketchfab.com/3d-models/heart-in-love-f39ce19b92e246268f4c501b72ea7d0e | **no model** in any `.glb` or in git history | **remove** (EN + FR) |

Revamp wording [research: licences § 2]: *"Cat House" (canonical link) by Roman_Nilikovskii (profile link), CC BY 4.0
(https://creativecommons.org/licenses/by/4.0/), modified (optimised)*, in EN and FR. Canonical URLs replace the short
links (4 of 5 answered HTTP 202 to a script). The "Lead Developer" line stays as it is (Q4).

## Fonts

| Font | Where | Files | Licence | Action |
| --- | --- | --- | --- | --- |
| Montserrat (variable, `wght`) | 2025: `next/font/google` (self-hosted at build, `lib/fonts.ts`); revamp: `@fontsource-variable/montserrat` 5.3.0 (`wght.css` in `BaseLayout.astro`) | latin normal woff2 **38.0 KB** (preloaded); cyrillic, cyrillic-ext, latin-ext (70.7 KB), vietnamese load only if a page uses them (`unicode-range`) | SIL OFL 1.1; package LICENSE: "Copyright 2011 The Montserrat Project Authors (https://github.com/JulietaUla/Montserrat)" (google/fonts' OFL.txt reads "Copyright 2024 The Montserrat.Git Project Authors" [research: licences § 3]) | keep; OFL text in `THIRD_PARTY_NOTICES.md`; fonts budget ≤ 100 KB |
| Noto Color Emoji | 2025: flag emoji in `GlobeFlags.tsx` (TEC) and `LanguagePicker.tsx` | Google Fonts via `next/font` | OFL 1.1; flag images public domain | **drop**: text labels (English / Français); TEC flags, if kept, drawn as own SVG |
| Lettering in `bedroom.glb` (`Untitled-1/2`) and in the client posters | baked into images | — | **Unknown** | goes with `bedroom.glb`; posters: Q22 |

## Icons

| 2025 | Licence | Revamp |
| --- | --- | --- |
| `lucide-react` 0.525.0 + copies in `lib/icons/` (ArrowBigRight, ClipboardType, Download, Email, Phone: Lucide/Feather paths, no notice; `ArrowBigRight.tsx`'s function is named `Instagram`) | ISC (Feather parts MIT) | Lucide (ISC) with its notice added to `THIRD_PARTY_NOTICES.md` when the first icon ships, or own SVG |
| Facebook, Instagram, LinkedIn outline glyphs (`lib/icons/`) | Lucide ISC copyright; **trademark**: the outlines break Meta's and LinkedIn's rules (Facebook's bare "f") | official glyphs from the Meta Brand Resource Center and brand.linkedin.com, unmodified, allowed colours, with accessible names |

## Copied components (2025) and their revamp

| 2025 component | Origin, licence | Revamp | State |
| --- | --- | --- | --- |
| BoxReveal, TextAnimate, LineShadowText, SparklesText | Magic UI, MIT ("Copyright (c) Magic UI") | `effects/Reveal`, `WordFade`, `LineShadow`, `Sparkles` (.astro), header comment + notice | written |
| ShimmerButton | Magic UI, MIT | `.btn-shimmer` in `web/src/styles/global.css` (same `--spread`/`--speed`/`--cut` variables, `shimmer-slide`/`spin-around`) via `ButtonLink.astro` | written; **notice comment missing** in `global.css` / `ButtonLink.astro` |
| ShineBorder (two copies), WarpBackground, Globe (wraps `cobe`, MIT) | Magic UI, MIT | not ported yet; one ShineBorder only | — |
| shadcn/ui button, card, carousel (Embla), dialog, select, sheet, sonner | MIT ("Copyright (c) 2023 shadcn") | own Astro components; add a notice if any shadcn code is adapted | — |
| Vortex | Aceternity (proprietary) | `web/src/scripts/flow-field.ts`, own code on `simplex-noise` (MIT) | written |
| Timeline | Aceternity | CSS scroll-driven `.timeline-beam` (own) | written |
| BackgroundLines, GlareCard, Lens, HeroHighlight; hero-parallax (unused) | Aceternity | own code later, or dropped; hero-parallax dropped | Q23 |
| ColorBends (Jobs) | React Bits (MIT + Commons Clause) | dropped with the Jobs page | — |
| LightPillar, ElectricBorder, Folder (TEC) | React Bits | own code or dropped | Q23 |
| SplashCursor (TEC) | React Bits + 61 % identical to Pavel Dobryakov's WebGL-Fluid-Simulation (MIT), no notice | if kept: rebuilt from Pavel's MIT original with its notice (entry ready in `THIRD_PARTY_NOTICES.md`), never over the pointer; else dropped | Q23 |
| GSAP intro (`useGSAP`, `expo.out`) | Webflow licence | expo-out easing in `useFrame` (`HouseCanvas.tsx`) | written |
| react-fast-marquee | MIT | CSS marquee in `global.css` (own) | written |

## Dependencies the revamped site ships (`web/package.json`, read from `web/node_modules/<pkg>/package.json`, 2026-10-09)

| Package | Version | Licence | Served to visitors? | On the list? |
| --- | --- | --- | --- | --- |
| three | 0.186.1 | MIT | yes (3D chunk) | yes |
| react, react-dom | 19.3.0 | MIT | yes (3D island) | yes |
| @react-three/fiber | 9.8.1 | MIT (no LICENSE file in the package; upstream LICENSE read) | yes (vendors `react-reconciler`, MIT, Meta headers) | yes |
| @react-three/drei | 10.7.9 | MIT | yes (`PresentationControls`, `useGLTF`; pulls three-stdlib, @use-gesture, maath, @babel/runtime: all MIT) | yes |
| simplex-noise | 4.0.3 | MIT | yes (`flow-field.ts`) | yes |
| @fontsource-variable/montserrat | 5.3.0 | OFL-1.1 | yes (woff2 + CSS) | yes |
| tailwindcss, @tailwindcss/vite | 4.3.3 | MIT | generated CSS (with Tailwind's MIT banner) | yes |
| astro | 7.3.8 | MIT | build; any runtime helper in `dist/`: check after the first build | yes |
| @astrojs/react | 7.0.1 | MIT | build (the island mounts through its own loader) | yes |
| @astrojs/sitemap | 3.7.4 | MIT | build | yes |
| @lingui/core | 6.9.0 | MIT | build (static pages); browser only if an island translates | yes |
| @lingui/react | 6.9.0 | MIT | not imported in `web/src` today (candidate for removal; knip) | yes |
| lingui-for-astro | 0.7.1 | MIT | build | yes |
| sharp | 0.35.5 | Apache-2.0 | build (its libvips binary `@img/sharp-win32-x64` is Apache-2.0 AND LGPL-3.0-or-later: build machine only) | yes (binary: build-only exception) |

- **devDependencies:** MIT or Apache-2.0 (Lingui CLI/conf/format-po/native-tools/vite-plugin, Astro check, Playwright,
  chrome-launcher, Lighthouse, TypeScript, Vitest, path-to-regexp, @types/*), except **@axe-core/playwright 4.13.0:
  MPL-2.0** (tests only, never served).
- **Runtime closure** of `dependencies` (368 packages resolved through `dependencies` + `optionalDependencies` in
  `web/node_modules`, Windows install): MIT 313, ISC 18, Apache-2.0 10, BSD-2-Clause 8, BSD-3-Clause 5, MPL-2.0 4,
  BlueOak-1.0.0 3, CC0-1.0 2, OFL-1.1 1, Python-2.0 1, CC-BY-4.0 1, Apache-2.0 AND LGPL-3.0-or-later 1, none 1.
- **Off the list, all build-time:** lightningcss 1.32.0/1.33.0 + win32 binaries (MPL-2.0; Tailwind/Vite CSS);
  common-ancestor-path 2.0.0 (BlueOak; astro), sax 1.6.1 (BlueOak; sitemap, svgo), lru-cache 11.5.3 (BlueOak; unstorage,
  Babel), argparse 2.0.1 (Python-2.0; js-yaml), @img/sharp-win32-x64 (LGPL binary). caniuse-lite (CC-BY-4.0 data, on
  the list) is build-time too; its attribution stays in the package. **webgl-constants 1.1.1** has no `license` field but an MIT LICENSE file ("Copyright (c) 2019 Tim van
  Scherpenzeel"); it comes through drei → detect-gpu, which the spike's imports don't use [assumption: tree-shaken].
- **To verify** after the first `bun run build`: the packages actually present in `dist/_astro/*.js` match the
  "served" column (a bundle listing), and `THIRD_PARTY_NOTICES.md` follows it.
- The 2025 root dependencies (research § 6) leave with the Next app: GSAP was the only one off the list in production.

## Missing / needed

- A **master logo** (SVG or ≥ 512 px PNG) for the favicon set, the header and share images.
- Written OK for each partner logo and the official files (SIP for the ministries, ESC "Components"), and which projects
  are EU-funded for the emblem (Q11, Q21).
- Photographers, rights and consent for the project, group and house photos; whether the photographer wants a credit
  (Q10, Q22). Sources of the poster illustrations (Q22).
- Brochure: link it or drop it (Q14).
- Official social glyphs (Meta, LinkedIn) downloaded unmodified.
