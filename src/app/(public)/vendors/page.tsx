import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";

export default function Vendors() {
  const appStore = process.env.NEXT_PUBLIC_APPSTORE_URL!;
  const playStore = process.env.NEXT_PUBLIC_PLAYSTORE_URL!;

  return (
    <div className="space-y-8">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-4xl font-black">For Vendors</h1>
        <p className="text-white/75">
          Venue profile control, posting events, stories, and subscriptions are handled inside the WTPA app.
          This site points you directly into the app.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <NeonCard title="What you can do in the app">
          <ul className="list-disc pl-5 space-y-2">
            <li>Control your venue profile (hours, vibe, photos, rules)</li>
            <li>Post events + flyers</li>
            <li>Drop stories/updates for tonight</li>
            <li>Subscription + payments inside the app</li>
          </ul>
        </NeonCard>

        <NeonCard title="Open WTPA now">
          <div className="space-y-3">
            <p>Download/open WTPA and claim your venue.</p>
            <div className="flex flex-wrap gap-3">
              <a href={appStore} target="_blank" rel="noreferrer"><NeonButton>App Store</NeonButton></a>
              <a href={playStore} target="_blank" rel="noreferrer"><NeonButton>Google Play</NeonButton></a>
              <NeonButton href="/waitlist" variant="ghost">Join Vendor Waitlist</NeonButton>
            </div>
          </div>
        </NeonCard>
      </div>
    </div>
  );
}
