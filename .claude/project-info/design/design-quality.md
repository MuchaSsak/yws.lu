# Design quality: the 0–10 rubric

> Owns: scoring a rendered **view** (one route × one locale × one width) 0–10 against the yws design system: the craft
> rules, the accessibility floor, the instant-fail list, the yws signature checks, the weights, the caps, the score
> bands and the quick diagnostic. Used in step 3 of the slice loop (`working-agreement.md` § 9, `tech/usage/visual-qa.md`
> § Scoring): a slice closes only at **≥ 8/10 with the weakest point named** [user 2026-10-09]. The system being
> judged (tokens, type, components, motion, 3D, do/don't) is `design.md`, and its values beat any default here.
> Reference patterns: `design-references.md`. Budgets: `product/requirements.md`. Structure ported from the owner's
> portfolio rubric; the content is yws's own (its taste list does not apply: Montserrat, gradients, sparkles and the
> glow are yws's identity) [user 2026-10-09, brief § P2.3].

## Core belief

- **Practicality ≥ wow:** every page impressive within 3 s AND usable in 1 tap on a phone. A view that hides Apply or
  Contact, blocks input or costs the H1's paint scores as broken, not playful [user 2026-10-09, brief § 2].
- **Keep the feel, fix the facts:** yws is light, colourful, playful and warm (orange voice, violet wink, rainbow glow,
  3D toys). Contrast, legibility, hierarchy, targets and speed are fixed outright; a change to the feel goes to
  `comps/` first [user 2026-10-09; lessons].
- **Effects decorate words and frames, never the reading:** one effect per heading, none on body text above the fold,
  every one with a reduced-motion final state.
- **The H1 is the LCP;** 3D, canvases and maps come after it, near visibility, with a still fallback [brief § 2].

## Universal craft rules

| Area | Rule | Source |
| --- | --- | --- |
| Type | Body 16 px, ledes 18 px, line-height 1.5–1.56; ledes capped at `--measure` (35 rem) or `--measure-hero` (25 rem) | `design.md` § Typography; [repo: `text-lg` ×29] |
| Type | Sizes only from the scale: display 36 → 72, h2 36 → 60, h3 24 → 36, 24, 20, 18, 16, 14 px; every `clamp()` has its real max | `design.md` |
| Type | Display-to-lede ≥ 4:1 at ≥ 1280 and ≥ 2:1 at 390 (the 2025 proportions); a heading the size of the lede is a miss | [inventory § 2]; floor [assumption] |
| Type | One family, Montserrat; headings 900, h3 700, titles and buttons 600, nav 500, body 400; no second face, no emoji font for labels | `design.md` |
| Type | Headings `text-wrap: balance`, no orphan word in en or fr; French typography per `site/i18n.md`; boxes sized for French | [lessons 2026-10-08] |
| Colour | Tokens only, no ad-hoc hex in components; orange is the voice (headings, CTAs), violet the wink (decoration on words), zinc for text | `design.md` § Tokens |
| Colour | Text at full strength: no `/60`, `opacity-50` or gradient stop below its ratio, on the glow and on dark chrome | [lessons 2026-10-08]; `tokens.test.ts` |
| Colour | The orange voice recurs in every view (a heading or the CTA); dark surfaces only for header, menu and footer | `design.md` |
| Layout | Gutters `--pad-x` for header, sections and footer alike; content capped at `--content-max`; backgrounds bleed | `design.md` § Spacing |
| Layout | Section rhythm from `--space-section`; stack gaps from 0.5 / 1 / 1.5 / 2 / 3 rem; the same steps page-wide | `design.md` |
| Layout | One section-header pattern (h2 + lede + actions); centred by default, aligned toward the visual in split sections ≥ 1280; title and lede on the same edge | `design.md` § Section header |
| Layout | Split sections stack text first below 1280; the same content on phones | [user] |
| Layout | Cards in a row have equal heights and bottom-aligned actions; grids use `minmax(min(100%, …), 1fr)` | [repo: ProjectsList.tsx:97] |
| Layout | ≤ 2 consecutive text-only centred sections (heading + paragraph, no visual, card, list or action); fix with a real layout, never padding | [assumption] |
| Layout | Airy ≠ empty: at 1440 a section's content fills ≥ 50 % of its height | [assumption] |
| Media | Every image does a job; real YWS photos; sized, modern format, `aspect-ratio` reserved (CLS ≤ 0.05); alt says what it shows | `design.md` § Imagery |
| Media | 3D beside the copy, poster first, scene after idle and near view, one live context, stops offscreen | `design.md` § 3D; `tech/usage/three.md` |
| Motion | `--ease-out` / `--ease-in` / `--ease-anticipate` / `--ease-in-out`; durations 200–900 ms; `linear` only for constant-speed loops | `design.md` § Motion |
| Motion | H1 painted at first paint (reveal box ≤ 500 ms over it); first-screen CTA visible by 900 ms; below-fold reveals never hide content without JS | `design.md` |
| Motion | Loops run only near the viewport; reduced motion shows the final state; hover never changes layout; every hover has a focus twin (and a tap twin when it carries meaning) | [lessons 2026-10-05] |
| Usability | Each page's next step (Apply for housing, email/call the owners' team, contact) is in the first viewport at 390 or one tap away in the header | `product/requirements.md` F02–F04 |
| Usability | Email and phone are links (`mailto:` with a prefilled subject, one `tel:` per number in E.164) with copy buttons; the map loads on click | `product/requirements.md` F03–F04 |
| Usability | No forms of any kind | [user 2026-10-09] |
| Craft | Orange `::selection`; 3 px focus ring per surface; hover, focus and pressed states on every control; crafted 404, empty (no house pictures) and error (statistics fallback) states | `design.md`; requirements F05, F12 |
| Craft | Lean copy on the first screen: the lede ≤ ~3 lines at 1440; the client's longer text moves below, never gets deleted | [assumption] |

