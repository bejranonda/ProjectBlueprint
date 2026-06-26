# AI Project Blueprint Architect: Knowledge Base

This document encapsulates the critical domain knowledge required to maintain and scale the Project Blueprint Architect logic.

## 1. Multi-Select Conversions
When converting a question from `type: "single"` to `type: "multiple"` in `questionMap.jsx`, several areas must be updated to prevent UI and logic regressions:
- **`type` Field:** Update to `"multiple"`.
- **`description` Field:** In `questionMap.jsx`, you must ensure `description: t('questions.YOUR_KEY.description')` is present.
- **Translations:** In `en/translation.json` (and `th/`, `de/`), add `"description": "You can select more than one"` so users know clicking multiple options is allowed.
- **Markdown Generation (`markdownGenerator.js`):** Change `fmt(answers['YOUR_KEY'])` to `fmtList(answers['YOUR_KEY'])`. The `fmtList()` helper natively handles array serialization into Markdown bulleted lists. Failure to do this results in inline comma-separated strings that break Markdown formatting and AI parsers.
- **`otherOption` behavior:** In multi-select, free-form text input triggers via standard selection. The `otherOption: true` param flags the Option component to provide a text field natively inside a multi-select context.

## 2. Cloudflare AI Timeout Engineering
Network and processing latency fluctuates heavily on the free tier of Cloudflare Workers AI carrying Llama 3 8B.
* **Timeout Thresholds:** The `AI_TIMEOUT_MS` constant in `ReviewScreen.jsx` should be maintained at `60000` (60 seconds) instead of the standard 30s. This reduces the frequency of `AbortError`.
* **Error Categories Filter:**
  * `AbortError`: Indicates the server is slow or the stream is lagging. Suggest users copy the blueprint and proceed asynchronously. Let this fall back to `t('app.ai_error')`.
  * `Network/Other Errors` (404/500/fetch failure): Use a distinct error message `t('app.ai_error_network')` to inform users that the service is functionally disconnected.
* **Graceful Degradation:** The AI function is strictly "bonus". The core of the app (markdown generation) runs 100% locally on the React side. The AI feature must never block the review screen rendering.

## 3. i18n Key-Parity Validation
The single most common regression in this codebase is a translation key that exists in one locale but not the others, or a `t('...')` reference in source with no matching key. `scripts/validate-i18n.mjs` (run via `npm run validate`) guards against this with three checks:
- **Key parity:** `th` and `de` must have the exact same flattened key set as `en` (arrays are flattened by index, so `features.0`/`features.1` are checked too).
- **Source references:** every static `t('key')` in `src/` must resolve to an `en` key. Dynamic keys built with template literals (e.g. `questions.${id}.placeholder`) are skipped — verify those manually.
- **Empty values:** no key may resolve to an empty string.

The script exits non-zero on failure and is wired into `npm run pages:deploy`, so broken locales fail the deploy instead of shipping. After any edit to `questionMap.jsx` or a locale file, run `npm run validate`.

## 4. Accessible Non-Native Controls
The option cards are `<div>` elements (not native `<input>`), so accessibility is implemented manually and must be preserved:
- `role="radio"` for `single` questions, `role="checkbox"` for `multiple` — paired with `aria-checked={isSelected}`.
- `tabIndex={0}` + an `onKeyDown` handler activating on Enter/Space (with `preventDefault` to stop the page scrolling on Space).
- In `OtherOptionCard`, the keydown handler ignores events that bubble up from the inner text input (`e.target === e.currentTarget`) so typing a space in the field doesn't toggle the card.
- A `focus-visible:ring` class provides a visible keyboard focus indicator without showing a ring on mouse click.
- `QuestionScreen` wraps the grid in `role="radiogroup"` (single) or `role="group"` (multiple) with an `aria-label` from the question title.

## 5. Label Readability Parsing
When adjusting translation keys for complex descriptors, prefer symbol conjunctions over spelled-out conjunctions:
* **Yes:** "AI & Machine Learning" or "Codebase / IDE"
* **No:** "AI and Machine Learning" or "Codebase or IDE"
This improves "scannability" during the wizard process, reducing cognitive load as users navigate the multi-choice interface. Apply this across all translations (TH: "และ/หรือ" becomes "&"/"/").
