# AI Project Blueprint Architect: Technical Approach

This document defines the underlying technical approach for the infrastructure and architecture of the application.

## 1. Modular "Question Map" Architecture
Rather than hardcoding dozens of React components, the entire wizard application flow is powered by a central JSON-like configuration (`src/data/questionMap.jsx`). This approach delivers:
- **Centralized Logic**: Business flow (e.g., branching based on Short-term vs. Long-term) is handled through `next` pointers.
- **Maintainability**: Adding new questions or converting a single-select question to a multi-select question only requires editing the map file and translation documents, without touching React rendering components.
- **Type Resilience**: The system dynamically handles both single string responses and array-based multi-select responses seamlessly using standard Markdown formatters.

## 2. Dynamic Streaming via Cloudflare Edge
To provide immediate perceived value, the tool integrates directly with the `Llama 3` model deployed on Cloudflare Workers AI.
- **Edge Deployment**: API endpoints run as Cloudflare Pages Functions (`/functions/api/generate.js`), preventing CORS issues while providing security for API tokens.
- **Real-Time Streaming**: Utilizing text streaming allows the UI to surface partial completions immediately.
- **Robust Error Handling**: The application cleanly catches `AbortError` (timeout after 60 seconds) vs. hardware network errors (`ai_error_network`). It handles Llama's rate limits resiliently, instructing the user to copy their blueprint manually as a fallback without breaking the frontend experience.

## 3. High-Fidelity i18n
The strategy around internationalization encompasses:
- Pure separation of UI code from copy text using `react-i18next`.
- Automatic browser-sniffing language negotiation.
- Complex data extraction from translation JSONs (such as arrays of "tags", multi-select labels, and detailed markdown instructions) via custom hooks, ensuring that new languages don't require source code modification.

## 4. UI/UX "Vibe" Coding Standards
- Pure Tailwind CSS with consistent arbitrary utility variables (e.g., `#ffffff10` for glass effects).
- Readability first: Avoids heavy text in favor of icons (Lucide React) and minimal pill badges (tags).
- Interactive validation: Checkbox and radio selections give immediate visual confirmation via border color and SVG checkmarks.

## 5. Accessibility-First Custom Controls
The selection cards are custom `<div>` components rather than native inputs, which would normally sacrifice keyboard and assistive-technology support. The approach reconstructs native semantics on top of the custom UI: each card carries an ARIA `radio`/`checkbox` role with `aria-checked`, is reachable via `Tab` (`tabIndex={0}`), activates on `Enter`/`Space`, and exposes a visible `focus-visible` ring. The options grid declares the matching `radiogroup`/`group` role. This keeps the bespoke visual design while remaining operable without a mouse and legible to screen readers.

## 6. Lightweight Validation Tooling
Rather than introduce a heavy test framework, correctness is guarded by a focused, dependency-free Node script (`scripts/validate-i18n.mjs`, `npm run validate`). It statically analyzes the source for `t()` references and cross-checks them against all locale bundles, enforcing key parity, reference resolution, and non-empty values. It is wired into the deploy script so a broken translation fails fast at build time instead of degrading the live UI. This matches the project's "minimal footprint, maximum safety" philosophy.
