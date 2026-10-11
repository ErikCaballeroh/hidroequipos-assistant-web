import { EmptyState, LinkButton, StatusBadge, Toggle } from "@/components/ui";
import { Td, Th } from "@/components/ui/table";
import { roleLabel } from "../mappers";
import type { User } from "../types";

export default function UserTable({
  users,
  onResetPassword,
  onToggleActive,
}: {
  users: User[];
  onResetPassword: (user: User) => void;
  onToggleActive: (user: User) => void;
}) {
  if (users.length === 0) {
    return <EmptyState title="No hay usuarios registrados." />;
  }

  return (
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
        {users.map((u) => (
          <tr
            key={u.id}
            className="border-b border-line transition-colors hover:bg-subtle"
          >
            <Td className="text-ink">{u.name}</Td>
            <Td className="text-slate">{u.email}</Td>
            <Td className="text-slate">{roleLabel(u.role)}</Td>
            <Td>
              <StatusBadge active={u.active} />
            </Td>
            <Td>
              <div className="flex items-center justify-end gap-4">
                <LinkButton onClick={() => onResetPassword(u)}>
                  Resetear contraseña
                </LinkButton>
                <Toggle checked={u.active} onChange={() => onToggleActive(u)} />
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
