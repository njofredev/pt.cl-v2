import React from 'react';
import { MinimalistScheduler } from '@/components/MinimalistScheduler';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Agenda en Línea | Policlínico Tabancura',
  description: 'Reserva tu hora médica o dental en línea de forma rápida y sencilla.',
};

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-44 md:pt-52 pb-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-primary dark:text-white mb-4 tracking-tighter">
              Agenda <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">en línea</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto mb-8">
              Selecciona la categoría y el servicio que necesitas agendar hoy.
            </p>
          </div>

          {/* Scheduler Component */}
          <div className="relative">
             {/* Background glow - moved behind by using lower z-index or ensuring scheduler is above */}
             <div className="absolute inset-0 bg-secondary/10 blur-[100px] rounded-full scale-90 opacity-50 z-0" />
             <div className="relative z-10">
               <MinimalistScheduler />
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
