import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { server } from "@/test/msw/server";
import { useNewConversation } from "./use-new-conversation";
import type { ChatMessage } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function createWrapperWithClient() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { queryClient, Wrapper };
}

describe("useNewConversation", () => {
  it("seeds an empty messages cache and invalidates the conversations list", async () => {
    server.use(
      http.post(`${API_URL}/conversations`, () =>
        HttpResponse.json({
          id: 7,
          userId: 1,
          title: null,
          createdAt: "2026-10-20T10:00:00.000Z",
          updatedAt: "2026-10-20T10:00:00.000Z",
        }),
      ),
    );

    const { queryClient, Wrapper } = createWrapperWithClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    const { result } = renderHook(() => useNewConversation(), { wrapper: Wrapper });

    const conversation = await result.current.createConversation();

    expect(conversation.id).toBe("7");

    await waitFor(() => {
      expect(queryClient.getQueryData<ChatMessage[]>(["messages", "7"])).toEqual([]);
    });
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["conversations"] });
  });
});
