"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, EmptyState, ErrorState, Icon } from "@/components/ui";
import { Pagination } from "@/components/ui/pagination";
import { TableSkeleton } from "@/components/ui/table";
import ProductFilters from "@/features/catalog/components/product-filters";
import ProductModal from "@/features/catalog/components/product-modal";
import ProductTable from "@/features/catalog/components/product-table";
import { useProducts } from "@/features/catalog/hooks/use-products";
import type { Product } from "@/features/catalog/types";

export default function CatalogPage() {
  const {
    products,
    categories,
    isLoading,
    isError,
    createProduct,
    updateProduct,
    isSaving,
    saveError,
    toggleActive,
  } = useProducts();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todas");
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "Todas" || p.category === cat) &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            (p.sku ?? "").toLowerCase().includes(query.toLowerCase())),
      ),
    [products, query, cat],
  );

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const changeQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const changeCategory = (value: string) => {
    setCat(value);
    setPage(1);
  };

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
          <Button onClick={openNew}>
            <Icon name="plus" size={16} />
            Nuevo producto
          </Button>
        }
      />

      <ProductFilters
        query={query}
        onQueryChange={changeQuery}
        category={cat}
        categories={categories}
        onCategoryChange={changeCategory}
      />

      <div className="flex-1 overflow-auto px-6 py-4">
        {isLoading ? (
          <TableSkeleton cols={7} />
        ) : isError ? (
          <ErrorState
            title="No se pudo cargar el catálogo."
            onRetry={() => window.location.reload()}
          />
        ) : filtered.length === 0 ? (
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
          <ProductTable products={paged} onEdit={openEdit} onToggleActive={toggleActive} />
        )}
      </div>

      {!isLoading && !isError && filtered.length > 0 && (
        <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} />
      )}

      {modalOpen && (
        <ProductModal
          product={editing}
          categories={categories}
          loading={isSaving}
          error={saveError}
          onClose={() => setModalOpen(false)}
          onSave={async (values) => {
            try {
              if (editing) {
                await updateProduct(editing.id, values);
              } else {
                await createProduct(values);
              }
              setModalOpen(false);
            } catch {
              // the error message is already surfaced via saveError
            }
          }}
        />
      )}
    </div>
  );
}
