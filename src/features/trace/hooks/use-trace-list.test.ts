import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createWrapper } from "@/test/query-client";
import { server } from "@/test/msw/server";
import { messagePage } from "@/test/msw/handlers";
import { useTraceList } from "./use-trace-list";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

describe("useTraceList", () => {
  it("loads the first page of messages by default", async () => {
    const { result } = renderHook(() => useTraceList(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.traces).toEqual(messagePage.items);
    expect(result.current.total).toBe(messagePage.total);
    expect(result.current.page).toBe(1);
  });

  it("re-fetches when the page argument changes", async () => {
    server.use(
      http.get(`${API_URL}/admin/messages`, ({ request }) => {
        const page = Number(new URL(request.url).searchParams.get("page"));
        return HttpResponse.json({ ...messagePage, page });
      }),
    );

    const { result, rerender } = renderHook(({ page }) => useTraceList("all", page), {
      wrapper: createWrapper(),
      initialProps: { page: 1 },
    });

    await waitFor(() => expect(result.current.page).toBe(1));

    rerender({ page: 2 });

    await waitFor(() => expect(result.current.page).toBe(2));
  });
});
