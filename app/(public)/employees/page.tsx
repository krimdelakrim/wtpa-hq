import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function Employees() {
  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-4xl font-black">Employees</h1>
        <p className="text-white/75">
          Outreach roles support vendor onboarding. The portal tracks venue outreach, hours, and weekly reporting
          so admin can approve hours accurately.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <NeonCard title="$15/hr Dallas(TX)-Houston(TX)-Biloxi(MS) Areas — weekly requirements">
          <ul className="list-disc pl-5 space-y-2">
            <li><b>10 hours</b> logged minimum</li>
            <li><b>5 venues</b> contacted minimum</li>
            <li><b>5 completed</b> outreach log entries</li>
            <li><b>1 weekly</b> summary report</li>
          </ul>
        </NeonCard>

        <div className="grid gap-5">
          <NeonCard title="Apply">
            <p className="mb-4">
              New applicants: start here. Once approved, you’ll be able to log in and track outreach.
            </p>
            <NeonButton href="/employees/apply">Apply</NeonButton>
          </NeonCard>

          <NeonCard title="Login">
            <p className="mb-4">
              Approved employees: log in to access the outreach portal.
            </p>
            <NeonButton href="/login?next=%2Fportal" variant="ghost">
              Login
            </NeonButton>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}


