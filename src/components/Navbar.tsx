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
  Megaphone,
  Info,
  Accessibility,
  Sun,
  Moon,
  Instagram,
  Facebook,
  FileText,
  Clock,
  HeartHandshake,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { SearchModal } from './SearchModal';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Nosotros',
    href: '#',
    isMega: true,
    subItems: [
      { name: 'Quiénes Somos', href: '/nosotros', desc: 'Conoce nuestra historia y valores.', icon: <HeartHandshake className="text-pink-500" /> },
      { name: 'Derechos y Deberes', href: '/derechos-y-deberes', desc: 'Conoce tus derechos y responsabilidades.', icon: <FileText className="text-emerald-500" /> },
      { name: 'Nuestras Sucursales', href: '/#sucursales', desc: 'Ubícanos y conoce nuestros horarios.', icon: <MapPin className="text-amber-500" /> },
    ]
  },
  {
    name: 'Pacientes',
    href: '#',
    isMega: true,
    subItems: [
      { name: 'Convenios y Alianzas', href: '/convenios', desc: 'Previsiones, convenios colectivos y descuentos.', icon: <HeartHandshake className="text-emerald-500" /> },
      { name: 'PAD Dental (Fonasa)', href: '/bonopad', desc: 'Bono PAD Fonasa para atenciones dentales integrales.', icon: <SmilePlus className="text-cyan-500" /> },
      { name: 'Cotizador Digital', href: '/cotizador-examenes', desc: 'Presupuestos de exámenes al instante.', icon: <Calculator className="text-emerald-500" /> },
      { name: 'Resultados de Exámenes', href: 'http://190.215.215.125:9091/Pacientes.aspx', desc: 'Consulta tus resultados en laboratorio Laboval.', icon: <FileText className="text-cyan-600" /> },
    ]
  },
  {
    name: 'Especialidades',
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
      { name: 'Laboratorio Digital Dental', href: '/novedades/laboratorio', desc: 'Tecnología chairside CAD/CAM y CEREC.', icon: <Sparkles className="text-rose-500" /> },
      { name: 'Validador Mi Vita', href: '/#mivita', desc: 'Verifica tus beneficios exclusivos.', icon: <Sparkles className="text-amber-500" /> },
    ]
  },

];

