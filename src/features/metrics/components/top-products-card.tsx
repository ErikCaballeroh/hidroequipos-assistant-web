import { Card, EmptyState } from "@/components/ui";
import type { TopProduct } from "../types";

export default function TopProductsCard({ products }: { products: TopProduct[] }) {
  if (products.length === 0) {
    return (
      <Card title="Productos más consultados">
        <EmptyState title="Sin consultas registradas en este periodo." />
      </Card>
    );
  }

  const max = Math.max(...products.map((p) => p.count));

  return (
    <Card title="Productos más consultados">
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div key={p.productId} className="flex items-center gap-3">
            <span className="w-44 shrink-0 truncate text-sm text-ink">
              {p.name}
            </span>
            <div className="h-2 flex-1 rounded-[2px] bg-line">
              <div
                className="h-2 rounded-[2px] bg-primary transition-all"
                style={{ width: `${(p.count / max) * 100}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-sm tabular-nums text-slate">
              {p.count}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
