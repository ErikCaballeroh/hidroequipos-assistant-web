import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import type { CreateUserInput, UpdateUserInput } from "../types";

export type UserPage = components["schemas"]["UserPageEntity"];

export async function getUsers(): Promise<UserPage> {
  const { data } = await apiClient.get<UserPage>("/users", {
    params: { page: 1, pageSize: 100 },
  });
  return data;
}

export async function createUser(input: CreateUserInput): Promise<void> {
  await apiClient.post("/users", input);
}

export async function updateUser(id: number, input: UpdateUserInput): Promise<void> {
  await apiClient.patch(`/users/${id}`, input);
}

export async function deactivateUser(id: number): Promise<void> {
  await apiClient.delete(`/users/${id}`);
}

export async function resetUserPassword(id: number): Promise<string> {
  const { data } = await apiClient.post<string>(`/users/${id}/reset-password`);
  return data;
}
