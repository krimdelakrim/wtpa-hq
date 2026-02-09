export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-white/60 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Multi Talent Ventures, LLC — Where The Party At HQ</div>
        <div className="flex gap-5">
          <a className="hover:text-white" href="/contact">Contact</a>
          <a className="hover:text-white" href="/employees">Work with us</a>
        </div>
      </div>
    </footer>
  );
}
