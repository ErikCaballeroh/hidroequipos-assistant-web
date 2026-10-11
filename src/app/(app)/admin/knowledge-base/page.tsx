"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, Field, Icon, Input, Modal, Textarea } from "@/components/ui";
import { articles as seed, type Article } from "@/lib/data";

export default function KnowledgeBasePage() {
  const [rows, setRows] = useState<Article[]>(seed);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Article | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(
    () => rows.filter((a) => a.title.toLowerCase().includes(query.toLowerCase())),
    [rows, query],
  );

  const save = (a: Article) => {
    setRows((r) =>
      r.some((x) => x.id === a.id) ? r.map((x) => (x.id === a.id ? a : x)) : [...r, a],
    );
    setOpen(false);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Base de conocimiento"
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Icon name="plus" size={16} />
            Nuevo artículo
          </Button>
        }
      />

      <div className="border-b border-line px-6 py-3">
        <div className="relative w-72">
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-2">
          {filtered.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                setEditing(a);
                setOpen(true);
              }}
              className="group flex items-start justify-between gap-4 rounded-[4px] border border-line bg-white p-4 text-left transition-colors hover:bg-subtle"
            >
              <div className="min-w-0">
                <p className="font-medium text-ink">{a.title}</p>
                <p className="mt-1 line-clamp-2 text-sm text-slate">
                  {a.description}
                </p>
              </div>
              <Icon
                name="pencil"
                size={16}
                className="mt-0.5 shrink-0 text-slate transition-colors group-hover:text-primary"
              />
            </button>
          ))}
        </div>
      </div>

      {open && (
        <ArticleModal
          article={editing}
          onClose={() => setOpen(false)}
          onSave={save}
        />
      )}
    </div>
  );
}

function ArticleModal({
  article,
  onClose,
  onSave,
}: {
  article: Article | null;
  onClose: () => void;
  onSave: (a: Article) => void;
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
