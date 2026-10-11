"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, Select } from "@/components/ui";
import type { CreateUserInput } from "../types";

function genPassword() {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789#$";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join(
    "",
  );
}

export default function NewUserModal({
  onClose,
  onCreate,
  loading,
  error,
}: {
  onClose: () => void;
  onCreate: (input: CreateUserInput) => void;
  loading: boolean;
  error: string | null;
}) {
  const [form, setForm] = useState<CreateUserInput>({
    name: "",
    email: "",
    password: genPassword(),
    role: "employee",
  });

  return (
    <Modal
      title="Nuevo empleado"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={() => onCreate(form)}
            disabled={!form.name.trim() || !form.email.trim() || !form.password.trim() || loading}
          >
            {loading ? "Creando..." : "Crear"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Field label="Nombre">
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Carlos Gómez"
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="nombre@hidroequipos.mx"
          />
        </Field>
        <Field label="Rol">
          <Select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: (e.target as HTMLSelectElement).value as CreateUserInput["role"],
              })
            }
          >
            <option value="employee">Empleado</option>
            <option value="supervisor">Supervisor</option>
          </Select>
        </Field>
        <Field label="Contraseña temporal" hint="Entrégasela al empleado para su primer acceso.">
          <div className="flex items-center gap-2">
            <Input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button
              variant="secondary"
              type="button"
              onClick={() => setForm({ ...form, password: genPassword() })}
            >
              Generar
            </Button>
          </div>
        </Field>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    </Modal>
  );
}
