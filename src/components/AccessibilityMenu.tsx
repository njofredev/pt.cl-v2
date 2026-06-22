"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accessibility, 
  Eye, 
  Type, 
  Link as LinkIcon, 
  RefreshCw, 
  Check, 
  X,
  Languages
} from 'lucide-react';

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // States
  const [fontSize, setFontSize] = useState<'normal' | 'lg' | 'xl'>('normal');
  const [contrast, setContrast] = useState<'normal' | 'high' | 'grayscale'>('normal');
  const [readableFont, setReadableFont] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFontSize = localStorage.getItem('access-font-size') as 'normal' | 'lg' | 'xl';
      const storedContrast = localStorage.getItem('access-contrast') as 'normal' | 'high' | 'grayscale';
      const storedReadableFont = localStorage.getItem('access-readable-font') === 'true';
      const storedHighlightLinks = localStorage.getItem('access-highlight-links') === 'true';

      if (storedFontSize) setFontSize(storedFontSize);
      if (storedContrast) setContrast(storedContrast);
      if (storedReadableFont) setReadableFont(storedReadableFont);
      if (storedHighlightLinks) setHighlightLinks(storedHighlightLinks);
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

  }, [fontSize, contrast, readableFont, highlightLinks]);

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
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Accessibility trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menú de accesibilidad"
        className={`w-12 h-12 md:w-11 md:h-11 rounded-2xl flex items-center justify-center text-white border transition-all active:scale-95 cursor-pointer shadow-sm ${
          isOpen 
            ? 'bg-white text-secondary border-white' 
            : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30 text-white'
        }`}
      >
        <Accessibility size={20} className={isOpen ? 'animate-pulse' : ''} />
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
                <Accessibility className="w-5 h-5 text-secondary dark:text-teal-400" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">Accesibilidad Web</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Cerrar menú"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content options */}
            <div className="p-5 flex flex-col gap-5">
              {/* Option: Font Size */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-350 text-xs font-bold uppercase tracking-wider">
                  <Type size={14} className="text-[#259CF4]" />
                  <span>Tamaño del Texto</span>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                  {(['normal', 'lg', 'xl'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all capitalize cursor-pointer ${
                        fontSize === size
                          ? 'bg-secondary text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      {size === 'normal' ? 'Normal' : size === 'lg' ? 'Grande' : 'Muy Grande'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option: Contrast */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-350 text-xs font-bold uppercase tracking-wider">
                  <Eye size={14} className="text-[#259CF4]" />
                  <span>Contraste</span>
                </div>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                  {(['normal', 'high', 'grayscale'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setContrast(c)}
                      className={`py-1.5 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all capitalize cursor-pointer ${
                        contrast === c
                          ? 'bg-secondary text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      {c === 'normal' ? 'Normal' : c === 'high' ? 'Alto' : 'Gris'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option: Readable Font */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Tipografía Legible</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Letra de fácil lectura</span>
                </div>
                <button
                  onClick={() => setReadableFont(!readableFont)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center cursor-pointer ${
                    readableFont ? 'bg-secondary' : 'bg-slate-300 dark:bg-slate-800'
                  }`}
                  role="switch"
                  aria-checked={readableFont}
                >
                  <motion.div
                    animate={{ x: readableFont ? 22 : 4 }}
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {/* Option: Highlight Links */}
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Destacar Enlaces</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Subraya enlaces y botones</span>
                </div>
                <button
                  onClick={() => setHighlightLinks(!highlightLinks)}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center cursor-pointer ${
                    highlightLinks ? 'bg-secondary' : 'bg-slate-300 dark:bg-slate-800'
                  }`}
                  role="switch"
                  aria-checked={highlightLinks}
                >
                  <motion.div
                    animate={{ x: highlightLinks ? 22 : 4 }}
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Footer Reset button */}
            <div className="px-5 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw size={12} />
                <span>Reestablecer ajustes</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
