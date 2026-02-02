import "@/styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "WTPA HQ",
  description: "Where The Party At — HQ site + outreach ops.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}




