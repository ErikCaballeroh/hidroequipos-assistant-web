import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createWrapper } from "@/test/query-client";
import { server } from "@/test/msw/server";
import { productPage } from "@/test/msw/handlers";
import { useProducts } from "./use-products";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

describe("useProducts", () => {
  it("loads products and derives the category list", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.products).toEqual(productPage.items);
    expect(result.current.categories).toEqual(["quimico"]);
  });

  it("exposes the normalized error message when creating a product fails", async () => {
    server.use(
      http.post(`${API_URL}/products`, () =>
        HttpResponse.json({ message: "El nombre es obligatorio" }, { status: 400 }),
      ),
    );

    const { result } = renderHook(() => useProducts(), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await expect(result.current.createProduct({ name: "" })).rejects.toMatchObject({
      status: 400,
      message: "El nombre es obligatorio",
    });

    await waitFor(() => expect(result.current.saveError).toBe("El nombre es obligatorio"));
  });
});
