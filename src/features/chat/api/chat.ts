import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";

export type ApiConversation = components["schemas"]["ConversationEntity"];
export type ApiMessage = components["schemas"]["MessageEntity"];
export type ApiQueryTemplate = components["schemas"]["QueryTemplateEntity"];
export type ApiFeedback = components["schemas"]["FeedbackEntity"];
type SendMessageResponse = components["schemas"]["SendMessageResponseEntity"];
type QueryTemplatePage = components["schemas"]["QueryTemplatePageEntity"];
type CreateFeedbackDto = components["schemas"]["CreateFeedbackDto"];

export async function getConversations(): Promise<ApiConversation[]> {
  const { data } = await apiClient.get<ApiConversation[]>("/conversations");
  return data;
}

export async function createConversation(): Promise<ApiConversation> {
  const { data } = await apiClient.post<ApiConversation>("/conversations");
  return data;
}

export async function getMessages(conversationId: string): Promise<ApiMessage[]> {
  const { data } = await apiClient.get<ApiMessage[]>(`/conversations/${conversationId}/messages`);
  return data;
}

export async function sendMessage(
  conversationId: string,
  content: string,
): Promise<SendMessageResponse> {
  const { data } = await apiClient.post<SendMessageResponse>(
    `/conversations/${conversationId}/messages`,
    { content },
  );
  return data;
}

export async function getQueryTemplates(): Promise<ApiQueryTemplate[]> {
  const { data } = await apiClient.get<QueryTemplatePage>("/query-templates", {
    params: { page: 1, pageSize: 50 },
  });
  return data.items;
}

export async function giveFeedback(
  messageId: string,
  dto: CreateFeedbackDto,
): Promise<ApiFeedback> {
  const { data } = await apiClient.post<ApiFeedback>(`/messages/${messageId}/feedback`, dto);
  return data;
}

export async function removeFeedback(messageId: string): Promise<void> {
  await apiClient.delete(`/messages/${messageId}/feedback`);
}
