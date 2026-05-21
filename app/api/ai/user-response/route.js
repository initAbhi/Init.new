import { NextResponse } from "next/server";
import getAiResponse from "@/config/AiModel";

export const maxDuration = 60;

export async function POST(req) {
  const { messages, prompt, model, userEmail } = await req.json();

  if (model === "gpt-4o" && userEmail !== process.env.ADMIN_EMAIL) {
    return NextResponse.json({ err: "Unauthorized access to premium model" }, { status: 403 });
  }

  const formattedMessages = messages.map(({ content, role }) => ({
    role,
    parts: [{ text: content }],
  }));
  try {
    const response = await getAiResponse(prompt, formattedMessages, "text/plain", model);
    return NextResponse.json({ response: response.text });
  } catch (err) {
    console.error("AI user-response error:", err);
    return NextResponse.json(
      { err: err?.message || "AI request failed" },
      { status: 500 }
    );
  }
}
