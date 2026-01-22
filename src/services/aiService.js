import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize the API with your key from the .env file
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateContent = async (topic, contentType) => {
  try {
    // 2. Select the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. Define professional personas based on the content type
    const prompts = {
      blog: `Write a professional, SEO-optimized blog post about: "${topic}". Include a catchy title, introduction, subheadings, and a conclusion. Tone: Informative and engaging.`,
      ebook: `Create a detailed chapter outline and an introductory chapter for an eBook about: "${topic}". Focus on providing deep value and professional insights.`,
      social: `Generate 5 high-engaging social media posts (LinkedIn and Twitter style) about: "${topic}". Include relevant hashtags and emojis.`,
    };

    const prompt = prompts[contentType] || prompts.blog;

    // 4. Call the AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(
      "Failed to generate content. Please check your API key or connection."
    );
  }
};
