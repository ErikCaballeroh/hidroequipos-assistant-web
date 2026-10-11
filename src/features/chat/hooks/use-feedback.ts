"use client";

import { useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import { giveFeedback as giveFeedbackRequest, removeFeedback as removeFeedbackRequest } from "../api/chat";
import type { ChatMessage, MessageFeedback } from "../types";

function setMessageFeedback(
  queryClient: QueryClient,
  conversationId: string,
  messageId: string,
  feedback: MessageFeedback | null,
) {
  queryClient.setQueryData<ChatMessage[]>(["messages", conversationId], (prev) =>
    (prev ?? []).map((m) => (m.id === messageId ? { ...m, feedback } : m)),
  );
}

export function useMessageFeedback(conversationId: string, messageId: string) {
  const queryClient = useQueryClient();

  const give = useMutation<MessageFeedback, ApiError, { type: "like" | "dislike"; comment?: string }>({
    mutationFn: async (input) => {
      const result = await giveFeedbackRequest(messageId, input);
      return { type: result.type, comment: result.comment };
    },
    onSuccess: (feedback) => setMessageFeedback(queryClient, conversationId, messageId, feedback),
  });

  const remove = useMutation<void, ApiError, void>({
    mutationFn: () => removeFeedbackRequest(messageId),
    onSuccess: () => setMessageFeedback(queryClient, conversationId, messageId, null),
  });

  return {
    giveFeedback: give.mutateAsync,
    removeFeedback: remove.mutateAsync,
    loading: give.isPending || remove.isPending,
  };
}
