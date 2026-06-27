# Developer Guidelines

## 1. Adding a New Language

1. Duplicate `src/locales/en/translation.json` in a new folder (e.g., `src/locales/fr/translation.json`).
2. Translate all the values in the JSON file, including:
   - `app.*` keys (UI buttons, labels, review screen text)
   - `questions.*` keys (all question titles, descriptions, options, placeholders, **tags**, and **desc** fields)
   - `misc.*` keys (step labels, view_example, scenario_heading)
   - `markdown.*` keys (blueprint output labels)
3. Open `src/i18n.js`:
   - Import the new translation file.
   - Add it to the `resources` object.
   - Add the language code to the `supportedLangs` array.
4. Open `src/components/LanguageSwitcher.jsx` and add a new entry to the `LANGUAGES` array with `code`, `label`, and `flag`.

## 2. Adding / Modifying Questions

All questions are configured inside `src/data/questionMap.jsx`.

### Adding a new question
1. Define a new key in `questionMap.jsx` with `stepGroup`, `title`, `type`, and `next`/`options`.
2. For **textarea** questions, add a `placeholder` key in the locale files under `questions.YOUR_KEY.placeholder`.
3. For **option** questions, each option object supports:
   - `label` — display text (translated via `t()`)
   - `value` — internal key used in answers
   - `next` — next question ID (for single-select branching)
   - `icon` — Lucide React icon component
   - `desc` — short description shown when selected
   - `tags` — array of technical term badges (use `tagHelper(t, 'questions.KEY.options.OPT.tags')`)
   - `features` — array of feature strings (shown as checkmark list)
4. Add all new labels, tags, and descriptions to **all 3 locale files** (en, th, de).
5. If the new question generates output, update `src/utils/markdownGenerator.js` to include it.
6. Run `npm run validate` to confirm every new `t()` key exists and all 3 locales stay in parity, then `npm run build` to confirm it compiles.

### Validating translations
Run the i18n validator after any change to `questionMap.jsx` or a locale file:
```bash
npm run validate
```
It fails (non-zero exit) if a key is missing from any locale, referenced in source but absent from `en`, or resolves to an empty string. It also runs automatically during `npm run pages:deploy`.

### Using tags
Tags are returned as arrays from i18next. Use the `tagHelper` utility:
```jsx
import { tagHelper } from '../data/questionMap';
// ...
tags: tagHelper(t, 'questions.q_long_target.options.B2C Youth.tags')
```

### Step groups
The wizard uses 5 step groups (plus Review = 6):
1. Purpose (`q_purpose`)
2. Project Type (`q_project_desc`, `q_project_type`)
3. Context (`q_long_industry`, `q_short_category`, etc.)
4. Deep Dive (`q_long_target`, `q_short_metric`, etc.)
5. Style/Platform (`q_platform`, `q_sample_text`)
6. Review

## 3. Deployment with Cloudflare AI

Since this app relies on Cloudflare AI for the streaming summary feature:
- Place your `CF_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` inside a `.env` file for local development.
- For deployment on Cloudflare Pages, navigate to the Cloudflare Dashboard -> Pages Setup -> Settings -> Environment Variables, and set:
  - `CF_API_TOKEN`: Your API token.
  - `CLOUDFLARE_ACCOUNT_ID`: Your exact account ID.
- The AI endpoint uses `stream: true` to deliver real-time streamed text to the client.
- A 60-second client-side timeout is configured. If exceeded, the user sees an error with a Retry button.

## 4. Updating the Version

When releasing a new version:
1. Update `version` in `package.json`.
2. Update `app.version` in all 3 locale files (`src/locales/en/th/de`).
3. The version badge in the header reads from `t('app.version')`.

## 5. Accessibility of Option Cards

Option cards are clickable `<div>`s rather than native form controls, so keyboard and screen-reader support is added manually in `OptionCard.jsx` and `OtherOptionCard.jsx`. When modifying these components, keep:
- `role="radio"` (single-select) or `role="checkbox"` (multi-select) with `aria-checked={isSelected}`.
- An `onKeyDown` handler that activates on Enter/Space (calling `preventDefault`).
- A `focus-visible:ring-*` class for a visible keyboard focus indicator.
- The `QuestionScreen` grid wrapper's `role="radiogroup"`/`role="group"` with an `aria-label`.

For `OtherOptionCard`, the keydown handler guards with `e.target === e.currentTarget` so typing a space inside the text input doesn't toggle the card.

**Keyboard navigation (single-select):** `QuestionScreen` implements the WAI-ARIA radio pattern. It computes a *roving tabindex* (`tabIndex` is passed to each card — `0` for the selected/first radio, `-1` for the rest) and handles Arrow keys at the group level to move focus and selection together. If you add a new card type to the grid, accept a `tabIndex` prop (default `0`) and spread it onto the focusable element so roving tabindex keeps working. Multi-select cards always receive `tabIndex={0}`.

## 6. LanguageSwitcher Component

The `LanguageSwitcher` is a standalone component (`src/components/LanguageSwitcher.jsx`) that:
- Renders a custom popover dropdown (not a native `<select>`)
- Shows flag emoji + localized name for each language
- Supports click-outside dismiss, Escape key, and `aria-*` attributes
- Receives `currentLang` and `onChangeLang` props
