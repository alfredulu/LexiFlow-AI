# LexiFlow AI

LexiFlow AI is a modern application that generates long-form and short-form written content (blogs, eBooks, and social posts) using AI. It demonstrates how AI-powered features can be integrated into a scalable and user-focused SaaS-style interface.

---

## 🚀 Why This Project Exists

LexiFlow AI was built to showcase how AI-driven features can be designed and implemented beyond simple demos. The focus is on leveraging AI capabilities to ensure generated content is presented, reused, and exported effectively, reflecting patterns commonly found in production SaaS products.

---

## ✨ Features

- **Content Generation**: Create blog posts, eBooks, and social media content.
- **AI-Powered**: Uses Google Gemini for content generation.
- **Dynamic Prompts**: Tailored based on content type for optimal results.
- **Session History**: Access previously generated content.
- **One-Click Actions**: Copy to clipboard or download as PDF.
- **Responsive UI**: Clean and modern design with Tailwind CSS.
- **Robust API Integration**: Seamlessly integrates with Google Gemini SDK for reliable and efficient AI-powered content generation.

---

## 🛠️ Tech Stack

- **API SDK**: Google Gemini SDK (`@google/genai`)
- **Frontend**: React 18, Vite, Tailwind CSS
- **Utilities**: react-markdown, jsPDF, lucide-react

---

## 📂 Project Structure

```plaintext
LexiFlow-AI/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   └── services/
│       └── aiService.js
```

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173).

---

## 🧑‍💻 Usage

1. Select an output format (Blog, eBook, or Social).
2. Enter a topic or prompt.
3. Generate content using AI.
4. Use available actions:
   - Copy content
   - Download as PDF
   - View generation history
   - Clear output when needed

---

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## 🤖 AI Integration Details

AI generation logic is implemented in:

```plaintext
src/services/aiService.js
```

- **Model**: `gemini-2.5-flash`
- **Dynamic Prompts**: Constructed based on selected content type.
- **Response Format**: Markdown, rendered in the UI.
- **API Reliability**: Built with Google Gemini SDK to ensure high performance and scalability.

---

## 🔒 Notes on Security

This project performs AI requests directly from the frontend using environment variables. For production or public deployments, API requests should be proxied through a backend service to avoid exposing sensitive keys.

---

## 🚧 Future Improvements

- Tone, length, and audience controls
- Saved projects using local storage or a backend
- Editable sections with selective regeneration
- Additional export formats (DOCX, Markdown, TXT)
- Authentication and user accounts

---

## 📜 License

This project is intended for educational and portfolio use.
