import { GoogleGenAI } from "@google/genai";

export default async function getAiResponse(
  currPrompt,
  his = [ ],
  resType = "application/json"
) {
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  const config = {
    // responseMimeType: "text/plain",
    responseMimeType: resType,
  };

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: his,
  });

  const response = await chat.sendMessage({
    message: currPrompt,
    config,
  });
  // console.log("Chat response 1:", response.text);
  return response;
}

// await getAiResponse("What was my first message?");
