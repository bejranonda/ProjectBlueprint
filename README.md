# 🚀 AI Project Blueprint Architect

**Generate Structured Master Context for Vibe-Coding, Rapid Prototyping, and AI-Driven Development.**

[![v1.4.0](https://img.shields.io/badge/version-v1.4.0-blue.svg)](https://github.com/bejranonda/ProjectBlueprint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Project Blueprint Architect is an interactive, multilingual wizard designed to bridge the gap between human ideas and AI execution. It generates a high-density **AI Context Document** (Markdown) that you can feed into tools like **Claude, Cursor, ChatGPT, or Gemini** to ensure 10x higher accuracy in code generation, business planning, and content creation.

<img width="929" height="395" alt="image" src="https://github.com/user-attachments/assets/ce9f32f6-5af4-4cb1-82e6-f2eebfeee40c" />


---

## 🌟 Why use Project Blueprint?

Most AI "hallucinations" happen because of poor context. This tool uses structured frameworks like the **Business Model Canvas (BMC)** and **Mission Model Canvas (MMC)** to ensure your AI understands your "Why," "Who," and "How" before it writes a single line of code.

### Key Benefits:
- **For Beginners:** No technical jargon. Use real-world scenarios to define your project goals.
- **For Developers (Vibe-Coding):** Generate a "source of truth" context file that prevents AI from drifting during long coding sessions.
- **For Entrepreneurs:** Rapidly validate business ideas with AI by providing a robust structural foundation.
- **Multilingual Support:** Available in **English, Thai (ไทย), and German (Deutsch)**.

---

## ✨ Features (v1.4.0)

- **🎯 Purpose-First Wizard** — Tailor your blueprint for Vibe Coding, Business Planning, Campaign Strategy, or Pitch Prep.
- **🧠 Smart Branching Logic** — Questions adapt dynamically (e.g., Short-term Campaign vs. Long-term Business).
- **🖼️ Expandable Scenario Panels** — Every option includes a real-world example scenario to help beginners understand each choice.
- **🏷️ Visual Tag Badges** — Technical terms appear as scannable pill badges alongside clean translated labels.
- **🤖 Cloudflare AI Integration** — Streams a concise AI summary and practical examples via Cloudflare Workers AI with side-by-side comparisons.
- **♿ Keyboard Accessibility** — Option cards are fully keyboard-navigable (Tab, Arrow keys, Enter/Space) following the WAI-ARIA radio pattern, with `radio`/`checkbox` roles, roving tabindex, and visible focus rings.
- **📱 Modern Glassmorphism UI** — Responsive, clean, and fast interface built with React 19 and Tailwind CSS.
- **📥 Instant Export** — Download your blueprint as a `.md` file ready for your favorite IDE or LLM.
- **✅ i18n Validation Tooling** — `npm run validate` guards translation-key parity across all locales (the project's most common bug class).

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|-------|-----------|
| **Framework** | [React 19](https://react.dev/) (Functional Components, Hooks) |
| **Build Tool** | [Vite 6](https://vite.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) (Glassmorphism, Responsive Design) |
| **i18n** | `react-i18next` (JSON-based localized bundles) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend API** | Cloudflare Pages Functions (Edge Runtime / Node.js compatibility) |
| **AI Model** | `@cf/meta/llama-3-8b-instruct` (via Cloudflare Workers AI) |

### System Architecture
The application follows a **Decoupled Client-Server** pattern:
1. **Frontend (React):** Manages the wizard state, branching logic, and local Markdown generation.
2. **Backend (CF Functions):** Acts as a secure proxy to Cloudflare's AI models, handling streaming responses to the client.
3. **i18n Layer:** Separates content from logic, allowing for seamless translation and scaling.

---

## 🗺️ Wizard Flow Logic

The wizard follows a dynamic branching path based on the user's initial choices:

```text
q_purpose (Choose Goal)
  └── q_project_desc (Describe Project)
       └── q_project_type (Campaign vs Business)
            ├── [Short-term] → q_short_category → q_short_target → q_short_objective 
            │                   └── q_short_metric → q_short_channels → q_platform
            └── [Long-term]  → q_long_industry → q_long_*_spec → q_long_target 
                                └── q_long_value → q_long_revenue → q_long_activities → q_platform
                                                                                       └── q_sample_text → REVIEW
```

---

## 🚀 Getting Started for Developers

### Prerequisites
- Node.js 18+
- npm 9+
- Cloudflare Account (for AI functionality)

### Configuration
Create a `.env` file in the project root to configure the Cloudflare Pages Function Proxy:
```env
CF_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

### Development
Because we use Cloudflare Pages Functions as a secure proxy (`/functions/api/generate.js`), you must use the `wrangler` CLI to spin up the dev server.

```bash
# Install dependencies
npm install

# Start fullstack dev server (Vite + Cloudflare Functions)
npm run pages:dev
```
*Note: Using standard `npm run dev` will run the frontend but break the AI comparison feature.*

### Validation
Before building or deploying, validate that all translation keys are consistent across the `en`, `th`, and `de` locales:

```bash
# Checks key parity, source t() references, and empty values
npm run validate
```
This runs automatically as part of `npm run pages:deploy`, so a missing or mismatched translation key fails the deploy early instead of shipping a broken UI string.

### Deployment
```bash
# Build and deploy to Cloudflare Pages
npm run pages:deploy
```

---

## 📂 Project Structure

```text
.
├── functions/
│   └── api/
│       └── generate.js         # Cloudflare AI Proxy Endpoint (Llama 3)
├── scripts/
│   └── validate-i18n.mjs       # Translation key-parity validator (npm run validate)
├── src/
│   ├── components/
│   │   ├── LanguageSwitcher.jsx # Custom popover language dropdown
│   │   ├── OptionCard.jsx      # Choice card with tags & scenario panels
│   │   ├── QuestionScreen.jsx  # Question renderer (options grid + textarea)
│   │   ├── ReviewScreen.jsx    # Blueprint output, AI summary, compare tabs
│   │   └── StepTracker.jsx     # 6-step progress indicator (5 steps + Review)
│   ├── data/
│   │   └── questionMap.jsx     # Wizard flowchart logic & question definitions
│   ├── hooks/
│   │   └── useWizard.js        # Form state and navigation hook
│   ├── locales/                # Translation JSONs (th, en, de)
│   ├── utils/
│   │   └── markdownGenerator.js# Blueprint markdown renderer
│   ├── i18n.js                 # react-i18next configuration
│   └── App.jsx                 # App root and orchestrator
├── wrangler.toml               # Cloudflare configuration file
├── guideline.md                # Developer docs for translations and additions
└── knowledge.md                # Critical domain knowledge & logic rules
```

---

## 📖 How to use the Blueprint

Once you generate your `.md` file:

1. **Cursor / VS Code:** Open your project, create a file named `CONTEXT.md`, and paste the content. Reference it in your prompts: *"Use @CONTEXT.md as the primary project logic."*
2. **Claude / ChatGPT:** Paste the blueprint at the start of a new chat session.
3. **Gemini:** Upload the `.md` file directly to the chat for deep context analysis.

---

## 🤝 Contributing & License
Distributed under the MIT License. Contributions are welcome! 

**Werapol Bejranonda** — [@bejranonda](https://github.com/bejranonda)
