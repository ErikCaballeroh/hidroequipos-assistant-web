"use client";

import { conversationMessages, seedMessages } from "../mocks/messages";
import type { ChatMessage } from "../types";

export function getMessagesForConversation(conversationId?: string): ChatMessage[] {
  if (!conversationId) return seedMessages;
  return conversationMessages[conversationId] ?? [];
}

export function useMessages(conversationId?: string): { messages: ChatMessage[] } {
  return { messages: getMessagesForConversation(conversationId) };
}
