import Protected from "@/components/Protected";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <Protected require="employee">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
      <Footer />
    </Protected>
  );
}
