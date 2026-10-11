"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import {
  createArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "../api/knowledge-base";
import type { Article, CreateArticleInput, UpdateArticleInput } from "../types";

export function useArticles() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["articles"] });

  const createMutation = useMutation<Article, ApiError, CreateArticleInput>({
    mutationFn: createArticle,
    onSuccess: invalidate,
  });

  const updateMutation = useMutation<
    Article,
    ApiError,
    { id: number; input: UpdateArticleInput }
  >({
    mutationFn: ({ id, input }) => updateArticle(id, input),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation<void, ApiError, number>({
    mutationFn: deleteArticle,
    onSuccess: invalidate,
  });

  return {
    articles: data ?? [],
    isLoading,
    isError,
    createArticle: createMutation.mutateAsync,
    updateArticle: (id: number, input: UpdateArticleInput) =>
      updateMutation.mutateAsync({ id, input }),
    isSaving: createMutation.isPending || updateMutation.isPending,
    saveError: createMutation.error?.message ?? updateMutation.error?.message ?? null,
    deleteArticle: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message ?? null,
  };
}
