"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Handler optimizado con throttle natural del navegador
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20 && !isScrolled) setIsScrolled(true);
      if (offset <= 20 && isScrolled) setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  return (
    <nav className="fixed top-0 w-full z-50 will-change-transform">
      {/* Top Bar - Se mantiene estática para evitar saltos visuales */}
      <div className={`bg-blue-600 text-white py-1.5 transition-opacity duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
        <div className="container mx-auto px-6 flex justify-between text-[10px] font-bold uppercase tracking-wider">
          <span className="flex items-center gap-2"><MapPin size={12}/> Vitacura / Santiago Centro</span>
          <span className="flex items-center gap-2"><Phone size={12}/> Central: +56 2 2933 6740</span>
        </div>
      </div>

      {/* Main Nav - Sólido para máximo rendimiento de scroll */}
      <div className={`transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
              POLICLÍNICO<span className="text-blue-600">TABANCURA</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <Link href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</Link>
            <Link href="#sedes" className="hover:text-blue-600 transition-colors">Sedes</Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 font-bold text-[11px]">
              RESERVAR HORA
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};