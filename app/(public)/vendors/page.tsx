import NeonCard from "@/components/NeonCard";
import NeonButton from "@/components/NeonButton";
import { PLAYSTORE_URL, APPSTORE_URL } from "@/lib/links";


export default function Vendors() {
  

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
              <a href={APPSTORE_URL} target="_blank" rel="noreferrer">
  <NeonButton>App Store</NeonButton>
</a>

<a href={PLAYSTORE_URL} target="_blank" rel="noreferrer">
  <NeonButton>Google Play</NeonButton>
</a>

              
            </div>
          </div>
        </NeonCard>
      </div>
    </div>
  );
}
