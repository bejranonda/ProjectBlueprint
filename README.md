# 🚀 AI Project Blueprint Architect

> กำหนดโครงสร้างความคิดให้ AI ทำงานแทนคุณได้อย่างแม่นยำ

An interactive wizard that generates a structured **AI-ready Project Blueprint** in Markdown format. It guides users through a branching questionnaire to produce a context document that can be fed directly into AI tools (ChatGPT, Claude, Cursor, GitHub Copilot, etc.) for accurate project generation, content creation, and vibe-coding.

## ✨ Features

- **Smart Branching Logic** — Questions adapt dynamically based on your project type (short-term campaign vs. long-term business)
- **Business Model Canvas (BMC)** — For long-term / business projects: Customer Segments, Value Propositions, Revenue Streams, Key Activities
- **Mission Model Canvas (MMC)** — For short-term / campaign projects: Beneficiaries, Objectives, OKRs, Deployment Channels
- **AI Persona Configuration** — Set the target platform and provide sample content so AI can match your tone and style
- **Instant Markdown Export** — Download a ready-to-use `.md` blueprint file

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 6](https://vite.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

### Deploy to Cloudflare Pages

```bash
# Via Wrangler CLI
npm run pages:deploy

# Or connect the GitHub repo to Cloudflare Pages dashboard:
# Build command: npm run build
# Build output directory: dist
```

## 📁 Project Structure

```
src/
├── main.jsx                  # React entry point
├── index.css                 # Tailwind directives & global styles
├── App.jsx                   # Main wizard orchestrator
├── components/
│   ├── StepTracker.jsx       # Progress indicator
│   ├── QuestionScreen.jsx    # Dynamic question renderer
│   ├── OptionCard.jsx        # Selectable option card (radio/checkbox)
│   ├── OtherOptionCard.jsx   # "Other" option with text input
│   └── ReviewScreen.jsx      # Markdown preview screen
├── data/
│   └── questionMap.jsx       # Question tree with branching logic
├── hooks/
│   └── useWizard.js          # Wizard state management hook
└── utils/
    └── markdownGenerator.js  # Markdown blueprint generation
```

## 🌐 Cloudflare Pages Deployment

This project is optimized for Cloudflare Pages:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `18` |

## 📝 License

MIT

## 👤 Author

**Werapol Bejranonda** — [@bejranonda](https://github.com/bejranonda)
