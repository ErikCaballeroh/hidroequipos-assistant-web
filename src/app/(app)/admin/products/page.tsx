"use client";

import { useMemo, useState } from "react";
import PageHeader, { StateSwitch } from "@/components/layout/page-header";
import {
  Button,
  EmptyState,
  ErrorState,
  Field,
  Icon,
  Input,
  Modal,
  Select,
  StatusBadge,
  Textarea,
  Toggle,
} from "@/components/ui";
import { Td, Th, TableSkeleton } from "@/components/ui/table";
import { categories, products as seed, type Product } from "@/lib/data";

type ViewState = "ready" | "loading" | "empty" | "error";

export default function CatalogPage() {
  const [rows, setRows] = useState<Product[]>(seed);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todas");
  const [state, setState] = useState<ViewState>("ready");
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      rows.filter(
        (p) =>
          (cat === "Todas" || p.category === cat) &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase())),
      ),
    [rows, query, cat],
  );

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    setModalOpen(true);
  };

  const toggleActive = (sku: string) =>
    setRows((r) =>
      r.map((p) => (p.sku === sku ? { ...p, active: !p.active } : p)),
    );

  const save = (p: Product) => {
    setRows((r) => {
      const exists = r.some((x) => x.sku === p.sku);
      return exists ? r.map((x) => (x.sku === p.sku ? p : x)) : [...r, p];
    });
    setModalOpen(false);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Catálogo de productos"
        action={
          <div className="flex items-center gap-3">
            <StateSwitch value={state} onChange={setState} />
            <Button onClick={openNew}>
              <Icon name="plus" size={16} />
              Nuevo producto
            </Button>
          </div>
        }
      />

      <div className="flex items-center gap-2 border-b border-line px-6 py-3">
        <div className="relative w-72">
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o SKU..."
            className="pl-9"
          />
        </div>
        <Select value={cat} onChange={(e) => setCat((e.target as HTMLSelectElement).value)}>
          <option>Todas</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
      </div>

      <div className="flex-1 overflow-auto px-6 py-4">
        {state === "loading" ? (
          <TableSkeleton cols={7} />
        ) : state === "error" ? (
          <ErrorState
            title="No se pudo cargar el catálogo."
            onRetry={() => setState("ready")}
          />
        ) : state === "empty" || filtered.length === 0 ? (
          <EmptyState
            title="No hay productos en el catálogo. Crea uno nuevo."
            action={
              <Button onClick={openNew}>
                <Icon name="plus" size={16} />
                Nuevo producto
              </Button>
            }
          />
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-subtle text-left text-xs font-medium text-slate">
                <Th>SKU</Th>
                <Th>Nombre</Th>
                <Th>Categoría</Th>
                <Th className="text-right">Precio</Th>
                <Th className="text-right">Stock</Th>
                <Th>Estado</Th>
                <Th className="text-right">Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.sku}
                  className="border-b border-line transition-colors hover:bg-subtle"
                >
                  <Td className="font-medium text-slate">{p.sku}</Td>
                  <Td className="text-ink">{p.name}</Td>
                  <Td className="text-slate">{p.category}</Td>
                  <Td className="text-right tabular-nums text-ink">
                    ${p.price.toLocaleString("es-MX")}
                  </Td>
                  <Td className="text-right tabular-nums text-ink">{p.stock}</Td>
                  <Td>
                    <StatusBadge active={p.active} />
                  </Td>
                  <Td>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-slate transition-colors hover:text-primary"
                        aria-label="Editar"
                      >
                        <Icon name="pencil" size={16} />
                      </button>
                      <Toggle
                        checked={p.active}
                        onChange={() => toggleActive(p.sku)}
                      />
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <ProductModal
          product={editing}
          onClose={() => setModalOpen(false)}
          onSave={save}
        />
      )}
    </div>
  );
}

function ProductModal({
  product,
  onClose,
  onSave,
}: {
  product: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [form, setForm] = useState<Product>(
    () =>
      product ?? {
        sku: `NEW-${Math.floor(Math.random() * 900 + 100)}`,
        name: "",
        description: "",
        category: categories[0],
        price: 0,
        stock: 0,
        active: true,
      },
  );

  return (
    <Modal
      title={product ? "Editar producto" : "Nuevo producto"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(form)} disabled={!form.name.trim()}>
            Guardar
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Nombre">
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Cloro Granulado 5kg"
          />
        </Field>
        <Field label="Descripción">
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Categoría">
            <Select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: (e.target as HTMLSelectElement).value })
              }
              className="w-full"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
          <Field label="Precio ($)">
            <Input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
            />
          </Field>
          <Field label="Stock">
            <Input
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm({ ...form, stock: Number(e.target.value) })
              }
            />
          </Field>
        </div>
      </div>
    </Modal>
  );
}
