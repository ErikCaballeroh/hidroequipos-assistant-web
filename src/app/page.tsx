"use client";

import { useEffect, useRef, useState } from "react";
import Shell from "@/components/Shell";
import { Button, Chip, DropLogo, Icon, Input } from "@/components/ui";
import {
  conversationMessages,
  conversations,
  quickPrompts,
  seedMessages,
  templates,
  type ChatMessage,
} from "@/lib/data";

function now() {
  return new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Thinking() {
  return (
    <div className="flex items-center gap-1 anim-think" aria-label="El asistente está pensando">
      {[0, 1, 2].map((i) => (
        <span key={i} className="block size-2 rounded-full bg-primary" />
      ))}
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(seedMessages);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [activeConv, setActiveConv] = useState("c1");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", text: t, time: now() },
    ]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          time: now(),
          text: "Para una dosificación correcta necesito el volumen de la alberca. Como referencia general: mantén cloro libre entre 1–3 ppm y pH entre 7.2 y 7.6. Aplica el producto disuelto, con la bomba en marcha, preferentemente al anochecer.",
          products: ["Cloro Granulado 5kg", "pH Plus 1L"],
        },
      ]);
    }, 1400);
  };

  const newConversation = () => {
    setMessages([]);
    setActiveConv("");
    setHistoryOpen(false);
  };

  return (
    <div className="grid h-full grid-cols-[280px_1fr]">
      {/* Sidebar — Consultas frecuentes */}
      <aside className="flex flex-col border-r border-line bg-subtle">
        <h2 className="font-display px-4 pb-2 pt-4 text-sm text-ink">
          Consultas Frecuentes
        </h2>
        <div className="flex flex-col gap-1 overflow-y-auto px-3 pb-4">
          {templates
            .filter((t) => t.active)
            .map((t) => (
              <button
                key={t.id}
                onClick={() => setDraft(t.body)}
                className="group flex h-10 items-center rounded-[4px] border border-line bg-white px-3 text-sm text-ink transition-all duration-150 [transition-timing-function:var(--ease-swift)] hover:border-l-[3px] hover:border-l-primary hover:pl-[10px]"
              >
                {t.title}
              </button>
            ))}
          {quickPrompts.length === 0 && (
            <p className="px-1 py-8 text-center text-xs text-slate">
              No hay consultas configuradas.
            </p>
          )}
        </div>
      </aside>

      {/* Right — chat */}
      <div className="flex min-w-0 flex-col">
        {/* Header */}
        <header className="relative flex h-16 items-center justify-between border-b border-line px-6">
          <div className="flex items-center gap-2">
            <DropLogo size={22} />
            <span className="font-display text-lg text-ink">
              HidroEquipos y Albercas
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setHistoryOpen((v) => !v)}
              className="flex items-center gap-2 rounded-[4px] border border-line px-3 py-2 text-sm text-ink transition-colors hover:bg-subtle"
            >
              <Icon name="clock" size={16} />
              Historial
              <Icon name="chevronDown" size={14} />
            </button>

            {historyOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setHistoryOpen(false)}
                />
                <div
                  className="anim-popover absolute right-0 top-full z-20 mt-1 w-72 rounded-[4px] border border-line bg-white"
                  style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
                >
                  <p className="px-3 pb-1 pt-2.5 text-[11px] font-medium uppercase tracking-wide text-slate">
                    Conversaciones
                  </p>
                  {conversations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveConv(c.id);
                        setMessages(conversationMessages[c.id] ?? []);
                        setThinking(false);
                        setHistoryOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-subtle"
                      style={{
                        background: activeConv === c.id ? "#f4fafc" : undefined,
                      }}
                    >
                      <span className="text-sm text-ink">{c.title}</span>
                      <span className="text-[11px] text-slate">{c.date}</span>
                    </button>
                  ))}
                  <div className="border-t border-line">
                    <button className="w-full px-3 py-2 text-left text-[13px] font-medium text-primary transition-colors hover:bg-subtle">
                      Ver todos
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <Button onClick={newConversation}>
            <Icon name="plus" size={16} />
            Nuevo
          </Button>
        </header>

        {/* Messages */}
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
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex flex-col items-end">
                    <div className="max-w-[80%] rounded-[4px] bg-subtle px-3.5 py-2.5 text-sm text-ink">
                      {m.text}
                    </div>
                    <span className="mt-1 text-[11px] text-slate">{m.time}</span>
                  </div>
                ) : (
                  <div key={m.id} className="flex flex-col items-start">
                    <div className="max-w-[80%] rounded-[4px] rounded-l-none border border-l-[3px] border-line border-l-secondary bg-subtle px-3.5 py-2.5 text-sm text-ink">
                      <p>{m.text}</p>
                      {m.products && m.products.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {m.products.map((p) => (
                            <Chip key={p}>{p}</Chip>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="mt-1 text-[11px] text-slate">{m.time}</span>
                  </div>
                ),
              )}
              {thinking && (
                <div className="flex flex-col items-start">
                  <div className="rounded-[4px] rounded-l-none border border-l-[3px] border-line border-l-secondary bg-subtle px-3.5 py-3">
                    <Thinking />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-line px-6 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="mx-auto flex max-w-3xl gap-2"
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Escribe tu consulta sobre mantenimiento de albercas..."
            />
            <Button type="submit">
              <Icon name="send" size={16} />
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Shell>
      <Chat />
    </Shell>
  );
}
