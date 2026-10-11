"use client";

import { useState } from "react";
import { Button, Field, Input } from "@/components/ui";

export default function ChangePasswordForm({
  onSubmit,
  loading,
}: {
  onSubmit: (password: string) => void;
  loading: boolean;
}) {
  const [pw, setPw] = useState("");
  const valid = pw.length >= 8;

  return (
    <div className="flex h-full items-center justify-center px-6 anim-fade">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSubmit(pw);
        }}
        className="w-full max-w-[360px]"
      >
        <h1 className="font-display text-xl leading-snug text-ink">
          Debes cambiar tu contraseña temporal antes de continuar
        </h1>
        <div className="mt-6 flex flex-col gap-4">
          <Field
            label="Nueva contraseña"
            hint="Mínimo 8 caracteres, incluye una mayúscula y un número."
          >
            <Input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
            />
          </Field>
          <Button type="submit" disabled={!valid || loading} className="w-full">
            Actualizar contraseña
          </Button>
        </div>
      </form>
    </div>
  );
}
