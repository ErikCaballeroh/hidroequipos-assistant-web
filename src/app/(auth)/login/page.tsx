"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/features/auth/components/login-form";
import { useLogin } from "@/features/auth/hooks/use-login";
import type { LoginCredentials } from "@/features/auth/types";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error } = useLogin();

  const handleSubmit = async (credentials: LoginCredentials) => {
    const ok = await login(credentials);
    if (ok) router.push("/change-password");
  };

  return <LoginForm onSubmit={handleSubmit} loading={loading} error={error} />;
}
