# 🚀 AI Project Blueprint Architect

**Generate Master Context for Vibe-Coding, Rapid Prototyping, and AI-Driven Development.**

[![v1.3.0](https://img.shields.io/badge/version-v1.3.0-blue.svg)](https://github.com/bejranonda/ProjectBlueprint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Project Blueprint Architect is an interactive, multilingual wizard designed to bridge the gap between human ideas and AI execution. It generates a structured, high-density **AI Context Document** (Markdown) that you can feed into tools like **Claude, Cursor, ChatGPT, or Gemini** to ensure 10x higher accuracy in code generation, business planning, and content creation.

---

## 🌟 Why use Project Blueprint?

Most AI "hallucinations" happen because of poor context. This tool uses structured frameworks like the **Business Model Canvas (BMC)** and **Mission Model Canvas (MMC)** to ensure your AI understands your "Why," "Who," and "How" before it writes a single line of code.

### Key Benefits:
- **For Beginners:** No technical jargon. Use real-world scenarios to define your project goals.
- **For Developers (Vibe-Coding):** Generate a "source of truth" context file that prevents AI from drifting during long coding sessions.
- **For Entrepreneurs:** Rapidly validate business ideas with AI by providing a robust structural foundation.
- **Multilingual Support:** Available in **English, Thai (ไทย), and German (Deutsch)**.

---

## ✨ Features (v1.3.0)

- **🎯 Purpose-First Wizard** — Tailor your blueprint for Vibe Coding, Business Planning, Campaign Strategy, or Pitch Prep.
- **🧠 Smart Branching Logic** — Questions adapt dynamically (e.g., Short-term Campaign vs. Long-term Business).
- **🖼️ Expandable Scenario Panels** — Stuck? See real-world examples for every choice to help you decide.
- **🤖 Cloudflare AI Integration** — Compare side-by-side results of AI output *with* vs. *without* your blueprint using Llama 3.
- **📱 Modern Glassmorphism UI** — Responsive, clean, and fast interface built with React 19 and Tailwind CSS.
- **📥 Instant Export** — Download your blueprint as a `.md` file ready for your favorite IDE or LLM.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | [React 19](https://react.dev/) + [Vite 6](https://vite.dev/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **i18n** | `react-i18next` |
| **Backend** | Cloudflare Pages Functions (Edge Runtime) |
| **AI Model** | `@cf/meta/llama-3-8b-instruct` |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+
- A Cloudflare Account (optional, for the AI comparison feature)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/bejranonda/ProjectBlueprint.git
   cd ProjectBlueprint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**
   Create a `.env` file for Cloudflare AI features:
   ```env
   CF_API_TOKEN=your_token
   CLOUDFLARE_ACCOUNT_ID=your_id
   ```

4. **Run Development Server**
   ```bash
   # For fullstack (Frontend + Cloudflare Functions)
   npm run pages:dev
   ```

---

## 📖 How to use the Blueprint

Once you generate your `.md` file:

1. **Cursor / VS Code:** Open your project, create a file named `CONTEXT.md`, and paste the content. Reference it in your prompts: *"Use @CONTEXT.md as the primary project logic."*
2. **Claude / ChatGPT:** Paste the blueprint at the start of a new chat session.
3. **Gemini:** Upload the `.md` file directly to the chat for deep context analysis.

---

## 📂 Project Structure

```text
.
├── functions/api/      # Cloudflare AI Proxy (Llama 3)
├── src/components/     # Modular React components
├── src/data/           # Wizard flowchart & logic
├── src/locales/        # i18n Translations (EN, TH, DE)
├── src/utils/          # Markdown generators
└── wrangler.toml       # Cloudflare deployment config
```

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

**Werapol Bejranonda** — [@bejranonda](https://github.com/bejranonda)
