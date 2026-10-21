import Link from "next/link";
import { Card } from "@/components/ui";
import type { NoMatchRecentItem } from "../types";

export default function FailedMatchesCard({
  count,
  items,
}: {
  count: number;
  items: NoMatchRecentItem[];
}) {
  return (
    <Card title="Mensajes sin match suficiente">
      <p className="font-display text-4xl font-medium text-ink">{count}</p>
      <ul className="mt-3 flex max-h-72 flex-col gap-2 overflow-y-auto">
        {items.map((item) => (
          <li key={item.messageId}>
            <Link
              href={`/admin/messages/${item.messageId}`}
              className="block truncate border-l-[3px] border-line pl-2 text-sm text-slate transition-colors hover:border-primary hover:text-primary"
            >
              {item.question ?? "(sin pregunta)"}
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}
