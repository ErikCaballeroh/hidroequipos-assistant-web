import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";

export type MessagePage = components["schemas"]["MessagePageEntity"];
export type MessageTrace = components["schemas"]["MessageTraceEntity"];

export type MessagesFilter = "all" | "noMatch" | "dislike";

export async function getMessages(
  filter: MessagesFilter = "all",
  params?: { page?: number; pageSize?: number },
): Promise<MessagePage> {
  const { data } = await apiClient.get<MessagePage>("/admin/messages", {
    params: {
      page: 1,
      pageSize: 15,
      ...params,
      ...(filter === "noMatch" ? { noMatch: true } : {}),
      ...(filter === "dislike" ? { feedback: "dislike" } : {}),
    },
  });
  return data;
}

export async function getMessageTrace(id: number): Promise<MessageTrace> {
  const { data } = await apiClient.get<MessageTrace>(`/admin/messages/${id}/trace`);
  return data;
}
