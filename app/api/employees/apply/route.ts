import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";


function isEmail(v: unknown) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.full_name || typeof body.full_name !== "string") {
      return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    }
    if (!isEmail(body.email)) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }
    if (!body.age_18_plus) {
      return NextResponse.json({ error: "You must confirm you are 18+." }, { status: 400 });
    }
    if (!body.agrees_terms) {
      return NextResponse.json({ error: "You must agree to the terms." }, { status: 400 });
    }

    const comfort =
      body.comfort_contacting === null || body.comfort_contacting === undefined
        ? null
        : Number(body.comfort_contacting);

    if (comfort !== null && (!Number.isFinite(comfort) || comfort < 1 || comfort > 5)) {
      return NextResponse.json({ error: "Comfort rating must be 1–5." }, { status: 400 });
    }

    const row = {
      full_name: body.full_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone ? String(body.phone).trim() : null,
      city: body.city ? String(body.city).trim() : null,
      state: body.state ? String(body.state).trim() : null,

      age_18_plus: !!body.age_18_plus,

      can_commit_10hrs: !!body.can_commit_10hrs,
      availability: body.availability ? String(body.availability).trim() : null,
      start_date: body.start_date ? String(body.start_date) : null,

      transportation: body.transportation ?? null,
      smartphone_internet: body.smartphone_internet ?? null,

      experience: body.experience ? String(body.experience).trim() : null,
      comfort_contacting: comfort,
      comfortable_portal: body.comfortable_portal ?? null,

      why_role: body.why_role ? String(body.why_role).trim() : null,
      sample_outreach: body.sample_outreach ? String(body.sample_outreach).trim() : null,

      linkedin_url: body.linkedin_url ? String(body.linkedin_url).trim() : null,

      agrees_terms: !!body.agrees_terms,
    };

    const supabase = supabaseServer();
    const { error } = await supabase.from("employee_applications").insert([row]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}


