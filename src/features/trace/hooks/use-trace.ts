"use client";

import { traces } from "../mocks/traces";
import type { TraceDetail } from "../types";

export function useTrace(id: string): { trace: TraceDetail | undefined } {
  return { trace: traces.find((t) => t.id === id) };
}
