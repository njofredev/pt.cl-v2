import React from 'react';
import dynamic from 'next/dynamic';
import { AIHeroTester } from '@/components/AIHeroTester';
import { MiVitaLink } from '@/components/MiVitaLink';
import { ModularScheduler } from '@/components/ModularScheduler';
import { PartnerCarousel } from '@/components/PartnerCarousel';
import { ServiceCarousel } from '@/components/ServiceCarousel';
import { CallCTA } from '@/components/CallCTA';
import { HomeClientSections } from '@/components/HomeClientSections';
import Link from 'next/link';
import {
  Stethoscope,
  Microscope,
  Brain,
  HeartPulse,
  ChevronRight,
  Activity,
  LayoutDashboard,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

import { Area, getProfessionals } from '@/data/professionals';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Test Playground | Policlínico Tabancura",
  description: "Entorno de pruebas para el Policlínico Tabancura.",
  robots: {
    index: false,
    follow: false
  }
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TestPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  if (resolvedParams.preview !== "true") {
    redirect("/");
  }

  const professionals = await getProfessionals();
  const totalPros = professionals.length;

  return (
    <main className="relative min-h-screen bg-transparent dark:bg-transparent antialiased overflow-x-hidden transition-colors duration-300">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Policlínico Tabancura - Test",
            "alternateName": "Poli Tabancura Test",
            "url": "https://www.policlinicotabancura.cl/test",
            "logo": "https://www.policlinicotabancura.cl/logo.svg",
            "image": "https://www.policlinicotabancura.cl/Sucursales/heroActual.webp",
            "description": "Policlínico Tabancura es una corporación sin fines de lucro en Vitacura.",
            "telephone": "+56229336740",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av Vitacura 8620",
              "addressLocality": "Vitacura",
              "addressRegion": "Región Metropolitana",
              "addressCountry": "CL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -33.3888,
              "longitude": -70.5422
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "08:30",
                "closes": "20:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "13:00"
              }
            ],
            "medicalSpecialty": [
              "Dentistry",
              "Psychiatry",
              "GeneralPractice"
            ],
            "sameAs": [
              "https://www.instagram.com/politabancura/",
              "https://www.facebook.com/profile.php?id=61568214167163",
              "https://www.tiktok.com/@politabancura"
            ]
          })
        }}
      />
      {/* 0. HERO ASISTENTE IA CONTEXTUALIZADO (GOOGLE AI STUDIO FREE TIER) */}
      <AIHeroTester />

      {/* COMPONENTE DE AGENDAMIENTO MODULAR EN TESTING */}
      <section id="agendar" className="py-12 bg-slate-100/50 dark:bg-slate-950/80 my-8 scroll-mt-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-6">
            <span className="bg-[#162158] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              AGENDAMIENTO DE HORAS EN LÍNEA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              Buscador Modular de Horas Disponibles
            </h2>
          </div>
          <ModularScheduler professionals={professionals} />
        </div>
      </section>

      <section className="py-8 bg-transparent dark:bg-transparent mt-10">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] text-center mb-4">
            Confían en nosotros
          </p>
          <PartnerCarousel />
        </div>
      </section>

      <CallCTA />

      {/* 4. VALIDADOR MI VITA */}
      <section id="mivita" className="pt-10 pb-16 relative overflow-hidden bg-transparent dark:bg-transparent scroll-mt-24">


        <div className="container mx-auto px-6 relative z-10">
          <div className="bg-white dark:bg-slate-950 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] border border-slate-300 dark:border-slate-800 p-6 sm:p-8 md:p-20 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.12),0_15px_30px_-10px_rgba(0,0,0,0.06)] dark:shadow-none transition-all">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Columna Izquierda: Contexto */}
              <div className="max-w-xl flex flex-col items-center text-center lg:items-start lg:text-left mx-auto lg:mx-0">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-bold uppercase tracking-widest mb-3">
                  <ShieldCheck size={14} fill="currentColor" className="text-white shrink-0" /> 25% de Descuento (*)
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4 leading-tight tracking-tighter">
                  Beneficio Tarjeta Mi Vita <br />
                </h2>

                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-4">
                  Ingresa tu rut y revisa el estado de tu beneficio. Accede a valores preferenciales en tus atenciones médicas y dentales.
                </p>

                <div className="mb-6 flex items-center justify-center lg:items-start lg:justify-start gap-4">
                  <div className="group shrink-0">
                    <Image
                      src="/logos_convenios_prevision/mivita_v2_light.png"
                      alt="Logo Tarjeta Mi Vita"
                      width={180}
                      height={72}
                      style={{ width: 'auto', height: 'auto' }}
                      className="block dark:hidden object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
                    />
                    <Image
                      src="/logos_convenios_prevision/mivita_v2_dark.png"
                      alt="Logo Tarjeta Mi Vita"
                      width={180}
                      height={72}
                      style={{ width: 'auto', height: 'auto' }}
                      className="hidden dark:block object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-1"
                    />
                  </div>
                </div>

                <div className="mb-8 flex flex-col items-center lg:items-start gap-2">
                  <a
                    href="#agendar"
                    className="bg-[#162158] hover:bg-[#111827] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-300 shadow-md inline-block text-center"
                  >
                    Quiero agendar
                  </a>
                  <span className="text-[10px] text-slate-500 font-medium">*Beneficio sobre el arancel general</span>
                </div>
              </div>

              {/* Columna Derecha: Iframe del Validador */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/5 rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 hover:rotate-6" />
                <div className="relative bg-[#121e42] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 h-[580px] sm:h-[520px] w-full flex flex-col">
                  {/* Falso header de navegador para estilo nativo */}
                  <div className="bg-[#0d1630] border-b border-[#1e316b] p-4 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="mx-auto text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      Valida tu Convenio en Línea <ShieldCheck size={12} className="text-secondary" />
                    </div>
                  </div>
                  {/* Adaptive High-Bottom Crop Iframe */}
                  <div className="relative w-full h-full flex-1 overflow-hidden bg-[#121e42]">
                    <iframe
                      src="https://mivita.policlinicotabancura.cl/"
                      className="absolute w-full h-[105%] left-0 -top-[2%] sm:w-[120%] sm:h-[160%] sm:-left-[10%] sm:-top-[5%] pointer-events-auto origin-center scale-95 sm:scale-100"
                      style={{
                        colorScheme: 'light'
                      }}
                      scrolling="no"
                      frameBorder="0"
                      title="Validador Tarjeta Mi Vita"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECCIONES CLIENTE: RESEÑAS DE GOOGLE & SUCURSALES */}
      <HomeClientSections />

    </main>
  );
}
