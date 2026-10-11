import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import type { CreateQueryTemplateInput, UpdateQueryTemplateInput } from "../types";

type QueryTemplatePage = components["schemas"]["QueryTemplatePageEntity"];
export type ApiQueryTemplate = components["schemas"]["QueryTemplateEntity"];

export async function getAllTemplates(): Promise<ApiQueryTemplate[]> {
  const { data } = await apiClient.get<QueryTemplatePage>("/query-templates/all", {
    params: { page: 1, pageSize: 200 },
  });
  return data.items;
}

export async function createTemplate(
  input: CreateQueryTemplateInput,
): Promise<ApiQueryTemplate> {
  const { data } = await apiClient.post<ApiQueryTemplate>("/query-templates", input);
  return data;
}

export async function updateTemplate(
  id: number,
  input: UpdateQueryTemplateInput,
): Promise<ApiQueryTemplate> {
  const { data } = await apiClient.patch<ApiQueryTemplate>(`/query-templates/${id}`, input);
  return data;
}

export async function deleteTemplate(id: number): Promise<void> {
  await apiClient.delete(`/query-templates/${id}`);
}
