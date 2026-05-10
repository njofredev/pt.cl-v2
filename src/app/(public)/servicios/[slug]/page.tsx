import React from 'react';
import { ProfessionalFilter } from '@/components/ProfessionalFilter';
import { Area, getProfessionals } from '@/data/professionals';
import { Hero, HeroProps } from '@/components/Hero';
import { ServiceCTA, ServiceCTAProps } from '@/components/ServiceCTA';
import { notFound } from 'next/navigation';
import { Activity, HeartPulse, Sparkles, Brain } from 'lucide-react';
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
    floatingIconBg: 'bg-cyan-500'
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
    floatingIconBg: 'bg-purple-500'
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
    floatingIconBg: 'bg-blue-500'
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
    floatingIconBg: 'bg-green-500'
  }
};

const SLUG_TO_SCHEDULER_ID: Record<string, string> = {
  'dental': 'saludDental',
  'mental': 'saludMental',
  'medicina': 'medicinaGeneral',
  'terapias': 'terapiasAlternativas',
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

      <ProfessionalFilter key={slug} initialArea={area} professionals={professionals} />

      <div id="agendar" className="container mx-auto px-6 pb-32 pt-10 scroll-mt-28">
        <div className="max-w-5xl mx-auto">
           <div className="text-center mb-12">
             <span className="text-secondary font-bold uppercase tracking-widest text-xs bg-secondary/10 px-4 py-1.5 rounded-full">Agenda Ahora</span>
             <h2 className="text-3xl sm:text-4xl font-black text-primary dark:text-white mt-4 tracking-tight">
               Reserva tu Atención Especializada
             </h2>
           </div>
           <MinimalistScheduler initialCategoryId={SLUG_TO_SCHEDULER_ID[slug]} />
        </div>
      </div>
    </div>
  );
}
