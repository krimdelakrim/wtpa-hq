"use client";

import { useEffect, useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function Approvals() {
  const supabase = supabaseBrowser();
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("weekly_submissions")
      .select("id, user_id, week_start, status, admin_notes, submitted_at")
      .order("submitted_at", { ascending: false })
      .limit(50);

    if (error) setErr(error.message);
    else setItems(data || []);
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id: number, status: string) => {
    setErr(null);
    const { data: { session } } = await supabase.auth.getSession();
    const reviewed_by = session?.user.id;

    const { error } = await supabase
      .from("weekly_submissions")
      .update({ status, reviewed_at: new Date().toISOString(), reviewed_by })
      .eq("id", id);

    if (error) setErr(error.message);
    else await load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black">Weekly Approvals</h1>

      <NeonCard title="Submissions">
        {err ? <div className="text-red-300 text-sm mb-3">{err}</div> : null}

        <div className="space-y-3">
          {items.length === 0 ? <div className="text-white/70">No submissions yet.</div> : null}

          {items.map((x) => (
            <div key={x.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="font-semibold">User: {x.user_id}</div>
                <div className="text-sm text-white/70">Week: {x.week_start}</div>
              </div>
              <div className="text-sm text-white/70 mt-2">Status: <span className="text-white/90 font-semibold">{x.status}</span></div>

              <div className="mt-3 flex flex-wrap gap-2">
                <NeonButton onClick={() => setStatus(x.id, "approved")}>Approve</NeonButton>
                <NeonButton onClick={() => setStatus(x.id, "changes_requested")} variant="ghost">Changes</NeonButton>
                <NeonButton onClick={() => setStatus(x.id, "rejected")} variant="ghost">Reject</NeonButton>
              </div>
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
