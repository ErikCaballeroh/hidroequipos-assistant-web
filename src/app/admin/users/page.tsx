"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  Button,
  Field,
  Icon,
  Input,
  LinkButton,
  Modal,
  Select,
  StatusBadge,
  Toggle,
} from "@/components/ui";
import { Td, Th } from "@/components/table";
import { users as seed, type User } from "@/lib/data";

function genPassword() {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789#$";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

export default function UsersPage() {
  const [rows, setRows] = useState<User[]>(seed);
  const [resetFor, setResetFor] = useState<User | null>(null);
  const [tempPw, setTempPw] = useState("");
  const [newOpen, setNewOpen] = useState(false);

  const openReset = (u: User) => {
    setTempPw(genPassword());
    setResetFor(u);
  };

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Usuarios"
        action={
          <Button onClick={() => setNewOpen(true)}>
            <Icon name="plus" size={16} />
            Nuevo empleado
          </Button>
        }
      />

      <div className="flex-1 overflow-auto px-6 py-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-subtle text-left text-xs font-medium text-slate">
              <Th>Nombre</Th>
              <Th>Email</Th>
              <Th>Rol</Th>
              <Th>Estado</Th>
              <Th className="text-right">Acciones</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr
                key={u.id}
                className="border-b border-line transition-colors hover:bg-subtle"
              >
                <Td className="text-ink">{u.name}</Td>
                <Td className="text-slate">{u.email}</Td>
                <Td className="capitalize text-slate">{u.role}</Td>
                <Td>
                  <StatusBadge active={u.active} />
                </Td>
                <Td>
                  <div className="flex items-center justify-end gap-4">
                    <LinkButton onClick={() => openReset(u)}>
                      Resetear contraseña
                    </LinkButton>
                    <Toggle
                      checked={u.active}
                      onChange={() =>
                        setRows((r) =>
                          r.map((x) => (x.id === u.id ? { ...x, active: !x.active } : x)),
                        )
                      }
                    />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {resetFor && (
        <Modal
          title="Resetear contraseña"
          onClose={() => setResetFor(null)}
          footer={
            <Button variant="secondary" onClick={() => setResetFor(null)}>
              Cerrar
            </Button>
          }
        >
          <p className="text-sm text-slate">
            Contraseña temporal para{" "}
            <span className="text-ink">{resetFor.name}</span>:
          </p>
          <p className="my-4 text-center font-display text-3xl font-medium tracking-wide text-primary">
            {tempPw}
          </p>
          <p className="text-xs text-slate">
            Esta contraseña se muestra UNA sola vez. Cópiala y entrégasela al
            empleado.
          </p>
        </Modal>
      )}

      {newOpen && (
        <NewUserModal
          onClose={() => setNewOpen(false)}
          onCreate={(u) => {
            setRows((r) => [...r, u]);
            setNewOpen(false);
          }}
        />
      )}
    </div>
  );
}

function NewUserModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (u: User) => void;
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
