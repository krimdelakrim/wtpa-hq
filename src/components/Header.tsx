import Link from "next/link";
import NeonButton from "./NeonButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 neon-border flex items-center justify-center font-black">
            W
          </div>
          <div>
            <div className="font-black leading-none text-white">WTPA HQ</div>
            <div className="text-xs text-white/60">Multi Talent Ventures, LLC</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link href="/vendors" className="hover:text-white">Vendors</Link>
          <Link href="/employees" className="hover:text-white">Employees</Link>
          <Link href="/waitlist" className="hover:text-white">Waitlist</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <NeonButton href="/login" variant="ghost">Login</NeonButton>
          <NeonButton href="/vendors">Open the App</NeonButton>
        </div>
      </div>
    </header>
  );
}
