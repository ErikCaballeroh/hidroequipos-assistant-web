"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessageTrace } from "../api/trace";

export function useTrace(id: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-message-trace", id],
    queryFn: () => getMessageTrace(Number(id)),
  });

  return { trace: data, isLoading, isError };
}
