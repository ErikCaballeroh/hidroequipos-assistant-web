"use client";

import { useQuery } from "@tanstack/react-query";
import { getQueryTemplates } from "../api/chat";
import { toQueryTemplate } from "../mappers";

export function useQueryTemplates() {
  const { data } = useQuery({
    queryKey: ["query-templates"],
    queryFn: getQueryTemplates,
  });

  return { templates: (data ?? []).map(toQueryTemplate).filter((t) => t.active) };
}
