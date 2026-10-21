import { EmptyState } from "@/components/ui";
import { Td, Th } from "@/components/ui/table";
import { formatDate } from "../mappers";
import type { MessageTraceItem } from "../types";

export default function TraceTable({
  traces,
  onSelect,
}: {
  traces: MessageTraceItem[];
  onSelect: (id: number) => void;
}) {
  if (traces.length === 0) {
    return <EmptyState title="No hay respuestas registradas." />;
  }

  return (
    <table className="w-full table-fixed text-sm">
      <colgroup>
        <col className="w-36" />
        <col />
        <col className="w-28" />
      </colgroup>
      <thead>
        <tr className="bg-subtle text-left text-xs font-medium text-slate">
          <Th>Fecha</Th>
          <Th>Pregunta</Th>
          <Th>Resultado</Th>
        </tr>
      </thead>
      <tbody>
        {traces.map((t) => (
          <tr
            key={t.id}
            onClick={() => onSelect(t.id)}
            className="cursor-pointer border-b border-line transition-colors hover:bg-subtle"
          >
            <Td className="whitespace-nowrap text-slate">{formatDate(t.createdAt)}</Td>
            <Td className="truncate text-ink">{t.question ?? "(sin pregunta)"}</Td>
            <Td>
              <span
                className="font-medium"
                style={{ color: t.success ? "#00a8c8" : "#e53e3e" }}
              >
                {t.success ? "Éxito" : "Error"}
              </span>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
