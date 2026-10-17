"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessages, type MessagesFilter } from "../api/trace";

export function useTraceList(filter: MessagesFilter = "all") {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-messages", filter],
    queryFn: () => getMessages(filter),
  });

  return { traces: data?.items ?? [], isLoading, isError };
}
