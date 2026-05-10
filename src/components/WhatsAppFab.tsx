"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

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

export function WhatsAppFab() {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-5 items-end pointer-events-none">
      {WHATSAPP_LINKS.map((wa, idx) => (
        <motion.a
          key={wa.id}
          href={wa.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5 + idx * 0.15, type: 'spring', stiffness: 260, damping: 20 }}
          className="pointer-events-auto group flex items-center gap-3 relative"
        >
          {/* Etiqueta Lateral que aparece/resalta en hover */}
          <span className="bg-white dark:bg-slate-900 text-primary dark:text-white shadow-lg border border-slate-100 dark:border-slate-800 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest opacity-90 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 shadow-black/5 select-none">
            {wa.label}
          </span>

          {/* El Botón Circular Tipo WhatsApp */}
          <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#25D366]/20 cursor-pointer transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-active:scale-95 relative">
            <MessageCircle size={28} fill="currentColor" strokeWidth={0} className="ml-[1px]" />
            
            {/* El Punto Rojo de Notificación (Solicitado por el usuario) */}
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
