export const dynamic = 'force-dynamic';
import React from 'react';
import { ProfessionalFilter } from '@/components/ProfessionalFilter';
import { Area, getProfessionals } from '@/data/professionals';
import { Hero, HeroProps } from '@/components/Hero';
import { ServiceCTA, ServiceCTAProps } from '@/components/ServiceCTA';
import { notFound } from 'next/navigation';
import { Activity, HeartPulse, Sparkles, Brain, SmilePlus, Leaf, Stethoscope, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MinimalistScheduler } from '@/components/MinimalistScheduler';
import { OtherServices } from '@/components/OtherServices';

const SLUG_TO_AREA: Record<string, Area> = {
  'dental': 'Salud Dental',
  'mental': 'Salud Mental',
  'medicina': 'Medicina General',
  'terapias': 'Terapias Complementarias',
};

const SLUG_TO_HERO: Record<string, HeroProps> = {
  'dental': {
    badgeText: "Excelencia Odontológica",
    badgeIconName: 'sparkles',
    titlePrefix: "Salud",
    titleHighlight: "Dental",
    description: "Cuidado integral de tu sonrisa con especialistas de elite y tecnología de vanguardia para resultados excepcionales.",
    images: [
      { src: '/generated/dental_hero.png', alt: 'Clínica Dental Premium', location: 'Casa Matriz - Los Tribunales' },
    ],
    statsNumber: "+5k",
    statsLabel: "Nuevas Sonrisas",
    floatingIconName: 'smilePlus',
    floatingIconBg: 'bg-cyan-500',
    buttonText: "Agenda aquí",
    secondaryButtonText: "Ver Especialistas",
    secondaryButtonAnchorId: "equipo"
  },
  'mental': {
    badgeText: "Compromiso con tu Bienestar",
    badgeIconName: 'brain',
    titlePrefix: "Salud",
    titleHighlight: "Mental",
    description: "Un espacio seguro de acompañamiento profesional para fortalecer tu equilibrio emocional y calidad de vida.",
    images: [
      { src: '/generated/mental_hero.png', alt: 'Terapia Psicológica Especializada', location: 'Centro Médico Vitacura' },
    ],
    statsNumber: "+2k",
    statsLabel: "Vidas Transformadas",
    floatingIconName: 'brain',
    floatingIconBg: 'bg-purple-500',
    buttonText: "Agenda aquí",
    secondaryButtonText: "Ver Especialistas",
    secondaryButtonAnchorId: "equipo"
  },
  'medicina': {
    badgeText: "Cuidado Médico Integral",
    badgeIconName: 'heartPulse',
    titlePrefix: "Medicina",
    titleHighlight: "General",
    description: "Atención primaria de excelencia con un enfoque preventivo y humano para cuidar lo que más importa: tu familia.",
    images: [
      { src: '/generated/medicina_hero.png', alt: 'Atención Médica Integral', location: 'Policlínico Tabancura' },
    ],
    statsNumber: "+8k",
    statsLabel: "Consultas de Calidad",
    floatingIconName: 'stethoscope',
    floatingIconBg: 'bg-blue-500',
    buttonText: "Agenda aquí",
    secondaryButtonText: "Ver Especialistas",
    secondaryButtonAnchorId: "equipo"
  },
  'terapias': {
    badgeText: "Equilibrio y Salud Natural",
    badgeIconName: 'activity',
    titlePrefix: "Terapias",
    titleHighlight: "Complementarias",
    description: "Integración de sabiduría y ciencia para potenciar tu salud natural en un entorno de armonía absoluta.",
    images: [
      { src: '/generated/terapias_hero.png', alt: 'Terapias de Bienestar', location: 'Sala de Bienestar' },
    ],
    statsNumber: "+3k",
    statsLabel: "Sesiones de Sanación",
    floatingIconName: 'leaf',
    floatingIconBg: 'bg-green-500',
    buttonText: "Agenda aquí",
    secondaryButtonText: "Ver Especialistas",
    secondaryButtonAnchorId: "equipo"
  }
};

