"use client";

import { traces } from "../mocks/traces";
import type { TraceSummary } from "../types";

export function useTraceList(): { traces: TraceSummary[] } {
  return {
    traces: traces.map(({ id, question, date, success }) => ({
      id,
      question,
      date,
      success,
    })),
  };
}
