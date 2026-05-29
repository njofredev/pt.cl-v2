"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, StarHalf, Quote, Building2 } from 'lucide-react';

const VITACURA_RAW = [
  {
    author: "Paula Urrutia M.",
    text: "El lugar es buenísimo, vine por las recomendaciones de los otros usuarios y me encantó. Me atendí por la parte dental, y todos fueron muy amables. Lo más importante y que me dio confianza, es que el lugar es muy limpio, me atendieron a la hora y quedé feliz con el resultado. La foto es de la sala de esperas.",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Andrea Ponce",
    text: "Personalmente, junto a mis hijos, hemos tenido una excelente experiencia en el área Dental. Tanto las recepcionistas, asistentes dentales como los profesionales odontólogos nos han brindado un servicio excepcional, siempre muy atentos y preocupados por nuestro bienestar. Se nota el compromiso del equipo con ofrecer una atención de calidad, haciendo que uno se sienta cómodo y bien cuidado en todo momento. ¡Totalmente recomendable!",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Cristina Gonzalez",
    text: "El edificio es moderno, muy limpio y bien ubicado.. sin embargo, las instalaciones del área dental me parecen antiguas para ser un lugar privado. Al llamarse Policlínico se puede pensar que es económico y no es así. Lo que realmente destaco es la atención de las chicas de recepción, son súper amables y profesionales.",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Maca Urra",
    text: "Me gusto mucho la atencion, muy calidos, pacientes y dedicados todo el personal, doctor, asistente y recepcionista. Precios accesibles. Lugar muy bien cuidado y con detalles que lo hacen mas amable para el paciente.",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Gisella Guajardo",
    text: "Buenísima atención, tanto de las recepcionistas como de los profesionales (dentista y tons), información clara, instrumentos de calidad, lugar impecable, acceso cómodo, puntualidad.",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Carolina",
    text: "Muy buena atención y valores. Lugar limpio,ordenado y con equipos moderno. Lo recomiendo.",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Veronica Palma",
    text: "Se atendió mi nieto adolescente y quedó muy contento con la atención cercana de la profesional dental. Yo satisfecha con el precio preferencial como vecino Vitacura",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Sandra Trampe",
    text: "Excelente atención....  la persona que me atendió  es Verónica Palma... muy amable ...muy agradecida de ella...",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Maribel Dezerega",
    text: "Excelente atención de la podologa y  de Tamara Además muy preocupadas ambas de los pacientes 10 de 10",
    nota: 5,
    date: "Agosto 2025"
  },
  {
    author: "Daniela Labarthe",
    text: "Muy bien recepciónada por Karen Mazry,   y excelente atención del profesional Antonio Alvear.",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Tomás Fuentes Cantillana",
    text: "Tengo una grata experiencia cuando me atiendo. Muy eficientes y amables.",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Mary",
    text: "Excelente atención. Me sentí muy cómoda",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "olivia paul",
    text: "Todo bien. Buena atención y super puntuales.",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Vereliz",
    text: "Muy atentos y atención excelente..",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "carlos kinast feliu",
    text: "Óptima desde la recepción hasta la despedida.",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Francisca Arancibia",
    text: "Amables y resolutivos. El Dr Patricio Merino un 7.",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Macarena Sanfeliú",
    text: "Excelente atención",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Giovanna Ceballos",
    text: "Me encanta",
    nota: 5,
    date: "Septiembre 2025"
  },
  {
    author: "Constanza Jimenez",
    text: "Un lugar de profesionalismo en recepción y dentistas",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Vale Neira",
    text: "Excelente servicio",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Florencia Poblete",
    text: "¡Excelente atención!",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Belkis Velásquez",
    text: "Excelente servicio!!",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Julia Vega",
    text: "Excelente atención.",
    nota: 5,
    date: "Junio 2025"
  },
  {
    author: "Gabriela Vergara Ortega",
    text: "Atienden bien. Pero especialmente la tecnóloga de oftalmolgia es amorosa y explica todo muy bien, tiene paciencia con los exámenes largos. 10 de 10 ni en el sistema privado me habían atendido tan bien. El dr también es muy preocupado.",
    nota: 5,
    date: "Mayo 2026"
  },
  {
    author: "Eduardo Delgado Pino",
    text: "Muy amables, excelentes profesionales",
    nota: 5,
    date: "Abril 2026"
  },
  {
    author: "Francisco Miño Kraus",
    text: "Grandes profesionales. Excelente ambiente y trato desde Gabriela, Cony en recepcion y los profesionales. Precios muy convenientes siempre",
    nota: 5,
    date: "Marzo 2026"
  }
];

