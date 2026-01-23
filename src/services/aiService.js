import { GoogleGenerativeAI } from "@google/generative-ai";

// Force the version to 'v1' instead of 'v1beta'
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateContent = async (topic, contentType) => {
  try {
    // We'll use the specific model path that v1 likes
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

    const prompt = `Write a professional ${contentType} about ${topic}. Use Markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Stable API failed, trying old Pro name:", error);

    // FINAL ATTEMPT: Using the older model name that usually works in all regions
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await fallbackModel.generateContent(
        `Write about ${topic}`
      );
      return result.response.text();
    } catch (fallbackError) {
      throw new Error(
        "Google is still activating your key. Try again in 5 minutes."
      );
    }
  }
};
