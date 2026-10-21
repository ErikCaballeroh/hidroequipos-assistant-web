import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll } from "vitest";
import { apiClient } from "@/lib/api/client";
import { server } from "./msw/server";

beforeAll(() => {
  // jsdom's XMLHttpRequest isn't reliably intercepted by MSW's XHR interceptor
  // (jsdom 30 delegates XHR internals in a way @mswjs/interceptors can't patch);
  // MSW does intercept the fetch adapter correctly, so force it for tests only.
  apiClient.defaults.adapter = "fetch";
  server.listen({ onUnhandledFrame: "error" });
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());
