"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  Users,
  Calendar,
  FileText,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sun,
  Moon,
  Phone,
  Clock,
  MessageCircle,
  MapPin,
  Instagram,
  Facebook,
  Mail,
  SmilePlus,
  Brain,
  Stethoscope,
  Leaf
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';

const TikTokIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const WhatsAppIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function AlianzasPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-clinical-bg dark:bg-slate-950 font-sans selection:bg-secondary/30">

      {/* 1. CUSTOM NAVBAR FOR ALIANZAS ONLY */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-all duration-300 py-4 shadow-sm">
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo Policlínico */}
          <a href="https://www.policlinicotabancura.cl" className="flex items-center group shrink-0">
            <img
              src="/logo.svg"
              alt="Policlínico Tabancura"
              className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform duration-300 dark:brightness-0 dark:invert"
            />
          </a>

          {/* Right Actions */}
          <div className="flex items-center gap-4">

            {/* "Quiero agendar" Button */}
            <Button
              className="bg-primary hover:bg-primary/90 text-white rounded-xl h-10 px-5 text-xs font-bold transition-all active:scale-95 shadow-md shadow-primary/10"
              onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Quiero agendar
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 lg:pt-40 overflow-hidden">
        <div className="absolute inset-0 bg-[#f8faff] dark:bg-slate-950 z-0" />

        {/* Curva decorativa */}
        <div className="absolute right-0 top-0 h-full w-[45%] bg-white dark:bg-slate-900 z-10 hidden lg:block rounded-l-[10rem] shadow-[-20px_0_60px_rgba(0,0,0,0.02)]" />

        <div className="container mx-auto px-6 relative z-20">
          <div className="flex flex-col lg:flex-row items-center min-h-[85vh] gap-16 py-12 lg:py-0">

            {/* Contenido Izquierda */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#259CF4] text-white text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm">
                <ShieldCheck size={14} className="animate-pulse text-white" /> Beneficio Exclusivo Alianzas
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-primary dark:text-white mb-8 tracking-tighter leading-[0.95]">
                Vuelve a sonreír <br />
                <span className="text-[#259CF4] dark:text-[#259CF4]">
                  sin preocuparte
                </span> <br />
                por nada.
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                Con el programa de <span className="text-primary dark:text-white font-bold">Alianzas Policlínico Tabancura</span> tienes <span className="bg-[#259CF4]/10 text-[#259CF4] px-2 py-0.5 rounded-lg font-black">25% de descuento</span> sobre el arancel general en tu atención.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-[#111827] text-white rounded-full h-16 px-10 text-base font-bold shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 active:scale-95"
                  onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Agenda Ahora <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center justify-center gap-3 px-6 h-16 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-500">
                      <SmilePlus size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-500">
                      <Brain size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-500">
                      <Stethoscope size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center text-green-500">
                      <Leaf size={14} />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">+150 prestaciones disponibles</span>
                </div>
              </div>
            </div>

            {/* Imagen Derecha */}
            <div className="flex-1 relative w-full h-[400px] lg:h-[600px] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-[4rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
              <div className="relative w-full h-full rounded-[4rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl transform lg:rotate-3 group-hover:rotate-0 transition-transform duration-700">
                <Image
                  src="/alianzas_hero_family.png"
                  alt="Familia feliz"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PASOS SECTION */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white mb-4 tracking-tighter leading-tight">
              Sigue los pasos para <br />
              <span className="text-[#259CF4] dark:text-[#259CF4]">
                optar al beneficio
              </span>
            </h2>
            <div className="inline-flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">
              <ChevronRight size={14} className="text-secondary" /> ¿Cómo funciona?
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                step: "01",
                title: "Rellena el formulario de inscripción",
                icon: <FileText className="text-white" size={28} />,
                color: "bg-blue-500"
              },
              {
                step: "02",
                title: "Nuestro equipo te llamará a la brevedad",
                icon: <Users className="text-white" size={28} />,
                color: "bg-blue-500"
              },
              {
                step: "03",
                title: "Asiste a tu hora",
                icon: <Calendar className="text-white" size={28} />,
                color: "bg-blue-500"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group p-10 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-[2rem] ${item.color} flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 leading-tight px-4">
                  {item.title}
                </h3>
                <div className="absolute top-6 right-8 text-4xl font-black text-slate-300 dark:text-slate-700 transition-colors group-hover:text-blue-500/20">
                  {item.step}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30">
              <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                Si solicitaste una hora sin rellenar el formulario, debes avisar en recepción que vienes por el convenio de alianzas y mencionar tu establecimiento.
              </p>
            </div>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              * Beneficio sujeto a validación de convenio vigente con la institución mencionada.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FORMULARIO TALLY */}
      <section id="agendar" className="py-24 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary dark:text-white mb-6 tracking-tighter leading-tight">
              Agenda una <br />
              <span className="text-[#259CF4] dark:text-[#259CF4]">
                hora médica
              </span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
              Por favor, completa tus datos para validar tus beneficios al instante.
            </p>
          </div>

          <div className="tally-wrapper max-w-xl mx-auto">
            <iframe
              src="https://tally.so/embed/nG8j1Z?hideTitle=1&amp;transparentBackground=1"
              loading="lazy"
              title="Alianzas"
              className="w-full min-h-[574px] md:min-h-[654px] border-0 dark:invert dark:hue-rotate-180 dark:contrast-[0.9] dark:brightness-[0.95]"
            />
          </div>
        </div>
      </section>

      {/* 4.5. SUCURSALES Y CTA FINAL */}
      <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-6">

          {/* Header Sucursales */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-600/10">
              <MapPin size={12} className="shrink-0" /> Nuestras Sucursales
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-primary dark:text-white mb-4 tracking-tighter">
              ¿Dónde encontrarnos?
            </h2>
            <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
              Visítanos en cualquiera de nuestros dos centros de alta tecnología en Vitacura.
            </p>
          </div>

          {/* Grid Sucursales */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Casa Matriz - Los Tribunales */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-300 dark:border-slate-800/60 flex flex-col justify-between hover:scale-[1.01] hover:border-emerald-500/25 shadow-sm hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-300">
              <div>
                <h3 className="text-xl font-extrabold text-primary dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> Casa Matriz - Los Tribunales
                </h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 flex items-start gap-1.5">
                  <MapPin size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  Calle Los Tribunales #1268, Vitacura, Santiago
                </p>

                <div className="space-y-3 bg-white/60 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/30 mb-6">
                  <div className="flex gap-2.5 items-start text-xs font-bold text-slate-600 dark:text-slate-300">
                    <Clock size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 mb-0.5">Horarios</span>
                      Lunes a Viernes: 09:00 - 13:00 hrs y 14:00 - 18:30 hrs
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800/40">
                <a
                  href="tel:+56222172635"
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-all"
                >
                  <Phone size={12} className="text-emerald-500" /> +56 2 2217 2635
                </a>
                <a
                  href="https://wa.me/56966187736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 transition-all"
                >
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
            </div>

            {/* Sucursal Vitacura */}
            <div className="p-8 bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-300 dark:border-slate-800/60 flex flex-col justify-between hover:scale-[1.01] hover:border-emerald-500/25 shadow-sm hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-300">
              <div>
                <h3 className="text-xl font-extrabold text-primary dark:text-white mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" /> Sucursal Vitacura
                </h3>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 flex items-start gap-1.5">
                  <MapPin size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  Avenida Vitacura #8620, Vitacura, Santiago
                </p>

                <div className="space-y-3 bg-white/60 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/30 mb-6">
                  <div className="flex gap-2.5 items-start text-xs font-bold text-slate-600 dark:text-slate-300">
                    <Clock size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-slate-400 mb-0.5">Horarios</span>
                      Lunes a Viernes: 08:30 - 20:00 hrs <br />
                      Sábados: 09:00 - 13:00 hrs
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-200 dark:border-slate-800/40">
                <a
                  href="tel:+56229336740"
                  className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-500 transition-all"
                >
                  <Phone size={12} className="text-emerald-500" /> +56 2 2933 6740
                </a>
                <a
                  href="https://wa.me/56965781253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 transition-all"
                >
                  <MessageCircle size={12} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="max-w-xl mx-auto text-center pt-8 border-t border-slate-100 dark:border-slate-900/60">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-4">
              ¿Listo para activar tu descuento y agendar?
            </h3>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 text-sm font-bold shadow-xl shadow-primary/10 transition-all hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
              onClick={() => document.getElementById('agendar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Completar Registro y Reservar Hora <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

        </div>
      </section>

      {/* 5. FOOTER SIMPLIFICADO */}
      <footer className="bg-slate-50 dark:bg-slate-950/60 text-slate-900 dark:text-white pt-20 pb-12 transition-colors duration-300 border-t border-slate-100 dark:border-slate-900 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Columna 1: Brand & Socials */}
            <div className="space-y-6">
              <div className="flex justify-start">
                <img
                  src="/logo.svg"
                  alt="Policlínico Tabancura"
                  className="h-12 w-auto dark:brightness-0 dark:invert"
                />
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-semibold leading-relaxed text-sm">
                Tecnología y cuidado humano al servicio de tu salud.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/politabancura/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-sm border border-slate-100 dark:border-slate-800"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61568214167163"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-sm border border-slate-100 dark:border-slate-800"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@politabancura"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-sm border border-slate-100 dark:border-slate-800"
                >
                  <TikTokIcon size={18} />
                </a>
              </div>
            </div>

            {/* Columna 2: Sucursal Vitacura */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                Sucursal Vitacura
              </h3>
              <div className="space-y-3">
                <p className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm font-semibold leading-relaxed">
                  <MapPin className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <span>Avenida Vitacura #8620, Vitacura, Santiago</span>
                </p>
                <p className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm font-semibold items-center">
                  <Phone className="text-emerald-500 shrink-0" size={16} />
                  <span>+56 2 2933 6740</span>
                </p>
                <a
                  href="https://wa.me/56965781253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-slate-600 dark:text-slate-400 hover:text-emerald-500 text-sm font-semibold items-center transition-colors"
                >
                  <WhatsAppIcon className="text-emerald-500 shrink-0" size={16} />
                  <span>+56 9 6578 1253</span>
                </a>
                <p className="flex gap-3 text-slate-600 dark:text-slate-400 text-xs font-semibold items-start pt-1">
                  <Mail className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <span className="flex flex-col gap-1 min-w-0">
                    <span className="truncate">recepciondental@policlinicotabancura.cl</span>
                    <span className="truncate">recepcionmedica@policlinicotabancura.cl</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Columna 3: Casa Matriz - Los Tribunales */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
                Casa Matriz - Los Tribunales
              </h3>
              <div className="space-y-3">
                <p className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm font-semibold leading-relaxed">
                  <MapPin className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <span>Calle Los Tribunales #1268, Vitacura, Santiago</span>
                </p>
                <p className="flex gap-3 text-slate-600 dark:text-slate-400 text-sm font-semibold items-center">
                  <Phone className="text-emerald-500 shrink-0" size={16} />
                  <span>+56 2 2217 2635</span>
                </p>
                <a
                  href="https://wa.me/56966187736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-3 text-slate-600 dark:text-slate-400 hover:text-emerald-500 text-sm font-semibold items-center transition-colors"
                >
                  <WhatsAppIcon className="text-emerald-500 shrink-0" size={16} />
                  <span>+56 9 6618 7736</span>
                </a>
                <p className="flex gap-3 text-slate-600 dark:text-slate-400 text-xs font-semibold items-center pt-1">
                  <Mail className="text-emerald-500 shrink-0" size={16} />
                  <span className="truncate">secretaria@policlinicotabancura.cl</span>
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs font-semibold text-slate-500 dark:text-slate-500">
            <p className="uppercase tracking-widest">
              © {new Date().getFullYear()} Policlínico Tabancura - Todos los derechos reservados
            </p>
            <p className="uppercase tracking-[0.2em]">
              Tu Salud es nuestra prioridad
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
