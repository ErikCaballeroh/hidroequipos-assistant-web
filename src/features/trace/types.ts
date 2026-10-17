import type { components } from "@/lib/api/schema";

export type TraceSource = {
  name: string;
  similarity: number;
};

export type MessageTraceItem = components["schemas"]["MessageListItemEntity"];
export type MessageTrace = components["schemas"]["MessageTraceEntity"];
