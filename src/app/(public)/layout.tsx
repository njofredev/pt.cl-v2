import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen dark:bg-slate-950 bg-white">
      {/* Ambient Background Effects (Vambe.ai style, Dark Mode Only) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden hidden dark:block" style={{ zIndex: 0 }}>
        {/* Top Left Dynamic Glow */}
        <div className="absolute -top-[15%] -left-[15%] w-[60%] h-[65%] bg-blue-600/15 rounded-full blur-[160px]" />
        {/* Mid Right Contrast Glow */}
        <div className="absolute top-[20%] -right-[15%] w-[55%] h-[60%] bg-indigo-600/15 rounded-full blur-[160px]" />
        {/* Bottom Left Subtle Deep Glow */}
        <div className="absolute bottom-[-10%] left-[5%] w-[50%] h-[55%] bg-emerald-600/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
