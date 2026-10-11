"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  updateTemplate,
} from "../api/templates";
import type {
  CreateQueryTemplateInput,
  QueryTemplate,
  UpdateQueryTemplateInput,
} from "../types";

export function useQueryTemplates() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-query-templates"],
    queryFn: getAllTemplates,
  });

  const templates = data ?? [];
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["admin-query-templates"] });

  const createMutation = useMutation<QueryTemplate, ApiError, CreateQueryTemplateInput>({
    mutationFn: (input) => createTemplate({ ...input, displayOrder: templates.length }),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation<
    QueryTemplate,
    ApiError,
    { id: number; input: UpdateQueryTemplateInput }
  >({
    mutationFn: ({ id, input }) => updateTemplate(id, input),
    onSuccess: invalidate,
  });

  const toggleActiveMutation = useMutation<QueryTemplate, ApiError, QueryTemplate>({
    mutationFn: (template) => updateTemplate(template.id, { active: !template.active }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation<void, ApiError, number>({
    mutationFn: deleteTemplate,
    onSuccess: invalidate,
  });

  const reorderMutation = useMutation<void, ApiError, { from: number; to: number }>({
    mutationFn: async ({ from, to }) => {
      const reordered = [...templates];
      const [moved] = reordered.splice(from, 1);
      reordered.splice(to, 0, moved);
      await Promise.all(
        reordered
          .map((t, index) => ({ t, index }))
          .filter(({ t, index }) => t.displayOrder !== index)
          .map(({ t, index }) => updateTemplate(t.id, { displayOrder: index })),
      );
    },
    onSuccess: invalidate,
  });

  return {
    templates,
    isLoading,
    isError,
    createTemplate: createMutation.mutateAsync,
    updateTemplate: (id: number, input: UpdateQueryTemplateInput) =>
      updateMutation.mutateAsync({ id, input }),
    isSaving: createMutation.isPending || updateMutation.isPending,
    saveError: createMutation.error?.message ?? updateMutation.error?.message ?? null,
    toggleActive: (template: QueryTemplate) => toggleActiveMutation.mutate(template),
    deleteTemplate: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    deleteError: deleteMutation.error?.message ?? null,
    reorder: (from: number, to: number) => reorderMutation.mutate({ from, to }),
  };
}
