import Link from "next/link";
import Image from "next/image";
import NeonButton from "./NeonButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10 bg-black/40">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">

          {/* LOGO */}
          <div className="h-10 w-10 rounded-xl overflow-hidden neon-border">
            <Image
              src="/wtpa1.jpg"
              alt="WTPA Logo"
              width={40}
              height={40}
              className="object-cover"
              priority
            />
          </div>

          <div>
            <div className="font-black leading-none text-white">Where The Party At HQ</div>
            <div className="text-xs text-white/60">Multi Talented Ventures, LLC</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link href="/vendors" className="hover:text-white">Vendors</Link>
          <Link href="/employees" className="hover:text-white">Employees</Link>
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

