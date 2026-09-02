"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Settings,
  X,
  Lock,
  BarChart3,
  Megaphone,
  Check,
  Info,
  Cookie
} from "lucide-react";
import Link from "next/link";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_OPEN_EVENT,
  getStoredConsent,
  saveConsent,
  CookiePreferences
} from "@/lib/cookieConsent";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Estados granulares de consentimiento (por defecto solo esenciales activas)
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Cargar estado inicial y escuchar eventos de reapertura
  useEffect(() => {
    setMounted(true);
    const existing = getStoredConsent();

    if (!existing) {
      // Si no existe consentimiento previo, mostrar banner con animación
      setIsOpen(true);
    } else {
      setAnalyticsConsent(existing.analytics);
      setMarketingConsent(existing.marketing);
    }

    // Escuchar evento para reabrir el panel desde el footer u otro componente
    const handleOpenModal = () => {
      const current = getStoredConsent();
      if (current) {
        setAnalyticsConsent(current.analytics);
        setMarketingConsent(current.marketing);
      }
      setShowModal(true);
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenModal);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpenModal);
    };
  }, []);

  if (!mounted) return null;

  // Acciones de consentimiento con registro de auditoría legal
  const handleAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true }, 'accept_all');
    setAnalyticsConsent(true);
    setMarketingConsent(true);
    setIsOpen(false);
    setShowModal(false);
  };

  const handleRejectAll = () => {
    saveConsent({ analytics: false, marketing: false }, 'reject_all');
    setAnalyticsConsent(false);
    setMarketingConsent(false);
    setIsOpen(false);
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    saveConsent({ analytics: analyticsConsent, marketing: marketingConsent }, 'custom_preferences');
    setIsOpen(false);
    setShowModal(false);
  };

  return (
    <>
      {/* 1. BANNER PRINCIPAL DE CONSENTIMIENTO (Full-Width Bottom Docked) */}
      <AnimatePresence>
        {isOpen && !showModal && (
          <motion.aside
            role="region"
            aria-label="Consentimiento de Cookies y Privacidad"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-0 inset-x-0 w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-[0_-10px_35px_rgba(0,0,0,0.12)] text-slate-900 dark:text-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
                
                {/* Lado Izquierdo: Información, Ley 21.719 y Copywriting */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#1E40AF]/10 dark:bg-[#1E40AF]/25 text-[#1E40AF] dark:text-cyan-400 flex items-center justify-center shrink-0">
                      <Cookie className="w-4 h-4" strokeWidth={2.2} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#259CF4] bg-[#259CF4]/10 px-2 py-0.5 rounded-full">
                      Ley N° 21.719
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#162158] dark:text-white tracking-tight">
                      Resguardamos tu privacidad médica
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                    Utilizamos cookies para garantizar el agendamiento clínico seguro, pagos y análisis estadístico. Puedes aceptar todas, rechazarlas o configurar tus preferencias. Más información en nuestra{" "}
                    <Link
                      href="/politica-de-cookies"
                      className="font-bold text-[#1E40AF] dark:text-[#259CF4] underline underline-offset-2 hover:opacity-80 inline"
                    >
                      Política de Cookies
                    </Link>.
                  </p>
                </div>

                {/* Lado Derecho: Acciones Sólidas y Simétricas */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
                  {/* Botón 1: Aceptar Todas */}
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="bg-[#1E40AF] hover:bg-[#1e3a8a] text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-5 rounded-xl transition-all shadow-md shadow-[#1E40AF]/20 hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Check size={16} strokeWidth={2.5} />
                    <span>Aceptar todas</span>
                  </button>

                  {/* Botón 2: Rechazar / Solo Esenciales (Simetría visual exacta) */}
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="bg-white dark:bg-slate-900 border-2 border-[#1E40AF] dark:border-blue-400 text-[#1E40AF] dark:text-blue-400 hover:bg-[#1E40AF]/5 font-bold text-xs sm:text-sm py-2 sm:py-2.5 px-5 rounded-xl transition-all active:scale-98 cursor-pointer flex items-center justify-center whitespace-nowrap"
                  >
                    <span>Rechazar / Solo Esenciales</span>
                  </button>

                  {/* Botón 3: Configurar */}
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-[#162158] dark:hover:text-white py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Settings size={14} />
                    <span>Configurar</span>
                  </button>
                </div>

              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. MODAL DE PREFERENCIAS GRANULARES */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Caja Modal */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-consent-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 max-h-[90vh] flex flex-col overflow-hidden text-slate-900 dark:text-white"
            >
              {/* Header Modal */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#259CF4] bg-[#259CF4]/10 px-2 py-0.5 rounded-full">
                      Ley N° 21.719
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Privacidad por Diseño
                    </span>
                  </div>
                  <h2 id="modal-consent-title" className="text-xl sm:text-2xl font-black text-[#162158] dark:text-white tracking-tight">
                    Panel de Preferencias de Cookies
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Configura de forma granular qué categorías de cookies deseas autorizar durante tu navegación.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
                  aria-label="Cerrar modal de configuración"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Categorías de Cookies Granulares (Scrollable) */}
              <div className="space-y-4 overflow-y-auto pr-1 flex-1 py-1">
                
                {/* Categoría 1: Esenciales (Obligatorias) */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Lock size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Cookies Técnicas / Esenciales
                        </h4>
                        <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                          Obligatorias - Siempre Activas
                        </span>
                      </div>
                    </div>

                    {/* Toggle Switch Bloqueado en ON */}
                    <div className="flex items-center">
                      <div
                        className="w-12 h-6.5 bg-emerald-500 rounded-full p-1 cursor-not-allowed opacity-90 flex items-center justify-end"
                        title="Estas cookies son técnicamente necesarias y no se pueden desactivar"
                      >
                        <div className="w-4.5 h-4.5 bg-white rounded-full shadow-md flex items-center justify-center text-[10px] text-emerald-700 font-bold">
                          ✓
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                    Necesarias para la navegación básica, la seguridad del sitio web, el inicio de sesión en el Portal del Paciente y el correcto funcionamiento del software de reserva de citas médicas. No guardan información de identificación personal.
                  </p>
                </div>

                {/* Categoría 2: Estadísticas / Analíticas */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#259CF4]/10 text-[#259CF4] flex items-center justify-center shrink-0">
                        <BarChart3 size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Cookies Estadísticas / Analíticas
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Google Analytics, Clarity • {analyticsConsent ? "Activas" : "Desactivadas"}
                        </span>
                      </div>
                    </div>

                    {/* Toggle Switch Interactivo */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={analyticsConsent}
                      onClick={() => setAnalyticsConsent(!analyticsConsent)}
                      className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                        analyticsConsent ? "bg-[#1E40AF] justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                      }`}
                    >
                      <motion.div
                        layout
                        className="w-4.5 h-4.5 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                    Nos permiten contar las visitas, analizar el rendimiento de la web y detectar páginas con errores para mejorar la velocidad y la experiencia del usuario en nuestro portal.
                  </p>
                </div>

                {/* Categoría 3: Publicidad y Marketing */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 transition-colors">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                        <Megaphone size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Cookies de Publicidad y Marketing
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Meta Pixel, Campañas • {marketingConsent ? "Activas" : "Desactivadas"}
                        </span>
                      </div>
                    </div>

                    {/* Toggle Switch Interactivo */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={marketingConsent}
                      onClick={() => setMarketingConsent(!marketingConsent)}
                      className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer flex items-center ${
                        marketingConsent ? "bg-[#1E40AF] justify-end" : "bg-slate-300 dark:bg-slate-700 justify-start"
                      }`}
                    >
                      <motion.div
                        layout
                        className="w-4.5 h-4.5 bg-white rounded-full shadow-md"
                      />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-10">
                    Utilizadas para hacer el seguimiento de los visitantes en la web con el fin de mostrar anuncios y promociones relevantes sobre nuestras campañas de salud y nuevos servicios médicos.
                  </p>
                </div>

              </div>

              {/* Botones de Acción del Modal */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="text-xs font-bold text-slate-500 hover:text-red-600 dark:hover:text-red-400 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Rechazar Todo
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="text-xs font-bold text-[#1E40AF] dark:text-[#259CF4] hover:underline px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Aceptar Todo
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="bg-[#1E40AF] hover:bg-[#1e3a8a] text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md shadow-[#1E40AF]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check size={16} strokeWidth={2.5} />
                  <span>Guardar Selección</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. BOTÓN FLOTANTE PERMANENTE DE REVOCABILIDAD (Ley N° 21.719) */}
      {/* Permite al paciente volver a configurar sus cookies en cualquier momento (visible cuando el banner principal se ha cerrado) */}
      {!isOpen && (
        <aside aria-label="Acceso a configuración de cookies" className="fixed bottom-4 left-4 z-40">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] dark:hover:text-cyan-400 p-2.5 sm:px-3 sm:py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-800 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-xs font-bold"
            title="Configurar privacidad y cookies (Ley N° 21.719)"
          >
            <div className="w-5 h-5 rounded-full bg-[#1E40AF]/10 dark:bg-[#1E40AF]/30 text-[#1E40AF] dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Cookie size={12} strokeWidth={2.5} />
            </div>
            <span className="hidden md:inline font-semibold text-[11px]">
              Privacidad & Cookies
            </span>
          </button>
        </aside>
      )}
    </>
  );
}
