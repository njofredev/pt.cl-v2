"use client";
import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export const CallCTA = () => {
  return (
    <div className="border-t border-[#111a46] dark:border-slate-800 bg-[#162158] text-white px-4 py-4 sm:py-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs sm:text-sm font-medium transition-colors">
      <span className="flex items-center gap-1.5 font-bold text-white tracking-wide">
        <Phone className="w-4 h-4 text-[#259CF4] shrink-0" />
        ¿Prefieres agendar por teléfono?
      </span>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <a
          href="tel:+56222172635"
          onClick={() => trackEvent('click_llamar', { label: 'Scheduler Footer Los Tribunales' })}
          className="inline-flex items-center gap-1.5 text-white/85 hover:text-[#259CF4] font-semibold transition-colors group"
        >
          <MapPin className="w-3.5 h-3.5 text-[#259CF4]/80 group-hover:text-[#259CF4] transition-colors shrink-0" />
          <span>Los Tribunales:</span>
          <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-[#259CF4] font-black text-white group-hover:text-[#259CF4]">
            +56 2 2217 2635
          </span>
        </a>

        <span className="hidden sm:inline text-white/30">•</span>

        <a
          href="tel:+56229336740"
          onClick={() => trackEvent('click_llamar', { label: 'Scheduler Footer Vitacura' })}
          className="inline-flex items-center gap-1.5 text-white/85 hover:text-[#259CF4] font-semibold transition-colors group"
        >
          <MapPin className="w-3.5 h-3.5 text-[#259CF4]/80 group-hover:text-[#259CF4] transition-colors shrink-0" />
          <span>Vitacura:</span>
          <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-[#259CF4] font-black text-white group-hover:text-[#259CF4]">
            +56 2 2933 6740
          </span>
        </a>
      </div>
    </div>
  );
};

