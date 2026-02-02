"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import { supabaseBrowser } from "@/lib/supabase/client";
import { isAdmin, isEmployee } from "@/lib/roles";

type Props = {
  children: ReactNode;
  require?: "employee" | "admin";
};

export default function Protected({ children, require = "employee" }: Props) {
  const supabase = supabaseBrowser();
  const router = useRouter();
  const path = usePathname();

  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let active = true;

    (async () => {
      const {
        data: { session },
        error: sessErr,
      } = await supabase.auth.getSession();

      if (!active) return;

      if (sessErr) {
        console.error(sessErr);
      }

      if (!session?.user) {
        router.replace(`/login?next=${encodeURIComponent(path || "/")}`);
        return;
      }

      const uid = session.user.id;

      // Ensure profile exists (id = auth user id)
      const { data: prof, error: profErr } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", uid)
        .maybeSingle();

      if (!active) return;

      if (profErr) console.error(profErr);

      if (!prof) {
        const { error: insErr } = await supabase
          .from("profiles")
          .insert({ id: uid, role: "employee" });

        if (insErr) console.error(insErr);
      }

      const role = prof?.role ?? "employee";
      const allow = require === "admin" ? isAdmin(role) : isEmployee(role);

      if (!allow) {
        router.replace("/portal");
        return;
      }

      setOk(true);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [supabase, router, path, require]);

  if (loading) return <div className="text-white/70">Loading…</div>;
  if (!ok) return null;
  return <>{children}</>;
}


