"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";
import type { Conversation } from "../types";

export default function ConversationHistory({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-[4px] border border-line px-3 py-2 text-sm text-ink transition-colors hover:bg-subtle"
      >
        <Icon name="clock" size={16} />
        Historial
        <Icon name="chevronDown" size={14} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
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
                  onSelect(c.id);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-subtle"
                style={{
                  background: activeId === c.id ? "#f4fafc" : undefined,
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
  );
}
