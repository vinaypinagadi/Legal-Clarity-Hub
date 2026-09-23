# Legal Clarity Hub

Build a comprehensive "Legal Prep Assistant" web application.

Goal: A GenAI-powered tool to simplify complex legal documents, extract risks, and help users prepare for professional legal consultation.

Strict Guardrail: This application MUST include a prominent, sticky disclaimer banner across the top stating: "This tool provides informational assistance only and does not constitute professional legal advice. Always consult a qualified attorney."

Tech Stack: React, TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons.

Architecture & Code Quality Guidelines:

- Create a highly modular, maintainable structure. Separate components, custom hooks, and utility functions into distinct folders.

- Write strict TypeScript interfaces for all data structures (e.g., DocumentChunk, ExtractedRisk, PrepSheet).

- Implement a centralized `LLMService.ts` file. For this build, populate it with mock asynchronous functions (returning dummy JSON data) that simulate a prompt-response cycle. I will swap this with a live API later. This ensures the app is testable, efficient, and requires zero heavy local databases.

Accessibility & UI Guidelines:

- Ensure 100% WCAG compliance. Use high-contrast color schemes, ensure all interactive elements are keyboard-navigable, and include descriptive ARIA labels for screen readers.

- Design the UI to look trustworthy, clean, and modern—similar to a top-tier fintech dashboard.

Core Views & Components to Generate:

1. Onboarding/Upload View:

   - A drag-and-drop zone for document text (keep it restricted to text/markdown inputs to avoid large PDF processing libraries).

   - A mandatory "I agree this is not legal advice" checkbox that must be checked before the "Analyze" button becomes active.

2. Analysis Dashboard:

   - Left Panel: A scrollable view of the uploaded document.

   - Right Panel: A tabbed interface containing "Risk Breakdown" and "AI Chat".

3. Risk Breakdown Tab:

   - A data table displaying extracted clauses categorized by "Obligations", "Rights", and "Red Flags".

   - Next to every complex clause, include a toggle button labeled "Explain Like I'm 5" (ELI5) that expands a simplified, jargon-free translation of the text.

4. Lawyer Prep-Sheet View:

   - A dedicated screen that compiles the user's flagged clauses and AI chat history into a structured, printable checklist titled "Questions for Your Attorney." Include a "Download as Markdown" button.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
