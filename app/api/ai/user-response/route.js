import { NextResponse } from "next/server";
import getAiResponse from "@/config/AiModel";

export async function POST(req) {
  const { messages, prompt } = await req.json();

  const formattedMessages = messages.map(({ content, role }) => ({
    role,
    parts: [{ text: content }],
  }));
  try {
    const response = await getAiResponse(prompt, formattedMessages, "text/plain");
    return NextResponse.json({ response: response.text });
  } catch (err) {
    return NextResponse.json({ err: err });
  }
}
