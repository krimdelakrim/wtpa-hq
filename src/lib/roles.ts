export type Role = "employee" | "admin";

export const isAdmin = (role?: string | null) => role === "admin";
export const isEmployee = (role?: string | null) => role === "employee" || role === "admin";
