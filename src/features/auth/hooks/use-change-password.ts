"use client";

import { useState } from "react";

/* Simulated response until the auth backend is integrated (Fase 7). */
async function changePasswordRequest(password: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  void password;
}

export function useChangePassword() {
  const [loading, setLoading] = useState(false);

  const changePassword = async (password: string) => {
    setLoading(true);
    try {
      await changePasswordRequest(password);
      return true;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading };
}
