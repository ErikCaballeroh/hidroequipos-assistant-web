"use client";

import { useQuery } from "@tanstack/react-query";
import { getConversations } from "../api/chat";
import { toConversation } from "../mappers";

export function useConversations() {
  const { data, isLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  return {
    conversations: (data ?? []).map(toConversation),
    isLoading,
  };
}
