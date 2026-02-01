import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function Home() {
  const appStore = process.env.NEXT_PUBLIC_APPSTORE_URL!;
  const playStore = process.env.NEXT_PUBLIC_PLAYSTORE_URL!;

  return (
    <div className="space-y-10">
      <section className="neon-border rounded-3xl bg-white/[0.03] p-10">
        <div className="max-w-2xl space-y-4">
          <div className="text-xs tracking-widest text-white/60">WTPA HQ</div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            Where The Party At — powered by venues, run by outreach.
          </h1>
          <p className="text-white/75">
            This site funnels vendors and users into the WTPA app and gives our outreach team tools to log venues,
            track hours, and submit weekly reports for approval.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <NeonButton href="/vendors">For Vendors</NeonButton>
            <NeonButton href="/employees" variant="ghost">For Employees</NeonButton>
            <a href={appStore} target="_blank" rel="noreferrer"><NeonButton>App Store</NeonButton></a>
            <a href={playStore} target="_blank" rel="noreferrer"><NeonButton>Google Play</NeonButton></a>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        <NeonCard kicker="VENDORS" title="Promote in the App">
          Claim your venue, control your profile, post events, and drop stories — all inside the WTPA app.
        </NeonCard>
        <NeonCard kicker="EMPLOYEES" title="$15/hr Outreach Program">
          Minimum 10 hours/week, 5 venues contacted, 5 log entries, 1 weekly report — tracked in the portal.
        </NeonCard>
        <NeonCard kicker="OPERATIONS" title="Admin Approvals">
          Admin reviews logs + weekly submissions to approve hours and ensure outreach is documented.
        </NeonCard>
      </section>
    </div>
  );
}
