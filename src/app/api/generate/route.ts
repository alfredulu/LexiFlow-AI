import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

function isAllowedContentType(v: unknown) {
  return v === "blog" || v === "ebook" || v === "social";
}

export async function POST(req: NextRequest) {
  try {
    const { topic, contentType, tone } = await req.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Topic is required." },
        { status: 400 }
      );
    }

    if (!isAllowedContentType(contentType)) {
      return NextResponse.json(
        { error: "Invalid contentType. Use blog, ebook, or social." },
        { status: 400 }
      );
    }

    const safeTone =
      typeof tone === "string" && tone.trim().length > 0
        ? tone.trim()
        : "professional";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing GEMINI_API_KEY on server." },
        { status: 500 }
      );
    }

    const client = new GoogleGenAI({ apiKey });

    const prompt = `Write a ${safeTone} ${contentType} about ${topic}. Format with Markdown.`;

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ text: response.text });
  } catch {
    return NextResponse.json({ error: "Failed to generate." }, { status: 500 });
  }
}
