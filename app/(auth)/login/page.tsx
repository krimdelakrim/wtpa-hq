"use client";

import { useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const supabase = supabaseBrowser();
  const sp = useSearchParams();
  const next = sp.get("next") || "/portal";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const sendLink = async () => {
    setErr(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}${next}` },
    });
    if (error) setErr(error.message);
    else setSent(true);
  };

  return (
    <div className="mx-auto max-w-xl px-5 py-10">
      <NeonCard title="Login / Apply (Employee & Admin)">
        <p className="text-white/70 mb-4">
          Enter your email to receive a secure login link.
        </p>

        <label className="label">Email</label>
        <input
          className="input mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
        />

        <NeonButton onClick={sendLink} disabled={!email.includes("@")}>
          Send Login Link
        </NeonButton>

        {sent ? <p className="mt-4 text-white/70">Link sent — check your inbox.</p> : null}
        {err ? <p className="mt-4 text-red-300">{err}</p> : null}
      </NeonCard>
    </div>
  );
}
