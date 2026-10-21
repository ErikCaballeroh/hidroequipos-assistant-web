"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";
import type { QueryTemplate } from "../types";

export default function QuickTemplatesButton({
  templates,
  onSelect,
}: {
  templates: QueryTemplate[];
  onSelect: (body: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-2 rounded-[4px] border border-line px-3 text-sm text-ink transition-colors hover:bg-subtle"
      >
        <Icon name="layout" size={16} />
        Consultas
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="anim-popover absolute bottom-full left-0 z-20 mb-1 w-80 rounded-[4px] border border-line bg-white"
            style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.04)" }}
          >
            <p className="px-3 pb-1 pt-2.5 text-[11px] font-medium uppercase tracking-wide text-slate">
              Consultas frecuentes
            </p>
            <div className="max-h-80 overflow-y-auto">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelect(t.body);
                    setOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-subtle"
                >
                  {t.title}
                </button>
              ))}
              {templates.length === 0 && (
                <p className="px-3 py-6 text-center text-xs text-slate">
                  No hay consultas configuradas.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
