"use client";

import { useMemo, useState } from "react";
import PageHeader, { StateSwitch } from "@/components/layout/page-header";
import { Button, EmptyState, ErrorState, Icon } from "@/components/ui";
import { TableSkeleton } from "@/components/ui/table";
import ProductFilters from "@/features/catalog/components/product-filters";
import ProductModal from "@/features/catalog/components/product-modal";
import ProductTable from "@/features/catalog/components/product-table";
import { useProducts } from "@/features/catalog/hooks/use-products";
import type { Product } from "@/features/catalog/types";

type ViewState = "ready" | "loading" | "empty" | "error";

export default function CatalogPage() {
  const { products, categories, saveProduct, toggleActive } = useProducts();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todas");
  const [state, setState] = useState<ViewState>("ready");
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Todas" || p.category === cat) &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.sku.toLowerCase().includes(query.toLowerCase())),
      ),
    [products, query, cat],
  );

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    setModalOpen(true);
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

      <ProductFilters
        query={query}
        onQueryChange={setQuery}
        category={cat}
        categories={categories}
        onCategoryChange={setCat}
      />

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
          <ProductTable
            products={filtered}
            onEdit={openEdit}
            onToggleActive={toggleActive}
          />
        )}
      </div>

      {modalOpen && (
        <ProductModal
          product={editing}
          categories={categories}
          onClose={() => setModalOpen(false)}
          onSave={(p) => {
            saveProduct(p);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
