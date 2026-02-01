import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function AdminHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-black">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-5">
        <NeonCard title="Approvals">
          Review weekly submissions and approve/reject hours based on logs.
          <div className="mt-4">
            <NeonButton href="/admin/approvals">Go to Approvals</NeonButton>
          </div>
        </NeonCard>
        <NeonCard title="Outreach Review">
          Review outreach logs across all employees.
          <div className="mt-4">
            <NeonButton href="/admin/outreach">Review Outreach</NeonButton>
          </div>
        </NeonCard>
      </div>
    </div>
  );
}
