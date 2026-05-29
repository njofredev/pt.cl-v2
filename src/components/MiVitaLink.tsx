"use client";

import React from 'react';
import { trackEvent } from '@/lib/analytics';
import { ChevronRight } from 'lucide-react';

export function MiVitaLink() {
  return (
    <a
      href="https://tarjetamivita.cl/beneficio/policlinico-tabacura"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('click_convenio', { label: 'Tarjeta Mi Vita Ver Mas' })}
      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-[#0b2465] to-[#061848] hover:from-[#0e3085] hover:to-[#0a2569] text-white rounded-full text-[10px] font-extrabold tracking-wider transition-all duration-300 shadow-md shadow-blue-900/10 hover:shadow-blue-900/20 mt-1 -ml-14 z-10 border-0"
    >
      <span>Ver más</span>
      <ChevronRight size={10} className="shrink-0" />
    </a>
  );
}
