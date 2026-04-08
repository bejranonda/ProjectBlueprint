# AI Project Blueprint Architect

> Master Context for AI Vibe-Coding and Project Generation.

An interactive, multilingual wizard that generates a structured **AI-ready Project Blueprint** in Markdown format. The blueprint serves as a robust context document that can be fed directly into AI tools (ChatGPT, Claude, Cursor, GitHub Copilot, etc.) for highly accurate project generation, marketing copy creation, and vibe-coding.

It features **Cloudflare AI Integration** letting you test side-by-side comparisons of AI output *with* vs *without* your generated blueprint!

## Features (v1.2.0)

- **Purpose-First Wizard** — Start by choosing your goal (Vibe Coding, Business Planning, Campaign Strategy, or Pitch Prep) so the blueprint is tailored to your use case.
- **Smart Branching Logic** — Questions adapt dynamically based on your project type (short-term campaign vs. long-term business).
- **Business / Mission Model Canvas** — Define Customer Segments, Value Propositions, Objectives, OKRs, Deployment Channels.
- **Expandable Scenario Panels** — Every option includes a real-world example scenario to help beginners understand each choice.
- **Visual Tag Badges** — Technical terms appear as scannable pill badges alongside clean translated labels.
- **Custom Language Switcher** — Popover dropdown with flag emojis, keyboard support, and click-outside dismiss.
- **Expanded Answer Choices** — More options for categories, target audiences, revenue models, channels, and platforms.
- **Browser Auto-detect Language (i18n)** — Available in English, Thai, and German.
- **AI Streaming Integration** — Streams a concise AI summary and practical examples via Cloudflare Workers AI.
- **Instant Markdown Export** — Get a ready-to-use `.md` blueprint file instantaneously.
- **Premium UI** — Modern light theme with soft palettes and glassmorphism styling.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 6](https://vite.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| i18n | `react-i18next` |
| Icons | [Lucide React](https://lucide.dev/) |
| Backend API | Cloudflare Pages Functions (`@cf/meta/llama-3-8b-instruct`) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |

## Getting Started

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

Because we use Cloudflare Pages Functions as a secure proxy (`/functions/api/generate.js`), you must use the `wrangler` CLI to spin up the dev server, which proxies the Vite and API environment together.

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

## Project Structure

```
.
├── functions/
│   └── api/
│       └── generate.js         # Cloudflare AI Proxy Endpoint
├── src/
│   ├── components/
│   │   ├── LanguageSwitcher.jsx # Custom popover language dropdown
│   │   ├── OptionCard.jsx      # Choice card with tags & scenario panels
│   │   ├── OtherOptionCard.jsx # "Other" free-text option card
│   │   ├── QuestionScreen.jsx  # Question renderer (options grid + textarea)
│   │   ├── ReviewScreen.jsx    # Blueprint output, AI summary, compare tabs
│   │   └── StepTracker.jsx     # 5-step progress indicator
│   ├── data/
│   │   └── questionMap.jsx     # Wizard flowchart logic & question definitions
│   ├── hooks/
│   │   └── useWizard.js        # Form state and navigation hook
│   ├── locales/                # Translation JSONs (th, en, de)
│   ├── utils/
│   │   └── markdownGenerator.js# Blueprint markdown renderer
│   ├── i18n.js                 # react-i18next configuration
│   ├── App.jsx                 # App root and orchestrator
│   ├── main.jsx
│   └── index.css               # Tailwind directives and custom styles
├── guideline.md                # Developer docs for translations and additions
├── known-issues.md             # Limitations and API constraints
└── wrangler.toml               # Cloudflare configuration file
```

## Wizard Flow

```
q_purpose (Purpose)
  └── q_project_desc (Description)
       └── q_project_type (Short-term vs Long-term)
            ├── [Short-term] → q_short_category → q_short_target → q_short_objective → q_short_metric → q_short_channels → q_platform
            └── [Long-term]  → q_long_industry → q_long_*_spec → q_long_target → q_long_value → q_long_revenue → q_long_activities → q_platform
                                                                                                                              └── q_sample_text → REVIEW
```

## License

MIT

## Author

**Werapol Bejranonda** — [@bejranonda](https://github.com/bejranonda)
