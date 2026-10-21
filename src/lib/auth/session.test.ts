import { afterEach, describe, expect, it, vi } from "vitest";
import { clearToken, getToken, setToken } from "./session";

describe("session token storage", () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns null when there is no token yet", () => {
    expect(getToken()).toBeNull();
  });

  it("round-trips a token through set/get/clear", () => {
    setToken("abc123");
    expect(getToken()).toBe("abc123");

    clearToken();
    expect(getToken()).toBeNull();
  });

  it("swallows errors when localStorage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new Error("storage disabled");
    });

    expect(() => setToken("abc123")).not.toThrow();
    expect(() => getToken()).not.toThrow();
    expect(getToken()).toBeNull();
    expect(() => clearToken()).not.toThrow();
  });
});
