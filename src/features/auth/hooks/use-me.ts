"use client";

import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth";

export function useMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    enabled: options?.enabled ?? true,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}
