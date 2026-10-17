import type { components } from "@/lib/api/schema";
import type { TraceSource } from "./types";

/* similarity llega de 0 a 1; se muestra como porcentaje en la interfaz. */
export function toPercentage(similarity: number): number {
  return Math.round(similarity * 100);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toKnowledgeSources(
  knowledge: components["schemas"]["MessageTraceKnowledgeEntity"][],
): TraceSource[] {
  return knowledge.map((k) => ({ name: k.title, similarity: k.similarity }));
}
