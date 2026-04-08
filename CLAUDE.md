# CLAUDE.md — AI Project Blueprint Architect

## Project Overview

Interactive multilingual wizard that generates AI-ready project blueprints in Markdown. Built with React 19 + Vite 6 + Tailwind CSS. Deployed on Cloudflare Pages.

## Tech Stack

- **React 19** with hooks (no Redux, no Router)
- **Vite 6** for build/dev
- **Tailwind CSS 3** for styling
- **react-i18next** for i18n (TH, EN, DE)
- **Lucide React** for icons
- **Cloudflare Pages Functions** for AI proxy

## Key Files

| File | Purpose |
|------|---------|
| `src/data/questionMap.jsx` | Wizard flow — all question definitions, branching logic, icons, tags |
| `src/hooks/useWizard.js` | State management — navigation, answers, per-question transient state |
| `src/components/OptionCard.jsx` | Choice card — tags, scenario panels, features list |
| `src/components/LanguageSwitcher.jsx` | Custom popover dropdown for language selection |
| `src/utils/markdownGenerator.js` | Generates the final Markdown blueprint from answers |
| `src/locales/{th,en,de}/translation.json` | All translated strings |

## Architecture Patterns

- **Question Map pattern**: All questions defined as a flat map with `next` pointers for branching. No nested routing.
- **`tagHelper(t, key)`**: Utility to safely extract tag arrays from i18next. Returns `[]` on failure.
- **Step groups**: 5 steps (Purpose → Project Type → Context → Deep Dive → Style) + Review. Controlled by `stepGroup` field on each question.
- **Wizard starts at `q_purpose`**: First question asks purpose (vibe-coding, business, campaign, pitch), then flows to description, then type-based branching.

## Translation Structure

Each option in locale files can have:
- `label` — display text
- `desc` — short description shown when selected
- `tags` — array of technical term badges
- `features` — array of feature strings (for `q_project_type` only)

When adding options, always update all 3 locale files (th, en, de) and add the option entry in `questionMap.jsx`.

## Naming Conventions

- Question IDs: `q_` prefix (e.g., `q_long_target`, `q_short_metric`)
- Locale keys match question IDs exactly: `questions.q_long_target.options.B2C Youth.label`
- Step group numbers: 1-5 for steps, 6 = Review

## Build & Deploy

```bash
npm run build          # Production build
npm run pages:dev      # Full-stack dev (Vite + Cloudflare Functions)
npm run pages:deploy   # Deploy to Cloudflare Pages
```
