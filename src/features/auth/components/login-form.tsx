"use client";

import { useState } from "react";
import { Button, DropLogo, Field, Input } from "@/components/ui";
import type { LoginCredentials } from "../types";

export default function LoginForm({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (credentials: LoginCredentials) => void;
  loading: boolean;
  error: string | null;
}) {
  const [email, setEmail] = useState("maria.fernandez@hidroequipos.mx");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="grid h-full grid-cols-1 anim-fade md:grid-cols-2">
      {/* Left — brand */}
      <div className="hidden flex-col items-center justify-center gap-6 bg-subtle md:flex">
        <DropLogo size={132} />
        <p className="font-display text-xl text-ink">HidroEquipos y Albercas</p>
        <p className="max-w-xs text-center text-sm text-slate">
          Asistente interno de diagnóstico de mantenimiento de albercas.
        </p>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center px-12">
        <form onSubmit={submit} className="w-full max-w-[360px]">
          <div className="mb-8 flex items-center gap-2 md:hidden">
            <DropLogo />
            <span className="font-display text-lg text-ink">
              HidroEquipos y Albercas
            </span>
          </div>
          <h1 className="font-display text-2xl text-ink">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-slate">
            Acceso exclusivo para empleados.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <Field label="Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@hidroequipos.mx"
              />
            </Field>
            <div>
              <Field label="Contraseña">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={error ? "border-danger" : ""}
                />
              </Field>
              {error && (
                <p className="mt-1.5 text-[13px] text-danger">{error}</p>
              )}
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              Iniciar sesión
            </Button>

            <button
              type="button"
              className="mx-auto text-[13px] text-slate transition-colors hover:text-primary"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
