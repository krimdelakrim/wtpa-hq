"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const next = searchParams.get("next") || "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErr(error.message);
      return;
    }

    router.replace(next);
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-3xl font-black">Login</h1>

      <form onSubmit={signIn} className="space-y-3">
        <input
          className="w-full rounded-xl px-4 py-3 bg-white/10 text-white outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          className="w-full rounded-xl px-4 py-3 bg-white/10 text-white outline-none"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          className="w-full rounded-xl px-4 py-3 bg-white text-black font-semibold disabled:opacity-60"
          disabled={loading || !email.includes("@") || password.length < 6}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {err ? <div className="text-red-300 text-sm">{err}</div> : null}
      </form>
    </div>
  );
}



