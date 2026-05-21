import { NextResponse } from "next/server";
import getAiResponse from "@/config/AiModel";
import Prompt from "@/data/Prompt";

export const maxDuration = 60; // Extend Vercel function timeout

export async function POST(req) {
    try {
        const { messages, model, userEmail } = await req.json();

        if (model === "gpt-4o" && userEmail !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ err: "Unauthorized access to premium model" }, { status: 403 });
        }

        const lastMessage = messages?.[messages.length - 1]?.content;
        if (!lastMessage) {
            return NextResponse.json(
                { err: "No message content provided" },
                { status: 400 }
            );
        }

        let fullPrompt = `${JSON.stringify(messages)} - ${Prompt.CODE_GEN_PROMPT}`;
        if (model === "openai" || model === "gpt-4o") {
            fullPrompt += `\n\n${Prompt.OPENAI_SPECIFIC_PROMPT}`;
        }

        // Hard-coded few-shot history to guide the model output format
        const history = [
            {
                role: "user",
                parts: [{ text: "create a todo app" }],
            },
            {
                role: "model",
                parts: [
                    {
                        text: `\`\`\`json
{
  "projectTitle": "Modern Todo App",
  "explanation": "A modern Todo application using React and Vite with Tailwind CSS.",
  "files": {
    "/App.js": { "code": "import React from 'react'; export default function App() { return <div>Todo</div>; }" }
  },
  "generatedFiles": ["/App.js"]
}
\`\`\``,
                    },
                ],
            },
        ];

        const response = await getAiResponse(fullPrompt, history, "application/json", model);

        let parsed;
        try {
            parsed = JSON.parse(response.text);
        } catch {
            // Strip markdown code fences if present
            const cleaned = response.text
                .replace(/^```json\s*/i, "")
                .replace(/^```\s*/i, "")
                .replace(/```\s*$/i, "")
                .trim();
            parsed = JSON.parse(cleaned);
        }

        return NextResponse.json({ response: parsed });
    } catch (err) {
        console.error("generate-code API error:", err);
        return NextResponse.json(
            { err: err?.message || "Code generation failed" },
            { status: 500 }
        );
    }
}
