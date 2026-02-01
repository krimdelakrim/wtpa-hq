"use client";

import { useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function Waitlist() {
  const supabase = supabaseBrowser();
  const [role, setRole] = useState<"vendor" | "user" | "employee">("vendor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [venueName, setVenueName] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    setErr(null);
    const { error } = await supabase.from("waitlist").insert({
      role,
      name: name || null,
      email,
      city: city || null,
      state: state || null,
      venue_name: role === "vendor" ? (venueName || null) : null,
    });
    if (error) setErr(error.message);
    else setDone(true);
  };

  return (
    <div className="max-w-2xl">
      <NeonCard title="Join the WTPA Waitlist">
        {done ? (
          <div className="text-white/80">You’re in. We’ll reach out with next steps.</div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="label">I am a…</label>
              <select className="input" value={role} onChange={(e) => setRole(e.target.value as any)}>
                <option value="vendor">Vendor / Venue</option>
                <option value="user">User</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="label">Name</label>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="label">Email (required)</label>
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            {role === "vendor" ? (
              <div>
                <label className="label">Venue name</label>
                <input className="input" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
              </div>
            ) : null}

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="label">City</label>
                <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <label className="label">State</label>
                <input className="input" value={state} onChange={(e) => setState(e.target.value)} />
              </div>
            </div>

            <NeonButton onClick={submit} disabled={!email.includes("@")}>Join Waitlist</NeonButton>
            {err ? <div className="text-red-300 text-sm">{err}</div> : null}
          </div>
        )}
      </NeonCard>
    </div>
  );
}
