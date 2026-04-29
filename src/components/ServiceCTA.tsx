import React from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ServiceCTAProps {
  title: string;
  description: string;
  buttonText?: string;
  themeGradient?: string;
}

export const ServiceCTA = ({ 
  title, 
  description, 
  buttonText = "Agendar Ahora",
  themeGradient = "from-primary to-primary/80" // Default dark blue
}: ServiceCTAProps) => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <div className={`relative overflow-hidden rounded-[3rem] bg-gradient-to-br ${themeGradient} p-12 md:p-20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 text-white`}>
          
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,0 L100,100 M100,0 L0,100" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tighter">
              {title}
            </h2>
            <p className="text-lg text-white/80 font-medium leading-relaxed">
              {description}
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Button size="lg" className="bg-white hover:bg-slate-50 text-primary rounded-2xl px-10 h-16 text-lg font-bold shadow-xl transition-all hover:scale-105">
              <CalendarCheck className="mr-2" />
              {buttonText}
              <ArrowRight className="ml-2 opacity-50" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
};
