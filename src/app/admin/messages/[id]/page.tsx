"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { Button, Icon } from "@/components/ui";
import { seedMessages, traceArticles, traceProducts } from "@/lib/data";

function ScoreRow({ name, score }: { name: string; score: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink">{name}</span>
        <span className="text-[11px] tabular-nums text-slate">
          {Math.round(score * 100)}%
        </span>
      </div>
      <div className="h-1.5 rounded-[2px] bg-line">
        <div
          className="h-1.5 rounded-[2px] bg-secondary"
          style={{ width: `${score * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function MessageTraceabilityPage(
  props: PageProps<"/admin/messages/[id]">,
) {
  use(props.params);
  const router = useRouter();
  const answer = seedMessages.find((m) => m.role === "assistant")!;

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Trazabilidad de la respuesta"
        action={
          <Button variant="secondary" onClick={() => router.push("/admin/metrics")}>
            <Icon name="arrowLeft" size={16} />
            Volver
          </Button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <div>
            <p className="pb-2 text-[11px] font-medium uppercase tracking-wide text-slate">
              Respuesta del asistente
            </p>
            <div className="rounded-[4px] border border-line p-4 text-sm text-ink">
              {answer.text}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-display pb-3 text-sm text-ink">
                Productos citados
              </h2>
              <div className="flex flex-col gap-3">
                {traceProducts.map((p) => (
                  <ScoreRow key={p.name} {...p} />
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display pb-3 text-sm text-ink">
                Artículos de conocimiento citados
              </h2>
              <div className="flex flex-col gap-3">
                {traceArticles.map((a) => (
                  <ScoreRow key={a.name} {...a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
