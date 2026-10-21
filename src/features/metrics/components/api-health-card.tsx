import { Card, EmptyState } from "@/components/ui";
import { Td, Th } from "@/components/ui/table";
import { formatDateTime } from "../mappers";
import type { GeminiLogEntry } from "../types";

export default function ApiHealthCard({ logs }: { logs: GeminiLogEntry[] }) {
  if (logs.length === 0) {
    return (
      <Card title="Salud de la API">
        <EmptyState title="Sin llamadas registradas en este periodo." />
      </Card>
    );
  }

  return (
    <Card title="Salud de la API">
      <div className="max-h-72 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="sticky top-0 bg-subtle text-left text-xs font-medium text-slate">
              <Th>Fecha / Hora</Th>
              <Th>Estado</Th>
              <Th className="text-right">Respuesta</Th>
            </tr>
          </thead>
          <tbody>
            {logs.map((r) => (
              <tr key={r.id} className="border-b border-line last:border-0">
                <Td className="text-slate">{formatDateTime(r.createdAt)}</Td>
                <Td>
                  <span
                    style={{ color: r.success ? "#00a8c8" : "#e53e3e" }}
                    className="font-medium"
                  >
                    {r.success ? "Éxito" : "Error"}
                  </span>
                </Td>
                <Td className="text-right tabular-nums text-ink">
                  {r.responseTimeMs != null ? `${r.responseTimeMs} ms` : "—"}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