const TRIBUNALES_RAW = [
  {
    author: "Francisca Miquel",
    text: "Atienden muy bien todos muy amables y precios muy razonables",
    nota: 5,
    date: "Diciembre 2025"
  },
  {
    author: "Juan Pablo Verschueren",
    text: "Todo impecable y excelente atención",
    nota: 5,
    date: "Diciembre 2025"
  },
  {
    author: "romina martin",
    text: "Excelentes profesionales and servicio",
    nota: 5,
    date: "Octubre 2025"
  },
  {
    author: "Francisco Miño Kraus",
    text: "Constanza y todo el equipo son de verdad muy buenas. Médicos excelentes.",
    nota: 5,
    date: "Octubre 2025"
  },
  {
    author: "Amalia Echeverria Griffin",
    text: "Excelentes profesionales",
    nota: 5,
    date: "Agosto 2025"
  },
  {
    author: "Gustavo van der Goes",
    text: "Excelente atención de todos. Se pasaron atendiendo a Santiago!  Muy agradecido",
    nota: 5,
    date: "Agosto 2025"
  },
  {
    author: "Benjamín Massad",
    text: "muy buena atención todos muy simpáticos, increíble servicio",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "María Inés Cáceres",
    text: "Mi hijo le sacaron una muela y lo trataron muy bien",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Rosa Gana contreras",
    text: "Desde hace más de  30 años que visito al Policlínico junto a toda mi familia lis especialistas son muy profesionales y el personal con muy buena predisposición",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Soledad Iturra",
    text: "Muy buena recepción",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Juli Baez",
    text: "Excelente atención de todo el personal! Divino lugar!",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "luis salas",
    text: "Excelente atención y muy profesional a precios razonables",
    nota: 5,
    date: "Julio 2025"
  },
  {
    author: "Barbara Garcia",
    text: "Muy buena la atención",
    nota: 5,
    date: "Enero 2025"
  },
  {
    author: "Diego Villamizar",
    text: "Llevo a mi hijo a odontología. Siempre excelente atención por la doctora y su equipo.",
    nota: 5,
    date: "Enero 2023"
  },
  {
    author: "Tere Covarrubias Correa",
    text: "Excelente lugar y servicio!!!",
    nota: 5,
    date: "Julio 2022"
  },
  {
    author: "Barbarafresia2016 Medina",
    text: "Exelente muy bueno",
    nota: 5,
    date: "Julio 2019"
  }
];

const DATA = {
  vitacura: {
    name: "Sucursal Vitacura",
    rating: "4.9",
    count: 56,
    reviews: [...VITACURA_RAW, ...VITACURA_RAW]
  },
  tribunales: {
    name: "Sucursal Tribunales",
    rating: "4.4",
    count: 31,
    reviews: [...TRIBUNALES_RAW, ...TRIBUNALES_RAW]
  }
};

