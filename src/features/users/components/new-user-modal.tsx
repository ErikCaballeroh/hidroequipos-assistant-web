"use client";

import { useState } from "react";
import { Button, Field, Input, Modal, Select } from "@/components/ui";
import type { User } from "../types";

export default function NewUserModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (user: User) => void;
}) {
  const [form, setForm] = useState<User>({
    id: crypto.randomUUID(),
    name: "",
    email: "",
    role: "empleado",
    active: true,
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
            disabled={!form.name.trim() || !form.email.trim()}
          >
            Crear
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
                role: (e.target as HTMLSelectElement).value as User["role"],
              })
            }
          >
            <option value="empleado">Empleado</option>
            <option value="supervisor">Supervisor</option>
          </Select>
        </Field>
      </div>
    </Modal>
  );
}
