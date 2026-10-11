"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, Textarea } from "@/components/ui";
import type { QueryTemplate } from "../types";

export default function TemplateModal({
  template,
  onClose,
  onSave,
}: {
  template: QueryTemplate | null;
  onClose: () => void;
  onSave: (template: QueryTemplate) => void;
}) {
  const [form, setForm] = useState<QueryTemplate>(
    template ?? { id: crypto.randomUUID(), title: "", body: "", active: true },
  );

  return (
    <Modal
      title={template ? "Editar plantilla" : "Nueva plantilla"}
      onClose={onClose}
      width="max-w-lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(form)} disabled={!form.title.trim()}>
            Guardar
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
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            placeholder="¿Cuál es la dosis de cloro recomendada para..."
          />
        </Field>
      </div>
    </Modal>
  );
}
