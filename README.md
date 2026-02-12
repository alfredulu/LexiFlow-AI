# LexiFlow AI

A clean, modern AI writing tool that generates **blog posts, ebooks, and social content** with a live Markdown preview and export tools.

## 🔒 Security (Production-minded)

Gemini requests are handled server-side through a **Next.js Route Handler** (`/api/generate`).
Your **API key never ships to the browser**.

## ✨ Features

- Blog / eBook / Social content modes
- Markdown preview (React Markdown)
- Copy to clipboard
- Export to PDF (jsPDF)
- Recent generation history (localStorage)

## 🧱 Tech Stack

- Next.js (App Router) + React
- Tailwind CSS
- Google Gemini API (server-side)
- React Markdown, Lucide Icons, jsPDF

## ✅ Setup

1. Install dependencies:
   ```bash
   npm install
   Create .env.local:
   ```

GEMINI_API_KEY=your_key_here
Run locally:

npm run dev
Open http://localhost:3000

---

## Phase 3 — Commit + push to GitHub

From inside `C:\Users\Alfred\LexiFlow-AI`:

```powershell
git add .
git commit -m "Refactor to Next.js with server-side Gemini proxy"
git push
```
