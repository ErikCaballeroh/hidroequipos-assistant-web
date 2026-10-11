"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, Field, Icon, Input, Modal, Textarea, Toggle } from "@/components/ui";
import { templates as seed, type Template } from "@/lib/data";

export default function QueryTemplatesPage() {
  const [rows, setRows] = useState<Template[]>(seed);
  const [editing, setEditing] = useState<Template | null>(null);
  const [open, setOpen] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= rows.length) return;
    setRows((r) => {
      const copy = [...r];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  };

  const save = (t: Template) => {
    setRows((r) =>
      r.some((x) => x.id === t.id) ? r.map((x) => (x.id === t.id ? t : x)) : [...r, t],
    );
    setOpen(false);
  };

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
        {/* Reorderable list */}
        <div className="flex flex-col gap-2">
          {rows.map((t, i) => (
            <div
              key={t.id}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex !== null) move(dragIndex, i);
                setDragIndex(null);
              }}
              className="flex items-center gap-3 rounded-[4px] border border-line bg-white px-3 py-2.5 transition-colors hover:bg-subtle"
              style={{ opacity: dragIndex === i ? 0.5 : 1 }}
            >
              <span className="cursor-grab text-slate active:cursor-grabbing">
                <Icon name="drag" size={16} />
              </span>
              <span className="flex-1 text-sm text-ink">{t.title}</span>
              <Toggle
                checked={t.active}
                onChange={() =>
                  setRows((r) =>
                    r.map((x) => (x.id === t.id ? { ...x, active: !x.active } : x)),
                  )
                }
              />
              <button
                onClick={() => {
                  setEditing(t);
                  setOpen(true);
                }}
                className="text-slate transition-colors hover:text-primary"
                aria-label="Editar"
              >
                <Icon name="pencil" size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div>
          <p className="pb-2 text-[11px] font-medium uppercase tracking-wide text-slate">
            Vista previa en el chat
          </p>
          <div className="rounded-[4px] border border-line bg-subtle p-3">
            <h3 className="font-display pb-2 text-sm text-ink">
              Consultas Frecuentes
            </h3>
            <div className="flex flex-col gap-1">
              {rows
                .filter((t) => t.active)
                .map((t) => (
                  <div
                    key={t.id}
                    className="flex h-10 items-center rounded-[4px] border border-line bg-white px-3 text-sm text-ink"
                  >
                    {t.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <TemplateModal
          template={editing}
          onClose={() => setOpen(false)}
          onSave={save}
        />
      )}
    </div>
  );
}

function TemplateModal({
  template,
  onClose,
  onSave,
}: {
  template: Template | null;
  onClose: () => void;
  onSave: (t: Template) => void;
}) {
  const [form, setForm] = useState<Template>(
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