export const GoogleReviews = () => {
  const [branch, setBranch] = useState<'vitacura' | 'tribunales'>('vitacura');
  const [isPaused, setIsPaused] = useState(false);
  const activeData = DATA[branch];

  return (
    <section className="py-16 relative overflow-hidden bg-transparent dark:bg-transparent">
      <div className="container mx-auto px-6 relative z-10">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16">
          <div className="flex flex-col max-w-lg w-full lg:text-left text-center items-center lg:items-start">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#EA4335" className="text-[#EA4335]" />
                ))}
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Reseñas Verificadas</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary dark:text-white tracking-tighter leading-[0.9] mb-6">
              Tu opinión nos importa. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-teal-400 to-secondary dark:from-white dark:via-secondary dark:to-teal-400">Experiencias reales.</span>
            </h2>

            {/* Selector de Sucursales */}
            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800 w-fit shadow-inner">
              {(['vitacura', 'tribunales'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setBranch(b)}
                  className={`relative px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${branch === b
                    ? 'text-white shadow-lg shadow-primary/20 bg-primary'
                    : 'text-slate-600 hover:text-primary dark:text-slate-400 dark:hover:text-white'
                    }`}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <Building2 size={12} />
                    {b === 'vitacura' ? 'Vitacura' : 'Tribunales'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Resumen Numérico Dinámico */}
          <AnimatePresence mode="wait">
            <motion.div
              key={branch}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2.5rem] shadow-[0_20px_40px_-5px_rgba(15,23,42,0.08)] dark:shadow-none border border-slate-300 dark:border-slate-800 flex items-center gap-6 relative overflow-hidden shrink-0"
            >
              <svg className="absolute -right-4 -bottom-4 w-24 h-24 opacity-[0.03] dark:opacity-[0.05]" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>

              <div className="flex flex-col items-center shrink-0">
                <span className="text-5xl font-black text-primary dark:text-white tracking-tighter leading-none flex items-baseline">
                  {activeData.rating}
                  <span className="text-lg font-bold text-slate-400 dark:text-slate-500 ml-0.5">/5.0</span>
                </span>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, i) => {
                    const isVitacura = branch === 'vitacura';
                    let fillPercent = 100;
                    if (isVitacura && i === 4) {
                      fillPercent = 90; // Vitacura 4.9 has 90% fill on 5th star
                    } else if (!isVitacura && i === 4) {
                      fillPercent = 40; // Tribunales 4.4 has 40% fill on 5th star
                    }

                    if (fillPercent === 100) {
                      return <Star key={i} size={14} fill="#FBBC05" className="text-[#FBBC05] shrink-0" />;
                    } else {
                      return (
                        <div key={i} className="relative w-[14px] h-[14px] shrink-0">
                          {/* Background unfilled star */}
                          <Star size={14} className="absolute inset-0 text-slate-200 dark:text-slate-800" />
                          {/* Foreground clipped star */}
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ clipPath: `polygon(0 0, ${fillPercent}% 0, ${fillPercent}% 100%, 0 100%)` }}
                          >
                            <Star size={14} fill="#FBBC05" className="text-[#FBBC05]" />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="h-16 w-px bg-slate-100 dark:bg-slate-800"></div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Google Rating</span>
                </div>
                <p className="text-[13px] font-medium text-slate-600 dark:text-slate-300">
                  Basado en más de  <span className="font-black text-primary dark:text-secondary">{activeData.count} opiniones</span> reales
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-2"
      >
        <div
          className="flex w-fit gap-6 py-4 px-6"
          style={{
            animationName: 'marquee',
            animationDuration: branch === 'vitacura' ? '140s' : '90s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {activeData.reviews.map((review, idx) => (
            <motion.div
              key={`${branch}-${idx}`}
              whileHover={{ y: -4 }}
              className="w-[320px] md:w-[380px] bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-[2rem] border border-slate-300/80 dark:border-slate-800 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-none hover:shadow-2xl hover:shadow-slate-300/50 dark:hover:shadow-none flex flex-col shrink-0 group/card transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="flex gap-0.5">
                  {[...Array(review.nota)].map((_, i) => (
                    <Star key={i} size={14} fill="#FBBC05" className="text-[#FBBC05]" />
                  ))}
                </div>
                <Quote size={22} className="text-slate-200 dark:text-slate-800 group-hover/card:text-secondary/20 transition-colors rotate-180" />
              </div>

              <p className="text-[14px] md:text-[15px] text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-6 flex-1 italic">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-auto">
                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-slate-500 dark:text-slate-400 shrink-0">
                  {review.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-primary dark:text-white truncate leading-tight">{review.author}</span>
                  <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    Paciente • {review.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-[11px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-[0.2em]">
            ¿Te has atendido con nosotros recientemente?
          </p>
          <h3 className="text-lg md:text-xl font-bold text-primary dark:text-white mb-2">
            Comparte tu experiencia en Google
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://g.page/r/CQnnnRuZmSXvEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white border border-slate-200/60 dark:border-slate-800 rounded-full text-[11px] font-black uppercase tracking-widest hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Reseñar Vitacura
            </a>
            <a
              href="https://g.page/r/CQIjawVKOBfhEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white border border-slate-200/60 dark:border-slate-800 rounded-full text-[11px] font-black uppercase tracking-widest hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all group"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Reseñar Tribunales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
