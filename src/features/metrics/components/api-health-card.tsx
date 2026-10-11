import { Card } from "@/components/ui";
import { Td, Th } from "@/components/ui/table";
import type { GeminiLogEntry } from "../types";

export default function ApiHealthCard({ logs }: { logs: GeminiLogEntry[] }) {
  return (
    <Card title="Salud de la API">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-subtle text-left text-xs font-medium text-slate">
            <Th>Fecha / Hora</Th>
            <Th>Estado</Th>
            <Th className="text-right">Respuesta</Th>
          </tr>
        </thead>
        <tbody>
          {logs.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-0">
              <Td className="text-slate">{r.time}</Td>
              <Td>
                <span
                  style={{ color: r.ok ? "#00a8c8" : "#e53e3e" }}
                  className="font-medium"
                >
                  {r.ok ? "Éxito" : "Error"}
                </span>
              </Td>
              <Td className="text-right tabular-nums text-ink">{r.ms} ms</Td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
