"use client";

import { useState } from "react";
import { Button, Field, Input } from "@/components/ui";
import type { ChangePasswordInput } from "../types";

export default function ChangePasswordForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (input: ChangePasswordInput) => void;
  loading: boolean;
  error: string | null;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const valid = currentPassword.length > 0 && newPassword.length >= 8;

  return (
    <div className="flex h-full items-center justify-center px-6 anim-fade">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSubmit({ currentPassword, newPassword });
        }}
        className="w-full max-w-[360px]"
      >
        <h1 className="font-display text-xl leading-snug text-ink">
          Cambiar contraseña
        </h1>
        <p className="mt-1 text-sm text-slate">
          Actualiza tu contraseña de acceso.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <Field label="Contraseña actual">
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
          <Field
            label="Nueva contraseña"
            hint="Mínimo 8 caracteres, incluye una mayúscula y un número."
          >
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
          {error && <p className="text-[13px] text-danger">{error}</p>}
          <Button type="submit" disabled={!valid || loading} className="w-full">
            Actualizar contraseña
          </Button>
        </div>
      </form>
    </div>
  );
}
