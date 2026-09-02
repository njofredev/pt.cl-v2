"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cookie,
  ShieldCheck,
  Lock,
  BarChart3,
  Megaphone,
  Settings,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { openConsentModal } from '@/lib/cookieConsent';

export default function PoliticaCookiesPage() {
  return (
    <main className="min-h-screen bg-clinical-bg dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-44 pb-16 md:pt-52 md:pb-24 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80">
        {/* Luces de fondo sutiles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#1E40AF]/5 dark:bg-[#1E40AF]/15 rounded-full blur-[140px] -translate-y-1/2" />
          <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-[#259CF4]/5 dark:bg-[#259CF4]/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Badges superiores */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E40AF]/10 dark:bg-[#1E40AF]/25 text-[#1E40AF] dark:text-cyan-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Cookie size={14} className="text-[#1E40AF] dark:text-cyan-400" />
                Ley N° 21.719 • Transparencia y Protección de Datos
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#162158] dark:text-white tracking-tight leading-tight mb-6">
                Política de Cookies
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-2xl mx-auto mb-8">
                En el <strong>Policlínico Tabancura</strong> resguardamos tu privacidad y la seguridad de tu información de salud. Te explicamos de manera transparente cómo y para qué utilizamos cookies en este portal.
              </p>

              {/* Botón de configuración interactiva directa */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={openConsentModal}
                  className="bg-[#1E40AF] hover:bg-[#1e3a8a] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl shadow-lg shadow-[#1E40AF]/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Settings size={16} />
                  <span>Configurar mis Preferencias</span>
                </button>

                <Link
                  href="/"
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  <span>Volver al Inicio</span>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. CONTENIDO PRINCIPAL */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="space-y-12 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            
            {/* Sección 1: ¿Qué son las cookies? */}
            <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#259CF4]/10 text-[#259CF4] flex items-center justify-center font-black">
                  1
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#162158] dark:text-white tracking-tight">
                  ¿Qué son las cookies y cómo funcionan?
                </h2>
              </div>
              <p>
                Una cookie es un pequeño archivo de texto que un sitio web guarda en tu ordenador o dispositivo móvil cuando lo visitas. Permiten que el portal recuerde tus acciones y preferencias (como el inicio de sesión, idioma y opciones de visualización) durante un período determinado, evitando que tengas que volver a introducirlos cada vez que navegas de una página a otra.
              </p>
              <p>
                En <strong>Policlínico Tabancura</strong>, las cookies no se utilizan para acceder a tu historial médico confidencial ni para almacenar datos de salud sensibles sin autorización.
              </p>
            </div>

            {/* Sección 2: Marco Legal Chileno */}
            <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                  2
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#162158] dark:text-white tracking-tight">
                  Cumplimiento con la Ley N° 21.719
                </h2>
              </div>
              <p>
                Esta política se adapta de manera estricta a la <strong>Ley N° 21.719 sobre Protección de Datos Personales</strong> en Chile y los estándares internacionales de <em>Privacy by Design</em> (Privacidad desde el Diseño):
              </p>
              <ul className="space-y-2.5 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Consentimiento Previo (Opt-In):</strong> Ninguna cookie no esencial se instala en tu navegador sin tu aprobación expresa y activa.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Simetría en la Elección:</strong> Tienes la misma facilidad para aceptar como para rechazar las cookies no técnicas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Derecho a Revocación:</strong> Puedes cambiar de opinión y ajustar tus preferencias en cualquier momento mediante nuestro panel de privacidad.</span>
                </li>
              </ul>
            </div>

            {/* Sección 3: Categorías de Cookies */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1E40AF]/10 text-[#1E40AF] flex items-center justify-center font-black">
                  3
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#162158] dark:text-white tracking-tight">
                  Categorías de Cookies que utilizamos
                </h2>
              </div>

              {/* Card 1: Esenciales */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-base sm:text-lg">
                    <Lock size={20} />
                    <h3>1. Cookies Técnicas y Esenciales</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Siempre Activas
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Son indispensables para que el sitio web funcione y no pueden desactivarse en nuestros sistemas. Permiten la navegación básica, la seguridad del sitio, el inicio de sesión en el Portal del Paciente, la conexión con los motores de reserva clínica (<strong>Dentalink y Medilink</strong>) y el procesamiento seguro de pagos.
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <strong>Ejemplos:</strong> Tokens de sesión segura, balanceador de carga, registro de tus preferencias de consentimiento de cookies.
                </div>
              </div>

              {/* Card 2: Analíticas */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#259CF4] font-bold text-base sm:text-lg">
                    <BarChart3 size={20} />
                    <h3>2. Cookies Estadísticas y Analíticas</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#259CF4]/10 text-[#259CF4]">
                    Opt-In (Opcionales)
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Nos permiten contar las visitas y fuentes de tráfico para poder evaluar y mejorar el rendimiento de nuestro portal. Nos ayudan a saber qué páginas son las más o menos populares, identificar páginas con enlaces rotos y mejorar la velocidad de carga para los pacientes.
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <strong>Proveedores:</strong> Google Analytics 4 (GA4), Microsoft Clarity. La información se procesa de forma agregada y anónima.
                </div>
              </div>

              {/* Card 3: Marketing */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400 font-bold text-base sm:text-lg">
                    <Megaphone size={20} />
                    <h3>3. Cookies de Publicidad y Marketing</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    Opt-In (Opcionales)
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios para crear un perfil de tus intereses y mostrarte anuncios pertinentes sobre nuestras campañas de salud preventiva (ej. operativos dentales, bono PAD Fonasa o descuentos comunales Mi Vita).
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <strong>Proveedores:</strong> Meta Pixel (Facebook / Instagram Ads).
                </div>
              </div>
            </div>

            {/* Sección 4: Declaración de Consentimiento y Desactivación */}
            <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#1E40AF]/10 text-[#1E40AF] flex items-center justify-center font-black">
                  4
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#162158] dark:text-white tracking-tight">
                  Consentimiento y Desactivación de Cookies
                </h2>
              </div>
              <p>
                Al navegar y continuar en el sitio web de <strong>Policlínico Tabancura</strong>, Ud. nos está consintiendo en el uso de las cookies antes enunciadas, y en las condiciones contenidas en la presente Política de Cookies.
              </p>
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                Al visitar el sitio web de <a href="https://www.policlinicotabancura.cl/" className="font-bold text-[#1E40AF] dark:text-cyan-400 hover:underline">https://www.policlinicotabancura.cl/</a>, Ud. podrá desactivar el uso de cookies. Sin embargo, es importante señalar que la falta de ellas puede significar que ciertas funcionalidades del sitio web no estén disponibles afectando en todo o parte su funcionalidad y/o el resultado de este.
              </div>
            </div>

            {/* Sección 5: ¿Cómo gestionar o deshabilitar cookies en tu navegador? */}
            <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                  5
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#162158] dark:text-white tracking-tight">
                  Gestión desde tu navegador web
                </h2>
              </div>
              <p>
                Además de usar nuestro panel de preferencias interactivo, puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones de tu navegador de internet:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-[#1E40AF] transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200 group"
                >
                  <span>Google Chrome</span>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-[#1E40AF]" />
                </a>

                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-[#1E40AF] transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200 group"
                >
                  <span>Apple Safari</span>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-[#1E40AF]" />
                </a>

                <a
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-[#1E40AF] transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200 group"
                >
                  <span>Mozilla Firefox</span>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-[#1E40AF]" />
                </a>

                <a
                  href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between hover:border-[#1E40AF] transition-colors text-xs font-semibold text-slate-700 dark:text-slate-200 group"
                >
                  <span>Microsoft Edge</span>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-[#1E40AF]" />
                </a>
              </div>
            </div>

            {/* Sección 6: Contacto y Actualizaciones */}
            <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                  6
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#162158] dark:text-white tracking-tight">
                  Contacto y Dudas sobre Privacidad
                </h2>
              </div>
              <p>
                Si tienes cualquier consulta sobre el uso de cookies o sobre el tratamiento de tus datos personales en Policlínico Tabancura, puedes contactar a nuestro equipo de atención:
              </p>
              <div className="space-y-2 pt-2 text-sm">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail size={16} className="text-[#259CF4] shrink-0" />
                  <a href="mailto:datos@policlinicotabancura.cl" className="font-bold text-[#1E40AF] dark:text-[#259CF4] hover:underline">
                    datos@policlinicotabancura.cl
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <MapPin size={16} className="text-[#259CF4] shrink-0" />
                  <span>Casa Matriz: Calle Los Tribunales #1268, Vitacura | Centro Médico: Av. Vitacura #8620</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 font-medium">
                Última actualización: Septiembre de 2026 • Versión 1.0 (Ley N° 21.719)
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