## Accessibility floor (gates: a failed gate means the view is not scored)

| Gate | Bar | Source |
| --- | --- | --- |
| Standard | WCAG 2.2 AA; axe zero violations on every route in both locales | `product/requirements.md` |
| Contrast | 4.5:1 text, 3:1 large text (≥ 24 px, or ≥ 18.66 px bold), UI parts and focus rings; every gradient stop; checked on white, over the glow and on the dark chrome; colour never the only signal (inline links underlined) | [research]; `tokens.test.ts` |
| Focus | visible on every control (3 px, per-surface colour), never obscured by the fixed header (2.4.11) | `design.md` § Buttons |
| Targets | ≥ 24 × 24 px everywhere (2.5.8); ≥ 44 px on buttons, menu and language items on touch | [user], [research] |
| Structure | one `<h1>`, no skipped levels, real landmarks (header, nav, main, footer), a skip link, no fake headings; the visible label starts the accessible name (2.5.3) | [lessons 2026-10-05, 2026-10-09] |
| Keyboard | every CTA reachable and operable; menu and dialog: focus moves in, Esc closes, focus returns; carousel buttons labelled | [lessons 2026-10-09] |
| Reduced motion | final state at once; no loop, fade, reveal box, spin or flow field; 3D at its final pose or the poster | `design.md` § Motion |
| Moving content | loops > 5 s pausable (2.2.2); nothing flashes > 3 /s | [research] |
| Text over media | a scrim or solid plate whenever any frame drops text below AA; canvases count as media | [research] |
| Canvas / WebGL | box `aria-hidden`; everything essential exists as DOM text; the page works with the canvas absent | `tech/usage/three.md` |
| Reflow | no horizontal scroll at 320 px and at 200 % zoom; pinch-zoom never disabled | [research] |
| Language | `<html lang>` per locale; the switcher's autonyms carry `lang`; new-tab links say so | `design.md` § Buttons |

## Instant-fail list

Any hit means not done, and caps the view at 6 (§ The score), unless `design.md` asks for it by name.

