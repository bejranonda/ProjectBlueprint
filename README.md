# 🚀 AI Project Blueprint Architect

> Master Context for AI Vibe-Coding and Project Generation.

An interactive, multilingual wizard that generates a structured **AI-ready Project Blueprint** in Markdown format. The blueprint serves as a robust context document that can be fed directly into AI tools (ChatGPT, Claude, Cursor, GitHub Copilot, etc.) for highly accurate project generation, marketing copy creation, and vibe-coding.

It features a brand new **Cloudflare AI Integration** letting you test side-by-side comparisons of AI output *with* vs *without* your generated blueprint!

## ✨ Features (v1.1.0)

- **🌐 Browser Auto-detect Language (i18n)** — Available in English, Thai, and German.
- **🚀 AI Streaming Integration** — Instantly streams a concise AI summary and practical examples based on your blueprint via Cloudflare Workers AI.
- **🧠 Smart Branching Logic** — Questions adapt dynamically based on your project type (short-term campaign vs. long-term business).
- **💼 Business / Mission Model Canvas** — Define Customer Segments, Value Propositions, Objectives, OKRs, Deployment Channels.
- **🎨 Premium Writers UI** — Modern, clean aesthetic tailored for creative work, featuring soft palettes and glassmorphism styling.
- **⚡ Instant Markdown Export** — Get a ready-to-use `.md` blueprint file instantaneously while the AI summarizes.
- **✨ Intuitive Tooltips** — Actionable descriptions and real-world examples injected seamlessly into choice selection.

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 6](https://vite.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| i18n | `react-i18next` |
| Icons | [Lucide React](https://lucide.dev/) |
| Backend API | Cloudflare Pages Functions (`@cf/meta/llama-3-8b-instruct`) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Cloudflare Account (for AI functionality)

### Configuration

Create a `.env` file in the project root to configure the Cloudflare Pages Function Proxy for the AI comparison feature:

```env
CF_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

### Development

Notice: Because we use Cloudflare Pages Functions as a secure proxy (`/functions/api/generate.js`), you must use the `wrangler` CLI to spin up the dev server, which proxies the Vite and API environment together.

```bash
# Install dependencies
npm install

# Start fullstack dev server (Vite + Cloudflare Functions)
npm run pages:dev
```
*Note: Using standard `npm run dev` will run the frontend but break the `/api/generate` AI feature because the Cloudflare backend won't be running.*

### Deploy to Cloudflare Pages

```bash
# Deploy using Wrangler CLI
npm run pages:deploy
```

When connecting seamlessly through the Cloudflare Dashboard:
1. Build command: `npm run build`
2. Build output directory: `dist`
3. Make sure to set `CF_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in Settings > Environment Variables on the dashboard!

## 📁 Project Structure

```
.
├── functions/
│   └── api/
│       └── generate.js         # Cloudflare AI Proxy Endpoint
├── src/
│   ├── components/             # React components (StepTracker, Cards, Screens)
│   ├── data/
│   │   └── questionMap.jsx     # Wizard flowchart logic & translations map
│   ├── hooks/
│   │   └── useWizard.js        # Form and state logic hook
│   ├── locales/                # Translation dictionary JSONs (th, en, de)
│   ├── utils/
│   │   └── markdownGenerator.js# Blueprint renderer
│   ├── i18n.js                 # Configuration for react-i18next
│   ├── App.jsx                 # App root and orchestrator
│   ├── main.jsx                
│   └── index.css               # Tailwind directives and custom scrollbars
├── guideline.md                # Developer docs for translations and additions
├── known-issues.md             # Limitations and API constraints
└── wrangler.toml               # Cloudflare configuration file
```

## 📝 License

MIT

## 👤 Author

**Werapol Bejranonda** — [@bejranonda](https://github.com/bejranonda)
