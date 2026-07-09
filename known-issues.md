# Known Issues

1. **Cloudflare Free-Tier Limits:**
   The free tier for the Workers AI model (`@cf/meta/llama-3.1-8b-instruct` by default) has limits on requests per minute and daily requests. If you exceed this limit, the AI summary feature may return a timeout or error. The app will show a fallback message and a Retry button.

   **Model deprecations:** Cloudflare periodically retires models (e.g. `@cf/meta/llama-3-8b-instruct` was deprecated on 2026-05-30, which surfaced as a `5028` error / HTTP 500). The model is set by `DEFAULT_MODEL` in `functions/api/generate.js` and can be overridden without a code change via the `AI_MODEL` environment variable in the Pages project settings. See Cloudflare's Workers AI model catalog for current model IDs.

2. **AI Streaming Timeout:**
   The AI generation has a 60-second client-side timeout. If Cloudflare responds slowly, the user will see an error with a retry option. The core blueprint is still fully available regardless of AI status.

3. **Backend Proxy Requirement:**
   The Cloudflare AI integration runs through the Cloudflare Pages function `functions/api/generate.js`. Do not attempt to run this proxy via standard `vite dev` without `wrangler`, otherwise the `/api/generate` endpoint will 404. Instead, use `npm run pages:dev`!

4. **Browser Language Detection:**
   The app auto-detects browser language (en, th, de). If the browser language is not one of those three, it falls back to English.

5. **Flag Emoji Rendering:**
   Flag emojis in the LanguageSwitcher (TH, US, DE) may render differently across operating systems and browsers. Windows may show two-letter country codes instead of flag images. The language name is always displayed alongside the flag as a fallback.

6. **Tags Returned as Arrays:**
   The `tagHelper()` function in `questionMap.jsx` uses `i18next`'s `returnObjects: true` to get tag arrays. If a translation key is missing or returns a non-array value, it gracefully falls back to an empty array. Always ensure tag keys exist in all locale files. Run `npm run validate` to confirm key parity across `en`, `th`, and `de`.

7. **No Automated UI / Browser Tests:**
   The project currently has no component or end-to-end test suite. Validation is limited to `npm run validate` (i18n key parity) and `npm run build` (compile-time checks). Wizard flow and AI streaming should be verified manually via `npm run pages:dev` before release.

8. **Card Activation with Space Key:**
   Option cards are non-native controls (`<div role="radio|checkbox">`) made keyboard-accessible via an Enter/Space handler. In `OtherOptionCard`, the handler intentionally ignores keydown events bubbling from the inner text input (checking `e.target === e.currentTarget`) so that pressing Space while typing the free-text answer does not toggle the card off. Keep this guard if the card markup changes.

9. **AI feature requires an AI binding OR token in production:**
   `/api/generate` needs either a Workers AI binding named `AI` (preferred — declared in `wrangler.toml` and added in the Pages dashboard) **or** the `CF_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` environment variables. If neither is set, the endpoint returns **HTTP 503** with the message *"AI is not configured on the server…"* and the UI shows the generic *"Could not connect to AI service"* fallback. **Environment variables and bindings only apply to deployments created after they are set — always redeploy after changing them.** Diagnose quickly with:
   ```bash
   curl -X POST https://<your-domain>/api/generate \
     -H "Content-Type: application/json" \
     -d '{"blueprint":"# Test","systemPrompt":"Say hi."}'
   ```
   A 503/500 with a JSON `error` field means the server config is missing; streamed text means it's working.
