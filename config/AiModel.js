import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

export default async function getAiResponse(
  currPrompt,
  his = [],
  resType = "application/json",
  model = "gemini-2.5-flash"
) {
  const MAX_RETRIES = 3;
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      if (model === "openai" || model === "gpt-4o") {
        return await getOpenAIResponse(currPrompt, his, resType, model);
      } else {
        return await getGeminiResponse(currPrompt, his, resType);
      }
    } catch (err) {
      attempts++;
      const isRetryable = err?.message?.toLowerCase().includes("unavailable") ||
        err?.status === 503 ||
        err?.status === 429 ||
        err?.message?.toLowerCase().includes("high traffic") ||
        err?.code === "rate_limit_exceeded";

      if (!isRetryable || attempts >= MAX_RETRIES) {
        throw err;
      }

      // Exponential backoff: 2s, 4s
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempts));
    }
  }
}

async function getGeminiResponse(currPrompt, his, resType) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: resType,
  };

  const chat = ai.chats.create({
    model: "gemini-2.5-flash",
    history: his,
  });

  const response = await chat.sendMessage({
    message: currPrompt,
    config,
  });
  return response;
}

async function getOpenAIResponse(currPrompt, his, resType, requestedModel) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in environment variables.");
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Map Gemini history to OpenAI history format
  // Gemini history: { role: 'user' | 'model', parts: [{ text: "..." }] }
  // OpenAI history: { role: 'user' | 'assistant', content: "..." }
  const messages = his.map(msg => ({
    role: msg.role === 'model' ? 'assistant' : 'user',
    content: msg.parts?.[0]?.text || ""
  }));

  // Add the current prompt
  messages.push({
    role: 'user',
    content: currPrompt
  });

  const responseFormat = resType === "application/json" ? { type: "json_object" } : { type: "text" };
  const modelName = requestedModel === "gpt-4o" ? "gpt-4o" : (process.env.OPENAI_MODEL || "gpt-4o-mini");

  const completion = await openai.chat.completions.create({
    model: modelName,
    messages: messages,
    response_format: responseFormat,
  });

  // Return an object that has a `text` property to match Gemini's return structure
  return {
    text: completion.choices[0].message.content
  };
}
