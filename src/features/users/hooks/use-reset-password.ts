"use client";

import { useMutation } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import { resetUserPassword } from "../api/users";

export function useResetPassword() {
  const mutation = useMutation<string, ApiError, number>({
    mutationFn: resetUserPassword,
  });

  return {
    resetPassword: mutation.mutateAsync,
    loading: mutation.isPending,
  };
}
