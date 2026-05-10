export const dynamic = 'force-dynamic';
import React from 'react';
import { ProfessionalFilter } from '@/components/ProfessionalFilter';
import { Area, getProfessionals } from '@/data/professionals';
import { Hero, HeroProps } from '@/components/Hero';
import { ServiceCTA, ServiceCTAProps } from '@/components/ServiceCTA';
import { notFound } from 'next/navigation';
import { Activity, HeartPulse, Sparkles, Brain, SmilePlus, Leaf, Stethoscope, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MinimalistScheduler } from '@/components/MinimalistScheduler';

const SLUG_TO_AREA: Record<string, Area> = {
  'dental': 'Salud Dental',
  'mental': 'Salud Mental',
  'medicina': 'Medicina General',
  'terapias': 'Terapias Complementarias',
};

const SLUG_TO_HERO: Record<string, HeroProps> = {
  'dental': {
    badgeText: "Especialidad Odontológica",
    badgeIconName: 'sparkles',
    titlePrefix: "Salud",
    titleHighlight: "Dental.",
    description: "Contamos con los mejores especialistas de la zona en salud dental, con tecnología de vanguardia y atención personalizada.",
    images: [
      { src: '/generated/dental_hero.png', alt: 'Clínica Dental Premium', location: 'Policlínico Tabancura' },
    ],
    statsNumber: "+5k",
    statsLabel: "Sonrisas Sanas",
    floatingIconName: 'smilePlus',
    floatingIconBg: 'bg-cyan-500',
    secondaryButtonText: "Conoce Nuestro Equipo",
    secondaryButtonAnchorId: "equipo"
  },
  'mental': {
    badgeText: "Especialidad Psicológica",
    badgeIconName: 'brain',
    titlePrefix: "Salud",
    titleHighlight: "Mental.",
    description: "Acompañamiento psicológico y psiquiátrico con enfoque humano y profesional para tu bienestar integral.",
    images: [
      { src: '/generated/mental_hero.png', alt: 'Terapia Psicológica Especializada', location: 'Espacio de Confianza' },
    ],
    statsNumber: "+2k",
    statsLabel: "Pacientes Apoyados",
    floatingIconName: 'brain',
    floatingIconBg: 'bg-purple-500',
    secondaryButtonText: "Conoce Nuestro Equipo",
    secondaryButtonAnchorId: "equipo"
  },
  'medicina': {
    badgeText: "Atención Primaria",
    badgeIconName: 'heartPulse',
    titlePrefix: "Medicina",
    titleHighlight: "General.",
    description: "Atención primaria integral para toda tu familia con diagnósticos precisos y derivación oportuna.",
    images: [
      { src: '/generated/medicina_hero.png', alt: 'Atención Médica Integral', location: 'Box Médico Central' },
    ],
    statsNumber: "+8k",
    statsLabel: "Atenciones Anuales",
    floatingIconName: 'stethoscope',
    floatingIconBg: 'bg-blue-500',
    secondaryButtonText: "Conoce Nuestro Equipo",
    secondaryButtonAnchorId: "equipo"
  },
  'terapias': {
    badgeText: "Bienestar Integral",
    badgeIconName: 'activity',
    titlePrefix: "Terapias",
    titleHighlight: "Complementarias.",
    description: "Enfoque holístico para tu salud con profesionales certificados en diversas disciplinas complementarias.",
    images: [
      { src: '/generated/terapias_hero.png', alt: 'Terapias de Bienestar', location: 'Sala de Armonía' },
    ],
    statsLabel: "Sesiones Realizadas",
    floatingIconName: 'leaf',
    floatingIconBg: 'bg-green-500',
    secondaryButtonText: "Conoce Nuestro Equipo",
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

const NAV_SERVICES = [
  { slug: 'dental', name: 'Dental', fullName: 'Salud Dental', icon: SmilePlus, color: 'cyan', ring: 'ring-cyan-500/20' },
  { slug: 'mental', name: 'Salud Mental', fullName: 'Salud Mental', icon: Brain, color: 'purple', ring: 'ring-purple-500/20' },
  { slug: 'medicina', name: 'Médica', fullName: 'Medicina General', icon: Stethoscope, color: 'blue', ring: 'ring-blue-500/20' },
  { slug: 'terapias', name: 'Bienestar', fullName: 'Terapias Complementarias', icon: Leaf, color: 'emerald', ring: 'ring-emerald-500/20' },
];

const colorClasses: Record<string, { text: string; bg: string; hover: string }> = {
  cyan: { text: 'text-cyan-500', bg: 'bg-cyan-500/10', hover: 'hover:bg-cyan-500 hover:text-white' },
  purple: { text: 'text-purple-500', bg: 'bg-purple-500/10', hover: 'hover:bg-purple-500 hover:text-white' },
  blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', hover: 'hover:bg-blue-500 hover:text-white' },
  emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500/10', hover: 'hover:bg-emerald-500 hover:text-white' }
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Usamos el Hero global pero con props inyectadas para la categoría */}
      <Hero {...heroProps} />
      
      <div id="equipo" className="scroll-mt-32">
        <ProfessionalFilter key={slug} initialArea={area} professionals={professionals} />
      </div>

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
        </div>
      </div>

      {/* Footer Navigation between specialized categories */}
      <div className="w-full border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-slate-950/30 py-16 pb-24">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8">
            Explora otras especialidades
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {NAV_SERVICES.filter(item => item.slug !== slug).map((item) => {
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
    </div>
  );
}
