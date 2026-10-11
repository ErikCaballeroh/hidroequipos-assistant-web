"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/layout/page-header";
import { Button, EmptyState, Icon } from "@/components/ui";
import TraceSources from "@/features/trace/components/trace-sources";
import { useTrace } from "@/features/trace/hooks/use-trace";

export default function MessageTraceabilityPage(
  props: PageProps<"/admin/messages/[id]">,
) {
  const { id } = use(props.params);
  const router = useRouter();
  const { trace } = useTrace(id);

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Trazabilidad de la respuesta"
        action={
          <Button variant="secondary" onClick={() => router.push("/admin/messages")}>
            <Icon name="arrowLeft" size={16} />
            Volver
          </Button>
        }
      />

      <div className="flex-1 overflow-auto p-6">
        {!trace ? (
          <EmptyState title="No se encontró la traza de esta respuesta." />
        ) : (
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <div>
              <p className="pb-2 text-[11px] font-medium uppercase tracking-wide text-slate">
                Respuesta del asistente
              </p>
              <div className="rounded-[4px] border border-line p-4 text-sm text-ink">
                {trace.answer}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TraceSources title="Productos citados" sources={trace.products} />
              <TraceSources
                title="Artículos de conocimiento citados"
                sources={trace.articles}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
