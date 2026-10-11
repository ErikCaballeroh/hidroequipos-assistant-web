"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, Icon } from "@/components/ui";
import TemplateList from "@/features/templates/components/template-list";
import TemplateModal from "@/features/templates/components/template-modal";
import TemplatePreview from "@/features/templates/components/template-preview";
import { useQueryTemplates } from "@/features/templates/hooks/use-query-templates";
import type { QueryTemplate } from "@/features/templates/types";

export default function QueryTemplatesPage() {
  const { templates, reorder, saveTemplate, toggleActive } = useQueryTemplates();
  const [editing, setEditing] = useState<QueryTemplate | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Plantillas de consulta rápida"
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Icon name="plus" size={16} />
            Nueva plantilla
          </Button>
        }
      />

      <div className="grid flex-1 grid-cols-[1fr_300px] gap-6 overflow-auto p-6">
        <TemplateList
          templates={templates}
          onReorder={reorder}
          onToggleActive={toggleActive}
          onEdit={(t) => {
            setEditing(t);
            setOpen(true);
          }}
        />
        <TemplatePreview templates={templates} />
      </div>

      {open && (
        <TemplateModal
          template={editing}
          onClose={() => setOpen(false)}
          onSave={(t) => {
            saveTemplate(t);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
