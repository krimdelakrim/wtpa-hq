"use client";

import { useState } from "react";
import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function EmployeeApplyPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    // Convert checkbox "on" to boolean
    const toBool = (v: any) => v === "on" || v === "true";

    const body = {
      ...payload,
      age_18_plus: toBool(payload.age_18_plus),
      can_commit_10hrs: toBool(payload.can_commit_10hrs),
      transportation: payload.transportation ? toBool(payload.transportation) : null,
      smartphone_internet: payload.smartphone_internet ? toBool(payload.smartphone_internet) : null,
      comfortable_portal: payload.comfortable_portal ? toBool(payload.comfortable_portal) : null,
      agrees_terms: toBool(payload.agrees_terms),
      comfort_contacting: payload.comfort_contacting
        ? Number(payload.comfort_contacting)
        : null,
    };

    const res = await fetch("/api/employees/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) setMsg(data.error || "Something went wrong.");
    else setMsg("Application submitted. Thank you!");
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <NeonCard title="Employee Application">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid md:grid-cols-2 gap-3">
            <input name="full_name" required placeholder="Full name" className="w-full rounded-md p-3" />
            <input name="email" required type="email" placeholder="Email" className="w-full rounded-md p-3" />
            <input name="phone" placeholder="Phone" className="w-full rounded-md p-3" />
            <input name="city" placeholder="City" className="w-full rounded-md p-3" />
            <input name="state" placeholder="State" className="w-full rounded-md p-3" />
            <input name="date" type="birth_date" className="w-full rounded-md p-3" />
          </div>

          <textarea name="availability" placeholder="Availability (days/times)" className="w-full rounded-md p-3" />

          <textarea
            name="experience"
            placeholder="Relevant experience (sales/outreach/customer service, etc.)"
            className="w-full rounded-md p-3"
            rows={4}
          />

          <textarea
            name="why_role"
            placeholder="Why do you want this role?"
            className="w-full rounded-md p-3"
            rows={4}
          />

          <textarea
            name="sample_outreach"
            placeholder="Write a short sample outreach message to a venue."
            className="w-full rounded-md p-3"
            rows={4}
          />

          <div className="grid md:grid-cols-2 gap-3">
            <input name="linkedin_url" placeholder="LinkedIn/Portfolio URL (optional)" className="w-full rounded-md p-3" />
            <input name="comfort_contacting" type="number" min={1} max={5} placeholder="Comfort contacting venues (1–5)" className="w-full rounded-md p-3" />
          </div>

          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input name="age_18_plus" type="checkbox" required />
              I confirm I am 18+
            </label>
            <label className="flex items-center gap-2">
              <input name="can_commit_10hrs" type="checkbox" />
              I can commit to 10 hours/week minimum
            </label>
            <label className="flex items-center gap-2">
              <input name="comfortable_portal" type="checkbox" />
              I can track outreach weekly in the portal
            </label>
            <label className="flex items-center gap-2">
              <input name="agrees_terms" type="checkbox" required />
              I agree my hours require approval and my info is accurate
            </label>
          </div>

          <NeonButton type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit Application"}
          </NeonButton>

          {msg && <p className="text-white/75">{msg}</p>}
        </form>
      </NeonCard>
    </div>
  );
}
