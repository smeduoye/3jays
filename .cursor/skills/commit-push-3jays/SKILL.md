---
name: commit-push-3jays
description: >-
  Commit and push the 3jays static site with asset cache-busting. Use when the
  user asks to commit and push in the 3jays repo, or wants to publish site changes
  to GitHub Pages.
---

# Commit and push (3jays)

Workflow for committing and pushing the 3jays marketing site. Always stamp asset URLs before committing so clients load the latest CSS and JavaScript.

## When to use

Apply this skill when the user asks to **commit**, **push**, or **commit and push** in the 3jays repository (`3jays` static site at repo root).

## Required sequence

Do not skip step 1. Run steps in order.

### 1. Stamp asset cache-bust version

From the repository root:

```bash
node scripts/stamp-asset-version.mjs
```

This updates `?v=` query strings on `styles.css` and `scroll-animations.js` in all site HTML files. The version is a content hash of those two files — it changes only when CSS or JS changes.

If the script prints `0 file(s) updated`, the HTML already matches the current asset hash; continue.

### 2. Review changes (parallel)

Run in parallel:

```bash
git status
git diff
git diff --staged
git log --oneline -5
```

Include stamped HTML files in the commit even if the only change is an updated `?v=` parameter.

### 3. Commit

Follow the user's git safety rules:

- Do not commit unless the user explicitly asked to commit or push
- Draft a concise commit message focused on **why**
- On Windows PowerShell, use multiple `-m` flags instead of a heredoc
- Never commit secrets (`.env`, credentials)

Stage relevant files, then commit. Typical staging:

```bash
git add -A
```

Omit `node_modules/` — it is gitignored.

### 4. Push

If the user asked to push:

```bash
git push origin main
```

The default branch is `main`. Rebase onto remote first if push is rejected:

```bash
git pull --rebase origin main
git push origin main
```

### 5. Verify

```bash
git status -sb
```

Confirm the branch is up to date with `origin/main`.

## Files affected by stamping

| Pattern | Assets |
|---------|--------|
| `index.html` | `assets/css/styles.css`, `assets/js/scroll-animations.js` |
| `case-studies/*.html` | `../assets/css/styles.css` |
| `proposals/**/index.html` | `../../assets/css/styles.css` |

Not stamped (self-contained): `proposals/frankstars/deck.html`

## What not to do

- Do not commit without running the stamp script first
- Do not push to `main` without the user's explicit request
- Do not amend commits unless the user's git rules allow it
- Do not update git config

## Example

User: "commit and push"

1. `node scripts/stamp-asset-version.mjs`
2. `git status` + `git diff` + `git log -5`
3. `git add …` → `git commit -m "…" -m "…"`
4. `git push origin main`
5. Report commit hash and confirm push succeeded
