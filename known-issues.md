# Known Issues

1. **Cloudflare Free-Tier Limits:**
   The free tier for `@cf/meta/llama-3-8b-instruct` has limits on requests per minute and daily requests. If you exceed this limit, the AI summary feature may return a timeout or error. The app will show a fallback message and a Retry button.

2. **AI Streaming Timeout:**
   The AI generation has a 30-second client-side timeout. If Cloudflare responds slowly, the user will see an error with a retry option. The core blueprint is still fully available regardless of AI status.

3. **Backend Proxy Requirement:**
   Due to the Cloudflare AI integration using API keys / tokens, the project now relies on Cloudflare Pages `functions/api/generate.js` to process requests. Do not attempt to run this proxy via standard `vite dev` without `wrangler`, otherwise the `/api/generate` endpoint will 404. Instead, use `npm run pages:dev`!

4. **Browser Language Detection:**
   The app auto-detects browser language (en, th, de). If the browser language is not one of those three, it falls back to English.

5. **Flag Emoji Rendering:**
   Flag emojis in the LanguageSwitcher (TH, US, DE) may render differently across operating systems and browsers. Windows may show two-letter country codes instead of flag images. The language name is always displayed alongside the flag as a fallback.

6. **Tags Returned as Arrays:**
   The `tagHelper()` function in `questionMap.jsx` uses `i18next`'s `returnObjects: true` to get tag arrays. If a translation key is missing or returns a non-array value, it gracefully falls back to an empty array. Always ensure tag keys exist in all locale files.
