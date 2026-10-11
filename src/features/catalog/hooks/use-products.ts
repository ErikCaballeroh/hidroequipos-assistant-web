"use client";

import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api/errors";
import {
  createProduct,
  deactivateProduct,
  getProducts,
  updateProduct,
} from "../api/catalog";
import type { CreateProductInput, Product, UpdateProductInput } from "../types";

export function useProducts() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = useMemo(() => data ?? [], [data]);
  const categories = useMemo(
    () =>
      [...new Set(products.map((p) => p.category).filter((c): c is string => !!c))].sort(),
    [products],
  );

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["products"] });

  const createMutation = useMutation<Product, ApiError, CreateProductInput>({
    mutationFn: createProduct,
    onSuccess: invalidate,
  });

  const updateMutation = useMutation<
    Product,
    ApiError,
    { id: number; input: UpdateProductInput }
  >({
    mutationFn: ({ id, input }) => updateProduct(id, input),
    onSuccess: invalidate,
  });

  const toggleActiveMutation = useMutation<void, ApiError, Product>({
    mutationFn: (product) =>
      product.active
        ? deactivateProduct(product.id)
        : updateProduct(product.id, { active: true }).then(() => undefined),
    onSuccess: invalidate,
  });

  return {
    products,
    categories,
    isLoading,
    isError,
    createProduct: createMutation.mutateAsync,
    updateProduct: (id: number, input: UpdateProductInput) =>
      updateMutation.mutateAsync({ id, input }),
    isSaving: createMutation.isPending || updateMutation.isPending,
    saveError: createMutation.error?.message ?? updateMutation.error?.message ?? null,
    toggleActive: toggleActiveMutation.mutate,
  };
}
