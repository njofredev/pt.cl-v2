"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
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
  ClipboardPlus,
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
import { AccessibilityMenu } from './AccessibilityMenu';
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
      { name: 'Convenios y Beneficios', href: '/convenios', desc: 'Previsiones, convenios colectivos y descuentos.', icon: <HeartHandshake className="text-emerald-500" /> },
      // { name: 'Aranceles', href: '/aranceles', desc: 'Consulta el valor de nuestras prestaciones médicas y dentales.', icon: <Calculator className="text-amber-500" /> },
      { name: 'Nuestras Sucursales', href: '/#sucursales', desc: 'Ubícanos y conoce nuestros horarios.', icon: <MapPin className="text-amber-500" /> },
    ]
  },
  // {
  //   name: 'Pacientes',
  //   href: '#',
  //   isMega: true,
  //   subItems: [
  //     { name: 'Convenios y Alianzas', href: '/convenios', desc: 'Previsiones, convenios colectivos y descuentos.', icon: <HeartHandshake className="text-emerald-500" /> },
  //     { name: 'PAD Dental (Fonasa)', href: '/bonopad', desc: 'Bono PAD Fonasa para atenciones dentales integrales.', icon: <SmilePlus className="text-cyan-500" /> },
  //     { name: 'Derechos y Deberes', href: '/derechos-y-deberes', desc: 'Conoce tus derechos y responsabilidades.', icon: <FileText className="text-emerald-500" /> },
  //     // { name: 'Cotizador Digital', href: '/cotizador-examenes', desc: 'Presupuestos de exámenes al instante.', icon: <Calculator className="text-emerald-500" /> },
  //     { name: 'Resultados de Exámenes', href: 'http://190.215.215.125:9091/Pacientes.aspx', desc: 'Consulta tus resultados en laboratorio Laboval.', icon: <FileText className="text-cyan-600" /> },
  //   ]
  // },
  {
    name: 'Especialidades',
    href: '#',
    isMega: true,
    subItems: [
      { name: 'Salud Dental', href: '/servicios/dental', desc: 'Odontología avanzada y estética.', icon: <SmilePlus className="text-cyan-500" /> },
      { name: 'Salud Mental', href: '/servicios/mental', desc: 'Apoyo psicológico y psiquiátrico.', icon: <Brain className="text-indigo-500" /> },
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
      { name: 'Laboratorio Digital Dental', href: '/novedades/laboratorio', desc: 'Tecnología chairside CAD/CAM and CEREC.', icon: <Sparkles className="text-rose-500" /> },
      { name: 'Validador Mi Vita', href: '/#mivita', desc: 'Verifica tus beneficios exclusivos.', icon: <Sparkles className="text-amber-500" /> },
      { name: 'Resultados de Exámenes', href: 'http://190.215.215.125:9091/Pacientes.aspx', desc: 'Consulta tus resultados en laboratorio Laboval.', icon: <FileText className="text-cyan-600" /> },
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

const PROMOS = [
  {
    id: 'limpieza-dental-24k',
    badgeText: '¡HASTA EL 15 DE SEPTIEMBRE!',
    title: 'Limpieza Dental (Evaluación + Profilaxis + RX Bitewing)',
    price: '$24.000.-',
    oldPrice: 'Antes: $47.000',
    location: 'Sólo Pago Web | +15 años',
    link: 'https://ff.healthatom.io/be3WhX',
    badgeColor: 'bg-white/20 hover:bg-white/30',
    bgColor: 'from-[#c2410c] via-[#f97316] to-[#ea580c]',
    priceColor: 'text-yellow-200 font-extrabold',
    btnColor: 'text-orange-950 hover:bg-orange-50 font-black',
    trackingLabel: 'Promo Limpieza Dental 24k Sticky Bar'
  }
];

// Cambiar a true para volver a activar la barra de promociones en el futuro
const ENABLE_PROMO_BAR = true;

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [showPromo, setShowPromo] = useState(ENABLE_PROMO_BAR);
  const [promoIndex, setPromoIndex] = useState(0);
  const [isHoveringPromo, setIsHoveringPromo] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [socialPhraseIndex, setSocialPhraseIndex] = useState(0);
  const [confirmLink, setConfirmLink] = useState<string | null>(null);
  const pathname = usePathname();

  const getBookingConfig = () => {
    if (pathname?.startsWith('/servicios/dental')) {
      return { text: "Agenda aquí", bgColor: "bg-cyan-500", Icon: SmilePlus };
    }
    if (pathname?.startsWith('/servicios/mental')) {
      return { text: "Agenda aquí", bgColor: "bg-indigo-600", Icon: Brain };
    }
    if (pathname?.startsWith('/servicios/medicina')) {
      return { text: "Agenda aquí", bgColor: "bg-blue-500", Icon: Stethoscope };
    }
    if (pathname?.startsWith('/servicios/terapias')) {
      return { text: "Agenda aquí", bgColor: "bg-green-500", Icon: Leaf };
    }
    return { text: "Reservar Hora", bgColor: "bg-secondary", Icon: Calendar };
  };

  const bookingConfig = getBookingConfig();

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const rotateInterval = setInterval(() => {
      setSocialPhraseIndex(prev => (prev + 1) % SOCIAL_PHRASES.length);
    }, 3500);

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
      clearInterval(rotateInterval);
    };
  }, []);

  useEffect(() => {
    if (!showPromo || isHoveringPromo) return;
    const promoTimer = setInterval(() => {
      setPromoIndex(prev => (prev + 1) % PROMOS.length);
    }, 5000);
    return () => clearInterval(promoTimer);
  }, [showPromo, isHoveringPromo]);

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

  useEffect(() => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (showPromo) {
        document.body.classList.add('promo-visible');
      } else {
        document.body.classList.remove('promo-visible');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('promo-visible');
      }
    };
  }, [showPromo]);




  // Hide Navbar for specific routes
  if (pathname === '/alianzas' || pathname === '/marialuisabombal') {
    return null;
  }

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
    trackEvent('click_reservar_hora', { label: 'Boton Reservar Navbar' });
    trackEvent('reserva_iniciada', { label: 'Flujo desde Navbar' });

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
    if (href === '#') {
      e.preventDefault();
      return;
    }
    if (href.includes('#')) {
      const id = href.split('#')[1];
      if (!id) {
        e.preventDefault();
        return;
      }
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
              onMouseEnter={() => setIsHoveringPromo(true)}
              onMouseLeave={() => setIsHoveringPromo(false)}
              className={`bg-gradient-to-r ${PROMOS[promoIndex].bgColor} text-white overflow-hidden relative z-[60] shadow-md border-b border-black/10 transition-colors duration-500`}
            >
              <div className="container mx-auto px-4 py-2 md:py-2.5 flex items-center justify-center gap-x-2 sm:gap-x-4 text-center relative pr-28 md:pr-32">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={PROMOS[promoIndex].id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-wrap items-center justify-center gap-x-1 text-white/90 text-[9px] sm:text-[11px] md:text-xs font-bold tracking-wide"
                  >
                    <a
                      href={PROMOS[promoIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('click_promocion', { label: `${PROMOS[promoIndex].trackingLabel} - Badge` })}
                      className={`hidden md:inline-flex items-center ${PROMOS[promoIndex].badgeColor} px-2 py-0.5 rounded-full text-[9px] mr-1 text-white font-black border border-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer`}
                    >
                      <Megaphone className="w-2.5 h-2.5 mr-1 -rotate-12 shrink-0" /> {PROMOS[promoIndex].badgeText}
                    </a>
                    <span className="flex items-center gap-1">
                      <ClipboardPlus className={`w-3.5 h-3.5 ${PROMOS[promoIndex].priceColor} shrink-0 inline-block relative -top-[0.5px]`} />
                      <span>{PROMOS[promoIndex].title} por solo</span>
                    </span>
                    <span className={`${PROMOS[promoIndex].priceColor} text-xs sm:text-sm font-black flex items-center ml-1 underline underline-offset-2`}>
                      {PROMOS[promoIndex].price}
                    </span>
                    <span className="text-white/70 line-through text-[10px] ml-1">{PROMOS[promoIndex].oldPrice}</span>
                    <span className="hidden lg:inline bg-white/10 px-2 py-0.5 rounded-full text-[8px] ml-2 border border-white/10 tracking-widest text-white/90 uppercase font-black">
                      {PROMOS[promoIndex].location}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex items-center gap-x-1.5 sm:gap-x-2">
                  <div className="hidden sm:flex items-center gap-1 mr-1">
                    {PROMOS.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setPromoIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === promoIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                        aria-label={`Ver promoción ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <a
                    href={PROMOS[promoIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('click_promocion', { label: PROMOS[promoIndex].trackingLabel })}
                    className={`bg-white ${PROMOS[promoIndex].btnColor} px-2 sm:px-4 py-1 rounded-full text-[8px] sm:text-[10px] font-black uppercase hover:scale-105 transition-all shrink-0 shadow-sm flex items-center gap-1 active:scale-95`}
                  >
                    Agendar <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </a>

                  <button
                    onClick={() => setShowPromo(false)}
                    className="p-1.5 sm:p-2 text-white/70 hover:text-white hover:bg-white/15 rounded-full transition-colors shrink-0"
                    aria-label="Cerrar promoción"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={`bg-primary text-white hidden md:block transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'} border-b border-white/5`}>
          <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-y-2 py-0.5 text-[11px] sm:text-xs font-semibold tracking-wide text-center md:text-left">
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 justify-center lg:justify-start">
              <a
                href="https://maps.app.goo.gl/WoWQ6CKgtLpBphgr9"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_mapa', { label: 'Top Bar Tribunales Map' })}
                className="flex items-center gap-2 hover:text-[#259CF4] transition-colors group"
              >
                <span>Sucursal Los Tribunales</span>
                <MapPin size={12} className="text-white/90 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://maps.app.goo.gl/L3TNhpYTvyNwCqdS6"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_mapa', { label: 'Top Bar Vitacura Map' })}
                className="flex items-center gap-2 hover:text-[#259CF4] transition-colors group"
              >
                <span>Sucursal Vitacura</span>
                <MapPin size={12} className="text-white/90 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1.5 justify-center lg:justify-end items-center">
              <a
                href="tel:+56222172635"
                onClick={() => trackEvent('click_llamar', { label: 'Top Bar Tribunales Phone' })}
                className="flex items-center gap-2 hover:text-[#259CF4] transition-colors group"
              >
                <span>Llamar Tribunales</span>
                <Phone size={12} className="text-white/90 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="tel:+56229336740"
                onClick={() => trackEvent('click_llamar', { label: 'Top Bar Vitacura Phone' })}
                className="flex items-center gap-2 hover:text-[#259CF4] transition-colors group"
              >
                <span>Llamar Vitacura</span>
                <Phone size={12} className="text-white/90 group-hover:scale-110 transition-transform" />
              </a>

              <div className="h-3 w-[1px] bg-white/20 hidden md:block mx-1" />

              <div className="flex items-center gap-3 text-white/85">
                <div className="hidden sm:flex relative items-center h-4 min-w-[95px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={socialPhraseIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.7, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute left-0 text-[11px] sm:text-xs tracking-wide font-semibold flex items-center gap-1 whitespace-nowrap"
                    >
                      {SOCIAL_PHRASES[socialPhraseIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <a href="https://www.instagram.com/politabancura/" target="_blank" rel="noopener noreferrer" aria-label="Ir a nuestro Instagram" className="hover:text-[#259CF4] transition-colors transform hover:scale-110">
                  <Instagram size={14} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61568214167163" target="_blank" rel="noopener noreferrer" aria-label="Ir a nuestro Facebook" className="hover:text-[#259CF4] transition-colors transform hover:scale-110">
                  <Facebook size={14} />
                </a>
                <a href="https://www.tiktok.com/@politabancura" target="_blank" rel="noopener noreferrer" aria-label="Ir a nuestro TikTok" className="hover:text-[#259CF4] transition-colors transform hover:scale-110">
                  <TikTokIcon size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <div className={`transition-all duration-300 bg-[#259CF4]/92 ${isScrolled ? 'py-2 shadow-md' : 'py-4'} border-b border-transparent backdrop-blur-md`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center xl:gap-12 gap-4">
              <Link href="/" onClick={scrollToTop} className="flex items-center group shrink-0">
                <img
                  src="/logo.svg"
                  alt="Policlínico Tabancura"
                  className="h-14 md:h-16 w-auto group-hover:scale-105 transition-transform duration-300 brightness-0 invert"
                />
              </Link>


              {/* Desktop Menu */}
              <div
                className="hidden xl:flex items-center space-x-0.5 text-[13.5px] font-bold text-white relative"
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {NAV_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className="px-4 py-2 relative"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        if (item.href === '/') scrollToTop(e);
                        else handleAnchorClick(e, item.href);
                      }}
                      className={`flex items-center gap-1.5 transition-all duration-300 ${(item as any).highlight
                        ? `bg-[#162158] hover:bg-[#111827] text-white px-5 py-2 rounded-full font-extrabold shadow-md hover:scale-[1.02] active:scale-95`
                        : `hover:text-white/80 ${activeDropdown === item.name ? 'text-white/80' : ''}`
                        }`}
                    >
                      {(item as any).highlight && <Sparkles size={14} className="mr-1 text-white fill-white/20" />}
                      <span className="relative py-0.5 flex items-center gap-1.5">
                        {item.name}
                        {item.subItems && <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
                        {activeDropdown === item.name && !item.highlight && (
                          <motion.div
                            layoutId="nav-underline"
                            className="absolute -bottom-0.5 left-0 right-0 h-px bg-white rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </span>
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
                      <div className={`border rounded-3xl overflow-hidden transition-all duration-300 ${activeDropdown === 'Novedades 2026'
                        ? 'border-white/10 bg-[#162158]/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.35)]'
                        : 'border-white/20 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/92 backdrop-blur-xl shadow-[0_20px_50px_rgba(22,33,88,0.12)] dark:shadow-none'
                        }`}>
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
                              const isNovedades = activeDropdown === 'Novedades 2026';

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
                                    setActiveDropdown(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  target={sub.href.startsWith('http') ? "_blank" : undefined}
                                  rel={sub.href.startsWith('http') ? "noopener noreferrer" : undefined}
                                  className={`group/sub flex items-start gap-4 p-3.5 rounded-2xl transition-all border border-transparent ${isConfirming
                                    ? 'bg-amber-400 dark:bg-amber-500 border-amber-500 hover:bg-amber-500 shadow-md scale-[1.02]'
                                    : isNovedades
                                      ? 'hover:bg-white/10 hover:border-white/15 hover:shadow-sm scale-[1.01]'
                                      : 'hover:bg-[#e8effe] dark:hover:bg-[#162158]/55 hover:border-[#259CF4]/20 dark:hover:border-[#259CF4]/10 hover:shadow-sm scale-[1.01]'
                                    }`}
                                >
                                  {sub.icon && (
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-sm group-hover/sub:shadow-md group-hover/sub:scale-110 group-hover/sub:rotate-3 transition-all shrink-0 [&>svg]:w-5 [&>svg]:h-5 ${isConfirming
                                      ? 'bg-white text-amber-600'
                                      : isNovedades
                                        ? 'bg-white border border-white/10 group-hover/sub:bg-slate-50'
                                        : 'bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800'
                                      }`}>
                                      {sub.icon}
                                    </div>
                                  )}
                                  <div className="flex flex-col pt-1">
                                    <span className={`text-[14.5px] font-bold transition-all duration-300 tracking-tight flex items-center gap-1 group-hover/sub:translate-x-1 ${isConfirming
                                      ? 'text-slate-900'
                                      : isNovedades
                                        ? 'text-white group-hover/sub:text-white'
                                        : 'text-primary dark:text-slate-100 group-hover/sub:text-[#162158] dark:group-hover/sub:text-[#259CF4]'
                                      }`}>
                                      {isConfirming ? "Saldrás de Policlínico Tabancura" : sub.name}
                                      <ChevronRight className={`w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-300 ${isNovedades ? 'text-white' : 'text-[#259CF4]'}`} />
                                    </span>
                                    {sub.desc && (
                                      <span className={`text-[11px] font-medium leading-snug mt-2 transition-all ${isConfirming
                                        ? 'text-slate-800'
                                        : isNovedades
                                          ? 'text-white/60 group-hover/sub:text-white/95'
                                          : 'text-slate-400 opacity-80 group-hover/sub:opacity-100 dark:group-hover/sub:text-slate-200'
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

              {/* Accessibility Button */}
              <AccessibilityMenu />

              {/* Search Bar Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 transition-all group"
              >
                <Search size={16} className="text-white/80 group-hover:text-white transition-colors" />
                <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mr-2">Buscar...</span>
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/20 border border-white/10 rounded-md text-[9px] font-black text-white/95">
                  <span className="text-[8px]">ALT</span> + K
                </div>
              </button>

              <Button
                className="hidden xl:inline-flex bg-[#e8effe] hover:bg-[#162158] text-[#162158] hover:text-[#259CF4] rounded-full px-8 h-11 font-semibold text-[14.5px] transition-all duration-300 active:scale-95 cursor-pointer border-0 shadow-sm"
                onClick={scrollToScheduler}
              >
                Agendar una hora
              </Button>

              {/* Mobile Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Abrir buscador móvil"
                className="xl:hidden w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-sm hover:bg-white/20 transition-all active:scale-95"
              >
                <Search size={20} />
              </button>

              {/* Mobile Toggle */}
              <button
                className="xl:hidden w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-sm hover:bg-white/20 transition-all active:scale-95"
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