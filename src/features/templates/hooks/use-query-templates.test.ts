import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createWrapper } from "@/test/query-client";
import { server } from "@/test/msw/server";
import { useQueryTemplates } from "./use-query-templates";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const templates = [
  { id: 1, title: "Agua verde", queryText: "¿Qué hago?", displayOrder: 0, active: true },
  { id: 2, title: "pH alto", queryText: "¿Cómo bajo el pH?", displayOrder: 1, active: true },
  { id: 3, title: "Cloro bajo", queryText: "¿Cuánto cloro agrego?", displayOrder: 2, active: true },
];

describe("useQueryTemplates reorder", () => {
  it("only PATCHes the templates whose displayOrder actually changed", async () => {
    const patchedIds: { id: number; displayOrder: number }[] = [];

    server.use(
      http.get(`${API_URL}/query-templates/all`, () =>
        HttpResponse.json({ items: templates, page: 1, pageSize: 200, total: templates.length }),
      ),
      http.patch(`${API_URL}/query-templates/:id`, async ({ params, request }) => {
        const body = (await request.json()) as { displayOrder: number };
        patchedIds.push({ id: Number(params.id), displayOrder: body.displayOrder });
        return HttpResponse.json({ ...templates[0], id: Number(params.id), ...body });
      }),
    );

    const { result } = renderHook(() => useQueryTemplates(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.templates).toHaveLength(3));

    // Move the first item (id 1) past the second: [2, 1, 3].
    // Item 2 (1 -> 0) and item 1 (0 -> 1) change; item 3 stays at index 2.
    result.current.reorder(0, 1);

    await waitFor(() => {
      expect(patchedIds.sort((a, b) => a.id - b.id)).toEqual([
        { id: 1, displayOrder: 1 },
        { id: 2, displayOrder: 0 },
      ]);
    });

    // Item 3 never moved, so it must not have been PATCHed.
    expect(patchedIds.some((p) => p.id === 3)).toBe(false);
  });
});
