"use client";

import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import { changePassword } from "../api/auth";
import type { ChangePasswordInput } from "../types";

export function useChangePassword() {
  const mutation = useMutation<void, ApiError, ChangePasswordInput>({
    mutationFn: changePassword,
  });

  return {
    changePassword: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error?.message ?? null,
  };
}
