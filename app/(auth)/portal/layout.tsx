"use client";

export const dynamic = "force-dynamic";

import type { ReactNode } from "react";
import Protected from "@/components/Protected";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <Protected require="employee">
      <Header />
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      <Footer />
    </Protected>
  );
}


