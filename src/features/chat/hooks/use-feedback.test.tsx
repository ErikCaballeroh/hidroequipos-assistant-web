import type { ReactNode } from "react";
import { http, HttpResponse } from "msw";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { server } from "@/test/msw/server";
import { useMessageFeedback } from "./use-feedback";
import type { ChatMessage } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function createWrapperWithClient() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { queryClient, Wrapper };
}

const baseMessage: ChatMessage = {
  id: "5",
  role: "assistant",
  text: "Respuesta",
  time: "10:00",
  feedback: null,
};

describe("useMessageFeedback", () => {
  it("patches the message's feedback in the cache on give/remove", async () => {
    server.use(
      http.post(`${API_URL}/messages/5/feedback`, () =>
        HttpResponse.json({ id: 1, messageId: 5, userId: 1, type: "like", comment: null, createdAt: "2026-10-20T10:00:00.000Z" }),
      ),
      http.delete(`${API_URL}/messages/5/feedback`, () => new HttpResponse(null, { status: 204 })),
    );

    const { queryClient, Wrapper } = createWrapperWithClient();
    queryClient.setQueryData<ChatMessage[]>(["messages", "1"], [baseMessage]);

    const { result } = renderHook(() => useMessageFeedback("1", "5"), { wrapper: Wrapper });

    await result.current.giveFeedback({ type: "like" });

    await waitFor(() => {
      const cached = queryClient.getQueryData<ChatMessage[]>(["messages", "1"]);
      expect(cached?.[0].feedback).toEqual({ type: "like", comment: null });
    });

    await result.current.removeFeedback();

    await waitFor(() => {
      const cached = queryClient.getQueryData<ChatMessage[]>(["messages", "1"]);
      expect(cached?.[0].feedback).toBeNull();
    });
  });
});
