"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const GoogleReviews = dynamic(() => import('@/components/GoogleReviews').then(mod => mod.GoogleReviews), {
  ssr: false,
  loading: () => <div className="h-96 animate-pulse bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] mx-6 my-16" />
});

const Branches = dynamic(() => import('@/components/Branches').then(mod => mod.Branches), {
  ssr: false,
  loading: () => <div className="h-screen animate-pulse bg-slate-900 rounded-[3rem] mx-6" />
});

export function HomeClientSections() {
  return (
    <>
      {/* BLOQUE RESEÑAS DE GOOGLE */}
      <GoogleReviews />

      {/* NUESTRAS SUCURSALES (Modern Style) */}
      <div id="sucursales" className="scroll-mt-24">
        <Branches />
      </div>
    </>
  );
}
