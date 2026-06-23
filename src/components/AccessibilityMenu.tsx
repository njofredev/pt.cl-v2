"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PersonStanding,
  Contrast,
  Type,
  Link as LinkIcon,
  RefreshCw,
  X,
  MousePointer,
  Palette,
  CaseSensitive
} from 'lucide-react';

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // States
  const [fontSize, setFontSize] = useState<'normal' | 'lg' | 'xl'>('normal');
  const [contrast, setContrast] = useState<'normal' | 'high' | 'grayscale'>('normal');
  const [readableFont, setReadableFont] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [largeCursor, setLargeCursor] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFontSize = localStorage.getItem('access-font-size') as 'normal' | 'lg' | 'xl';
      const storedContrast = localStorage.getItem('access-contrast') as 'normal' | 'high' | 'grayscale';
      const storedReadableFont = localStorage.getItem('access-readable-font') === 'true';
      const storedHighlightLinks = localStorage.getItem('access-highlight-links') === 'true';
      const storedLargeCursor = localStorage.getItem('access-large-cursor') === 'true';

      if (storedFontSize) setFontSize(storedFontSize);
      if (storedContrast) setContrast(storedContrast);
      if (storedReadableFont) setReadableFont(storedReadableFont);
      if (storedHighlightLinks) setHighlightLinks(storedHighlightLinks);
      if (storedLargeCursor) setLargeCursor(storedLargeCursor);
    }
  }, []);

  // Apply classes to documentElement when states change
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;

    // Font size
    html.classList.remove('access-font-lg', 'access-font-xl');
    if (fontSize === 'lg') html.classList.add('access-font-lg');
    if (fontSize === 'xl') html.classList.add('access-font-xl');
    localStorage.setItem('access-font-size', fontSize);

    // Contrast
    html.classList.remove('access-contrast-high', 'access-grayscale');
    if (contrast === 'high') html.classList.add('access-contrast-high');
    if (contrast === 'grayscale') html.classList.add('access-grayscale');
    localStorage.setItem('access-contrast', contrast);

    // Readable font
    if (readableFont) {
      html.classList.add('access-readable-font');
    } else {
      html.classList.remove('access-readable-font');
    }
    localStorage.setItem('access-readable-font', String(readableFont));

    // Highlight links
    if (highlightLinks) {
      html.classList.add('access-links-highlight');
    } else {
      html.classList.remove('access-links-highlight');
    }
    localStorage.setItem('access-highlight-links', String(highlightLinks));

    // Large cursor
    if (largeCursor) {
      html.classList.add('access-cursor-large');
    } else {
      html.classList.remove('access-cursor-large');
    }
    localStorage.setItem('access-large-cursor', String(largeCursor));

  }, [fontSize, contrast, readableFont, highlightLinks, largeCursor]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleReset = () => {
    setFontSize('normal');
    setContrast('normal');
    setReadableFont(false);
    setHighlightLinks(false);
    setLargeCursor(false);
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Accessibility trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de accesibilidad"
        className={`w-12 h-12 md:w-11 md:h-11 rounded-2xl flex items-center justify-center border transition-all active:scale-95 cursor-pointer shadow-md ${isOpen
            ? 'bg-white text-[#259CF4] border-white'
            : 'bg-[#162158] border-[#162158] hover:bg-[#162158]/90 text-white'
          }`}
      >
        <PersonStanding size={22} className={isOpen ? 'animate-pulse' : ''} />
      </button>

      {/* Accessibility dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl z-[999] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#259CF4]/10 dark:bg-slate-800/50 px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PersonStanding className="w-5 h-5 text-[#259CF4]" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Accesibilidad</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content options - UserWay-like Grid */}
            <div className="grid grid-cols-2 bg-slate-50/10 dark:bg-slate-950/10">
              
              {/* Box 1: Contrast */}
              <button
                onClick={() => setContrast(contrast === 'high' ? 'normal' : 'high')}
                className={`flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 gap-2.5 cursor-pointer border-r border-b border-slate-100 dark:border-slate-800/60 ${
                  contrast === 'high'
                    ? 'bg-[#259CF4]/10 dark:bg-[#259CF4]/20 border-r border-b border-[#259CF4]/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-950/80 text-slate-600 dark:text-slate-455'
                }`}
              >
                <Contrast size={26} className={contrast === 'high' ? 'text-[#259CF4]' : 'text-slate-500 dark:text-slate-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${contrast === 'high' ? 'text-[#259CF4]' : 'text-slate-700 dark:text-slate-350'}`}>
                  Contraste +
                </span>
              </button>

              {/* Box 2: Cursor */}
              <button
                onClick={() => setLargeCursor(!largeCursor)}
                className={`flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 gap-2.5 cursor-pointer border-b border-slate-100 dark:border-slate-800/60 ${
                  largeCursor
                    ? 'bg-[#259CF4]/10 dark:bg-[#259CF4]/20 border-b border-[#259CF4]/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-950/80 text-slate-600 dark:text-slate-455'
                }`}
              >
                <MousePointer size={26} className={largeCursor ? 'text-[#259CF4]' : 'text-slate-500 dark:text-slate-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${largeCursor ? 'text-[#259CF4]' : 'text-slate-700 dark:text-slate-350'}`}>
                  Cursor Gde
                </span>
              </button>

              {/* Box 3: Bigger Text */}
              <button
                onClick={() => setFontSize(fontSize === 'normal' ? 'lg' : fontSize === 'lg' ? 'xl' : 'normal')}
                className={`flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 gap-2.5 cursor-pointer border-r border-b border-slate-100 dark:border-slate-800/60 ${
                  fontSize !== 'normal'
                    ? 'bg-[#259CF4]/10 dark:bg-[#259CF4]/20 border-r border-b border-[#259CF4]/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-950/80 text-slate-600 dark:text-slate-455'
                }`}
              >
                <Type size={26} className={fontSize !== 'normal' ? 'text-[#259CF4]' : 'text-slate-500 dark:text-slate-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${fontSize !== 'normal' ? 'text-[#259CF4]' : 'text-slate-700 dark:text-slate-350'}`}>
                  {fontSize === 'normal' ? "Texto Normal" : fontSize === 'lg' ? "Texto Grande" : "Texto Muy Gde"}
                </span>
              </button>

              {/* Box 4: Desaturate */}
              <button
                onClick={() => setContrast(contrast === 'grayscale' ? 'normal' : 'grayscale')}
                className={`flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 gap-2.5 cursor-pointer border-b border-slate-100 dark:border-slate-800/60 ${
                  contrast === 'grayscale'
                    ? 'bg-[#259CF4]/10 dark:bg-[#259CF4]/20 border-b border-[#259CF4]/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-950/80 text-slate-600 dark:text-slate-455'
                }`}
              >
                <Palette size={26} className={contrast === 'grayscale' ? 'text-[#259CF4]' : 'text-slate-500 dark:text-slate-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${contrast === 'grayscale' ? 'text-[#259CF4]' : 'text-slate-700 dark:text-slate-350'}`}>
                  Desaturar
                </span>
              </button>

              {/* Box 5: Legible Fonts */}
              <button
                onClick={() => setReadableFont(!readableFont)}
                className={`flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 gap-2.5 cursor-pointer border-r border-slate-100 dark:border-slate-800/60 ${
                  readableFont
                    ? 'bg-[#259CF4]/10 dark:bg-[#259CF4]/20 border-r border-[#259CF4]/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-950/80 text-slate-600 dark:text-slate-455'
                }`}
              >
                <CaseSensitive size={26} className={readableFont ? 'text-[#259CF4]' : 'text-slate-500 dark:text-slate-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${readableFont ? 'text-[#259CF4]' : 'text-slate-700 dark:text-slate-350'}`}>
                  Letra Legible
                </span>
              </button>

              {/* Box 6: Highlight Links */}
              <button
                onClick={() => setHighlightLinks(!highlightLinks)}
                className={`flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-300 gap-2.5 cursor-pointer ${
                  highlightLinks
                    ? 'bg-[#259CF4]/10 dark:bg-[#259CF4]/20 border-[#259CF4]/30'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-950/80 text-slate-600 dark:text-slate-455'
                }`}
              >
                <LinkIcon size={26} className={highlightLinks ? 'text-[#259CF4]' : 'text-slate-500 dark:text-slate-400'} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${highlightLinks ? 'text-[#259CF4]' : 'text-slate-700 dark:text-slate-350'}`}>
                  Destacar Links
                </span>
              </button>

            </div>

            {/* Footer Reset button */}
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-center items-center">
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer w-full py-2"
              >
                <RefreshCw size={12} />
                <span>Restablecer ajustes</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
