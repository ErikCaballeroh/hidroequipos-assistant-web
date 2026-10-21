"use client";

import { useEffect, useRef } from "react";
import { DropLogo, Skeleton } from "@/components/ui";
import MessageBubble from "./message-bubble";
import ThinkingIndicator from "./thinking-indicator";
import type { ChatMessage } from "../types";

export default function MessageList({
  messages,
  thinking,
  error,
  loading,
  conversationId,
}: {
  messages: ChatMessage[];
  thinking: boolean;
  error?: string | null;
  loading?: boolean;
  conversationId: string | null;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-5">
          <Skeleton className="h-14 w-2/3 self-end" />
          <Skeleton className="h-20 w-3/4" />
        </div>
      </div>
    );
  }

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
            <MessageBubble key={m.id} message={m} conversationId={conversationId} />
          ))}
          {thinking && (
            <div className="flex flex-col items-start">
              <div className="rounded-[4px] bg-subtle px-3.5 py-3">
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
