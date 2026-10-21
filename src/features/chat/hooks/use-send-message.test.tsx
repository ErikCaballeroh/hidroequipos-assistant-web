import type { ReactNode } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";
import { sendMessageResponse } from "@/test/msw/handlers";
import { useSendMessage } from "./use-send-message";
import type { ChatMessage } from "../types";

function createWrapperWithClient() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return { queryClient, Wrapper };
}

describe("useSendMessage", () => {
  it("optimistically adds the user message, then appends the real assistant reply", async () => {
    const { queryClient, Wrapper } = createWrapperWithClient();
    const { result } = renderHook(() => useSendMessage(), { wrapper: Wrapper });

    const sendPromise = result.current.sendMessage("1", "¿Cómo trato el agua verde?");

    await waitFor(() => {
      const cached = queryClient.getQueryData<ChatMessage[]>(["messages", "1"]);
      expect(cached).toHaveLength(1);
      expect(cached?.[0]).toMatchObject({ role: "user", text: "¿Cómo trato el agua verde?" });
    });

    await sendPromise;

    await waitFor(() => {
      const cached = queryClient.getQueryData<ChatMessage[]>(["messages", "1"]);
      expect(cached).toHaveLength(2);
      expect(cached?.[1]).toMatchObject({
        role: "assistant",
        text: sendMessageResponse.message.content,
      });
    });

    expect(result.current.sending).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
