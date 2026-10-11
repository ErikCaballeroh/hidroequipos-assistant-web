"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, ErrorState, Icon, Skeleton } from "@/components/ui";
import TemplateList from "@/features/templates/components/template-list";
import TemplateModal from "@/features/templates/components/template-modal";
import TemplatePreview from "@/features/templates/components/template-preview";
import { useQueryTemplates } from "@/features/templates/hooks/use-query-templates";
import type { QueryTemplate } from "@/features/templates/types";

export default function QueryTemplatesPage() {
  const {
    templates,
    isLoading,
    isError,
    createTemplate,
    updateTemplate,
    isSaving,
    saveError,
    toggleActive,
    deleteTemplate,
    isDeleting,
    deleteError,
    reorder,
  } = useQueryTemplates();
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
        {isLoading ? (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full" />
            ))}
          </div>
        ) : isError ? (
          <ErrorState
            title="No se pudieron cargar las plantillas."
            onRetry={() => window.location.reload()}
          />
        ) : (
          <TemplateList
            templates={templates}
            onReorder={reorder}
            onToggleActive={toggleActive}
            onEdit={(t) => {
              setEditing(t);
              setOpen(true);
            }}
          />
        )}
        <TemplatePreview templates={templates} />
      </div>

      {open && (
        <TemplateModal
          template={editing}
          loading={isSaving}
          deleting={isDeleting}
          error={editing ? saveError ?? deleteError : saveError}
          onClose={() => setOpen(false)}
          onSave={async (values) => {
            try {
              if (editing) {
                await updateTemplate(editing.id, values);
              } else {
                await createTemplate(values);
              }
              setOpen(false);
            } catch {
              // the error message is already surfaced via saveError
            }
          }}
          onDelete={
            editing
              ? async () => {
                  try {
                    await deleteTemplate(editing.id);
                    setOpen(false);
                  } catch {
                    // the error message is already surfaced via deleteError
                  }
                }
              : undefined
          }
        />
      )}
    </div>
  );
}
