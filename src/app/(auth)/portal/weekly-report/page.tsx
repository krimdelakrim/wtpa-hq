"use client";

import { useEffect, useMemo, useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import { supabaseBrowser } from "@/lib/supabase/client";
import { getWeekStart, toISODate } from "@/lib/utils";

export default function WeeklyReport() {
  const supabase = supabaseBrowser();
  const weekStartISO = useMemo(() => toISODate(getWeekStart(new Date())), []);

  const [wins, setWins] = useState("");
  const [obstacles, setObstacles] = useState("");
  const [followups, setFollowups] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [saved, setSaved] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("weekly_reports")
        .select("*")
        .eq("week_start", weekStartISO)
        .maybeSingle();
      if (data) {
        setWins(data.wins || "");
        setObstacles(data.obstacles || "");
        setFollowups(data.followups || "");
        setSuggestions(data.suggestions || "");
      }
    })();
  }, [supabase, weekStartISO]);

  const save = async () => {
    setErr(null);
    setSaved(false);

    const { error } = await supabase.from("weekly_reports").upsert({
      week_start: weekStartISO,
      wins,
      obstacles: obstacles || null,
      followups: followups || null,
      suggestions: suggestions || null,
    });

    if (error) setErr(error.message);
    else setSaved(true);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-black">Weekly Summary Report</h1>
        <p className="text-white/70">Week of {weekStartISO}</p>
      </div>

      <NeonCard title="Report">
        <label className="label">Wins (required)</label>
        <textarea className="input" rows={4} value={wins} onChange={(e) => setWins(e.target.value)} />

        <div className="h-3" />

        <label className="label">Obstacles</label>
        <textarea className="input" rows={3} value={obstacles} onChange={(e) => setObstacles(e.target.value)} />

        <div className="h-3" />

        <label className="label">Follow-ups planned</label>
        <textarea className="input" rows={3} value={followups} onChange={(e) => setFollowups(e.target.value)} />

        <div className="h-3" />

        <label className="label">Suggestions</label>
        <textarea className="input" rows={3} value={suggestions} onChange={(e) => setSuggestions(e.target.value)} />

        <div className="mt-4 flex items-center gap-3">
          <NeonButton onClick={save} disabled={!wins.trim()}>Save report</NeonButton>
          {saved ? <div className="text-green-300 text-sm">Saved.</div> : null}
          {err ? <div className="text-red-300 text-sm">{err}</div> : null}
        </div>
      </NeonCard>
    </div>
  );
}
