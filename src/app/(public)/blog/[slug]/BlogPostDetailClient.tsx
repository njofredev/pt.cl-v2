"use client";

import { motion } from 'framer-motion';
import { 
  ChevronRight, Link2, Check, Clock, Calendar, 
  ArrowLeft, Share2, Sparkles, BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  author: string;
  imageUrl: string | null;
  readingTime: string | null;
  createdAt: string;
}

interface SuggestedPost {
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

function getCategoryBadgeColor(category: string) {
  switch (category) {
    case 'Noticias':
      return 'bg-[#f43f5e] text-white';
    case 'Salud Dental':
      return 'bg-[#00c5c8] text-white';
    case 'Salud Mental':
      return 'bg-[#6366f1] text-white';
    case 'Medicina General':
      return 'bg-[#2563eb] text-white';
    case 'Terapias Complementarias':
      return 'bg-[#10b981] text-white';
    default:
      return 'bg-[#259CF4] text-white';
  }
}

export default function BlogPostDetailClient({ 
  post,
  suggestedPosts = []
}: { 
  post: BlogPost;
  suggestedPosts?: SuggestedPost[];
}) {
  const [copied, setCopied] = useState(false);

  const formattedDate = new Date(post.createdAt).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const paragraphs = post.content.split('\n\n').filter(p => p.trim().length > 0);

  return (
    <article className="min-h-screen pt-44 sm:pt-48 md:pt-52 pb-28 bg-[#f8fbff] dark:bg-slate-950 font-sans antialiased text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* 1. BREADCRUMBS MINIMALISTA */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1a73e8] dark:text-[#8ab4f8] mb-6 flex-wrap leading-normal">
          <Link href="/" className="hover:underline">
            Inicio
          </Link>
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <ChevronRight size={14} className="text-slate-400 shrink-0" />
          <span className="hover:underline cursor-pointer">
            {post.category}
          </span>
        </nav>

        {/* 2. TÍTULO PRINCIPAL */}
        <motion.h1 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.02em] text-[#202124] dark:text-white leading-[1.2] mb-6"
        >
          {post.title}
        </motion.h1>

        {/* 3. FECHA Y BOTÓN CIRCULAR DE COPIAR ENLACE */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200/80 dark:border-white/10">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {formattedDate}
          </span>

          <span className="text-slate-300 dark:text-slate-700">•</span>

          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
            <Clock size={13} className="text-[#1a73e8]" />
            {post.readingTime || '4 min'} de lectura
          </span>

          <button
            onClick={handleCopyLink}
            title="Copiar enlace del artículo"
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ml-auto transform active:scale-95 ${
              copied 
                ? 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40' 
                : 'border-[#1a73e8] text-[#1a73e8] hover:bg-[#1a73e8]/10'
            }`}
          >
            {copied ? <Check size={18} strokeWidth={2.5} /> : <Link2 size={18} strokeWidth={2.5} />}
          </button>
        </div>

        {/* 4. IMAGEN DE PORTADA */}
        {post.imageUrl && (
          <div className="rounded-3xl overflow-hidden mb-12 shadow-md border border-slate-200/70 dark:border-white/10 max-h-[460px]">
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="w-full h-full object-cover" 
            />
          </div>
        )}

        {/* 5. CUERPO DEL ARTÍCULO */}
        <div className="space-y-6 text-[#3c4043] dark:text-slate-300 text-lg leading-[1.8] font-normal">
          {paragraphs.map((para, index) => {
            if (para.startsWith('## ')) {
              return (
                <h2 key={index} className="text-2xl sm:text-3xl font-medium text-[#202124] dark:text-white pt-6 pb-2 tracking-tight">
                  {para.replace('## ', '')}
                </h2>
              );
            }
            if (para.startsWith('### ')) {
              return (
                <h3 key={index} className="text-xl sm:text-2xl font-semibold text-[#202124] dark:text-white pt-4 tracking-tight">
                  {para.replace('### ', '')}
                </h3>
              );
            }
            if (para.includes('\n- ') || para.startsWith('- ')) {
              const items = para.split('\n').filter(i => i.trim().length > 0);
              return (
                <ul key={index} className="space-y-3.5 my-6 pl-2 list-none">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#1a73e8] shrink-0 mt-2.5" />
                      <span className="flex-1 leading-relaxed">
                        {item.replace(/^- /, '')}
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="leading-[1.8] whitespace-pre-line">
                {para}
              </p>
            );
          })}
        </div>

        {/* 6. CTA EDITORIAL MODERNO Y ELEGANTE */}
        <div className="mt-14 relative overflow-hidden rounded-2xl border border-blue-100 dark:border-blue-950/60 bg-gradient-to-br from-blue-50/70 via-sky-50/40 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 p-6 sm:p-8 shadow-sm">
          {/* Acento decorativo sutil */}
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-2xl pointer-events-none" />
          
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#8ab4f8]">
                <Sparkles size={13} className="shrink-0" />
                Atención Médica Integral
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                ¿Necesitas consultar con un especialista?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                En Policlínico Tabancura contamos con atención presencial en Vitacura, convenios Fonasa y aranceles solidarios para toda tu familia.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 pt-2 sm:pt-0">
              <Link 
                href="/servicios" 
                className="text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-slate-300 bg-white/80 dark:bg-slate-800/80 shadow-2xs"
              >
                Ver especialidades
              </Link>
              <Link href="/agenda">
                <Button className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold rounded-xl h-10 px-5 text-xs shadow-sm shadow-blue-500/20">
                  Agendar hora online
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ENLACE PARA VOLVER */}
        <div className="mt-10 pt-6 border-t border-slate-200/60 dark:border-white/10">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#1a73e8] dark:text-[#8ab4f8] hover:underline"
          >
            <ArrowLeft size={14} />
            Volver al listado del Blog
          </Link>
        </div>

      </div>

      {/* =========================================================================
          7. SECCIÓN DE SUGERENCIAS: "Artículos sugeridos" (Estilo Google Blog editorial)
          ========================================================================= */}
      {suggestedPosts.length > 0 && (
        <section className="mt-20 pt-14 pb-20 border-t border-slate-200/70 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="container mx-auto px-6 max-w-6xl">
            
            <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-200/60 dark:border-white/10">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a73e8] dark:text-[#8ab4f8]">
                  Explorar más contenido
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                  Artículos sugeridos
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Consejos clínicos y novedades preparadas por nuestro equipo médico
                </p>
              </div>

              <Link 
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#1a73e8] dark:text-[#8ab4f8] hover:text-[#1557b0] transition-colors"
              >
                <span>Ver todos</span>
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {suggestedPosts.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-xs hover:shadow-lg hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Imagen superior con relación de aspecto cuidada */}
                  <Link href={`/blog/${item.slug}`} className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={item.imageUrl || '/imagenes_general/heroNuevoNuevo.jpg'} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide shadow-xs ${getCategoryBadgeColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                  </Link>

                  {/* Contenido de la tarjeta */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      {/* Meta info: Tiempo de lectura y fecha */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 mb-2.5">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {item.readingTime || '3 min'}
                        </span>
                        <span>•</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString('es-CL', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      {/* Título */}
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors line-clamp-2 mb-2">
                        <Link href={`/blog/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h4>

                      {/* Extracto si existe */}
                      {item.excerpt && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {item.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Botón de lectura */}
                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <Link 
                        href={`/blog/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1a73e8] dark:text-[#8ab4f8] group-hover:underline"
                      >
                        Leer artículo
                        <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      )}

    </article>
  );
}
