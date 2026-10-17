"use client";

import { useQuery } from "@tanstack/react-query";
import { getStats } from "../api/metrics";

export function useStats() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => getStats(),
  });

  return { stats: data, isLoading, isError };
}
