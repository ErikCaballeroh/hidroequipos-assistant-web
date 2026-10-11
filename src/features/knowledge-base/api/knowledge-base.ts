import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import type { CreateArticleInput, UpdateArticleInput } from "../types";

type KnowledgeBasePage = components["schemas"]["KnowledgeBasePageEntity"];
export type ApiArticle = components["schemas"]["KnowledgeBaseEntity"];

export async function getArticles(): Promise<ApiArticle[]> {
  const { data } = await apiClient.get<KnowledgeBasePage>("/knowledge-base", {
    params: { page: 1, pageSize: 200 },
  });
  return data.items;
}

export async function createArticle(input: CreateArticleInput): Promise<ApiArticle> {
  const { data } = await apiClient.post<ApiArticle>("/knowledge-base", input);
  return data;
}

export async function updateArticle(
  id: number,
  input: UpdateArticleInput,
): Promise<ApiArticle> {
  const { data } = await apiClient.patch<ApiArticle>(`/knowledge-base/${id}`, input);
  return data;
}

export async function deleteArticle(id: number): Promise<void> {
  await apiClient.delete(`/knowledge-base/${id}`);
}
