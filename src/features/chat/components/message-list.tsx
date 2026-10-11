"use client";

import { useEffect, useRef } from "react";
import { DropLogo } from "@/components/ui";
import MessageBubble from "./message-bubble";
import ThinkingIndicator from "./thinking-indicator";
import type { ChatMessage } from "../types";

export default function MessageList({
  messages,
  thinking,
  error,
}: {
  messages: ChatMessage[];
  thinking: boolean;
  error?: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6">
      {messages.length === 0 && !thinking ? (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <DropLogo size={48} />
          <p className="font-display text-lg text-ink">Nueva consulta</p>
          <p className="max-w-sm text-sm text-slate">
            Escribe tu pregunta sobre mantenimiento de albercas o elige una
            consulta frecuente del panel izquierdo.
          </p>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {thinking && (
            <div className="flex flex-col items-start">
              <div className="rounded-[4px] rounded-l-none border border-l-[3px] border-line border-l-secondary bg-subtle px-3.5 py-3">
                <ThinkingIndicator />
              </div>
            </div>
          )}
          {error && (
            <p className="text-[13px] text-danger">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}
