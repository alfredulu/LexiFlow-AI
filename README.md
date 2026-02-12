# LexiFlow AI

LexiFlow AI is a modern content-generation web app for creating **blog posts**, **ebooks**, and **social content** with a live Markdown preview, one-click copy, and PDF export.

🌐 **Live @:** [lexi-flow-ai](https://lexi-flow-ai.vercel.app/)

---

## ✅ What you can do with it

- ✍️ Draft blog posts and long-form content fast
- 📣 Generate social captions/threads with consistent formatting
- 📄 Export clean drafts to PDF for sharing or editing later

---

## ✨ Features

- 🧩 Blog / eBook / Social modes
- 📝 Markdown output + live preview
- 📋 Copy generated content
- 🧾 Export to PDF
- 🕘 Recent generations history (stored locally)

### 🛠️ Engineering highlights

- 🔐 Server-side AI proxy (`/api/generate`) so secrets never run in the browser
- 🎛️ Product-style UX: loading states, history, quick actions
- 🧱 Clean Next.js App Router structure (easy to extend)

---

## 🧰 Tech Stack

- ⚛️ Next.js (App Router) + React
- 🎨 Tailwind CSS
- 🧠 Google Gemini (server route proxy)
- 🧱 react-markdown, lucide-react, jspdf

---

## 🔒 Security & Architecture

**Flow**

1. 🖥️ UI → `POST /api/generate`
2. 🧠 Route handler calls Gemini using `GEMINI_API_KEY`
3. ✅ Server returns generated Markdown → UI renders preview

Endpoint:

- `POST /api/generate`

---

## 🗂️ Project structure

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

## ▶️ Run locally

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

## 🧯 Troubleshooting

### Tailwind / PostCSS error (Tailwind v4)

If you see an error about using `tailwindcss` directly as a PostCSS plugin:

- Install: `@tailwindcss/postcss`
- Ensure your PostCSS config uses `@tailwindcss/postcss`

### Hydration warning (history)

If you see a hydration warning, it’s usually caused by `localStorage` history loading. This project loads history after mount to keep renders consistent.

---

## 📄 License

MIT
