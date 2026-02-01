"use client";

import { useEffect, useState } from "react";
import NeonCard from "@/components/NeonCard";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function AdminOutreach() {
  const supabase = supabaseBrowser();
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("outreach_logs")
        .select("*")
        .order("interaction_at", { ascending: false })
        .limit(100);
      if (error) setErr(error.message);
      setItems(data || []);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Outreach Logs (All Employees)</h1>
      <NeonCard title="Latest 100">
        {err ? <div className="text-red-300 text-sm mb-3">{err}</div> : null}
        <div className="space-y-3">
          {items.map((x) => (
            <div key={x.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="font-semibold">{x.venue_name}</div>
                <div className="text-xs text-white/60">{new Date(x.interaction_at).toLocaleString()}</div>
              </div>
              <div className="text-white/60 text-xs mt-1">Employee: {x.user_id}</div>
              <div className="text-white/70 text-sm">{x.venue_address}</div>
              <div className="text-white/70 text-sm mt-2"><span className="text-white/60">Outcome:</span> {x.outcome}</div>
              <div className="text-white/70 text-sm mt-2">{x.notes}</div>
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
