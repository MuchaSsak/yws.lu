# Third-party notices

> **Open question (Q20):** the root `LICENSE` is Babel's MIT text word for word ("Copyright (c) 2014-present Sebastian
> McKenzie and other contributors", initial commit `2a1e453`). Who owns this website's code (the developer or Youth Work
> Synergy ASBL) and what the root licence covers are not decided yet; `LICENSE` stays unchanged until they are. This
> file lists the third-party code, fonts and 3D models that the revamped site (`web/`) ships or adapts, with their
> licences. It grants nothing itself. The client's logos, photos, posters and texts and the partners' logos are not
> open-licensed material and are not covered by this file.

How this file is kept: copyright lines are copied mechanically from each package's LICENSE file in `web/node_modules`
(versions pinned in `web/package.json`, read 2026-10-09). Where a package ships no LICENSE file, the line comes from the
upstream repository's LICENSE (raw file fetched 2026-10-09). Every MIT entry below uses the same permission text,
reproduced once at the end (checked by script against each file). Re-check when a dependency is added or bumped; the
asset and dependency inventory is `.claude/project-info/design/assets.md`.

## Code served to visitors (MIT)

| Component | Version | Used for | Copyright | Source |
| --- | --- | --- | --- | --- |
| three.js (`three`) | 0.186.1 | 3D rendering | Copyright © 2010-2026 three.js authors | https://threejs.org/ |
| React (`react`, `react-dom`, `scheduler`, `use-sync-external-store`) | 19.3.0 / 19.3.0 / 0.28.0 / 1.7.0 | the 3D island | Copyright (c) Meta Platforms, Inc. and affiliates. | https://react.dev/ |
| `react-reconciler` (bundled inside `@react-three/fiber/react-reconciler/`) | as bundled | React Three Fiber's renderer | Copyright (c) Meta Platforms, Inc. and affiliates. (file header) | https://react.dev/ |
| React Three Fiber (`@react-three/fiber`) | 9.8.1 | React renderer for three.js | Copyright (c) 2019-2025 Poimandres (upstream LICENSE; the package has none) | https://github.com/pmndrs/react-three-fiber |
| `its-fine` | 2.1.1 | R3F dependency | Copyright (c) 2022-2025 Poimandres | https://github.com/pmndrs/its-fine |
| `zustand` | 5.0.15 | R3F dependency | Copyright (c) 2019 Paul Henschel | https://github.com/pmndrs/zustand |
| `suspend-react` | 0.1.3 | R3F / drei dependency | Copyright (c) 2021 Paul Henschel | https://github.com/pmndrs/suspend-react |
| `react-use-measure` | 2.1.7 | R3F dependency | Copyright (c) 2019-2025 Poimandres | https://github.com/pmndrs/react-use-measure |
| drei (`@react-three/drei`) | 10.7.9 | `PresentationControls`, `useGLTF` | Copyright (c) 2020 react-spring | https://github.com/pmndrs/drei |
| `three-stdlib` | 2.36.1 | GLTF loader, meshopt decoder | Copyright (c) 2021-2023 Poimandres | https://github.com/pmndrs/three-stdlib |
| meshoptimizer decoder (inside `three-stdlib/libs/MeshoptDecoder.js`, which carries no header) | as bundled | decoding the meshopt-compressed models | Copyright (C) 2016-2026, by Arseny Kapoulkine (arseny.kapoulkine@gmail.com) (line copied from the same library's header in `three/examples/jsm/libs/meshopt_decoder.module.js`) | meshoptimizer library |
| `@use-gesture/react`, `@use-gesture/core` | 10.3.1 | drag in `PresentationControls` | Copyright (c) 2018-present Paul Henschel <drcmda@gmail.com> | https://use-gesture.netlify.app |
| `maath` | 0.10.8 | easing in `PresentationControls` | Copyright © 2026 Isaac Mason (upstream LICENSE; the package has none) | https://github.com/pmndrs/maath |
| `@babel/runtime` | 7.29.10 | helpers used by drei | Copyright (c) 2014-present Sebastian McKenzie and other contributors | https://babel.dev/docs/en/next/babel-runtime |
| `simplex-noise` | 4.0.3 | the housing hero's particle streaks (`web/src/scripts/flow-field.ts`, own code) | Copyright (c) 2018 Jonas Wagner | https://github.com/jwagner/simplex-noise.js |
| Tailwind CSS (`tailwindcss`) | 4.3.3 | generated stylesheet (keeps Tailwind's "MIT License" banner) | Copyright (c) Tailwind Labs, Inc. | https://tailwindcss.com |
| Vite (via Astro) | 8.3.4 | small runtime helpers it may emit (e.g. for dynamic imports) | Copyright (c) 2019-present, VoidZero Inc. and Vite contributors | https://vite.dev |
| Astro (`astro`) | 7.3.8 | static site generator; listed in case runtime code ends up in the output | Copyright (c) 2021 Fred K. Schott | https://astro.build |

Declared by React Three Fiber and included only if the bundler pulls them in (check after the first build):
`base64-js` 1.5.1 (Copyright (c) 2014 Jameson Little, MIT), `buffer` 6.0.3 (Copyright (c) Feross Aboukhadijeh, and other
contributors., MIT).

## Adapted code (MIT)

| Work | Copyright | Where | Source |
| --- | --- | --- | --- |
| Magic UI (BoxReveal, TextAnimate, LineShadowText, SparklesText, ShimmerButton) | Copyright (c) Magic UI | rewritten for Astro and CSS with the same idea and parameters: `web/src/components/effects/{Reveal,WordFade,LineShadow,Sparkles}.astro`, the `.btn-shimmer` styles in `web/src/styles/global.css` (used by `web/src/components/ui/ButtonLink.astro`) | https://github.com/magicuidesign/magicui |
| WebGL Fluid Simulation, by Pavel Dobryakov | Copyright (c) 2017 Pavel Dobryakov | **conditional**: only if the TEC page's fluid cursor is kept and rebuilt from this original (the 2025 `SplashCursor` derived from it); not in `web/` today; remove this row if the effect is dropped | https://github.com/PavelDoGreat/WebGL-Fluid-Simulation |

## Font (SIL Open Font License 1.1)

| Font | Package | Copyright | Source |
| --- | --- | --- | --- |
| Montserrat (variable weight) | `@fontsource-variable/montserrat` 5.3.0 | Copyright 2011 The Montserrat Project Authors (https://github.com/JulietaUla/Montserrat) | https://fontsource.org/fonts/montserrat |

The licence text, as shipped in the package, is reproduced at the end of this file.

## 3D models (Creative Commons Attribution 4.0)

Licence: CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ . The same credits are shown on the site in the
"See credits" dialog (English and French).

| Title | Author | Source | Changes | Used in |
| --- | --- | --- | --- | --- |
| "Cat House" | Roman_Nilikovskii (https://sketchfab.com/Roman_Nilikovskii) | https://sketchfab.com/3d-models/cat-house-3ccdeded08134525acfa5b59a734a6d3 | modified: re-encoded (meshopt geometry, WebP textures); its still poster is a render of the model | home hero |
| "Stylized Wardrobe" | stefan (https://sketchfab.com/stefanhagewoud) | https://sketchfab.com/3d-models/stylized-wardrobe-66aa34d1c9964289860e4c557036d99e | modified once re-encoded (meshopt, WebP textures ≤ 1024 px) | home, housing section |
| "Cosmonaut on a rocket" | Yury Misiyuk (https://sketchfab.com/Tim0) | https://sketchfab.com/3d-models/cosmonaut-on-a-rocket-e93cbbdb9a2144fb9f63d062566f3e63 | modified once re-encoded (meshopt, WebP textures ≤ 1024 px) | home, projects section |

## Build and test tools (not served to visitors)

Astro, the Lingui tools, Vite, Tailwind's compiler, Vitest and TypeScript (MIT or Apache-2.0); sharp (Apache-2.0; its
prebuilt libvips binary is LGPL-3.0-or-later); lightningcss (MPL-2.0); Playwright, Lighthouse and chrome-launcher
(Apache-2.0); @axe-core/playwright (MPL-2.0). They run on the build or test machine only; their licences and the full
list are in `.claude/project-info/design/assets.md`.

---

## MIT License text (the permission notice for every MIT entry above), verbatim from `web/node_modules/react/LICENSE`

```text
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## SIL Open Font License 1.1 (Montserrat), verbatim from `web/node_modules/@fontsource-variable/montserrat/LICENSE`

```text
Copyright 2011 The Montserrat Project Authors (https://github.com/JulietaUla/Montserrat) Montserrat-Italic[wght].ttf: Copyright 2011 The Montserrat Project Authors (https://github.com/JulietaUla/Montserrat)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
```