| Group | Fails |
| --- | --- |
| Contrast | any text under AA: a gradient-heading stop under 3:1, orange body text under 4.5:1, alpha-muted text (`/60`, `opacity-50`), white on orange; text over the glow, a canvas or a photo without a scrim when a frame drops it under AA |
| Motion | motion with no reduced-motion path; the H1 hidden or faded until JS; a preloader, intro gate or scroll-jacking; a loop > 5 s with no pause path; anything flashing > 3 /s |
| Pointer | a cursor effect that hides or replaces the pointer, or paints over the text (the 2025 fluid cursor) |
| 3D and canvas | a 3D scene that blocks, covers or replaces content on mobile; a scene that captures vertical scroll on touch; a canvas or video as the first paint or on the LCP path |
| Journeys | contact or Apply more than one tap away on a phone; email or phone shown as plain text instead of links; any form |
| Text fit | a label on two lines in one locale only; text clipped, spilling or split mid-word; horizontal overflow anywhere from 320 to 2560 |
| Structure | heading levels skipped or more than one `<h1>`; headings used as plain text; an icon-only link without a name; flag emoji as the only language label |
| Keyboard | a keyboard-dead CTA (`tabindex="-1"` on the real control, a link inside a button); focus invisible or under the header; a dialog or menu without Esc and focus handling |
| Chrome | a heading or CTA under the fixed header at rest or after an anchor jump (`#contact`); content smeared across a 2560 screen |
| Truth | an invented number, partner, date or testimonial; a `PLACEHOLDER` in a production build; a past event presented as upcoming ("Register") [brief § 2] |

## yws signature checks (scored under Composition, Colour and Details)

| Check | Passes when |
| --- | --- |
| Orange voice | section headings in the AA heading gradient, the hero H1 under the orange reveal box (≤ 500 ms, H1 already painted), an orange CTA with dark ink in every view |
| Violet wink | violet only on words (line shadow, sparkles), at most two effect words per view, never in body text |
| One effect per heading | gradient **or** sparkles **or** line shadow **or** highlight on a heading, never stacked; at most one shimmer button per page |
| Glow | the static pre-rendered glow is visible at the page edges, never strong enough behind text to drop it under AA; nothing in it moves |
| 3D toys | poster in the first paint, scene fades in after idle, turns slowly, pauses offscreen, final pose under reduced motion, drag never traps the page scroll |
| Section header | the one pattern, `<h2>`, consistent alignment, lede ≤ `--measure`, actions 1.5 rem below |
| Buttons | orange with dark ink, 44 px tall, the arrow nudge, the focus ring visible on its surface, no width change on hover |
| Cards | equal heights in a row, 64 px ink-orange icon, title 20 px / 600, text readable at full strength |
| Partner strip | every logo named, paused on hover and focus, a still wrapped row under reduced motion; the EU emblem static outside it |
| French | every label and button fits in fr at 320 where it fits in en |

## The score

`score = Typography×0.18 + Composition×0.22 + Colour×0.15 + Motion & 3D×0.15 + Usability×0.18 + Details/craft×0.12`
[assumption: the portfolio's research weights (0.22 / 0.28 / 0.17 / 0.18 / 0.15) rebalanced to add Usability, because
the brief puts practicality and 1-tap contact above wow]

- **Typography:** scale, weights, measure, rhythm, French fit. **Composition** (where most failures land): section
  pattern, grid and alignment, rhythm between text-only and visual sections, fill, cards, mobile stacking, ultrawide.
  **Colour:** roles, contrast on every surface, orange recurrence, violet restraint. **Motion & 3D:** first-paint
  behaviour, entrances, loops, reduced motion, 3D loading and cost. **Usability:** next step per audience, tap paths,
  contact as links, header and menu, the switcher. **Details/craft:** signature checks, focus, states, images and alt,
  icons, lean copy.
- Per category: 0–3 default or broken · 4–6 generic but clean · 7–8 clearly crafted · 9–10 exceptional [research].

| Overall | What the view looks like | Slice |
| --- | --- | --- |
| 0–3 | broken or default: overflow, unreadable text, a failed gate, a keyboard-dead CTA | blocked |
| 4–5 | generic but clean: could be any shadcn landing page; yws effects pasted on top or missing | blocked |
| 6–7 | a competent yws page with one flat dimension: four centred text sections in a row, effects stacked on one heading, the next step buried, motion that ignores reduced motion | blocked: fix the weakest category |
| **8** | **professional:** every rule met, recognisably yws (orange voice, violet wink, glow, a toy where it belongs), one clear next step per block, AA everywhere | **closes the slice** [user 2026-10-09] |
| 9–10 | award-credible: a playful moment people remember, at zero cost to speed, access or 1-tap contact | — |

