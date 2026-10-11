"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConversation } from "../api/chat";
import { toConversation } from "../mappers";
import type { ChatMessage } from "../types";

export function useNewConversation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => toConversation(await createConversation()),
    onSuccess: (conversation) => {
      // A brand new conversation has no messages yet: seed the cache so the
      // messages query doesn't also fetch and race the optimistic update
      // from the first sendMessage call against it.
      queryClient.setQueryData<ChatMessage[]>(["messages", conversation.id], []);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  return { createConversation: mutation.mutateAsync };
}
