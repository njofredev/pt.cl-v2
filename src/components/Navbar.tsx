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
  Command,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Leaf,
  SmilePlus,
  Info,
  Accessibility,
  Sun,
  Moon,
  Instagram,
  Facebook
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { SearchModal } from './SearchModal';
import { useTheme } from 'next-themes';

const NAV_ITEMS = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Nosotros',
    href: '#',
    isMega: true,
    subItems: [
      { name: 'Quiénes Somos', href: '/nosotros', desc: 'Conoce nuestra historia y valores.', icon: <Activity className="text-blue-500" /> },
      { name: 'Misión y Visión', href: '/nosotros#mision', desc: 'Nuestro compromiso con la comunidad.', icon: <ShieldCheck className="text-indigo-500" /> },
      { name: 'Nuestro Equipo', href: '/nosotros#equipo', desc: 'Profesionales de primer nivel.', icon: <User className="text-teal-500" /> },
    ]
  },
  {
    name: 'Servicios',
    href: '#servicios',
    isMega: true,
    subItems: [
      { name: 'Salud Dental', href: '/servicios/dental', desc: 'Odontología avanzada y estética.', icon: <SmilePlus className="text-cyan-500" /> },
      { name: 'Salud Mental', href: '/servicios/mental', desc: 'Apoyo psicológico y psiquiátrico.', icon: <Brain className="text-purple-500" /> },
      { name: 'Medicina General', href: '/servicios/medicina', desc: 'Tu salud primaria en buenas manos.', icon: <Stethoscope className="text-blue-600" /> },
      { name: 'Terapias Complementarias', href: '/servicios/terapias', desc: 'Bienestar integral y holístico.', icon: <Leaf className="text-green-500" /> },
    ]
  },
  {
    name: 'Novedades 2026',
    href: '#',
    isMega: true,
    highlight: true,
    subItems: [
      { name: 'Centro Radiológico', href: '/novedades/centro-radiologico', desc: 'Imágenes diagnósticas de alta precisión.', icon: <Activity className="text-indigo-600" /> },
      { name: 'Laboratorio digital de exámenes', href: '/novedades/laboratorio', desc: 'Resultados rápidos y trazabilidad digital.', icon: <Microscope className="text-rose-500" /> },
      { name: 'Validador Mi Vita', href: '/#mivita', desc: 'Verifica tus beneficios exclusivos.', icon: <Sparkles className="text-amber-500" /> },
      { name: 'Cotizador Digital', href: '/novedades/cotizador', desc: 'Presupuestos de exámenes al instante.', icon: <Calculator className="text-emerald-500" /> },
    ]
  },
  { name: 'Sucursales', href: '/#sucursales' },
];

