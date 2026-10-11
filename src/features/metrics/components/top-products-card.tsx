import { Card } from "@/components/ui";
import type { TopProduct } from "../types";

export default function TopProductsCard({ products }: { products: TopProduct[] }) {
  const max = Math.max(...products.map((p) => p.value));

  return (
    <Card title="Productos más consultados">
      <div className="flex flex-col gap-3">
        {products.map((p) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="w-44 shrink-0 truncate text-sm text-ink">
              {p.name}
            </span>
            <div className="h-2 flex-1 rounded-[2px] bg-line">
              <div
                className="h-2 rounded-[2px] bg-primary transition-all"
                style={{ width: `${(p.value / max) * 100}%` }}
              />
            </div>
            <span className="w-8 shrink-0 text-right text-sm tabular-nums text-slate">
              {p.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
