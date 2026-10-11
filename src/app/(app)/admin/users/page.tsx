"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/page-header";
import { Button, Icon } from "@/components/ui";
import NewUserModal from "@/features/users/components/new-user-modal";
import ResetPasswordModal from "@/features/users/components/reset-password-modal";
import UserTable from "@/features/users/components/user-table";
import { useUsers } from "@/features/users/hooks/use-users";
import type { User } from "@/features/users/types";

export default function UsersPage() {
  const { users, createUser, toggleActive, resetPassword } = useUsers();
  const [resetFor, setResetFor] = useState<User | null>(null);
  const [tempPw, setTempPw] = useState("");
  const [newOpen, setNewOpen] = useState(false);

  const openReset = (u: User) => {
    setTempPw(resetPassword());
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
        <UserTable
          users={users}
          onResetPassword={openReset}
          onToggleActive={toggleActive}
        />
      </div>

      {resetFor && (
        <ResetPasswordModal
          user={resetFor}
          password={tempPw}
          onClose={() => setResetFor(null)}
        />
      )}

      {newOpen && (
        <NewUserModal
          onClose={() => setNewOpen(false)}
          onCreate={(u) => {
            createUser(u);
            setNewOpen(false);
          }}
        />
      )}
    </div>
  );
}
