import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createWrapper } from "@/test/query-client";
import { stats } from "@/test/msw/handlers";
import { useStats } from "./use-stats";

describe("useStats", () => {
  it("loads stats from the API", async () => {
    const { result } = renderHook(() => useStats(), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats).toEqual(stats);
    expect(result.current.isError).toBe(false);
  });
});
