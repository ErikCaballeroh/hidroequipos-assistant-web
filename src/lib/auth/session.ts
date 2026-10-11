const TOKEN_KEY = "hidroequipos_token";

function isStorageAvailable(): boolean {
  return typeof window !== "undefined";
}

export function getToken(): string | null {
  if (!isStorageAvailable()) return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // localStorage unavailable (private mode, disabled storage, etc.)
  }
}

export function clearToken(): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // localStorage unavailable
  }
}
