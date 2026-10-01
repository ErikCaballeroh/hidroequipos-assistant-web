import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import { Icon } from "@/components/ui";
import { Td, Th } from "@/components/table";
import { apiHealth, failedMessages, topProducts } from "@/lib/data";

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[4px] border border-line p-4">
      <h2 className="font-display pb-3 text-sm text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function MetricsPage() {
  const max = Math.max(...topProducts.map((p) => p.value));
  const approval = 85;

  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Panel de métricas" />

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Top products */}
          <Panel title="Productos más recomendados">
            <div className="flex flex-col gap-3">
              {topProducts.map((p) => (
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
          </Panel>

          {/* Feedback */}
          <Panel title="Feedback de empleados">
            <p className="font-display flex items-center gap-2 text-4xl font-medium text-primary">
              {approval}%
              <Icon name="thumbsUp" size={28} className="text-primary" />
            </p>
            <p className="mb-3 mt-1 text-xs text-slate">
              Aprobación de las respuestas del asistente
            </p>
            <div className="flex h-2 overflow-hidden rounded-[2px] bg-line">
              <div
                className="h-2 bg-primary"
                style={{ width: `${approval}%` }}
              />
            </div>
          </Panel>

          {/* Failed matches */}
          <Panel title="Mensajes sin match suficiente">
            <p className="font-display text-4xl font-medium text-ink">12</p>
            <ul className="mt-3 flex flex-col gap-2">
              {failedMessages.map((m, i) => (
                <li
                  key={i}
                  className="truncate border-l-[3px] border-line pl-2 text-sm text-slate"
                >
                  {m}
                </li>
              ))}
            </ul>
          </Panel>

          {/* API health */}
          <Panel title="Salud de la API">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-subtle text-left text-xs font-medium text-slate">
                  <Th>Fecha / Hora</Th>
                  <Th>Estado</Th>
                  <Th className="text-right">Respuesta</Th>
                </tr>
              </thead>
              <tbody>
                {apiHealth.map((r, i) => (
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
                    <Td className="text-right tabular-nums text-ink">
                      {r.ms} ms
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
    </div>
  );
}
