import { GoogleGenAI } from "@google/genai";

// The new SDK automatically looks for VITE_GEMINI_API_KEY or you can pass it
const client = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateContent = async (topic, contentType) => {
  try {
    // 2026 standard: gemini-2.5-flash is the stable workhorse.
    // gemini-3-flash-preview is also available if you want the newest.
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a professional ${contentType} about ${topic}. Format with Markdown.`,
    });

    return response.text; // Note: it's .text now, not .text()
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
