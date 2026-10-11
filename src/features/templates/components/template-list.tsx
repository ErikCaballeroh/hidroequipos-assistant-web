"use client";

import { useState } from "react";
import { EmptyState, Icon, Toggle } from "@/components/ui";
import type { QueryTemplate } from "../types";

export default function TemplateList({
  templates,
  onReorder,
  onToggleActive,
  onEdit,
}: {
  templates: QueryTemplate[];
  onReorder: (from: number, to: number) => void;
  onToggleActive: (id: string) => void;
  onEdit: (template: QueryTemplate) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  if (templates.length === 0) {
    return <EmptyState title="No hay plantillas configuradas." />;
  }

  return (
    <div className="flex flex-col gap-2">
      {templates.map((t, i) => (
        <div
          key={t.id}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (dragIndex !== null) onReorder(dragIndex, i);
            setDragIndex(null);
          }}
          className="flex items-center gap-3 rounded-[4px] border border-line bg-white px-3 py-2.5 transition-colors hover:bg-subtle"
          style={{ opacity: dragIndex === i ? 0.5 : 1 }}
        >
          <span className="cursor-grab text-slate active:cursor-grabbing">
            <Icon name="drag" size={16} />
          </span>
          <span className="flex-1 text-sm text-ink">{t.title}</span>
          <Toggle checked={t.active} onChange={() => onToggleActive(t.id)} />
          <button
            onClick={() => onEdit(t)}
            className="text-slate transition-colors hover:text-primary"
            aria-label="Editar"
          >
            <Icon name="pencil" size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
