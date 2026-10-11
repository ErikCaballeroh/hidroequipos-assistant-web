import { EmptyState } from "@/components/ui";
import { Td, Th } from "@/components/ui/table";
import type { TraceSummary } from "../types";

export default function TraceTable({
  traces,
  onSelect,
}: {
  traces: TraceSummary[];
  onSelect: (id: string) => void;
}) {
  if (traces.length === 0) {
    return <EmptyState title="No hay respuestas registradas." />;
  }

  return (
    <table className="w-full text-sm">
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
            <Td className="whitespace-nowrap text-slate">{t.date}</Td>
            <Td className="max-w-md truncate text-ink">{t.question}</Td>
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
