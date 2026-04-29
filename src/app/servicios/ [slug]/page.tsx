import React from 'react';
import { ProfessionalFilter } from '@/components/ProfessionalFilter';
import { Area } from '@/data/professionals';
import { notFound } from 'next/navigation';

const SLUG_TO_AREA: Record<string, Area> = {
  'dental': 'Salud Dental',
  'mental': 'Salud Mental',
  'medicina': 'Medicina General',
  'terapias': 'Terapias Alternativas',
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const area = SLUG_TO_AREA[slug];

  if (!area) {
    notFound();
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="bg-primary py-24 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic">
            {area}
          </h1>
          <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            Contamos con los mejores especialistas de la zona en {area.toLowerCase()}, 
            con tecnología de vanguardia y atención personalizada.
          </p>
        </div>
      </div>

      <ProfessionalFilter initialArea={area} />
    </div>
  );
}
