"use client";

import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../api/chat";
import { toChatMessage } from "../mappers";
import type { ChatMessage } from "../types";

export function useMessages(conversationId: string | null) {
  const { data, isLoading } = useQuery<ChatMessage[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => (await getMessages(conversationId as string)).map((m) => toChatMessage(m)),
    enabled: !!conversationId,
    // Once a conversation's messages are cached (including the empty seed for
    // a brand new one), trust it for the rest of the session instead of
    // refetching and clobbering the optimistic updates from sendMessage.
    staleTime: Infinity,
  });

  return { messages: data ?? [], isLoading };
}
