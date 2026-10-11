import { StatusBadge, Toggle, Icon } from "@/components/ui";
import { Td, Th } from "@/components/ui/table";
import type { Product } from "../types";

export default function ProductTable({
  products,
  onEdit,
  onToggleActive,
}: {
  products: Product[];
  onEdit: (product: Product) => void;
  onToggleActive: (sku: string) => void;
}) {
  return (
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
        {products.map((p) => (
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
                  onClick={() => onEdit(p)}
                  className="text-slate transition-colors hover:text-primary"
                  aria-label="Editar"
                >
                  <Icon name="pencil" size={16} />
                </button>
                <Toggle checked={p.active} onChange={() => onToggleActive(p.sku)} />
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
