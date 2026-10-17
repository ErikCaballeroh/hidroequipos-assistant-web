"use client";

import { useQuery } from "@tanstack/react-query";
import { getGeminiLogs } from "../api/metrics";

export function useGeminiLogs() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-gemini-logs"],
    queryFn: () => getGeminiLogs(),
  });

  return { logs: data?.items ?? [], isLoading, isError };
}
