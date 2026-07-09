# AI Project Blueprint Architect: Knowledge Base

This document encapsulates the critical domain knowledge required to maintain and scale the Project Blueprint Architect logic.

## 1. Multi-Select Conversions
When converting a question from `type: "single"` to `type: "multiple"` in `questionMap.jsx`, several areas must be updated to prevent UI and logic regressions:
- **`type` Field:** Update to `"multiple"`.
- **`description` Field:** In `questionMap.jsx`, you must ensure `description: t('questions.YOUR_KEY.description')` is present.
- **Translations:** In `en/translation.json` (and `th/`, `de/`), add `"description": "You can select more than one"` so users know clicking multiple options is allowed.
- **Markdown Generation (`markdownGenerator.js`):** Change `fmt(answers['YOUR_KEY'])` to `fmtList(answers['YOUR_KEY'])`. The `fmtList()` helper natively handles array serialization into Markdown bulleted lists. Failure to do this results in inline comma-separated strings that break Markdown formatting and AI parsers.
- **`otherOption` behavior:** In multi-select, free-form text input triggers via standard selection. The `otherOption: true` param flags the Option component to provide a text field natively inside a multi-select context.

## 2. Cloudflare AI Integration & Timeout Engineering
`functions/api/generate.js` reaches Workers AI by two interchangeable paths, tried in order:
1. **`env.AI` binding (preferred):** platform-authenticated, no secrets. Declared via `[ai] binding = "AI"` in `wrangler.toml` and added in the Pages dashboard.
2. **REST API (fallback):** used only when no binding is present; requires `CLOUDFLARE_ACCOUNT_ID` + `CF_API_TOKEN`.
Both return the same SSE event shape (`data: {"response":"..."}`), so one `sseToText()` transformer handles either. If neither is configured the function returns `503` (not a silent 500) with an actionable message. **Bindings and env vars only take effect on deployments created after they're set — a config change without a redeploy does nothing.**

Network and processing latency fluctuates heavily on the free tier of Cloudflare Workers AI carrying the Llama 3.1 8B model (default; set by `DEFAULT_MODEL` / the `AI_MODEL` env override in `functions/api/generate.js`).
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
- An `onKeyDown` handler on each card activates it on Enter/Space (with `preventDefault` to stop the page scrolling on Space).
- In `OtherOptionCard`, the keydown handler ignores events that bubble up from the inner text input (`e.target === e.currentTarget`) so typing a space in the field doesn't toggle the card.
- A `focus-visible:ring` class provides a visible keyboard focus indicator without showing a ring on mouse click.
- `QuestionScreen` wraps the grid in `role="radiogroup"` (single) or `role="group"` (multiple) with an `aria-label` from the question title.
- **Radiogroup keyboard model (`QuestionScreen`)**: single-select groups follow the WAI-ARIA radio pattern. A *roving tabindex* keeps exactly one radio in the tab order (`tabIndex={0}` on the selected card, or the first when nothing is selected; all others `-1`), so Tab enters/leaves the group as a single stop. The group's `onKeyDown` handles Arrow keys, moving focus **and** selection to the next/previous radio (wrapping at the ends). The `tabIndex` is passed down as a prop to `OptionCard`/`OtherOptionCard`; checkbox (multi-select) groups pass `0` for every card so each is independently tabbable. Arrow navigation onto the "other" card selects it via `onSingleSelect('other')` rather than `onOtherSelect`, so focus is **not** pulled into its text input during keyboard traversal (that only happens on an explicit click/Enter/Space).

## 5. Label Readability Parsing
When adjusting translation keys for complex descriptors, prefer symbol conjunctions over spelled-out conjunctions:
* **Yes:** "AI & Machine Learning" or "Codebase / IDE"
* **No:** "AI and Machine Learning" or "Codebase or IDE"
This improves "scannability" during the wizard process, reducing cognitive load as users navigate the multi-choice interface. Apply this across all translations (TH: "และ/หรือ" becomes "&"/"/").

## 6. `desc` vs `scenario` Rendering
`OptionCard` renders two different example surfaces from two different fields, and they must not be conflated:
- **`desc`** — a short, one-line clarification shown automatically in the panel that appears *when the card is selected* ("Example:").
- **`scenario`** — a longer, narrative real-world example shown in the amber **"Example Scenario"** panel that the user expands via the *"View Example"* toggle (only visible while the card is *not* selected).

The card uses `opt.scenario || opt.desc` for the expandable panel, so an option may supply only `desc` (the scenario panel then reuses it) or both (richer, distinct copy in each). To attach a scenario, add `scenario: t('...scenario')` to the option in `questionMap.jsx` **and** the matching key in all three locales — `npm run validate` enforces the parity. Currently only the four `q_purpose` options carry distinct scenarios.