const SLUG_TO_SCHEDULER_ID: Record<string, string> = {
  'dental': 'saludDental',
  'mental': 'saludMental',
  'medicina': 'medicinaGeneral',
  'terapias': 'terapiasAlternativas',
};

const SLUG_TO_SCHEDULER_CONFIG: Record<string, { badge: string; title: string; accent: string }> = {
  'dental': {
    badge: "Agenda Odontológica",
    title: "Reserva tu Atención Dental",
    accent: "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 dark:bg-cyan-500/20"
  },
  'mental': {
    badge: "Agenda Salud Mental",
    title: "Reserva tu Atención de Salud Mental",
    accent: "text-purple-500 dark:text-purple-400 bg-purple-500/10 dark:bg-purple-500/20"
  },
  'medicina': {
    badge: "Agenda Médica",
    title: "Reserva tu Atención de Medicina",
    accent: "text-blue-500 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-500/20"
  },
  'terapias': {
    badge: "Agenda Bienestar",
    title: "Reserva tu Terapia Complementaria",
    accent: "text-green-500 dark:text-green-400 bg-green-500/10 dark:bg-green-500/20"
  }
};

// En Next.js 15+ (y Next 16), params es una Promesa que debe ser esperada.
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = SLUG_TO_AREA[slug];
  const heroProps = SLUG_TO_HERO[slug];

  if (!area || !heroProps) {
    notFound();
  }

  const professionals = await getProfessionals();
  const areaProfessionals = professionals.filter(p => p.area === area);
  const proCount = areaProfessionals.length;

  // Merge dynamic count into heroProps
  const dynamicHeroProps = {
    ...heroProps,
    statsNumber: `+${proCount}`,
    statsLabel: proCount === 1 ? "Especialista" : "Especialistas"
  };

  return (
    <div id="top" className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Usamos el Hero global pero con props inyectadas para la categoría */}
      <Hero {...dynamicHeroProps} />
      
      <ProfessionalFilter key={slug} initialArea={area} professionals={professionals} />

      <div id="agendar" className="container mx-auto px-6 pb-20 pt-10 scroll-mt-28">
        <div className="max-w-5xl mx-auto">
           <div className="text-center mb-12">
             <span className={`font-bold uppercase tracking-widest text-xs px-4 py-1.5 rounded-full ${SLUG_TO_SCHEDULER_CONFIG[slug]?.accent || 'text-secondary bg-secondary/10'}`}>
               {SLUG_TO_SCHEDULER_CONFIG[slug]?.badge || 'Agenda Ahora'}
             </span>
             <h2 className="text-3xl sm:text-4xl font-black text-primary dark:text-white mt-4 tracking-tight">
               {SLUG_TO_SCHEDULER_CONFIG[slug]?.title || 'Reserva tu Atención Especializada'}
             </h2>
           </div>
           <MinimalistScheduler initialCategoryId={SLUG_TO_SCHEDULER_ID[slug]} />
           
           {/* Botón Volver al Inicio de la Categoría */}
           <div className="mt-12 flex justify-center">
             <Link 
               href="#top"
               className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm group"
             >
               <ArrowLeft size={16} className={`group-hover:-translate-x-1 transition-transform duration-300 ${SLUG_TO_SCHEDULER_CONFIG[slug]?.accent.split(' ')[0] || 'text-secondary'}`} />
               <span className={`text-[11px] font-black uppercase tracking-widest ${SLUG_TO_SCHEDULER_CONFIG[slug]?.accent.split(' ')[0] || 'text-secondary'}`}>
                 Volver al Inicio
               </span>
             </Link>
           </div>
        </div>
      </div>

      {/* Footer Navigation between specialized categories */}
      <OtherServices excludeSlug={slug} />
    </div>
  );
}
