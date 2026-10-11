"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, Textarea } from "@/components/ui";
import type { Product } from "../types";

export type ProductFormValues = {
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
};

export default function ProductModal({
  product,
  categories,
  onClose,
  onSave,
  loading,
  error,
}: {
  product: Product | null;
  categories: string[];
  onClose: () => void;
  onSave: (values: ProductFormValues) => void;
  loading: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState<ProductFormValues>(() => ({
    name: product?.name ?? "",
    description: product?.description ?? "",
    category: product?.category ?? categories[0] ?? "",
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
  }));

  return (
    <Modal
      title={product ? "Editar producto" : "Nuevo producto"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={() => onSave(form)} disabled={!form.name.trim() || loading}>
            {loading ? "Guardando..." : "Guardar"}
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
        <Field
          label="Descripción"
          hint="Al guardar, se regenerará el índice de búsqueda de este producto. Puede tardar unos segundos."
        >
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Categoría">
            <Input
              list="product-categories"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="Químicos"
            />
            <datalist id="product-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>
          <Field label="Precio ($)">
            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            />
          </Field>
          <Field label="Stock">
            <Input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            />
          </Field>
        </div>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    </Modal>
  );
}
