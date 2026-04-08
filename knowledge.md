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

## 3. Label Readability Parsing
When adjusting translation keys for complex descriptors, prefer symbol conjunctions over spelled-out conjunctions:
* **Yes:** "AI & Machine Learning" or "Codebase / IDE"
* **No:** "AI and Machine Learning" or "Codebase or IDE"
This improves "scannability" during the wizard process, reducing cognitive load as users navigate the multi-choice interface. Apply this across all translations (TH: "และ/หรือ" becomes "&"/"/").
