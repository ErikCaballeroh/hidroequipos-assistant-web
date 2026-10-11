import { Card } from "@/components/ui";

export default function FailedMatchesCard({
  count,
  messages,
}: {
  count: number;
  messages: string[];
}) {
  return (
    <Card title="Mensajes sin match suficiente">
      <p className="font-display text-4xl font-medium text-ink">{count}</p>
      <ul className="mt-3 flex flex-col gap-2">
        {messages.map((m, i) => (
          <li
            key={i}
            className="truncate border-l-[3px] border-line pl-2 text-sm text-slate"
          >
            {m}
          </li>
        ))}
      </ul>
    </Card>
  );
}
