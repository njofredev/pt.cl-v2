"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Calendar, Microscope, Activity, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* 1. TOP BAR: Información práctica (Se oculta al hacer scroll para limpiar la vista) */}
      {!isScrolled && (
        <div className="bg-blue-600 text-white py-2 text-[11px] md:text-xs font-medium">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><MapPin size={12}/> Vitacura 5951</span>
              <span className="flex items-center gap-1 border-l border-blue-400 pl-4"><Phone size={12}/> +56 2 2345 6789</span>
            </div>
            <div className="hidden md:block">
              Vuelve a sonreír sin preocuparte • <span className="underline">Ver Convenios</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN NAV: El cuerpo del Navbar */}
      <div className={`transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo con peso visual */}
          <Link href="/" className="flex flex-col">
            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 leading-none">
              POLICLÍNICO<span className="text-blue-600 italic">TABANCURA</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">Excelencia Médica</span>
          </Link>
          
          {/* Links Centrales con Iconos sutiles */}
          <div className="hidden lg:flex items-center space-x-7 text-[13px] font-bold uppercase tracking-wider text-slate-600">
            <Link href="#servicios" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Microscope size={16} className="text-blue-500" /> Toma de Muestra
            </Link>
            <Link href="#laboratorio" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
              <Activity size={16} className="text-blue-500" /> Laboratorio Digital
            </Link>
            <Link href="#especialidades" className="hover:text-blue-600">Especialidades</Link>
          </div>

          {/* Botón de Acción Principal */}
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 font-bold shadow-lg shadow-blue-200 flex items-center gap-2">
              <Calendar size={18} />
              <span className="hidden md:inline">Reserva tu Hora</span>
              <span className="md:hidden">Agendar</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Icono faltante para el ejemplo
const MapPin = ({size}: {size: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);