- **Pass mark: 8/10, and the weakest point is named** on every pass [user 2026-10-09]. Any instant-fail hit caps the
  overall at 6 [assumption, as the portfolio]. A slice scores as its lowest view [assumption].
- Re-score only after a change; never score the same pixels more generously the second time [research].

**Caps** (measured at 1440 unless stated)

| Measured condition | Cap |
| --- | --- |
| Any instant-fail hit | overall ≤ 6 |
| The H1 is not the LCP, is covered > 500 ms, fades or moves; a canvas paints first | Motion & 3D ≤ 4 |
| Under reduced motion anything still moves, or content stays hidden | Motion & 3D ≤ 5 |
| A loop runs offscreen, or a scene renders while its box is far from the viewport | Motion & 3D ≤ 6 |
| A heading-gradient stop under 3:1, or alpha-faded text | Colour ≤ 4 |
| More than one effect on one heading, or effects on body text above the fold | Details ≤ 6 |
| The page's next step neither in the first viewport at 390 nor in the header | Usability ≤ 5 |
| Email or phone not tappable, or the map loads third-party content before a click | Usability ≤ 6 |
| ≥ 3 consecutive centred text-only sections | Composition ≤ 6 |
| A section filling < 50 % of its height at 1440 | Composition ≤ 6 |
| Content wider than `--content-max` at 1920 or 2560 | Composition ≤ 6 |
| Cards in one row with uneven heights or ragged actions | Composition ≤ 7 |
| A size off the type scale, or mixed heading weights in one view | Typography ≤ 6 |
| An orphan word in a heading in either locale | Typography ≤ 7 |
| A hover that changes layout (weight or letter-spacing swap that resizes) | Details ≤ 7 |

A fired cap means the slice cannot close, whatever the weighted total says: fix the cause, then re-measure. Never
average around a cap [research].

## Quick diagnostic (yes/no per view; any "no" is a concrete fix, not an opinion)

1. Is the H1 the first thing painted and read, in the orange voice, and does every stop pass contrast?
2. At 390, is the page's next step (Apply, email or call the team, Contact) visible, or one tap away in the header?
3. Do the email and phone open the mail app and the dialer in one tap, with a copy button beside them?
4. Does it still feel like yws (orange voice, violet wink, glow, a toy where it belongs) without stacking effects?
5. One section-header pattern, one alignment rule, `<h2>` sections under one `<h1>`?
6. Type on the scale, ledes at 18 px within `--measure`, no orphan in en or fr?
7. Every text pair AA: on white, over the glow, on the dark header, menu and footer; no alpha text?
8. A visible focus ring on every control, never under the header; targets ≥ 44 px on touch?
9. Under reduced motion, is everything visible and still at once?
10. Do loops stop offscreen, does 3D show its poster first and never trap the scroll on touch?
11. No overflow at 320, content capped at 2560, nothing under the header after `#contact`?
12. Does every French label fit on one line where the English one does?
13. Are cards even, is there one primary action per block, and does the eye go heading → lede → action?
14. Are the images real, sized and described, with no emoji as icons or language labels?
15. Zero instant-fail hits?

## How to record a score

- Score every width the loop shoots (390 / 1024 / 1440 / 1920) in en and fr. The 320 and 2560 sweep and the reduced
  motion pass are pass/fail notes, not scores (`tech/usage/visual-qa.md` § The eyes).
- One line per view in `screenshots/VISUAL-QA.md`, newest first; Ty/Co/Cl/Mo/Us/De are the six category scores. The
  slice report quotes its lowest line.

```
| Date | Route | Locale | Width | Score | Ty/Co/Cl/Mo/Us/De | Weakest point |
| YYYY-MM-DD | /en/ | en | 390 | 7.4 | 8/7/6/8/8/7 | (format example) home housing lede runs 6 lines beside the wardrobe |
```
