"use client";

export const dynamic = "force-dynamic";
import { useEffect, useMemo, useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import ComplianceMeter from "@/components/ComplianceMeter";
import { supabaseBrowser } from "@/lib/supabase/client";
import { addDays, getWeekStart, toISODate } from "@/lib/utils";

export default function PortalHome() {
  const appStore = process.env.NEXT_PUBLIC_APPSTORE_URL ?? "#";
  const playStore = process.env.NEXT_PUBLIC_PLAYSTORE_URL ?? "#";
  const supabase = supabaseBrowser();
  const weekStart = useMemo(() => getWeekStart(new Date()), []);
  const weekStartISO = toISODate(weekStart);
  const weekEndISO = toISODate(addDays(weekStart, 7));

  const [minutes, setMinutes] = useState(0);
  const [venueCount, setVenueCount] = useState(0);
  const [logCount, setLogCount] = useState(0);
  const [hasReport, setHasReport] = useState(false);
  const [subStatus, setSubStatus] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      const { data: { session } } = await supabase.auth.getSession();
      const uid = session?.user.id;
      if (!uid) return;

      const { data: logs } = await supabase
        .from("outreach_logs")
        .select("id")
        .gte("interaction_at", `${weekStartISO}T00:00:00`)
        .lt("interaction_at", `${weekEndISO}T00:00:00`);

      const { data: time } = await supabase
        .from("time_entries")
        .select("minutes")
        .gte("work_date", weekStartISO)
        .lt("work_date", weekEndISO);

      const { data: report } = await supabase
        .from("weekly_reports")
        .select("id")
        .eq("week_start", weekStartISO)
        .maybeSingle();

      const { data: submission } = await supabase
        .from("weekly_submissions")
        .select("status")
        .eq("week_start", weekStartISO)
        .maybeSingle();

      const mins = (time || []).reduce((a, b) => a + (b.minutes || 0), 0);
      setMinutes(mins);
      setLogCount(logs?.length || 0);
      setVenueCount(logs?.length || 0); // simplest: 1 log = 1 venue; later we can de-dupe by venue_name/address
      setHasReport(!!report);
      setSubStatus(submission?.status ?? null);
    })();
  }, [supabase, weekStartISO, weekEndISO]);

  const submitWeek = async () => {
    setErr(null);
    const { error } = await supabase.from("weekly_submissions").upsert(
      { week_start: weekStartISO, status: "submitted" },
      { onConflict: "user_id,week_start" as any } // Supabase JS typing quirk
    );
    if (error) setErr(error.message);
    else setSubStatus("submitted");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black">Employee Portal</h1>
          <p className="text-white/70">Week of {weekStartISO}</p>
        </div>
        <div className="flex gap-2">
          <NeonButton href="/portal/outreach" variant="ghost">Outreach Log</NeonButton>
          <NeonButton href="/portal/hours" variant="ghost">Hours</NeonButton>
          <NeonButton href="/portal/weekly-report" variant="ghost">Weekly Report</NeonButton>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <ComplianceMeter minutes={minutes} venues={venueCount} logs={logCount} hasReport={hasReport} />

        <NeonCard kicker="SUBMISSION" title="Submit week for approval">
          <p className="text-white/70">
            Submit when your hours, outreach logs, and weekly report are complete. Admin will approve/reject hours.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <NeonButton onClick={submitWeek}>Submit This Week</NeonButton>
            <div className="text-white/70 text-sm">
              Status: <span className="font-semibold text-white/90">{subStatus ?? "not submitted"}</span>
            </div>
          </div>
          {err ? <div className="mt-3 text-red-300 text-sm">{err}</div> : null}
        </NeonCard>
      </div>

      <NeonCard title="Requirements (weekly)">
        <ul className="list-disc pl-5 space-y-2">
          <li>10 hours logged</li>
          <li>Minimum 5 venues contacted</li>
          <li>5 completed outreach logs</li>
          <li>1 weekly summary report</li>
        </ul>
      </NeonCard>
    </div>
  );
}
