---
name: search-registry-items
description: >
  Find a component idea in public shadcn-style registries by keyword (Shoogle MCP when connected, else the registries'
  own JSON indexes), then rebuild it for yws.lu as Astro + CSS (React only for 3D islands). Use while coding a section
  that needs a specific piece (timeline, carousel, marquee, stat counter, dialog, accordion, copy-to-clipboard,
  click-to-load map facade) the existing components don't cover well. Optional: skip when nothing is needed.
user-invocable: false
allowed-tools:
  - Read
  - Edit
  - Write
  - Glob
  - Grep
  - WebFetch
  - Bash(bunx shadcn@latest view *)
---

# Search registry items (yws.lu)

A registry item here is a **reference**, not a dependency: the site is Astro + Tailwind 4 with React only for 3D
islands, so most items are re-expressed as `.astro` + CSS on the tokens in `web/src/styles/global.css`.

## Procedure

1. **Search.** If the Shoogle MCP is connected: `mcp__shoogle__search_registry_items` with a short keyword and a small
   page (`{ "query": "timeline", "limit": 15 }`), or `..._scoped` with `"registries": ["@magicui", "@shadcn"]`. If it
   isn't, read a registry index directly with WebFetch (e.g. `https://magicui.design/r/registry.json`,
   `https://ui.shadcn.com/r/index.json`). No hits → a synonym (`modal`/`dialog`, `carousel`/`slider`) or a shorter word.
2. **Shortlist 1–3** from `description` + `type` (`registry:block` = a section, `registry:ui` = a piece).
3. **Check the licence before reading code** (`research/2026-10-09-licences.md`, `design/assets.md`): MIT / Apache /
   BSD / ISC only. **Aceternity UI, GSAP and React Bits are outside the list** (Q23): study the idea, write your own
   code, never port line by line. Paid or private registries (401/403): skip, never authenticate.
4. **Inspect** with `bunx shadcn@latest view <addCommandArgument>` (read the JSON; never `add` into the repo: no
   `components.json` flow in `web/`). Reject items that need env vars, remote fetches, new heavy dependencies, Vue or
   Svelte, or that write outside `src/components`.
5. **Rebuild** in `web/src/components/<feature>/` (or `ui/` / `effects/` when shared): `.astro` + CSS, tokens only, real
   content through Lingui, reduced-motion path, keyboard and touch twins for every hover. An MIT adaptation gets a line
   in `THIRD_PARTY_NOTICES.md` and a header comment naming the source and licence.
6. **Verify** like any UI change (`tech/usage/visual-qa.md`): shots in en + fr, axe, the design score.

## Gotchas

- Keywords, not intent ("timeline", "marquee", "dialog" work; "warm youth housing hero" doesn't).
- One query at a time: Shoogle rate-limits (`Rate limit exceeded. Try again in Ns` → wait, retry once, then skip).
- Query the item name, not the registry prefix (`button`, not `@acme/button`).
- React/TSX only; skip Vue/Svelte registries.
