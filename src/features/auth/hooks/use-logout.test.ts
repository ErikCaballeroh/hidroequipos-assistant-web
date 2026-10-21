import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createWrapper } from "@/test/query-client";
import * as session from "@/lib/auth/session";
import { useLogout } from "./use-logout";

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("useLogout", () => {
  it("clears the token, resets the query cache, and redirects to /login", () => {
    const clearTokenSpy = vi.spyOn(session, "clearToken");
    const { result } = renderHook(() => useLogout(), { wrapper: createWrapper() });

    result.current();

    expect(clearTokenSpy).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/login");
  });
});
