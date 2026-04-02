# Known Issues

1. **Cloudflare Free-Tier Limits:**
   The free tier for `@cf/meta/llama-3-8b-instruct` has limits on requests per minute and daily requests. If you exceed this limit, the comparison feature may return `"Error generating example"`.

2. **Language Formatting:**
   Depending on the generated length, the side-by-side comparison UI might overflow on extremely small screens (like early generation mobile phones). We recommend testing on standard mobile devices or desktop.

3. **Backend Proxy Requirement:**
   Due to the Cloudflare AI integration using API keys / tokens, the project now relies on Cloudflare Pages `functions/api/generate.js` to process requests. Do not attempt to run this proxy via standard `vite dev` without `wrangler`, otherwise the `/api/generate` endpoint will 404. Instead, use `npm run pages:dev`!
