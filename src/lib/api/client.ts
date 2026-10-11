import axios from "axios";
import { clearToken, getToken } from "../auth/session";
import { toApiError } from "./errors";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 401s from these endpoints are expected, user-facing validation failures
// (bad credentials / wrong current password), not an expired session — the
// calling form shows the message instead of the global session-expiry redirect.
const AUTH_ENDPOINTS_WITH_OWN_ERROR_HANDLING = ["/auth/login", "/auth/change-password"];

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = toApiError(error);
    const isOwnErrorHandling = AUTH_ENDPOINTS_WITH_OWN_ERROR_HANDLING.some((url) =>
      error.config?.url?.includes(url),
    );

    if (apiError.status === 401 && !isOwnErrorHandling) {
      clearToken();
      if (typeof window !== "undefined") {
        // Hard redirect: this runs outside the React tree (axios interceptor), so
        // useRouter() isn't available, and a full reload also clears in-memory state
        // (TanStack Query cache, component state) left over from the expired session.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination
        window.location.href = "/login";
      }
    }

    return Promise.reject(apiError);
  },
);
