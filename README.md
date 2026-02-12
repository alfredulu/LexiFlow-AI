# LexiFlow AI

LexiFlow AI is a modern content-generation web app that generates **blog posts**, **ebooks**, and **social content**, with a live Markdown preview, copy, and PDF export.

**Live @:** [lexi-flow-ai](https://lexi-flow-ai.vercel.app/)

---

## Features

- Blog / eBook / Social content modes
- Markdown output + live preview
- Copy generated content
- Export to PDF
- Recent generations history (stored locally)

### More:

- Uses a server route proxy for AI requests (no browser-side API key usage)
- Clean, product-style UI with loading states and history
- Simple, deployable Next.js structure

---

## Tech Stack

- Next.js (App Router) + React
- Tailwind CSS
- Google Gemini (server route proxy)
- react-markdown, lucide-react, jspdf

---

## Security & Architecture

The UI sends requests to a server endpoint:

- `POST /api/generate`

That route handler calls Gemini using a server environment variable (`GEMINI_API_KEY`) and returns generated Markdown text to the client.

---

## Project structure

```
LexiFlow-AI/
  src/
    app/
      api/
        generate/
          route.ts        # Server endpoint that calls Gemini
      globals.css
      layout.tsx
      page.tsx            # Main UI
    services/
      aiService.ts        # Client helper that calls /api/generate
```

---

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` in the project root:

```bash
GEMINI_API_KEY=your_api_key_here
```

3. Start the dev server:

```bash
npm run dev
```

Open the URL shown in your terminal.

---

## Troubleshooting

### Tailwind / PostCSS error (Tailwind v4)

If you see an error about using `tailwindcss` directly as a PostCSS plugin:

- Install: `@tailwindcss/postcss`
- Ensure your PostCSS config uses `@tailwindcss/postcss`

### Hydration warning (history)

If you see a hydration warning, it’s usually caused by `localStorage`-based history loading. This project loads history after mount to keep renders consistent.

---

## License

### MIT
