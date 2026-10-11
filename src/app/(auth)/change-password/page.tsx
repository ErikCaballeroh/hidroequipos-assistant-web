"use client";

import { useRouter } from "next/navigation";
import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { useChangePassword } from "@/features/auth/hooks/use-change-password";
import type { ChangePasswordInput } from "@/features/auth/types";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { changePassword, loading, error } = useChangePassword();

  const handleSubmit = async (input: ChangePasswordInput) => {
    try {
      await changePassword(input);
      router.push("/");
    } catch {
      // the error message is already surfaced via the hook's `error`
    }
  };

  return <ChangePasswordForm onSubmit={handleSubmit} loading={loading} error={error} />;
}
