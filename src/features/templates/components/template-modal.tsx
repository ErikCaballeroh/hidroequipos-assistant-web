"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, Textarea } from "@/components/ui";
import type { QueryTemplate } from "../types";

export type TemplateFormValues = {
  title: string;
  queryText: string;
};

export default function TemplateModal({
  template,
  onClose,
  onSave,
  onDelete,
  loading,
  deleting,
  error,
}: {
  template: QueryTemplate | null;
  onClose: () => void;
  onSave: (values: TemplateFormValues) => void;
  onDelete?: () => void;
  loading: boolean;
  deleting: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState<TemplateFormValues>({
    title: template?.title ?? "",
    queryText: template?.queryText ?? "",
  });
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <Modal
      title={template ? "Editar plantilla" : "Nueva plantilla"}
      onClose={onClose}
      width="max-w-lg"
      footer={
        <>
          {template && onDelete && !confirmingDelete && (
            <Button
              variant="danger"
              className="mr-auto"
              onClick={() => setConfirmingDelete(true)}
            >
              Eliminar
            </Button>
          )}
          {confirmingDelete && (
            <Button
              variant="danger"
              className="mr-auto"
              onClick={onDelete}
              disabled={deleting}
            >
              {deleting ? "Eliminando..." : "¿Confirmar eliminación?"}
            </Button>
          )}
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(form)} disabled={!form.title.trim() || loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Título">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Dosis de cloro"
          />
        </Field>
        <Field label="Texto precargado">
          <Textarea
            className="min-h-28"
            value={form.queryText}
            onChange={(e) => setForm({ ...form, queryText: e.target.value })}
            placeholder="¿Cuál es la dosis de cloro recomendada para..."
          />
        </Field>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    </Modal>
  );
}
