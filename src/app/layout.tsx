import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SparklesBackground } from "@/components/SparklesBackground";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Policlínico Tabancura | Salud Dental, Mental y Medicina General",
  description: "Atención especializada en Vitacura. Convenios, agendamiento online y profesionales de primer nivel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="antialiased text-slate-900 bg-clinical-bg dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnalyticsScripts />
          <SparklesBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}