const TikTokIcon = ({ size = 12, className = "" }: { size?: number, className?: string }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const SOCIAL_PHRASES = [
  "Comunidad 🤝",
  "Búscanos 🔍",
  "Visítanos 📍",
  "Súmate 🚀",
  "Hola 👋"
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [socialPhraseIndex, setSocialPhraseIndex] = useState(0);
  const [confirmLink, setConfirmLink] = useState<string | null>(null);
  const pathname = usePathname();

  // Configuración dinámica del botón de agendamiento según la especialidad/página
  const getBookingConfig = () => {
    if (pathname?.startsWith('/servicios/dental')) {
      return {
        text: "Agenda aquí",
        bgColor: "bg-cyan-500",
        Icon: SmilePlus,
      };
    }
    if (pathname?.startsWith('/servicios/mental')) {
      return {
        text: "Agenda aquí",
        bgColor: "bg-purple-500",
        Icon: Brain,
      };
    }
    if (pathname?.startsWith('/servicios/medicina')) {
      return {
        text: "Agenda aquí",
        bgColor: "bg-blue-500",
        Icon: Stethoscope,
      };
    }
    if (pathname?.startsWith('/servicios/terapias')) {
      return {
        text: "Agenda aquí",
        bgColor: "bg-green-500",
        Icon: Leaf,
      };
    }
    return {
      text: "Reservar Hora",
      bgColor: "bg-secondary",
      Icon: Calendar,
    };
  };

  const bookingConfig = getBookingConfig();

  // Hide Navbar for specific routes
  if (pathname === '/alianzas') {
    return null;
  }

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const rotateInterval = setInterval(() => {
      setSocialPhraseIndex(prev => (prev + 1) % SOCIAL_PHRASES.length);
    }, 3500);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Actualizar cada 10 segundos por precisión en minutos

    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
      clearInterval(rotateInterval);
    };
  }, []);

  // Toggle active class on body for global styling awareness (e.g., FAB adaptation)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('mobile-menu-open');
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (confirmLink) {
      const timer = setTimeout(() => setConfirmLink(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [confirmLink]);

  const scrollToTop = (e: React.MouseEvent) => {
    // Si estamos en la home, hacemos scroll suave al inicio.
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToScheduler = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('agendar');

    if (el) {
      // Si el elemento existe en la página actual (Home o página de Servicio), hacemos scroll suave
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      // Si estamos en otra página (ej: Nosotros), redirigimos al ancla de la home
      window.location.href = '/#agendar';
    }
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (href.includes('#')) {
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    const handleOpenSearchModal = () => {
      setIsSearchOpen(true);
    };

    // Direct bridge function for maximum robustness
    if (typeof window !== 'undefined') {
      (window as any).__openGlobalSearch = () => {
        setIsSearchOpen(true);
      };
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-search-modal", handleOpenSearchModal);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-search-modal", handleOpenSearchModal);
      if (typeof window !== 'undefined') {
        delete (window as any).__openGlobalSearch;
      }
    };
  }, []);

  const [showPromo, setShowPromo] = useState(true);

  return (
    <>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <nav className="fixed top-0 w-full z-50">
        <AnimatePresence>
          {showPromo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-gradient-to-r from-cyan-700 via-teal-600 to-emerald-500 dark:from-indigo-950 dark:via-purple-900 dark:to-indigo-950 text-white overflow-hidden relative z-[60] shadow-md border-b border-white/10"
            >
              <div className="container mx-auto px-4 py-2 md:py-2.5 flex items-center justify-center gap-x-2 sm:gap-x-4 text-center relative pr-28 md:pr-32">
                <SmilePlus className="w-5 h-5 shrink-0 hidden sm:block text-yellow-200 animate-pulse" />
                <p className="text-[9px] sm:text-[11px] md:text-xs font-bold tracking-wide flex flex-wrap items-center justify-center gap-x-1">
                  <span className="hidden md:inline-flex items-center bg-white/20 px-2 py-0.5 rounded-full text-[9px] mr-1">
                    <Megaphone className="w-2.5 h-2.5 mr-1 -rotate-12 shrink-0" /> PROMOCIÓN LIMITADA
                  </span>
                  <span>Limpieza Dental: Evaluación + RX Bitewing Bilateral + Profilaxis por</span>
                  <span className="text-yellow-200 text-xs sm:text-sm font-black flex items-center ml-1 underline underline-offset-2">
                    $24.000.-
                  </span>
                  <span className="hidden lg:inline bg-black/10 px-2 py-0.5 rounded-full text-[8px] ml-2 border border-white/10 tracking-widest">HASTA 30 de MAYO | PARA MAYORES DE 15 AÑOS</span>
                </p>

                <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-x-1 sm:gap-x-2">
                  <a
                    href="https://ff.healthatom.io/77H8tW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-cyan-900 hover:bg-cyan-50 dark:bg-purple-50 dark:text-purple-900 dark:hover:bg-white px-2 sm:px-4 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase hover:scale-105 transition-all shrink-0 shadow-sm flex items-center gap-1 active:scale-95"
                  >
                    Agendar <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </a>

                  <button
                    onClick={() => setShowPromo(false)}
                    className="p-1 sm:p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors shrink-0"
                    aria-label="Cerrar promoción"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`bg-primary text-white hidden md:block transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'} border-b border-white/5`}>
          <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-y-2 py-0.5 text-[7.5px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-center md:text-left">
            <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 justify-center lg:justify-start">
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

            <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1.5 justify-center lg:justify-end items-center">
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
                <div className="hidden sm:flex relative items-center h-4 min-w-[95px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={socialPhraseIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute left-0 text-[7.5px] sm:text-[9px] md:text-[10px] tracking-widest font-bold uppercase flex items-center gap-1 whitespace-nowrap"
                    >
                      {SOCIAL_PHRASES[socialPhraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <a href="https://www.instagram.com/politabancura/" target="_blank" rel="noopener noreferrer" aria-label="Ir a nuestro Instagram" className="hover:text-secondary transition-colors transform hover:scale-110">
                  <Instagram size={14} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61568214167163" target="_blank" rel="noopener noreferrer" aria-label="Ir a nuestro Facebook" className="hover:text-secondary transition-colors transform hover:scale-110">
                  <Facebook size={14} />
                </a>
                <a href="https://www.tiktok.com/@politabancura" target="_blank" rel="noopener noreferrer" aria-label="Ir a nuestro TikTok" className="hover:text-secondary transition-colors transform hover:scale-110">
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
            <div className="flex items-center xl:gap-12 gap-4">
              <Link href="/" onClick={scrollToTop} className="flex items-center group shrink-0">
                <img
                  src="/logo.svg"
                  alt="Policlínico Tabancura"
                  className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300 dark:brightness-0 dark:invert"
                />
              </Link>


              {/* Desktop Menu */}
              <div
                className="hidden xl:flex items-center space-x-0.5 text-[13.5px] font-bold text-slate-600 dark:text-slate-300 relative"
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
                      onClick={(e) => {
                        if (item.href === '/') scrollToTop(e);
                        else handleAnchorClick(e, item.href);
                      }}
                      className={`flex items-center gap-1.5 transition-all duration-300 ${(item as any).highlight
                        ? `bg-emerald-50/90 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-5 py-2 rounded-full font-extrabold border border-emerald-600/25 dark:border-emerald-500/20 hover:bg-emerald-100/90 dark:hover:bg-emerald-950/35 hover:scale-[1.02] active:scale-95`
                        : `hover:text-secondary ${activeDropdown === item.name ? 'text-secondary' : ''}`
                        }`}
                    >
                      {(item as any).highlight && <Sparkles size={14} className="mr-1 text-emerald-500 dark:text-emerald-400 fill-emerald-500/10" />}
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
                        left: activeDropdown === 'Nosotros' ? '0%' : activeDropdown === 'Pacientes' ? '8%' : activeDropdown === 'Especialidades' ? '20%' : '35%'
                      }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      onMouseEnter={() => setActiveDropdown(activeDropdown)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full pt-6 w-[720px] z-50 origin-top cursor-default"
                    >
                      {/* Sub-contenedor con los estilos visuales reales */}
                      <div className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-none overflow-hidden">
                        <div className="p-5 pb-3">
                          <motion.div
                            key={activeDropdown}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 gap-2"
                          >
                            {NAV_ITEMS.find(i => i.name === activeDropdown)?.subItems?.map((sub) => {
                              const isConfirming = confirmLink === sub.href;

                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={(e) => {
                                    if (sub.href.startsWith('http')) {
                                      if (!isConfirming) {
                                        e.preventDefault();
                                        setConfirmLink(sub.href);
                                        return;
                                      }
                                    }
                                    handleAnchorClick(e, sub.href);
                                  }}
                                  target={sub.href.startsWith('http') ? "_blank" : undefined}
                                  rel={sub.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                  className={`group/sub flex items-start gap-4 p-3.5 rounded-2xl transition-all border border-transparent ${isConfirming
                                    ? 'bg-amber-400 dark:bg-amber-500 border-amber-500 hover:bg-amber-500 shadow-md scale-[1.02]'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-100 dark:hover:border-slate-800'
                                    }`}
                                >
                                  {sub.icon && (
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover/sub:shadow-md group-hover/sub:scale-105 transition-all shrink-0 [&>svg]:w-5 [&>svg]:h-5 ${isConfirming ? 'bg-white text-amber-600' : 'bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800'
                                      }`}>
                                      {sub.icon}
                                    </div>
                                  )}
                                  <div className="flex flex-col pt-1">
                                    <span className={`text-[14.5px] font-bold transition-colors tracking-tight ${isConfirming ? 'text-slate-900' : 'text-primary dark:text-slate-100 group-hover/sub:text-secondary'
                                      }`}>
                                      {isConfirming ? "Saldrás de Policlínico Tabancura" : sub.name}
                                    </span>
                                    {sub.desc && (
                                      <span className={`text-[11px] font-medium leading-snug mt-2 transition-all ${isConfirming ? 'text-slate-800' : 'text-slate-400 opacity-80 group-hover/sub:opacity-100'
                                        }`}>
                                        {isConfirming ? "Haz clic de nuevo para continuar al portal externo." : sub.desc}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </motion.div>
                        </div>
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
                className="flex items-center gap-2.5 px-3 h-10 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 transition-all text-slate-500 dark:text-slate-400 shadow-sm active:scale-95 cursor-pointer"
                aria-label="Cambiar tema visual"
              >
                {mounted && theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                <span className="text-[9px] font-bold uppercase tracking-wider hidden lg:block leading-none relative top-[0.5px]">
                  {mounted && theme === 'dark' ? 'Oscuro' : 'Claro'}
                </span>
              </button>

              {/* Search Bar Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-secondary/20 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:border-secondary/30 transition-all group"
              >
                <Search size={16} className="text-slate-400 group-hover:text-secondary transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Buscar...</span>
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-md text-[9px] font-black text-slate-300">
                  <span className="text-[8px]">ALT</span> + K
                </div>
              </button>

              <div className="hidden xl:block relative group z-10">
                <Button
                  className="bg-gradient-to-r from-primary to-[#1e3a8a] text-white rounded-full pl-7 pr-14 h-11 font-bold text-[13px] tracking-tight transition-all duration-500 transform group-hover:-translate-y-1 group-active:scale-95 cursor-pointer shadow-lg shadow-black/10 border-0 relative z-10"
                  onClick={scrollToScheduler}
                >
                  {bookingConfig.text}
                </Button>
                {/* Icono Badge Flotante */}
                <div className={`absolute -top-2 -right-2 w-10 h-10 ${bookingConfig.bgColor} rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500 transform group-hover:-translate-y-1 group-hover:rotate-[-15deg] group-hover:scale-110 group-active:scale-95 z-30 border-4 border-white dark:border-slate-950 pointer-events-none`}>
                  <bookingConfig.Icon className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </div>

              {/* Mobile Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Abrir buscador móvil"
                className="xl:hidden w-12 h-12 bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 shadow-sm hover:border-secondary/20 transition-all active:scale-95"
              >
                <Search size={20} />
              </button>

              {/* Mobile Toggle */}
              <button
                className="xl:hidden w-12 h-12 bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800 rounded-2xl flex items-center justify-center text-primary dark:text-white shadow-sm hover:border-secondary/20 transition-all active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
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
              className="xl:hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 overflow-y-auto max-h-[calc(100vh-130px)] hide-scrollbar"
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
                          else {
                            handleAnchorClick(e, item.href);
                            setIsMobileMenuOpen(false);
                          }
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
                          {item.subItems.map((sub) => {
                            const isConfirming = confirmLink === sub.href;
                            return (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                target={sub.href.startsWith('http') ? "_blank" : undefined}
                                rel={sub.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                className={`text-sm font-bold text-right transition-all px-3 py-1.5 rounded-lg ${isConfirming
                                  ? 'bg-amber-400 text-slate-900 shadow-sm scale-105'
                                  : 'text-slate-500 hover:text-secondary'
                                  }`}
                                onClick={(e) => {
                                  if (sub.href.startsWith('http')) {
                                    if (!isConfirming) {
                                      e.preventDefault();
                                      setConfirmLink(sub.href);
                                      return;
                                    }
                                  }
                                  handleAnchorClick(e, sub.href);
                                  setIsMobileMenuOpen(false);
                                }}
                              >
                                {isConfirming ? "Clic de nuevo para salir" : sub.name}
                              </Link>
                            );
                          })}
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
                  className="w-full bg-primary h-14 rounded-2xl font-bold text-white mt-2 cursor-pointer flex items-center justify-center gap-2"
                  onClick={scrollToScheduler}
                >
                  {bookingConfig.text} <bookingConfig.Icon size={16} className="shrink-0" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};