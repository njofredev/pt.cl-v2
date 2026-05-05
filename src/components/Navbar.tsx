"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  ChevronDown, 
  Menu, 
  X, 
  Activity, 
  ShieldCheck, 
  User, 
  HeartPulse, 
  Brain, 
  Stethoscope, 
  Microscope,
  Zap,
  Sparkles,
  Calculator,
  Laptop,
  Search,
  Command
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { SearchModal } from './SearchModal';

const NAV_ITEMS = [
  { name: 'Inicio', href: '/' },
  { 
    name: 'Nosotros', 
    href: '#',
    isMega: true,
    subItems: [
      { name: 'Quiénes Somos', href: '/nosotros', desc: 'Conoce nuestra historia y valores.', icon: <Activity className="text-secondary" /> },
      { name: 'Misión y Visión', href: '/mision', desc: 'Nuestro compromiso con la comunidad.', icon: <ShieldCheck className="text-secondary" /> },
      { name: 'Nuestro Equipo', href: '#buscador-profesionales', desc: 'Profesionales de primer nivel.', icon: <User className="text-secondary" /> },
    ]
  },
  { 
    name: 'Servicios', 
    href: '#servicios',
    isMega: true,
    subItems: [
      { name: 'Salud Dental', href: '/servicios/dental', desc: 'Odontología avanzada y estética.', icon: <HeartPulse className="text-secondary" /> },
      { name: 'Salud Mental', href: '/servicios/mental', desc: 'Apoyo psicológico y psiquiátrico.', icon: <Brain className="text-secondary" /> },
      { name: 'Medicina General', href: '/servicios/medicina', desc: 'Tu salud primaria en buenas manos.', icon: <Stethoscope className="text-secondary" /> },
      { name: 'Terapias Alternativas', href: '/servicios/terapias', desc: 'Bienestar integral y holístico.', icon: <Zap className="text-secondary" /> },
    ]
  },
  { 
    name: 'Novedades 2026', 
    href: '#',
    isMega: true,
    highlight: true,
    subItems: [
      { name: 'Centro Radiológico', href: '#', desc: 'Imágenes diagnósticas de alta precisión.', icon: <Activity className="text-secondary" /> },
      { name: 'Laboratorio digital de exámenes', href: '#', desc: 'Resultados rápidos y trazabilidad digital.', icon: <Microscope className="text-secondary" /> },
      { name: 'Validador Mi Vita', href: '#mivita', desc: 'Verifica tus beneficios exclusivos.', icon: <Sparkles className="text-secondary" /> },
      { name: 'Cotizador Digital', href: 'https://cotizador.policlinicotabancura.cl', desc: 'Presupuestos de exámenes al instante.', icon: <Calculator className="text-secondary" /> },
      { name: 'Intranet Pacientes', href: '#', desc: 'Tus resultados médicos en línea.', icon: <Laptop className="text-secondary" /> },
    ]
  },
  { name: 'Contacto', href: '#contacto' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <nav className="fixed top-0 w-full z-50">
        <div className={`bg-primary text-white transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'} border-b border-white/5`}>
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-y-2 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] text-center md:text-left">
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Calle+Los+Tribunales+1268+Vitacura" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition-colors group"
              >
                <MapPin size={12} className="text-secondary group-hover:scale-110 transition-transform"/> 
                LOS TRIBUNALES #1268
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Avenida+Vitacura+8620+Vitacura" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition-colors group"
              >
                <MapPin size={12} className="text-secondary group-hover:scale-110 transition-transform"/> 
                AV. VITACURA #8620
              </a>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-end items-center">
              <a 
                href="https://wa.me/56966187736" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition-colors group"
              >
                <MessageCircle size={12} className="text-secondary group-hover:scale-110 transition-transform"/> 
                WHATSAPP
              </a>
              <a 
                href="tel:+56229336740" 
                className="flex items-center gap-2 hover:text-secondary transition-colors group"
              >
                <Phone size={12} className="text-secondary group-hover:scale-110 transition-transform"/> 
                CENTRAL: +56 2 2933 6740
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className={`transition-all duration-300 ${
          isScrolled ? 'bg-white py-2' : 'bg-white/95 backdrop-blur-sm py-4'
        }`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center lg:gap-16">
              <Link href="/" className="flex items-center group shrink-0">
              <img 
                src="/logo.svg" 
                alt="Policlínico Tabancura" 
                className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300" 
              />
            </Link>

            
            {/* Desktop Menu */}
            <div 
              className="hidden lg:flex items-center space-x-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 relative"
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {NAV_ITEMS.map((item) => (
                <div 
                  key={item.name} 
                  className="px-4 py-2"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                >
                  <Link 
                    href={item.href} 
                    className={`flex items-center gap-1.5 transition-colors ${
                      (item as any).highlight 
                        ? 'border border-secondary text-secondary hover:bg-secondary hover:text-primary px-4 py-1.5 rounded-full font-bold' 
                        : `hover:text-secondary ${activeDropdown === item.name ? 'text-secondary' : ''}`
                    }`}
                  >
                    {(item as any).highlight && <Sparkles size={14} className="mr-1" />}
                    {item.name}
                    {item.subItems && <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                  </Link>
                </div>
              ))}

              <AnimatePresence>
                {activeDropdown && NAV_ITEMS.find(i => i.name === activeDropdown)?.subItems && (
                  <motion.div
                    layoutId="mega-menu-container"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      left: activeDropdown === 'Nosotros' ? '0%' : activeDropdown === 'Servicios' ? '10%' : '0%'
                    }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    onMouseEnter={() => setActiveDropdown(activeDropdown)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute top-full mt-4 w-[850px] z-50 border border-slate-100 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden origin-top"
                  >
                    <div className="p-8 pb-4">
                      <motion.div
                        key={activeDropdown}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-2 gap-4"
                      >
                        {NAV_ITEMS.find(i => i.name === activeDropdown)?.subItems?.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="group/sub flex items-start gap-5 p-6 rounded-[2rem] transition-all hover:bg-slate-50 border border-transparent hover:border-slate-100"
                          >
                            {sub.icon && (
                              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover/sub:shadow-md group-hover/sub:scale-110 transition-all shrink-0">
                                {sub.icon}
                              </div>
                            )}
                            <div className="flex flex-col pt-1">
                              <span className="text-[13px] font-bold text-primary group-hover/sub:text-secondary transition-colors uppercase tracking-wider">
                                {sub.name}
                              </span>
                              {sub.desc && (
                                <span className="text-[11px] text-slate-400 font-medium leading-snug mt-2 opacity-80 group-hover/sub:opacity-100 transition-opacity">
                                  {sub.desc}
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search Bar Trigger */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-secondary/20 transition-all group"
              >
                <Search size={16} className="text-slate-400 group-hover:text-secondary transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Buscar...</span>
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-100 rounded-md text-[9px] font-black text-slate-300">
                  <span className="text-[8px]">ALT</span> K
                </div>
              </button>

              <div className="hidden lg:block">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-11 font-bold text-[11px] transition-all hover:scale-105 active:scale-95">
                  RESERVAR HORA
                </Button>
              </div>

              {/* Mobile Toggle */}
              <button 
                className="lg:hidden w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary shadow-sm hover:border-secondary/20 transition-all active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-slate-100 overflow-y-auto max-h-[calc(100vh-130px)] hide-scrollbar"
            >
              <div className="container mx-auto px-6 py-8 pb-16 flex flex-col gap-6">
                {NAV_ITEMS.map((item) => (
                  <div key={item.name} className="space-y-4">
                    <Link 
                      href={item.href} 
                      className="text-lg font-black text-slate-900"
                      onClick={() => !item.subItems && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.subItems && (
                      <div className="pl-4 flex flex-col gap-4 border-l-2 border-slate-100">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="text-sm font-bold text-slate-500 hover:text-secondary"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Button className="w-full bg-primary h-14 rounded-2xl font-bold text-white">
                  RESERVAR HORA
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};