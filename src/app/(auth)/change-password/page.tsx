"use client";

import { useRouter } from "next/navigation";
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { useChangePassword } from "@/features/auth/hooks/use-change-password";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { changePassword, loading } = useChangePassword();

  const handleSubmit = async (password: string) => {
    const ok = await changePassword(password);
    if (ok) router.push("/");
  };

  return <ChangePasswordForm onSubmit={handleSubmit} loading={loading} />;
}
