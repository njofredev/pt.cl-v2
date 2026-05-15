"use client";

import React from 'react';
import Link from 'next/link';
import { SmilePlus, Brain, Stethoscope, Leaf, ChevronRight } from 'lucide-react';

const NAV_SERVICES = [
  { slug: 'dental', name: 'Dental', fullName: 'Salud Dental', icon: SmilePlus, color: 'cyan' },
  { slug: 'mental', name: 'Salud Mental', fullName: 'Salud Mental', icon: Brain, color: 'purple' },
  { slug: 'medicina', name: 'Médica', fullName: 'Medicina General', icon: Stethoscope, color: 'blue' },
  { slug: 'terapias', name: 'Bienestar', fullName: 'Terapias Complementarias', icon: Leaf, color: 'emerald' },
];

const colorClasses: Record<string, { text: string; bg: string; hover: string }> = {
  cyan: { text: 'text-cyan-500', bg: 'bg-cyan-500/10', hover: 'hover:bg-cyan-500 hover:text-white' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-500/10', hover: 'hover:bg-purple-500 hover:text-white' },
  blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', hover: 'hover:bg-blue-500 hover:text-white' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', hover: 'hover:bg-emerald-500 hover:text-white' }
};

export const OtherServices = ({ excludeSlug }: { excludeSlug?: string }) => {
  return (
    <div className="w-full border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-slate-950/30 py-16 pb-24">
      <div className="container mx-auto px-6 text-center">
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8">
          Explora nuestras especialidades
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
          {NAV_SERVICES.filter(item => item.slug !== excludeSlug).map((item) => {
            const Icon = item.icon;
            const colors = colorClasses[item.color];
            return (
              <Link
                key={item.slug}
                href={`/servicios/${item.slug}`}
                className={`group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colors.bg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div className="text-left pr-2">
                  <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1 group-hover:text-primary dark:group-hover:text-white transition-colors">Ver Área</span>
                  <span className="block text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {item.fullName}
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-primary dark:group-hover:text-secondary group-hover:translate-x-1 transition-all ml-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
