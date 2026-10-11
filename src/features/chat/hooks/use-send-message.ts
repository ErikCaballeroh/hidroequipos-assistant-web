"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import { sendMessage as sendMessageRequest } from "../api/chat";
import { now } from "../lib/time";
import { toChatMessage, toSources } from "../mappers";
import type { ChatMessage } from "../types";

type SendVariables = { conversationId: string; text: string };

export function useSendMessage() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ChatMessage, ApiError, SendVariables>({
    mutationFn: async ({ conversationId, text }) => {
      const response = await sendMessageRequest(conversationId, text);
      return toChatMessage(response.message, toSources(response.sources));
    },
    onMutate: ({ conversationId, text }) => {
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        text,
        time: now(),
      };
      queryClient.setQueryData<ChatMessage[]>(["messages", conversationId], (prev) => [
        ...(prev ?? []),
        userMessage,
      ]);
    },
    onSuccess: (assistantMessage, { conversationId }) => {
      queryClient.setQueryData<ChatMessage[]>(["messages", conversationId], (prev) => [
        ...(prev ?? []),
        assistantMessage,
      ]);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  return {
    sendMessage: (conversationId: string, text: string) =>
      mutation.mutateAsync({ conversationId, text }),
    sending: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}
