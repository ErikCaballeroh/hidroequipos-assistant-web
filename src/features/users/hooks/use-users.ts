"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import { createUser, getUsers, updateUser } from "../api/users";
import type { CreateUserInput, User } from "../types";

export function useUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["users"] });

  const createMutation = useMutation<void, ApiError, CreateUserInput>({
    mutationFn: createUser,
    onSuccess: invalidate,
  });

  const toggleActiveMutation = useMutation<void, ApiError, User>({
    mutationFn: (user) => updateUser(user.id, { active: !user.active }),
    onSuccess: invalidate,
  });

  return {
    users: data?.items ?? [],
    isLoading,
    isError,
    createUser: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createError: createMutation.error?.message ?? null,
    toggleActive: toggleActiveMutation.mutate,
  };
}
