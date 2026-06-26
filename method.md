# AI Project Blueprint Architect: Methodology

This document outlines the methodological framework behind the Project Blueprint methodology.

## Core Philosophy

The Blueprint method is built on the premise that **AI output quality is directly proportional to the context it receives**. Instead of relying on users to write exhaustive prompt engineering scripts, the application acts as a "prompt architect." It asks targeted, simple questions to average users, and structures their answers into a professional, high-density format that Large Language Models (LLMs) can immediately understand and act upon to perform "vibe coding", generate business strategies, or create marketing content.

## Frameworks Applied

We synthesize elements from several established entrepreneurial frameworks to give AI structured inputs:

1. **The Business Model Canvas (BMC):** Questions regarding Revenue Streams, Target Segments, and Key Activities map directly to the BMC.
2. **OKRs (Objectives and Key Results):** For campaigns and shorter projects, we isolate exactly what the outcome is and how it is measured.
3. **Jobs to be Done (JTBD):** Asking for the "primary value proposition" or "primary reason someone uses this" forces users to articulate the problem they are solving.

## Multi-Select Paradigm

Recognizing that real-world businesses are rarely single-threaded, the methodology heavily relies on **multi-selection architectures**:
- Users can have multiple distinct customer segments.
- Businesses often rely on hybrid revenue models (e.g., Subscription + Ad Revenue + Grants).
- Technology tools often combine SaaS, AI, and Big Data.

By allowing users to select multiple options and feeding these as a grouped array (bulleted list) in Markdown format to the LLM, the LLM gains a multidimensional understanding without the user typing out complex explanations.

## Iterative Refinement

The Blueprint Architect is designed to iteratively refine the context:
1. **Scope:** Determine the scale (long-term platform vs. short campaign).
2. **Context:** Understand the industry and specific constraints (OTOP vs. Tech).
3. **Execution Plan:** Map out the target audience, channels, and feasibility.
4. **Style/Tone:** The user provides examples of existing code or copywriting to lock in the "vibe" before the AI touches the prompt.

## Inclusivity by Design

The methodology assumes a broad, non-expert audience across three languages, so the tool must be usable regardless of input device or assistive technology. This is treated as a first-class methodological requirement, not a cosmetic afterthought:
- **Equal access:** Every selection a mouse user can make is reachable by keyboard, with ARIA roles and states announced to screen readers, so the "simple questions" promise holds for all users.
- **Trustworthy translations:** Because the wizard guides users in their own language, a missing or mismatched translation silently breaks the experience. The validation step (`npm run validate`) enforces that every prompt, label, and example exists in all supported languages before release — making linguistic completeness a measurable gate rather than an assumption.
