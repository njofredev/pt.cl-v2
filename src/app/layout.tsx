import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SparklesBackground } from "@/components/SparklesBackground";

const googleSans = localFont({
  src: [
    {
      path: "../../public/font/static/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/static/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/static/GoogleSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/static/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-google-sans",
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
    <html lang="es" suppressHydrationWarning className={googleSans.variable}>
      <body className="antialiased text-slate-900 bg-clinical-bg dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SparklesBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}