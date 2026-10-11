"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, Textarea } from "@/components/ui";
import type { Article } from "../types";

export type ArticleFormValues = {
  title: string;
  description: string;
};

export default function ArticleModal({
  article,
  onClose,
  onSave,
  onDelete,
  loading,
  deleting,
  error,
}: {
  article: Article | null;
  onClose: () => void;
  onSave: (values: ArticleFormValues) => void;
  onDelete?: () => void;
  loading: boolean;
  deleting: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState<ArticleFormValues>({
    title: article?.title ?? "",
    description: article?.description ?? "",
  });
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  return (
    <Modal
      title={article ? "Editar artículo" : "Nuevo artículo"}
      onClose={onClose}
      width="max-w-lg"
      footer={
        <>
          {article && onDelete && !confirmingDelete && (
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
            placeholder="Mantenimiento de filtros de arena"
          />
        </Field>
        <Field
          label="Descripción"
          hint="Al guardar, se regenerará el índice de búsqueda para este artículo. Puede tardar unos segundos."
        >
          <Textarea
            className="min-h-40"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    </Modal>
  );
}
