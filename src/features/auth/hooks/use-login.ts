"use client";

import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import { setToken } from "@/lib/auth/session";
import { login, type LoginResponse } from "../api/auth";
import type { LoginCredentials } from "../types";

export function useLogin() {
  const mutation = useMutation<LoginResponse, ApiError, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => setToken(data.accessToken),
  });

  return {
    login: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}
