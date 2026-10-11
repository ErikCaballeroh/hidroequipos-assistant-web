import type { components } from "@/lib/api/schema";

export type User = components["schemas"]["UserResponseDto"];
export type UserRole = User["role"];
export type CreateUserInput = components["schemas"]["CreateUserDto"];
export type UpdateUserInput = components["schemas"]["UpdateUserDto"];
