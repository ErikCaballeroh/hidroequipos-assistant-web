"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessages, type MessagesFilter } from "../api/trace";

export function useTraceList(filter: MessagesFilter = "all", page: number = 1) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-messages", filter, page],
    queryFn: () => getMessages(filter, { page }),
  });

  return {
    traces: data?.items ?? [],
    page: data?.page ?? page,
    pageSize: data?.pageSize ?? 20,
    total: data?.total ?? 0,
    isLoading,
    isError,
  };
}
