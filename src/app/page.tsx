"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  PenTool,
  BookOpen,
  Share2,
  Sparkles,
  Download,
  Copy,
  LayoutDashboard,
  Check,
  Zap,
  Trash2,
} from "lucide-react";
import { generateContent } from "@/services/aiService";
import { jsPDF } from "jspdf";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [contentType, setContentType] = useState("blog");
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [copied, setCopied] = useState(false);

  // You had this before — now we actually send it to the server (safe)
  const [tone, setTone] = useState("professional");

  const [history, setHistory] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("lexiflow_history");
    setHistory(saved ? JSON.parse(saved) : []);
  }, []);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setGeneratedContent("");

    try {
      const result = await generateContent(topic, contentType, tone);
      setGeneratedContent(result);

      const newItem = {
        id: Date.now(),
        topic: topic.length > 30 ? topic.substring(0, 30) + "..." : topic,
        fullTopic: topic,
        content: result,
        type: contentType,
        date: new Date().toLocaleDateString(),
      };

      const updatedHistory = [newItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("lexiflow_history", JSON.stringify(updatedHistory));
    } catch (error) {
      setGeneratedContent(
        "### ⚠️ Connection Error\n\nI couldn't reach the AI.\n\n**Fix checklist:**\n- Ensure `GEMINI_API_KEY` exists in `.env.local`\n- Restart the dev server (`npm run dev`)\n"
      );
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsPDF = () => {
    if (!generatedContent) return;
    const doc = new jsPDF();
    const margin = 15;
    const width = doc.internal.pageSize.getWidth() - margin * 2;

    const cleanText = generatedContent.replace(/[#*`]/g, "");
    const lines = doc.splitTextToSize(cleanText, width);

    doc.setFont("helvetica", "bold");
    doc.text(`LexiFlow AI: ${contentType.toUpperCase()}`, margin, 15);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(lines, margin, 25);
    doc.save(`LexiFlow-${Date.now()}.pdf`);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* SIDEBAR */}
      <aside
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 fixed lg:relative z-50 w-72 bg-slate-900 text-white 
        flex flex-col p-6 h-full transition-transform duration-300 ease-in-out lg:flex
      `}
      >
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <Zap size={24} className="fill-white text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">LexiFlow AI</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <div className="p-2 border border-slate-700 rounded-lg">
              <span className="text-xl font-bold">✕</span>
            </div>
          </button>
        </div>

        <nav className="space-y-4 flex-1 overflow-y-auto mt-4">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest px-3">
            Recent Generations
          </p>

          {history.length === 0 ? (
            <p className="text-xs text-slate-600 px-3 italic">
              No history yet...
            </p>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="group relative">
                  <button
                    onClick={() => {
                      setGeneratedContent(item.content);
                      setTopic(item.fullTopic);
                      setContentType(item.type);
                      setIsSidebarOpen(false);
                    }}
                    className="flex flex-col gap-1 w-full p-3 rounded-xl text-left text-slate-400 hover:text-white hover:bg-slate-800 transition border border-transparent hover:border-slate-700 pr-10"
                  >
                    <span className="text-xs font-bold truncate text-indigo-400">
                      {item.topic}
                    </span>
                    <span className="text-[10px] opacity-50">
                      {item.date} • {item.type}
                    </span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newHistory = history.filter(
                        (h) => h.id !== item.id
                      );
                      setHistory(newHistory);
                      localStorage.setItem(
                        "lexiflow_history",
                        JSON.stringify(newHistory)
                      );
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </nav>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("Clear all past projects?")) {
                localStorage.removeItem("lexiflow_history");
                setHistory([]);
              }
            }}
            className="flex items-center gap-2 w-full p-3 mt-4 text-[10px] font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest border-t border-slate-800 pt-5"
          >
            <Trash2 size={14} />
            Clear History
          </button>
        )}

        <div className="mt-auto p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50">
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
              Usage Plan
            </p>
            <p className="text-[10px] text-indigo-400 font-mono">Free Tier</p>
          </div>
          <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-2/3"></div>
          </div>
          <p className="text-[11px] mt-3 text-slate-500 leading-tight">
            API active: Gemini-2.5-Flash
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-full">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 w-full">
          <h1 className="font-bold text-slate-800">LexiFlow AI</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-slate-100 rounded-lg text-slate-600 active:bg-slate-200"
          >
            <LayoutDashboard size={20} />
          </button>
        </div>

        {/* INPUT PANEL */}
        <section className="w-full lg:w-100 border-r border-slate-200 bg-white p-8 overflow-y-auto h-[50%] lg:h-full shrink-0">
          <header className="mb-10">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Design Content
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Configure your AI generation parameters.
            </p>
          </header>

          <div className="space-y-8">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Output Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "blog", icon: <PenTool size={18} />, label: "Blog" },
                  { id: "ebook", icon: <BookOpen size={18} />, label: "eBook" },
                  { id: "social", icon: <Share2 size={18} />, label: "Social" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      contentType === type.id
                        ? "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm"
                        : "border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {type.icon}
                    <span className="text-[11px] font-bold uppercase">
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Describe Topic
              </label>
              <textarea
                rows={6}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all resize-none text-slate-700 placeholder:text-slate-400"
                placeholder="e.g. 'Write a 500-word blog post about the impact of React in 2026...'"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !topic}
              className="group relative w-full bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-200 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 active:scale-[0.98]"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-.5s]"></div>
                </div>
              ) : (
                <>
                  Generate with AI
                  <Sparkles
                    size={18}
                    className="group-hover:rotate-12 transition-transform"
                  />
                </>
              )}
            </button>
          </div>
        </section>

        {/* OUTPUT PANEL */}
        <section className="flex-1 bg-slate-50 p-6 md:p-12 overflow-y-auto relative h-[50%] lg:h-full">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Live Preview
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  disabled={!generatedContent}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-500 border ${
                    copied
                      ? "text-emerald-600 bg-emerald-50 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-105 ring-2 ring-emerald-500/30"
                      : "text-slate-600 bg-white border-slate-200 hover:border-indigo-200 hover:text-indigo-600 shadow-sm disabled:opacity-50"
                  }`}
                >
                  {copied ? (
                    <Check
                      size={16}
                      className="animate-in zoom-in duration-300"
                    />
                  ) : (
                    <Copy size={16} />
                  )}
                  {copied ? "Copied!" : "Copy Text"}
                </button>

                <button
                  onClick={downloadAsPDF}
                  disabled={!generatedContent}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:bg-slate-200 transition-all shadow-md shadow-indigo-200"
                >
                  <Download size={16} />
                  Download PDF
                </button>
              </div>
            </div>

            <div className="bg-white min-h-100 lg:min-h-187.5 rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-200/60 p-6 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]"></div>

              <div className="relative z-10">
                {isGenerating ? (
                  <div className="space-y-6">
                    <div className="h-10 bg-slate-100 rounded-lg w-2/3 animate-pulse"></div>
                    <div className="space-y-3 pt-4">
                      <div className="h-4 bg-slate-50 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-slate-50 rounded w-[95%] animate-pulse"></div>
                      <div className="h-4 bg-slate-50 rounded w-[98%] animate-pulse"></div>
                      <div className="h-4 bg-slate-50 rounded w-[92%] animate-pulse"></div>
                    </div>
                  </div>
                ) : generatedContent ? (
                  <article
                    className="
  prose prose-slate max-w-none
  prose-headings:font-bold prose-h1:text-3xl
  prose-p:text-slate-600 prose-p:leading-relaxed
  prose-strong:text-indigo-600
  wrap-break-word
  prose-pre:whitespace-pre-wrap prose-pre:break-words prose-pre:overflow-x-auto
  prose-code:break-words
"
                  >
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  </article>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-6 py-40">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-inner">
                      <PenTool size={32} className="text-slate-200" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-slate-400">
                        Canvas is empty
                      </p>
                      <p className="text-sm text-slate-300">
                        Enter a topic and click generate to start writing.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
