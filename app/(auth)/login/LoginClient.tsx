import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white/70">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}

