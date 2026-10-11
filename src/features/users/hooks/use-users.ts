"use client";

import { useState } from "react";
import { users as seed } from "../mocks/users";
import type { User } from "../types";

function genPassword() {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789#$";
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>(seed);

  const createUser = (user: User) => {
    setUsers((u) => [...u, user]);
  };

  const toggleActive = (id: string) => {
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
  };

  const resetPassword = () => genPassword();

  return { users, createUser, toggleActive, resetPassword };
}
