import { NextRequest, NextResponse } from "next/server";
import { buildClinicSystemPrompt } from "@/lib/ai/clinic-context";

interface ChatMessage {
  role: "user" | "assistant" | "model";
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, apiKey: clientApiKey, model = "gemini-flash-lite-latest", stream = true } = body;

    // Obtener API Key (del archivo .env o del cliente en testing)
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "No se ha configurado la API Key de Google AI Studio.",
          missingKey: true,
          hint: "Por favor ingresa tu API Key en la barra de configuración de testing o agrégala como GEMINI_API_KEY en tu archivo .env."
        },
        { status: 400 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "La lista de mensajes es requerida." },
        { status: 400 }
      );
    }

    const systemPrompt = buildClinicSystemPrompt();

    // Transformar los mensajes al formato de la API de Google Gemini
    const contents = messages.map((msg: ChatMessage) => ({
      role: msg.role === "assistant" || msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    const targetModel = model || "gemini-flash-lite-latest";

    if (!stream) {
      // Modo tradicional sin streaming
      const endpointUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

      const geminiResponse = await fetch(endpointUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: contents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 800,
            topP: 0.8
          }
        })
      });

      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.text();
        return NextResponse.json(
          { error: `Error de Google AI Studio (${geminiResponse.status})`, details: errorData },
          { status: geminiResponse.status }
        );
      }

      const data = await geminiResponse.json();
      const replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Lo siento, no pude generar una respuesta en este momento.";

      return NextResponse.json({ reply: replyText, model: targetModel });
    }

    // Modo Streaming en tiempo real (ultra rápido, respuesta palabra por palabra)
    const streamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const geminiResponse = await fetch(streamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: contents,
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800,
          topP: 0.8
        }
      })
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      return NextResponse.json(
        { error: `Error de Google AI Studio (${geminiResponse.status})`, details: errorData },
        { status: geminiResponse.status }
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const customStream = new ReadableStream({
      async start(controller) {
        if (!geminiResponse.body) {
          controller.close();
          return;
        }

        const reader = geminiResponse.body.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data:")) {
                const jsonStr = trimmed.replace(/^data:\s*/, "");
                if (!jsonStr) continue;
                try {
                  const parsed = JSON.parse(jsonStr);
                  const textPart = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                  if (textPart) {
                    controller.enqueue(encoder.encode(textPart));
                  }
                } catch {
                  // Buffer parcial de SSE, continuar leyendo
                }
              }
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      }
    });

    return new Response(customStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform"
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error interno al procesar la consulta con el asistente de IA.",
        details: error.message
      },
      { status: 500 }
    );
  }
}
