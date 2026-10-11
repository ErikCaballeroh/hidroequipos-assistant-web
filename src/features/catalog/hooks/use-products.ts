"use client";

import { useState } from "react";
import { categories, products as seed } from "../mocks/products";
import type { Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(seed);

  const saveProduct = (product: Product) => {
    setProducts((r) => {
      const exists = r.some((x) => x.sku === product.sku);
      return exists
        ? r.map((x) => (x.sku === product.sku ? product : x))
        : [...r, product];
    });
  };

  const toggleActive = (sku: string) => {
    setProducts((r) =>
      r.map((p) => (p.sku === sku ? { ...p, active: !p.active } : p)),
    );
  };

  return { products, categories, saveProduct, toggleActive };
}
