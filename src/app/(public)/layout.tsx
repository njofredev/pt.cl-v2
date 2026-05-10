import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen dark:bg-slate-950 bg-white">
      {/* Background Atmospheric Engine (High-Intensity Dark Mode ONLY) */}
      <div className="absolute top-0 inset-0 pointer-events-none overflow-hidden -z-10 select-none hidden dark:block">
        {/* Glow Top Right (Intense Accent) */}
        <div className="absolute -top-32 -right-32 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-[160px] opacity-90" />
        
        {/* Glow Middle Left (Strong Dynamic Depth) */}
        <div className="absolute top-[600px] -left-64 w-[1000px] h-[1000px] bg-primary/40 rounded-full blur-[200px] opacity-80" />

        {/* Signature Visual Grid Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.2] [mask-image:linear-gradient(to_bottom,white,transparent,white)]" />
        
        {/* Deep Dynamic Bottom Depth Accent */}
        <div className="absolute top-[1500px] right-[-10%] w-[700px] h-[700px] bg-indigo-500/25 rounded-full blur-[160px] opacity-80" />
        
        {/* Submerged footer base glow */}
        <div className="absolute bottom-0 left-[20%] w-[800px] h-[600px] bg-secondary/10 rounded-full blur-[180px]" />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
      </div>
    </div>
  );
}
