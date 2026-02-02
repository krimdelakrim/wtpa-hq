import type { ReactNode } from "react";

export const metadata = {
  title: "Admin | WTPA HQ",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
