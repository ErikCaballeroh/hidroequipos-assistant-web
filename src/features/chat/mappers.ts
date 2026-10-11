import type { components } from "@/lib/api/schema";
import { formatDate, formatTime } from "./lib/time";
import type { ChatMessage, ChatSource, Conversation, QueryTemplate } from "./types";

type ApiConversation = components["schemas"]["ConversationEntity"];
type ApiMessage = components["schemas"]["MessageEntity"];
type ApiSources = components["schemas"]["SourcesEntity"];
type ApiQueryTemplate = components["schemas"]["QueryTemplateEntity"];

export function toConversation(c: ApiConversation): Conversation {
  return {
    id: String(c.id),
    title: c.title ?? "Nueva conversación",
    date: formatDate(c.updatedAt),
  };
}

export function toSources(sources: ApiSources): ChatSource[] {
  return [
    ...sources.products.map((p) => ({
      name: p.name,
      type: "product" as const,
      similarity: p.similarity,
    })),
    ...sources.knowledge.map((k) => ({
      name: k.title,
      type: "article" as const,
      similarity: k.similarity,
    })),
  ];
}

export function toChatMessage(m: ApiMessage, sources?: ChatSource[]): ChatMessage {
  return {
    id: String(m.id),
    role: m.role,
    text: m.content,
    time: formatTime(m.createdAt),
    sources,
  };
}

export function toQueryTemplate(t: ApiQueryTemplate): QueryTemplate {
  return {
    id: String(t.id),
    title: t.title,
    body: t.queryText,
    active: t.active,
  };
}
