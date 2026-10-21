import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createWrapper } from "@/test/query-client";
import { loginResponse } from "@/test/msw/handlers";
import * as session from "@/lib/auth/session";
import { useLogin } from "./use-login";

describe("useLogin", () => {
  it("stores the access token on a successful login", async () => {
    const setTokenSpy = vi.spyOn(session, "setToken");
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() });

    await result.current.login({ email: "user@test.com", password: "test1234" });

    await waitFor(() => expect(setTokenSpy).toHaveBeenCalledWith(loginResponse.accessToken));
  });
});
