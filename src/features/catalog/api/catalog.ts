import { apiClient } from "@/lib/api/client";
import type { components } from "@/lib/api/schema";
import type { CreateProductInput, UpdateProductInput } from "../types";

type ProductPage = components["schemas"]["ProductPageEntity"];
export type ApiProduct = components["schemas"]["ProductEntity"];

export async function getProducts(): Promise<ApiProduct[]> {
  const { data } = await apiClient.get<ProductPage>("/products", {
    params: { page: 1, pageSize: 200 },
  });
  return data.items;
}

export async function createProduct(input: CreateProductInput): Promise<ApiProduct> {
  const { data } = await apiClient.post<ApiProduct>("/products", input);
  return data;
}

export async function updateProduct(
  id: number,
  input: UpdateProductInput,
): Promise<ApiProduct> {
  const { data } = await apiClient.patch<ApiProduct>(`/products/${id}`, input);
  return data;
}

export async function deactivateProduct(id: number): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
