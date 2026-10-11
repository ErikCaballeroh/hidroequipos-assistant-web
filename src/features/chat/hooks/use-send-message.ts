"use client";

import { useState } from "react";
import { now } from "../lib/time";
import type { ChatMessage, ChatResponse } from "../types";

/* Simulated response until the diagnostic engine is integrated (Fase 9). */
async function sendMessageRequest(text: string): Promise<ChatResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1400));
  void text;
  return {
    message:
      "Para una dosificación correcta necesito el volumen de la alberca. Como referencia general: mantén cloro libre entre 1–3 ppm y pH entre 7.2 y 7.6. Aplica el producto disuelto, con la bomba en marcha, preferentemente al anochecer.",
    sources: [
      { name: "Cloro Granulado 5kg", type: "product", similarity: 0.88 },
      { name: "pH Plus 1L", type: "product", similarity: 0.71 },
    ],
  };
}

export function useSendMessage() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string): Promise<ChatMessage | null> => {
    setSending(true);
    setError(null);
    try {
      const response = await sendMessageRequest(text);
      return {
        id: crypto.randomUUID(),
        role: "assistant",
        text: response.message,
        time: now(),
        sources: response.sources,
      };
    } catch {
      setError("No se pudo generar una respuesta. Intenta de nuevo.");
      return null;
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending, error };
}
