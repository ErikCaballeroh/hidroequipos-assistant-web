import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import type { ChangePasswordInput, LoginCredentials } from "../types";

export type LoginResponse = components["schemas"]["LoginResponseDto"];
export type MeResponse = components["schemas"]["MeResponseDto"];

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);
  return data;
}

export async function getMe(): Promise<MeResponse> {
  const { data } = await apiClient.get<MeResponse>("/auth/me");
  return data;
}

export async function changePassword(input: ChangePasswordInput): Promise<void> {
  await apiClient.post("/auth/change-password", input);
}
