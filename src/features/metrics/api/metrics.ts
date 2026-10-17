import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";

export type Stats = components["schemas"]["StatsEntity"];
export type GeminiLogPage = components["schemas"]["GeminiLogPageEntity"];

export async function getStats(params?: { from?: string; to?: string }): Promise<Stats> {
  const { data } = await apiClient.get<Stats>("/admin/stats", { params });
  return data;
}

export async function getGeminiLogs(params?: {
  page?: number;
  pageSize?: number;
  success?: boolean;
}): Promise<GeminiLogPage> {
  const { data } = await apiClient.get<GeminiLogPage>("/admin/gemini-logs", {
    params: { page: 1, pageSize: 20, ...params },
  });
  return data;
}
