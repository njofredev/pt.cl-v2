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
  metadataBase: new URL("https://www.policlinicotabancura.cl"),
  title: {
    template: "%s | Policlínico Tabancura",
    default: "Centro Médico y Dental en Vitacura | Policlínico Tabancura",
  },
  description: "Clínica médica, dental y salud mental en Vitacura. Convenios corporativos, bono PAD y especialistas de primer nivel. Reserva tu hora online rápida y fácil.",
  keywords: ["Centro médico Vitacura", "Clínica Dental Vitacura", "Salud Mental", "Policlínico Tabancura", "Medicina General", "Bono PAD", "Odontología Vitacura"],
  openGraph: {
    title: "Policlínico Tabancura | Centro Médico en Vitacura",
    description: "Atención especializada médica, dental y de salud mental en Vitacura. Convenios, agendamiento online y profesionales de primer nivel.",
    url: "https://www.policlinicotabancura.cl",
    siteName: "Policlínico Tabancura",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Policlínico Tabancura | Centro Médico en Vitacura",
    description: "Atención especializada médica, dental y de salud mental en Vitacura. Convenios, agendamiento online y profesionales de primer nivel.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="es" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body className="antialiased text-slate-900 bg-clinical-bg dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300" suppressHydrationWarning>
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <AnalyticsScripts />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SparklesBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}