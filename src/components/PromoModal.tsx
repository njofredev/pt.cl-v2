"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface PromoModalProps {
  storageKey?: string;
  imageSrc?: string;
  link?: string;
  title?: string;
  trackingLabel?: string;
}

export function PromoModal({
  storageKey = "promo_limpieza_octubre_2026_seen",
  imageSrc = "/promociones-activas/PromocionLimpiezaOctubre.png",
  link = "https://ff.healthatom.io/CpAdwX",
  title = "Promoción Limpieza Dental Octubre",
  trackingLabel = "Popup Promo Limpieza Octubre"
}: PromoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem(storageKey);
      if (!hasSeen) {
        // Pequeño retardo de cortesía para una carga limpia
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [storageKey]);

  const handleClose = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(storageKey, "true");
    } catch {
      // noop
    }
  };

  const handleClickLink = () => {
    trackEvent("click_promocion", { label: trackingLabel });
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop con desenfoque suave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="font-sans relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-200/60 flex flex-col"
          >
            {/* Botón cerrar sutil */}
            <button
              onClick={handleClose}
              aria-label="Cerrar promoción"
              className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900/85 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Imagen clickeable */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClickLink}
              className="block group relative overflow-hidden cursor-pointer"
            >
              <div className="relative w-full aspect-square bg-white flex items-center justify-center">
                <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 90vw, 448px"
                  className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  priority
                />
              </div>
            </a>

            {/* Footer minimalista: solo botón Agendar sin franjas/bordes extra */}
            <div className="p-3 bg-white flex items-center justify-center">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClickLink}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-normal text-sm py-2.5 px-6 rounded-xl shadow-xs transition-colors cursor-pointer tracking-normal"
              >
                Agendar
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
