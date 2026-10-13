"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Search, Clock, ArrowRight, 
  Sparkles, Stethoscope, SmilePlus, Brain, HeartPulse, Leaf, Newspaper,
  ChevronDown, X, Play, Volume2, Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  author: string;
  imageUrl: string | null;
  readingTime: string | null;
  createdAt: string;
}

const PILL_CATEGORIES = [
  { 
    name: 'Todas', 
    label: 'Todas las áreas', 
    icon: Sparkles,
    activeBg: 'bg-[#259CF4]',
    activeShadow: 'shadow-[#259CF4]/40',
    iconColor: 'text-[#259CF4]'
  },
  { 
    name: 'Noticias', 
    label: 'Noticias', 
    icon: Newspaper,
    activeBg: 'bg-[#f43f5e]', // Coral / Rosa Intenso diferenciado
    activeShadow: 'shadow-[#f43f5e]/40',
    iconColor: 'text-[#f43f5e]'
  },
  { 
    name: 'Salud Dental', 
    label: 'Salud Dental', 
    icon: SmilePlus,
    activeBg: 'bg-[#00c5c8]',
    activeShadow: 'shadow-[#00c5c8]/40',
    iconColor: 'text-[#00c5c8]'
  },
  { 
    name: 'Salud Mental', 
    label: 'Salud Mental', 
    icon: Brain,
    activeBg: 'bg-[#6366f1]',
    activeShadow: 'shadow-[#6366f1]/40',
    iconColor: 'text-[#6366f1]'
  },
  { 
    name: 'Medicina General', 
    label: 'Medicina General', 
    icon: Stethoscope,
    activeBg: 'bg-[#2563eb]',
    activeShadow: 'shadow-[#2563eb]/40',
    iconColor: 'text-[#2563eb]'
  },
  { 
    name: 'Terapias Complementarias', 
    label: 'Terapias Complementarias', 
    icon: Leaf,
    activeBg: 'bg-[#10b981]',
    activeShadow: 'shadow-[#10b981]/40',
    iconColor: 'text-[#10b981]'
  },
];

export function getCategoryBadgeStyle(category: string) {
  switch (category) {
    case 'Noticias':
      return {
        bg: 'bg-[#f43f5e] text-white shadow-[#f43f5e]/30',
        icon: Newspaper,
      };
    case 'Salud Dental':
      return {
        bg: 'bg-[#00c5c8] text-white shadow-[#00c5c8]/30',
        icon: SmilePlus,
      };
    case 'Salud Mental':
      return {
        bg: 'bg-[#6366f1] text-white shadow-[#6366f1]/30',
        icon: Brain,
      };
    case 'Medicina General':
      return {
        bg: 'bg-[#2563eb] text-white shadow-[#2563eb]/30',
        icon: Stethoscope,
      };
    case 'Terapias Complementarias':
      return {
        bg: 'bg-[#10b981] text-white shadow-[#10b981]/30',
        icon: Leaf,
      };
    default:
      return {
        bg: 'bg-[#259CF4] text-white shadow-[#259CF4]/30',
        icon: Sparkles,
      };
  }
}

