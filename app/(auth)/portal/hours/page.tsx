"use client";

import { useEffect, useMemo, useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import { supabaseBrowser } from "@/lib/supabase/client";
import { getWeekStart, toISODate } from "@/lib/utils";

export default function Hours() {
  const supabase = supabaseBrowser();
  const weekStartISO = useMemo(() => toISODate(getWeekStart(new Date())), []);
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const [work_date, setWorkDate] = useState(toISODate(new Date()));
  const [minutes, setMinutes] = useState(60);
  const [category, setCategory] = useState("outreach");
  const [notes, setNotes] = useState("");

  const load = async () => {
    const { data } = await supabase
      .from("time_entries")
      .select("*")
      .order("work_date", { ascending: false })
      .limit(100);
    setItems(data || []);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    setErr(null);
    const { error } = await supabase.from("time_entries").insert({
      work_date,
      minutes,
      category,
      notes: notes || null,
    });
    if (error) setErr(error.message);
    else {
      setNotes("");
      await load();
    }
  };

  const weekMinutes = items
    .filter((x) => x.work_date >= weekStartISO)
    .reduce((a, b) => a + (b.minutes || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Hours Log</h1>
        <p className="text-white/70">Week start: {weekStartISO} (minutes this week: {weekMinutes})</p>
      </div>

      <NeonCard title="Add time entry">
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <label className="label">Date</label>
            <input type="date" className="input" value={work_date} onChange={(e) => setWorkDate(e.target.value)} />
          </div>
          <div>
            <label className="label">Minutes</label>
            <input type="number" className="input" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value || "0", 10))} />
          </div>
          <div>
            <label className="label">Category</label>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="outreach">Outreach</option>
              <option value="followup">Follow-ups</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="md:col-span-4">
            <label className="label">Notes</label>
            <input className="input" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <NeonButton onClick={submit} disabled={minutes <= 0}>Save time</NeonButton>
          {err ? <div className="text-red-300 text-sm">{err}</div> : null}
        </div>
      </NeonCard>

      <NeonCard title="Recent time entries">
        <div className="space-y-2">
          {items.length === 0 ? <div className="text-white/70">No time entries yet.</div> : null}
          {items.map((x) => (
            <div key={x.id} className="flex items-center justify-between border-b border-white/10 py-2 text-sm">
              <div>
                <span className="font-semibold">{x.work_date}</span>{" "}
                <span className="text-white/60">({x.category})</span>
                {x.notes ? <span className="text-white/70"> — {x.notes}</span> : null}
              </div>
              <div className="text-white/80">{x.minutes} min</div>
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
