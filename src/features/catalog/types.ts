import type { components } from "@/lib/api/schema";

export type Product = components["schemas"]["ProductEntity"];
export type CreateProductInput = components["schemas"]["CreateProductDto"];
export type UpdateProductInput = components["schemas"]["UpdateProductDto"];
