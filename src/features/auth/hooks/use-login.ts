"use client";

import { useState } from "react";
import type { LoginCredentials } from "../types";

/* Simulated response until the auth backend is integrated (Fase 7). */
async function loginRequest({ password }: LoginCredentials): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (password.length < 4) {
    throw new Error("Credenciales inválidas");
  }
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      await loginRequest(credentials);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenciales inválidas");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
