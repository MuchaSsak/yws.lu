---
name: awwwards
description: "Optional craft-elevation resource for yws.lu: study award-level sites (Awwwards, via Playwright) to lift ONE section or 3D moment from correct-but-flat to memorable, inside the project's rules (keep the playful, colourful, warm feel; text first; no forms). Use when a built section reads generic in screenshots, or design research wants a motion/typography/art-direction reference Mobbin doesn't show. Never replaces design.md or design-references.md; skip it when it adds nothing."
user-invocable: false
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - Bash(node *)
---

# awwwards: optional craft elevation (yws.lu)

Adapted from Sam Luker / Switchyard's MIT "awwwards" skill (via the owner's portfolio). An extra resource next to
Mobbin, web search and the registry search. Nothing here is mandatory.

## What stays in charge

- `design/design.md` owns tokens, type, the orange-led palette, the 3D rules and motion. `design/design-references.md`
  owns each section's pattern. This skill sharpens execution; it never re-picks fonts or colours.
- The bars are unchanged: `design/design-quality.md` (≥ 8, instant-fails), `product/requirements.md` budgets (LCP ≤ 2 s,
  TBT ≤ 100 ms, CLS ≤ 0.05, 3D chunk ≤ ~300 KB gz), reduced motion everywhere, the screenshot loop in
  `tech/usage/visual-qa.md`.
- **The feel stays** (playful, colourful 3D, warm, for young people): a change to the feel is a proposal in `comps/`
  (current vs proposed, desktop + phone), shipped only if it scores higher and keeps the identity, listed in the report.
- Real content only: no fake logos, numbers, testimonials or partners. No forms.

## When it earns its place

- A section's screenshot reads like a template (centred stack, flat cards, default spacing).
- A 3D or signature moment is planned but its craft (pacing, entrance, poster, hover twin) isn't.
- Research wants a reference for type contrast, motion pacing or composition for a youth / non-profit / housing site.

## How

1. **Look, briefly.** Playwright → `https://www.awwwards.com/websites/` (filter: non-profit, social, education,
   real estate, or the playful/3D feel). Open 1–3 winners in yws's register; shoot desktop + 390 px; note the specific
   move (type scale contrast, image cropping, reveal pacing, hover/tap twin, how whitespace carries weight). Notes go to
   `research/<date>-<topic>.md`; screenshots stay local (gitignored), never committed.
2. **Find the parts.** Check the registry (`search-registry-items` skill) before hand-building. Licence rule: MIT /
   Apache / BSD / ISC / OFL / CC0 / CC BY only; Aceternity, GSAP and React Bits code is rewritten from the idea, never
   ported (Q23, `research/2026-10-09-licences.md`).
3. **One thing at a time.** One section or one moment; shoot 390 / 1024 / 1920 in en and fr; keep it only if it is
   clearly better and inside the budgets.

## Moves that usually lift a flat section here

- Stronger type contrast: a big Montserrat display size against quiet body copy; the orange italic accent words the
  2025 hero already uses.
- Asymmetry and overlap: a photo or 3D object bleeding off the grid, staggered steps, cards with real photos.
- Depth without weight: the pre-rendered glow, soft token shadows, layered transparency; never a live full-screen blur.
- Motion with meaning: a paced entrance on secondary pieces (never the H1, lead or primary CTA: they paint in the first
  frame), a scroll-linked progress (the housing timeline beam), a tap/focus twin for every hover.

## Reject

- Effects stacked in one view (marquee + beams + tilt + particles + cursor fluid).
- Cursor effects that hide or replace the pointer; scroll-jacking; preloaders; intro gates.
- Motion that delays content or ignores `prefers-reduced-motion`.
- Anything that pushes LCP/TBT/CLS over budget for a flourish, or a 3D scene that blocks content on a phone.
