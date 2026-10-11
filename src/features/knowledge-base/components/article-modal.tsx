"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, Textarea } from "@/components/ui";
import type { Article } from "../types";

export default function ArticleModal({
  article,
  onClose,
  onSave,
}: {
  article: Article | null;
  onClose: () => void;
  onSave: (article: Article) => void;
}) {
  const [form, setForm] = useState<Article>(
    article ?? { id: crypto.randomUUID(), title: "", description: "" },
  );

  return (
    <Modal
      title={article ? "Editar artículo" : "Nuevo artículo"}
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
            placeholder="Mantenimiento de filtros de arena"
          />
        </Field>
        <Field
          label="Descripción"
          hint="Al guardar, se regenerará el índice de búsqueda para este artículo."
        >
          <Textarea
            className="min-h-40"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
      </div>
    </Modal>
  );
}
