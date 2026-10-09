---
name: commit
description: Commit finished coherent work on yws.lu as one Conventional Commit, authored by the owner's git identity. Use at the end of a slice, a phase, a pause, or when asked to "commit".
model: claude-haiku-4-5
---

Fast commit. Spend under 10 s; don't deliberate.

1. Never on `main`: if `git branch --show-current` prints `main`, stop and say so (work happens on `revamp/2026-10`
   or another work branch).
2. **Author = the owner, not Claude.** The commit uses the repo's configured identity (`git config user.name` /
   `user.email`, set to the owner's identity `MuchaSsak`). If it prints `Claude` or nothing, stop and say so; never
   change the global git config. Keep the `Co-Authored-By` trailer the session's instructions give.
3. Stage everything except what is gitignored: `git add -A`. `.case-study/`, `screenshots/`, `comps/`, `SKILLS/`,
   `CLAUDE.local.md` and `.env*` are gitignored and must stay out; if `git status --short` shows any of them staged,
   unstage it and report.
4. Nothing staged → "nothing to commit", stop.
5. One Conventional Commit: `type(scope): summary`, subject ≤ 72 chars, imperative. Types: feat, fix, refactor,
   perf, docs, test, style, build, ci, chore. Scopes used here: `seo`, `perf`, `design`, `i18n`, `a11y`, `refactor`,
   `ai`, `home`, `header`, `footer`, `housing`, `owners`, `about`, `projects`, `tec`, `legal`, `404`, `qa`, `wip`.
   A short body only when the why isn't obvious. A pause: `chore(wip): <where it stopped>`.
6. **Never push** (the owner pushes). Never pass `--no-verify`; if a hook blocks the commit, report it and stop.