const TikTokIcon = ({ size = 12, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    // Si estamos en la home, hacemos scroll suave al inicio.
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToScheduler = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('agendar');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

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
                <MapPin size={12} className="text-secondary group-hover:scale-110 transition-transform" />
                LOS TRIBUNALES #1268
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Avenida+Vitacura+8620+Vitacura"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-secondary transition-colors group"
              >
                <MapPin size={12} className="text-secondary group-hover:scale-110 transition-transform" />
                AV. VITACURA #8620
              </a>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-end items-center">
              <a
                href="tel:+56222172635"
                className="flex items-center gap-2 hover:text-secondary transition-colors group"
              >
                <Phone size={12} className="text-secondary group-hover:scale-110 transition-transform" />
                TRIBUNALES: +56 2 2217 2635
              </a>
              <span className="text-white/20 hidden md:inline">|</span>
              <a
                href="tel:+56229336740"
                className="flex items-center gap-2 hover:text-secondary transition-colors group"
              >
                <Phone size={12} className="text-secondary group-hover:scale-110 transition-transform" />
                VITACURA: +56 2 2933 6740
              </a>
              
              <div className="h-3 w-[1px] bg-white/20 hidden md:block mx-1" />
              
              <div className="flex items-center gap-3 text-white/80">
                <a href="https://www.instagram.com/politabancura/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors transform hover:scale-110">
                  <Instagram size={14} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61568214167163" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors transform hover:scale-110">
                  <Facebook size={14} />
                </a>
                <a href="https://www.tiktok.com/@politabancura" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors transform hover:scale-110">
                  <TikTokIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className={`transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-slate-950/40 py-2' : 'bg-white/95 dark:bg-transparent backdrop-blur-sm py-4'
          } border-b border-transparent dark:border-white/5 backdrop-blur-md`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center lg:gap-16">
              <Link href="/" onClick={scrollToTop} className="flex items-center group shrink-0">
                <img
                  src="/logo.svg"
                  alt="Policlínico Tabancura"
                  className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </Link>


              {/* Desktop Menu */}
              <div
                className="hidden lg:flex items-center space-x-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 relative"
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
                      onClick={item.href === '/' ? scrollToTop : undefined}
                      className={`flex items-center gap-1.5 transition-colors ${(item as any).highlight
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
                      className="absolute top-full mt-4 w-[850px] z-50 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-none overflow-hidden origin-top"
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
                              className="group/sub flex items-start gap-5 p-6 rounded-[2rem] transition-all hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                            >
                              {sub.icon && (
                                <div className="w-14 h-14 bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl flex items-center justify-center shadow-sm group-hover/sub:shadow-md group-hover/sub:scale-110 transition-all shrink-0">
                                  {sub.icon}
                                </div>
                              )}
                              <div className="flex flex-col pt-1">
                                <span className="text-[13px] font-bold text-primary dark:text-slate-100 group-hover/sub:text-secondary transition-colors uppercase tracking-wider">
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
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 transition-all text-slate-500 dark:text-slate-400 shadow-sm active:scale-95"
                aria-label="Toggle dark mode"
              >
                {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Search Bar Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-secondary/20 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-secondary/30 transition-all group"
              >
                <Search size={16} className="text-slate-400 group-hover:text-secondary transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Buscar...</span>
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-md text-[9px] font-black text-slate-300">
                  <span className="text-[8px]">ALT</span> K
                </div>
              </button>

              <div className="hidden lg:block">
                <Button 
                  className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white rounded-full px-8 h-11 font-bold text-[11px] tracking-widest transition-all hover:scale-105 hover:shadow-xl active:scale-95 cursor-pointer shadow-lg shadow-black/10 border-0"
                  onClick={scrollToScheduler}
                >
                  RESERVAR HORA
                </Button>
              </div>

              {/* Mobile Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden w-12 h-12 bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm hover:border-secondary/20 transition-all active:scale-95"
              >
                <Search size={20} />
              </button>

              {/* Mobile Toggle */}
              <button
                className="lg:hidden w-12 h-12 bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-2xl flex items-center justify-center text-primary dark:text-white shadow-sm hover:border-secondary/20 transition-all active:scale-95"
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
              className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 overflow-y-auto max-h-[calc(100vh-130px)] hide-scrollbar"
            >
              <div className="container mx-auto px-6 py-8 pb-16 flex flex-col gap-6 items-end">
                {NAV_ITEMS.map((item) => (
                  <div key={item.name} className="w-full flex flex-col gap-3 items-end">
                    {item.subItems ? (
                      <button
                        onClick={() => setOpenMobileSubmenu(prev => prev === item.name ? null : item.name)}
                        className={`w-full flex items-center justify-end gap-2 text-lg font-black text-right cursor-pointer transition-colors ${openMobileSubmenu === item.name ? "text-secondary" : "text-slate-900 dark:text-slate-100"
                          }`}
                      >
                        <ChevronDown
                          size={16}
                          className={`text-slate-400 transition-transform duration-300 ${openMobileSubmenu === item.name ? "rotate-180 text-secondary" : ""
                            }`}
                        />
                        <span>{item.name}</span>
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-lg font-black text-slate-900 dark:text-slate-100 text-right"
                        onClick={(e) => {
                          if (item.href === '/') scrollToTop(e);
                          else setIsMobileMenuOpen(false);
                        }}
                      >
                        {item.name}
                      </Link>
                    )}

                    <AnimatePresence initial={false}>
                      {item.subItems && openMobileSubmenu === item.name && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden w-full pr-4 flex flex-col gap-4 border-r-2 border-slate-100 items-end mt-1"
                        >
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="text-sm font-bold text-slate-500 hover:text-secondary text-right"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile Menu Search */}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-5 h-14 bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all mt-4 text-slate-500 group"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-secondary transition-colors">
                    Buscar...
                  </span>
                  <Search size={18} className="text-slate-400 dark:text-slate-500 group-hover:text-secondary transition-colors" />
                </button>

                <Button 
                  className="w-full bg-primary h-14 rounded-2xl font-bold text-white mt-2 cursor-pointer"
                  onClick={scrollToScheduler}
                >
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