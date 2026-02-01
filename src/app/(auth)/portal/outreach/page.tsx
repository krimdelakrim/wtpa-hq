"use client";

import { useEffect, useMemo, useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import { supabaseBrowser } from "@/lib/supabase/client";
import { getWeekStart, toISODate } from "@/lib/utils";

export default function Outreach() {
  const supabase = supabaseBrowser();
  const weekStartISO = useMemo(() => toISODate(getWeekStart(new Date())), []);
  const [items, setItems] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState({
    venue_name: "",
    venue_address: "",
    venue_phone: "",
    venue_type: "bar",
    contact_name: "",
    contact_role: "",
    contact_method: "in-person",
    contact_details: "",
    interaction_at: new Date().toISOString().slice(0, 16),
    outcome: "interested",
    notes: "",
    follow_up_date: "",
  });

  const load = async () => {
    const { data } = await supabase
      .from("outreach_logs")
      .select("*")
      .order("interaction_at", { ascending: false })
      .limit(50);
    setItems(data || []);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    setErr(null);
    const { error } = await supabase.from("outreach_logs").insert({
      ...form,
      interaction_at: new Date(form.interaction_at).toISOString(),
      follow_up_date: form.follow_up_date || null,
      venue_phone: form.venue_phone || null,
      contact_name: form.contact_name || null,
      contact_role: form.contact_role || null,
      contact_details: form.contact_details || null,
    });

    if (error) setErr(error.message);
    else {
      setForm((f) => ({ ...f, venue_name: "", venue_address: "", venue_phone: "", notes: "" }));
      await load();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Outreach Log</h1>
        <p className="text-white/70">Week start: {weekStartISO}</p>
      </div>

      <NeonCard title="New outreach entry">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="label">Venue name *</label>
            <input className="input" value={form.venue_name} onChange={(e) => setForm({ ...form, venue_name: e.target.value })} />
          </div>
          <div>
            <label className="label">Venue type</label>
            <select className="input" value={form.venue_type} onChange={(e) => setForm({ ...form, venue_type: e.target.value })}>
              <option value="bar">Bar</option>
              <option value="club">Club</option>
              <option value="restaurant">Restaurant</option>
              <option value="event_space">Event space</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="label">Address *</label>
            <input className="input" value={form.venue_address} onChange={(e) => setForm({ ...form, venue_address: e.target.value })} />
          </div>

          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.venue_phone} onChange={(e) => setForm({ ...form, venue_phone: e.target.value })} />
          </div>

          <div>
            <label className="label">Interaction date/time</label>
            <input type="datetime-local" className="input" value={form.interaction_at} onChange={(e) => setForm({ ...form, interaction_at: e.target.value })} />
          </div>

          <div>
            <label className="label">Contact name</label>
            <input className="input" value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} />
          </div>
          <div>
            <label className="label">Contact role</label>
            <input className="input" value={form.contact_role} onChange={(e) => setForm({ ...form, contact_role: e.target.value })} />
          </div>

          <div>
            <label className="label">Contact method</label>
            <select className="input" value={form.contact_method} onChange={(e) => setForm({ ...form, contact_method: e.target.value })}>
              <option value="in-person">In-person</option>
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="ig">Instagram DM</option>
            </select>
          </div>
          <div>
            <label className="label">Contact details</label>
            <input className="input" value={form.contact_details} onChange={(e) => setForm({ ...form, contact_details: e.target.value })} />
          </div>

          <div>
            <label className="label">Outcome *</label>
            <select className="input" value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })}>
              <option value="interested">Interested</option>
              <option value="follow_up">Follow-up needed</option>
              <option value="signed_in_app">Signed up in app</option>
              <option value="not_interested">Not interested</option>
              <option value="no_contact">No contact made</option>
            </select>
          </div>

          <div>
            <label className="label">Follow-up date</label>
            <input type="date" className="input" value={form.follow_up_date} onChange={(e) => setForm({ ...form, follow_up_date: e.target.value })} />
          </div>

          <div className="md:col-span-2">
            <label className="label">Notes *</label>
            <textarea className="input" rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <NeonButton onClick={submit} disabled={!form.venue_name || !form.venue_address || !form.notes}>Save entry</NeonButton>
          {err ? <div className="text-red-300 text-sm">{err}</div> : null}
        </div>
      </NeonCard>

      <NeonCard title="Recent entries">
        <div className="space-y-3">
          {items.length === 0 ? <div className="text-white/70">No outreach logs yet.</div> : null}
          {items.map((x) => (
            <div key={x.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="font-semibold">{x.venue_name}</div>
                <div className="text-xs text-white/60">{new Date(x.interaction_at).toLocaleString()}</div>
              </div>
              <div className="text-white/70 text-sm">{x.venue_address}</div>
              <div className="text-white/80 text-sm mt-2">
                <span className="text-white/60">Outcome:</span> {x.outcome}
              </div>
              <div className="text-white/70 text-sm mt-2">{x.notes}</div>
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
