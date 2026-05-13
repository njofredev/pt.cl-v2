"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const WHATSAPP_LINKS = [
  {
    id: 'vitacura',
    label: 'Vitacura',
    phone: '+569 6578 1253',
    url: 'https://wa.me/56965781253'
  },
  {
    id: 'tribunales',
    label: 'Tribunales',
    phone: '+569 6618 7736',
    url: 'https://wa.me/56966187736'
  }
];

// Motion variants for Mobile Stagger animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.85 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
  exit: { opacity: 0, y: 12, scale: 0.9, transition: { duration: 0.15 } }
};

export function WhatsAppFab() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Control del acordeón en móvil
  const [mounted, setMounted] = useState(false); // Evitar hidratación incorrecta

  useEffect(() => {
    setMounted(true);
    if (typeof document === 'undefined') return;
    
    // Check inicial de menú móvil
    setIsMenuOpen(document.body.classList.contains('mobile-menu-open'));

    // Auto-colapsar el acordeón si el menú nav principal cambia de estado
    const observer = new MutationObserver(() => {
      const open = document.body.classList.contains('mobile-menu-open');
      setIsMenuOpen(open);
      if (open) setIsExpanded(false); // Colapsar por si acaso
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(false); // Auto-cerrar al abrir búsqueda en móvil
    
    if (typeof window !== 'undefined') {
      if ((window as any).__openGlobalSearch) {
        (window as any).__openGlobalSearch();
      } else {
        window.dispatchEvent(new CustomEvent('open-search-modal'));
      }
    }
  };

  // Prevenir errores de hidratación al no renderizar nada en el servidor (ideal para componentes puramente flotantes de interacción)
  if (!mounted) return null;

  return (
    <>
      {/* ==================================================
          WIDGET FLOTANTE UNIFICADO (Diseño Acordeón Apilado)
          ================================================== */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[100] flex flex-col-reverse gap-3 items-end pointer-events-none">
        
        {/* 1. Botón Gatillo Principal (Diseño Apilado Diagonal) */}
        <motion.button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          aria-label={isExpanded ? "Cerrar opciones flotantes" : "Ver canales de atención y buscador"}
          className={`pointer-events-auto w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full flex items-center justify-center shadow-2xl border-none relative group transition-all duration-300 select-none ${
            isExpanded 
              ? "bg-slate-950 text-white shadow-slate-950/20 scale-95" 
              : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 shadow-black/10 animate-bounce-subtle hover:scale-105 cursor-pointer"
          }`}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -60, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 60, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="trigger"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center select-none"
              >
                {/* Círculo Atrás: Diagonal Superior Izquierda (Buscar) */}
                <div className="absolute top-0.5 left-0.5 w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] bg-slate-950 border border-white/10 rounded-full flex items-center justify-center text-white shadow-sm -translate-x-0.5 -translate-y-0.5">
                  <Search className="w-2 h-2 sm:w-2.5 sm:h-2.5" strokeWidth={3.5} />
                </div>

                {/* Círculo Atrás: Diagonal Inferior Derecha (WhatsApp 2) */}
                <div className="absolute bottom-0.5 right-0.5 w-[17px] h-[17px] sm:w-[19px] sm:h-[19px] bg-[#25D366] border border-white/10 rounded-full flex items-center justify-center text-white shadow-sm translate-x-0.5 translate-y-0.5">
                  <WhatsAppIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>

                {/* Círculo Centro y Frente: WhatsApp Principal */}
                <div className="relative w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] bg-[#25D366] border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-white shadow-md z-10">
                  <WhatsAppIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  {/* Notificación de alerta unida al centro */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* 2. Grupo de Opciones Desplegables (Cae arriba del botón gatillo) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-col gap-2.5 items-end pointer-events-none mb-1"
            >
              {/* Opción: Buscar */}
              <motion.button
                type="button"
                variants={itemVariants}
                onClick={handleSearchClick}
                className="pointer-events-auto group flex items-center gap-2.5 relative cursor-pointer border-none bg-transparent outline-none"
              >
                <span className="bg-slate-950 dark:bg-slate-900 text-white border border-white/5 shadow-lg px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all select-none opacity-90 group-hover:opacity-100 group-hover:-translate-x-0.5 duration-300">
                  Buscar
                </span>
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-lg shadow-black/20 relative border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-active:scale-95">
                  <Search className="w-[17px] h-[17px] sm:w-[19px] sm:h-[19px]" strokeWidth={2.5} />
                </div>
              </motion.button>

              {/* Opción: WhatsApp Sucursales */}
              {WHATSAPP_LINKS.map((wa) => (
                <motion.a
                  key={wa.id}
                  variants={itemVariants}
                  href={wa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsExpanded(false)} // Auto-colapsar al cliquear destino
                  className="pointer-events-auto group flex items-center gap-2.5 relative"
                >
                  <span className="bg-white dark:bg-slate-900 text-primary dark:text-white border border-slate-100 dark:border-slate-800 shadow-lg px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all select-none opacity-90 group-hover:opacity-100 group-hover:-translate-x-0.5 duration-300 shadow-black/5">
                    {wa.label}
                  </span>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#25D366]/20 relative transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-active:scale-95 cursor-pointer">
                    <WhatsAppIcon className="w-[22px] h-[22px] sm:w-6 sm:h-6" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
      `}</style>
    </>
  );
}
