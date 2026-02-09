import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  let body: any;

  // A) Parse JSON only
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Request body was not valid JSON." },
      { status: 400 }
    );
  }

  // B) Validate required fields
  if (!body?.full_name || !body?.email) {
    return NextResponse.json(
      { error: "Missing required fields: full_name and email." },
      { status: 400 }
    );
  }
  if (!body.age_18_plus) {
    return NextResponse.json({ error: "Must confirm 18+." }, { status: 400 });
  }
  if (!body.agrees_terms) {
    return NextResponse.json({ error: "Must agree to terms." }, { status: 400 });
  }

  // C) Ensure env exists (THIS is commonly the real issue)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { error: "Server misconfigured: missing Supabase env vars." },
      { status: 500 }
    );
  }

  // D) Insert
  try {
    const supabase = supabaseServer();
    const { error } = await supabase.from("employee_applications").insert([
      {
        full_name: String(body.full_name).trim(),
        email: String(body.email).trim().toLowerCase(),
        phone: body.phone ? String(body.phone).trim() : null,
        city: body.city ? String(body.city).trim() : null,
        state: body.state ? String(body.state).trim() : null,
        start_date: body.start_date ? String(body.start_date) : null,

        age_18_plus: !!body.age_18_plus,
        can_commit_10hrs: !!body.can_commit_10hrs,
        comfortable_portal: !!body.comfortable_portal,
        agrees_terms: !!body.agrees_terms,

        availability: body.availability ? String(body.availability) : null,
        experience: body.experience ? String(body.experience) : null,
        why_role: body.why_role ? String(body.why_role) : null,
        sample_outreach: body.sample_outreach ? String(body.sample_outreach) : null,
        linkedin_url: body.linkedin_url ? String(body.linkedin_url) : null,

        comfort_contacting: body.comfort_contacting ? Number(body.comfort_contacting) : null,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: `Server error: ${e?.message || "unknown"}` },
      { status: 500 }
    );
  }
}



