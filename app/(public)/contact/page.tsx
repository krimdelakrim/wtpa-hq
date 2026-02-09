import NeonCard from "@/components/NeonCard";

export default function Contact() {
  return (
    <div className="max-w-2xl">
      <NeonCard title="Contact">
        <p className="text-white/75">
          Add your preferred contact email/phone here. For now, you can use the waitlist page and we’ll respond from the team inbox.
        </p>
        <p className="mt-3 text-white/60 text-sm">
          hiringteam@wtpahq.com
        </p>
      </NeonCard>
    </div>
  );
}
