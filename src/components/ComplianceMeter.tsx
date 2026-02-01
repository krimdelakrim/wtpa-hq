import NeonCard from "./NeonCard";
import { minutesToHours } from "@/lib/utils";

export default function ComplianceMeter({
  minutes,
  venues,
  logs,
  hasReport,
}: {
  minutes: number;
  venues: number;
  logs: number;
  hasReport: boolean;
}) {
  const hours = minutesToHours(minutes);
  const hoursOk = minutes >= 600;
  const venuesOk = venues >= 5;
  const logsOk = logs >= 5;
  const reportOk = hasReport;

  const Item = ({ label, value, ok }: { label: string; value: string; ok: boolean }) => (
    <div className="flex items-center justify-between border-b border-white/10 py-2">
      <div className="text-white/70">{label}</div>
      <div className={ok ? "text-green-300 font-semibold" : "text-white/80"}>{value}</div>
    </div>
  );

  return (
    <NeonCard kicker="THIS WEEK" title="Compliance Meter">
      <div className="space-y-1">
        <Item label="Hours" value={`${hours} / 10`} ok={hoursOk} />
        <Item label="Venues contacted" value={`${venues} / 5`} ok={venuesOk} />
        <Item label="Completed outreach logs" value={`${logs} / 5`} ok={logsOk} />
        <Item label="Weekly report" value={reportOk ? "Submitted" : "Not submitted"} ok={reportOk} />
      </div>
    </NeonCard>
  );
}