export default function BlogListClient() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (err) {
        console.error("Error cargando blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Lista dinámica para el filtro de categorías
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));
    return ["Todas", ...cats];
  }, [posts]);

  // Artículos filtrados (afectan tanto a los destacados como a la grilla inferior)
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || 
        post.title.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query);
      const matchesCat = selectedCategory === "Todas" || post.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [posts, searchTerm, selectedCategory]);

  // Artículos asignados dinámicamente según el filtro seleccionado
  const heroMain = filteredPosts[0]; // Card grande izquierda
  const heroSideTop = filteredPosts[1] || filteredPosts[0]; // Card superior derecha
  const heroSideBottom = filteredPosts[2] || filteredPosts[0]; // Card inferior derecha

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-white selection:bg-[#259CF4]/20 transition-colors duration-300">
      
      {/* =========================================================================
          BLOQUE 1: DESTACADOS (FONDO BLANCO / CLÍNICO ELEGANTE)
          ========================================================================= */}
      <section className="pt-32 sm:pt-36 lg:pt-40 pb-16 px-6 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200/70 dark:border-white/5">
        <div className="container mx-auto max-w-7xl">
          
          {/* Título Central */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tight">
              Explora nuestros artículos destacados
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xl mx-auto">
              Información médica, novedades tecnológicas y guías clínicas de Policlínico Tabancura.
            </p>

            {/* PILLS DE CATEGORÍAS FILTRABLES CON COLOR E ÍCONO DE ESPECIALIDAD */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap mt-8">
              {PILL_CATEGORIES.map((pill) => {
                const Icon = pill.icon;
                const isSelected = selectedCategory === pill.name;

                return (
                  <button
                    key={pill.name}
                    onClick={() => setSelectedCategory(pill.name)}
                    className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 transform active:scale-95 shadow-sm ${
                      isSelected
                        ? `${pill.activeBg} text-white scale-105`
                        : 'bg-slate-100 hover:bg-slate-200/70 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <Icon 
                      size={15} 
                      className={isSelected ? 'text-white' : pill.iconColor} 
                      strokeWidth={isSelected ? 2.5 : 2}
                    />
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 border-4 border-[#259CF4]/30 border-t-[#259CF4] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Cargando publicaciones...</p>
            </div>
          ) : heroMain ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-10">
              
              {/* Card Grande Izquierda (Completamente clickeable) */}
              <motion.div 
                key={heroMain.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-7 group relative rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-100 dark:border-white/10 shadow-2xl shadow-slate-200/70 dark:shadow-none flex flex-col justify-end min-h-[440px] sm:min-h-[500px]"
              >
                {/* Enlace clickeable a pantalla completa en la imagen/tarjeta */}
                <Link href={`/blog/${heroMain.slug}`} className="absolute inset-0 z-10 cursor-pointer">
                  <span className="sr-only">Leer {heroMain.title}</span>
                </Link>

                {/* Imagen de Fondo */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={heroMain.imageUrl || '/imagenes_general/heroNuevoNuevo.jpg'} 
                    alt={heroMain.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-black/20" />
                </div>

                {/* Badges Superiores con Color de Especialidad */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 pointer-events-none">
                  {(() => {
                    const badge = getCategoryBadgeStyle(heroMain.category);
                    const BadgeIcon = badge.icon;
                    return (
                      <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold shadow-md ${badge.bg}`}>
                        <BadgeIcon size={13} className="shrink-0" />
                        {heroMain.category}
                      </span>
                    );
                  })()}
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-black/40 backdrop-blur-md text-white border border-white/20">
                    {heroMain.readingTime || '4 min'} de lectura
                  </span>
                </div>

                {/* Contenido Inferior */}
                <div className="relative z-20 p-6 sm:p-10 text-white pointer-events-none">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white group-hover:text-[#259CF4] transition-colors leading-tight mb-4">
                    {heroMain.title}
                  </h2>
                  <p className="text-slate-200 text-sm line-clamp-2 max-w-xl mb-4 leading-relaxed font-normal">
                    {heroMain.excerpt}
                  </p>
                  <p className="text-xs text-slate-400 font-semibold">
                    {new Date(heroMain.createdAt).toLocaleDateString('es-CL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>

              {/* Columna Derecha (2 Cards) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Card Superior Derecha: Cápsula Médica con fondo claro */}
                <motion.div 
                  key={`side-top-${heroSideTop?.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="rounded-[2.5rem] bg-white dark:bg-[#162145]/90 border border-slate-200/80 dark:border-white/10 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between flex-1 min-h-[220px]"
                >
                  <div className="flex gap-5 items-start">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 relative shadow-sm">
                      <img 
                        src={heroSideTop?.imageUrl || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80'} 
                        alt={heroSideTop?.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#259CF4]">
                          {heroSideTop?.category || 'Cápsula de Salud'}
                        </span>
                        <Volume2 size={16} className="text-[#259CF4]" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-primary dark:text-white line-clamp-2 leading-snug">
                        {heroSideTop?.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                        {heroSideTop?.author}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10 mt-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                      <Clock size={13} className="text-[#259CF4]" /> {heroSideTop?.readingTime || '5 min'}
                    </span>
                    <Link 
                      href={`/blog/${heroSideTop?.slug}`}
                      className="w-10 h-10 rounded-full bg-primary hover:bg-[#259CF4] text-white flex items-center justify-center transition-colors shadow-md"
                    >
                      <Play size={16} fill="currentColor" className="ml-0.5" />
                    </Link>
                  </div>
                </motion.div>

                {/* Card Inferior Derecha: Tip Médico del Especialista */}
                {(() => {
                  const getTipData = () => {
                    switch (selectedCategory) {
                      case 'Salud Dental':
                        return {
                          badge: 'Tip Odontológico',
                          badgeBg: 'bg-[#00c5c8]/10 text-[#00c5c8] border-[#00c5c8]/20',
                          iconBg: 'bg-[#00c5c8]/10 text-[#00c5c8]',
                          tip: 'Cambiar tu cepillo dental cada 3 meses evita la acumulación bacteriana y protege el esmalte de microabrasiones.',
                          linkText: 'Ver cuidados dentales',
                          linkUrl: '/blog/cuidado-dental-integral-prevencion-caries-periodontal'
                        };
                      case 'Salud Mental':
                        return {
                          badge: 'Bienestar Emocional',
                          badgeBg: 'bg-[#6366f1]/10 text-[#6366f1] border-[#6366f1]/20',
                          iconBg: 'bg-[#6366f1]/10 text-[#6366f1]',
                          tip: 'Caminar 20 minutos al aire libre sin pantallas reduce los niveles de cortisol y mejora la calidad del descanso nocturno.',
                          linkText: 'Leer sobre manejo del estrés',
                          linkUrl: '/blog/salud-mental-manejo-del-estres-bienestar-emocional'
                        };
                      case 'Terapias Complementarias':
                        return {
                          badge: 'Consejo Postural',
                          badgeBg: 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20',
                          iconBg: 'bg-[#10b981]/10 text-[#10b981]',
                          tip: 'Hacer pausas activas de estiramiento cervical cada 2 horas sentados previene contracturas crónicas lumbares.',
                          linkText: 'Guía de movilidad y kinesiología',
                          linkUrl: '/blog/terapias-complementarias-kinesiologia-movilidad-vitalidad'
                        };
                      case 'Noticias':
                        return {
                          badge: 'Dato Institucional',
                          badgeBg: 'bg-[#f43f5e]/10 text-[#f43f5e] border-[#f43f5e]/20',
                          iconBg: 'bg-[#f43f5e]/10 text-[#f43f5e]',
                          tip: 'Puedes acceder a hasta un 25% de descuento en arancel general a través de nuestros convenios con colegios e instituciones.',
                          linkText: 'Revisar noticias y convenios',
                          linkUrl: '/blog/policlinico-tabancura-renueva-equipamiento-nuevos-convenios-2026'
                        };
                      default:
                        return {
                          badge: 'Tip de Salud Preventiva',
                          badgeBg: 'bg-[#259CF4]/10 text-[#259CF4] border-[#259CF4]/20',
                          iconBg: 'bg-[#259CF4]/10 text-[#259CF4]',
                          tip: 'Un chequeo médico y perfil de laboratorio anual permite detectar a tiempo patologías silenciosas como hipertensión o glicemia.',
                          linkText: 'Conocer chequeos clave',
                          linkUrl: '/blog/medicina-general-preventiva-chequeos-anuales-longevidad'
                        };
                    }
                  };

                  const tipInfo = getTipData();

                  return (
                    <motion.div 
                      key={`tip-${selectedCategory}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-[2.5rem] bg-white dark:bg-[#162145]/90 border border-slate-200/80 dark:border-white/10 p-6 sm:p-7 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between group transition-all flex-1 min-h-[160px]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${tipInfo.badgeBg}`}>
                            <Lightbulb size={12} className="shrink-0" />
                            {tipInfo.badge}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-400">
                            Policlínico Tabancura
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                          "{tipInfo.tip}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-white/10 mt-3 flex items-center justify-between">
                        <Link 
                          href={tipInfo.linkUrl}
                          className="text-xs font-bold text-primary dark:text-[#259CF4] hover:underline flex items-center gap-1"
                        >
                          {tipInfo.linkText}
                          <ArrowRight size={13} className="text-[#259CF4] group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          href="/agenda"
                          className="text-[11px] font-bold text-slate-500 hover:text-primary dark:text-slate-400 transition-colors"
                        >
                          Agendar hora →
                        </Link>
                      </div>
                    </motion.div>
                  );
                })()}

              </div>

            </div>
          ) : (
            <div className="text-center py-16 text-slate-500">
              No hay artículos disponibles para esta categoría actualmente.
            </div>
          )}

        </div>
      </section>


      {/* =========================================================================
          BLOQUE 2: MÁS ARTÍCULOS ("Más artículos y publicaciones")
          ========================================================================= */}
      <section className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white py-16 sm:py-20 px-6 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl">
          
          {/* Título de la Sección 2 en Español */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tight">
              Más artículos y publicaciones
            </h2>
          </div>

          {/* BARRA DE FILTROS EN ESPAÑOL:
              "Filtrar por: [Categoría principal v] [Buscar aquí...] [Restablecer]" */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm">
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
                Filtrar por:
              </span>

              {/* Dropdown Categoría Principal */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 pr-9 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#259CF4]/30 cursor-pointer shadow-sm"
                >
                  <option value="Todas">Todas las categorías</option>
                  {categories.filter(c => c !== 'Todas').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Botón Restablecer */}
              {(searchTerm || selectedCategory !== 'Todas') && (
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                  className="text-xs font-bold text-[#259CF4] hover:underline px-2 py-1"
                >
                  Restablecer
                </button>
              )}
            </div>

            {/* Input Buscar aquí... */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Buscar temas o síntomas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#259CF4]/30"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>

          </div>

          {/* Contador "Mostrando X artículos" */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
            <span className="font-bold">
              Mostrando <span className="text-primary dark:text-[#259CF4]">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>

          {/* GRILLA DE ARTÍCULOS EN FORMATO TARJETA OSCURA CON OVERLAY */}
          {loading ? (
            <div className="py-24 text-center">
              <div className="w-12 h-12 border-4 border-[#259CF4]/30 border-t-[#259CF4] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Cargando publicaciones...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20 bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
              <BookOpen className="mx-auto text-slate-400 mb-4" size={48} />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No se encontraron artículos</h3>
              <p className="text-slate-500 text-sm mb-6">
                Intenta ajustando tu categoría o término de búsqueda.
              </p>
              <Button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('Todas'); }}
                className="bg-primary text-white font-bold rounded-xl"
              >
                Limpiar búsqueda
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl min-h-[380px] flex flex-col justify-end transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-[#259CF4]/50 cursor-pointer"
                >
                  {/* Enlace que cubre toda la tarjeta e imagen */}
                  <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10 cursor-pointer">
                    <span className="sr-only">Leer {post.title}</span>
                  </Link>

                  {/* Imagen de fondo completa */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={post.imageUrl || '/imagenes_general/heroNuevoNuevo.jpg'} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  </div>

                  {/* Píldoras Superiores con Color de Especialidad */}
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-2 pointer-events-none">
                    {(() => {
                      const badge = getCategoryBadgeStyle(post.category);
                      const BadgeIcon = badge.icon;
                      return (
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-md ${badge.bg}`}>
                          <BadgeIcon size={12} className="shrink-0" />
                          {post.category}
                        </span>
                      );
                    })()}
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black/40 backdrop-blur-md text-white border border-white/20">
                      {post.readingTime || '3 min'} de lectura
                    </span>
                  </div>

                  {/* Texto y Fecha */}
                  <div className="relative z-20 p-6 sm:p-7 text-white pointer-events-none">
                    <h3 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-[#259CF4] transition-colors line-clamp-2 mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="text-xs text-slate-400 font-medium">
                      {new Date(post.createdAt).toLocaleDateString('es-CL', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
