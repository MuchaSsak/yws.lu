# Lingui (how this site uses it)

> How copy becomes translatable messages, how catalogs are kept complete, and the rules for French. Locales and
> URLs: [i18n](../../site/i18n.md); voice and wording: [brand](../../product/brand.md).

## Setup (Lingui 6.9 + lingui-for-astro 0.7.1)

| Layer | How |
| --- | --- |
| `.astro` | `import { t } from "lingui-for-astro/macro"`; `` t`English text` `` in frontmatter or markup |
| `.ts` / `.tsx` | `@lingui/vite-plugin` with `macroTransform: true` (native transform), `@lingui/core/macro` |
| Context | `src/middleware.ts` → `setLinguiContext(locals, getI18n(locale))`, from `params.locale`, per page at build |
| Instances | `src/lib/i18n.ts`: one cached `setupI18n` per locale; **never** a global `activate()` (all locales render in one process) |
| Catalogs | `src/locales/{en,fr}/messages.po`, compiled on import (no compiled catalog committed) |
| Gate | production build: `failOnMissing: "catalog"` (a message missing from fr fails the build) + `failOnCompileError` |
| Extract | `bun run i18n:extract` (`lingui extract --clean`); then fill `fr` and run the catalog test |

Pre-1.0, single-maintainer package: keep `.astro` copy as plain `t` calls so replacing it costs a few
`i18n._(msg…)` lines [research: stack, risk 3].

## Message rules

- **msgid = the English source text** (no hand-made ids). Same English in two places = one message.
- One message per sentence or label; never concatenate fragments to build a sentence. Where the design styles single
  words (the home H1 "Rent out *your* *property*"), each styled word is its own message **with a `context`** that
  shows the whole phrase, so a translator sees the order.
- Placeholders as `{name}`, never string concatenation; plurals with `plural`.
- Islands get translated strings as props (no catalog shipped to the browser).
- Accessible names, alt text, titles and descriptions are messages too.

## French

- **Existing French is human text**: copied verbatim from `lib/dictionary.tsx` (the 2025 site). Only obvious typos are
  fixed, each listed in [placeholders](../../placeholders.md) § French typo fixes [user 2026-10-09].
- **New French** is written natively (not a literal translation), and each new string is listed in
  [placeholders](../../placeholders.md) § New copy as "to review" [user 2026-10-09].
- Typography: French spacing before `? ! : ;` as the client wrote it (a normal space in the 2025 copy); quotes «  »
  only where the client used them.

## Tests

`src/locales/catalogs.test.ts`: fr has every en msgid, no empty msgstr, the same `{placeholders}` and tags.
`lingui check sync` (fails if `extract` would change the catalogs) runs in `bun run check` [research: stack § 2.3].
