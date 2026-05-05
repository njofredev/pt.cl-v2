import React from 'react';
import { ProfessionalFilter } from '@/components/ProfessionalFilter';
import { Area, getProfessionals } from '@/data/professionals';
import { Hero, HeroProps } from '@/components/Hero';
import { ServiceCTA, ServiceCTAProps } from '@/components/ServiceCTA';
import { notFound } from 'next/navigation';
import { Activity, HeartPulse, Sparkles, Brain } from 'lucide-react';

const SLUG_TO_AREA: Record<string, Area> = {
  'dental': 'Salud Dental',
  'mental': 'Salud Mental',
  'medicina': 'Medicina General',
  'terapias': 'Terapias Alternativas',
};

const SLUG_TO_HERO: Record<string, HeroProps> = {
  'dental': {
    badgeText: "Especialidad Odontológica",
    badgeIconName: 'sparkles',
    titlePrefix: "Salud",
    titleHighlight: "Dental.",
    description: "Contamos con los mejores especialistas de la zona en salud dental, con tecnología de vanguardia y atención personalizada.",
    images: [
      { src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200', alt: 'Clínica Dental', location: 'Box Odontológico' },
      { src: 'https://images.unsplash.com/photo-1598256989800-fea5f5ce7382?q=80&w=1200', alt: 'Especialista', location: 'Atención Personal' }
    ],
    statsNumber: "+5k",
    statsLabel: "Sonrisas Sanas"
  },
  'mental': {
    badgeText: "Especialidad Psicológica",
    badgeIconName: 'brain',
    titlePrefix: "Salud",
    titleHighlight: "Mental.",
    description: "Acompañamiento psicológico y psiquiátrico con enfoque humano y profesional para tu bienestar integral.",
    images: [
      { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200', alt: 'Terapia Psicológica', location: 'Consulta Privada' },
      { src: 'https://images.unsplash.com/photo-1520607162513-322433989c08?q=80&w=1200', alt: 'Espacio Seguro', location: 'Acompañamiento' }
    ],
    statsNumber: "+2k",
    statsLabel: "Pacientes Apoyados"
  },
  'medicina': {
    badgeText: "Atención Primaria",
    badgeIconName: 'heartPulse',
    titlePrefix: "Medicina",
    titleHighlight: "General.",
    description: "Atención primaria integral para toda tu familia con diagnósticos precisos y derivación oportuna.",
    images: [
      { src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200', alt: 'Atención Médica', location: 'Box Médico' },
      { src: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1200', alt: 'Equipamiento', location: 'Diagnóstico' }
    ],
    statsNumber: "+8k",
    statsLabel: "Atenciones Anuales"
  },
  'terapias': {
    badgeText: "Bienestar Integral",
    badgeIconName: 'activity',
    titlePrefix: "Terapias",
    titleHighlight: "Alternativas.",
    description: "Enfoque holístico para tu salud con profesionales certificados en diversas disciplinas complementarias.",
    images: [
      { src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200', alt: 'Masoterapia', location: 'Sala de Relajación' },
      { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1200', alt: 'Acupuntura', location: 'Sesiones Clínicas' }
    ],
    statsLabel: "Sesiones Realizadas"
  }
};

const SLUG_TO_CTA: Record<string, ServiceCTAProps> = {
  'dental': {
    title: "¿Listo para lucir tu mejor sonrisa?",
    description: "Agenda tu evaluación dental hoy mismo y da el primer paso hacia una salud oral óptima.",
    themeGradient: "from-blue-600 to-sky-500",
  },
  'mental': {
    title: "Tu bienestar emocional es nuestra prioridad",
    description: "Nuestros especialistas están listos para escucharte. Da el primer paso hacia tu paz mental.",
    themeGradient: "from-violet-600 to-purple-500",
  },
  'medicina': {
    title: "Cuidamos la salud de toda tu familia",
    description: "No esperes a sentirte mal. Agenda un chequeo preventivo con nuestros médicos generales.",
    themeGradient: "from-emerald-600 to-teal-500",
  },
  'terapias': {
    title: "Equilibrio cuerpo y mente a tu alcance",
    description: "Reserva tu sesión y descubre cómo nuestras terapias alternativas pueden mejorar tu calidad de vida.",
    themeGradient: "from-orange-500 to-amber-400",
  }
};

// En Next.js 15+ (y Next 16), params es una Promesa que debe ser esperada.
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = SLUG_TO_AREA[slug];
  const heroProps = SLUG_TO_HERO[slug];
  const ctaProps = SLUG_TO_CTA[slug];

  if (!area || !heroProps) {
    notFound();
  }

  const professionals = await getProfessionals();

  return (
    <div className="min-h-screen bg-white">
      {/* Usamos el Hero global pero con props inyectadas para la categoría */}
      <Hero {...heroProps} />

      <ProfessionalFilter key={slug} initialArea={area} professionals={professionals} />

      {/* Inyección del CTA con color temático según la categoría */}
      {ctaProps && <ServiceCTA {...ctaProps} />}
    </div>
  );
}
