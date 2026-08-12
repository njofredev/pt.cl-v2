"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, SmilePlus, Stethoscope, Layers, Check, Filter } from 'lucide-react';

export interface ArancelesHeroProps {
  activeTab: 'todos' | 'dental' | 'medico';
  onTabChange: (tab: 'todos' | 'dental' | 'medico') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategorySelect: (cat: string | null) => void;
  dentalCategories: string[];
  medicalCategories: string[];
  totalFilteredCount: number;
  loading: boolean;
}

const FREQUENT_SEARCHES = [
  'Consulta Médica',
  'Limpieza Dental',
  'Kinesiología',
  'Perfil Bioquímico',
  'Psicología',
  'Radiografía',
  'Implantes'
];

export const ArancelesHero: React.FC<ArancelesHeroProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  dentalCategories,
  medicalCategories,
  totalFilteredCount,
  loading
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar el dropdown personalizado al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToTable = () => {
    const el = document.getElementById('aranceles-tabla');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    scrollToTable();
  };

  const handleTagClick = (tag: string) => {
    onSearchChange(tag);
    scrollToTable();
  };

  const handleSelectCategory = (cat: string | null) => {
    onCategorySelect(cat);
    setIsCategoryOpen(false);
  };

  return (
    <section className="relative overflow-hidden pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white text-slate-900 border-b border-slate-100">
      
      {/* Light Aesthetic Glowing Mesh & Radial Accents */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Top-Right Soft Sky Blue Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-sky-400/15 via-blue-400/10 to-transparent blur-[120px]" />

        {/* Center-Left Indigo Soft Aura */}
        <div className="absolute top-[20%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-300/15 via-sky-300/10 to-transparent blur-[110px]" />

        {/* Subtle Organic Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Main Title & Subtitle */}
          <div className="space-y-4 text-center sm:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-[#162158]"
            >
              Consultar valores, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#259CF4] via-blue-600 to-indigo-600">
                nunca fue tan fácil.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed"
            >
              Encuentra los valores generales y preferenciales de nuestras especialidades médicas y odontológicas en tiempo real.
            </motion.p>
          </div>

          {/* Interactive Hero Navigation & Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 pt-2"
          >
            
            {/* Horizontal Tabs directly above Search Bar */}
            <div className="flex items-center gap-6 sm:gap-8 border-b border-slate-200/80 pb-2 px-2 overflow-x-auto scrollbar-hide justify-center sm:justify-start">
              <button
                type="button"
                onClick={() => onTabChange('todos')}
                className={`text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all relative pb-2 whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
                  activeTab === 'todos'
                    ? 'text-[#162158]'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Layers size={16} className={activeTab === 'todos' ? 'text-[#259CF4]' : 'text-slate-400'} />
                <span>Todos los Aranceles</span>
                {activeTab === 'todos' && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#259CF4] rounded-full"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => onTabChange('dental')}
                className={`text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all relative pb-2 whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
                  activeTab === 'dental'
                    ? 'text-[#162158]'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <SmilePlus size={16} className={activeTab === 'dental' ? 'text-[#259CF4]' : 'text-slate-400'} />
                <span>Odontología</span>
                {activeTab === 'dental' && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#259CF4] rounded-full"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => onTabChange('medico')}
                className={`text-xs sm:text-sm uppercase tracking-wider font-extrabold transition-all relative pb-2 whitespace-nowrap cursor-pointer inline-flex items-center gap-2 ${
                  activeTab === 'medico'
                    ? 'text-[#162158]'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <Stethoscope size={16} className={activeTab === 'medico' ? 'text-[#259CF4]' : 'text-slate-400'} />
                <span>Especialidades Médicas</span>
                {activeTab === 'medico' && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#259CF4] rounded-full"
                  />
                )}
              </button>
            </div>

            {/* Large Prominent Hero Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative w-full bg-white rounded-full p-2 pl-6 sm:pl-7 flex items-center border border-slate-200/90 shadow-xl shadow-slate-200/60 ring-4 ring-blue-500/5 transition-all focus-within:ring-blue-500/15 focus-within:border-[#259CF4]">
                
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Escribe la prestación, examen o especialidad..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-bold pr-4"
                />

                {/* Custom Modern Category Dropdown */}
                <div className="hidden sm:block relative shrink-0 border-l border-slate-200 pl-3 pr-2" ref={dropdownRef}>
                  
                  {/* Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 hover:text-[#259CF4] transition-colors cursor-pointer py-1 px-2 rounded-xl hover:bg-slate-50 active:scale-95"
                  >
                    <span className="truncate max-w-[160px]">
                      {selectedCategory ? selectedCategory : 'Todas las categorías'}
                    </span>
                    <ChevronDown 
                      size={15} 
                      className={`text-slate-400 transition-transform duration-200 shrink-0 ${isCategoryOpen ? 'rotate-180 text-[#259CF4]' : ''}`} 
                    />
                  </button>

                  {/* Dropdown Menu Overlay */}
                  <AnimatePresence>
                    {isCategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-3 w-72 sm:w-80 bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 z-50 overflow-hidden backdrop-blur-xl p-2 max-h-96 overflow-y-auto scrollbar-thin divide-y divide-slate-100"
                      >
                        {/* Option: All Categories */}
                        <div className="pb-1.5">
                          <button
                            type="button"
                            onClick={() => handleSelectCategory(null)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                              selectedCategory === null
                                ? 'bg-blue-50 text-[#259CF4]'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Filter size={13} className="text-[#259CF4]" />
                              Todas las categorías
                            </span>
                            {selectedCategory === null && <Check size={14} className="text-[#259CF4]" />}
                          </button>
                        </div>

                        {/* Option Group: Odontología */}
                        {(activeTab === 'todos' || activeTab === 'dental') && dentalCategories.length > 0 && (
                          <div className="py-2 space-y-1">
                            <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                              <SmilePlus size={13} className="text-[#259CF4]" />
                              Odontología
                            </div>
                            {dentalCategories.map(cat => (
                              <button
                                key={`hero-custom-den-${cat}`}
                                type="button"
                                onClick={() => handleSelectCategory(cat)}
                                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  selectedCategory === cat
                                    ? 'bg-blue-500/10 text-[#259CF4] font-black'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                              >
                                <span>{cat}</span>
                                {selectedCategory === cat && <Check size={14} className="text-[#259CF4]" />}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Option Group: Especialidades Médicas */}
                        {(activeTab === 'todos' || activeTab === 'medico') && medicalCategories.length > 0 && (
                          <div className="pt-2 space-y-1">
                            <div className="px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                              <Stethoscope size={13} className="text-[#259CF4]" />
                              Especialidades Médicas
                            </div>
                            {medicalCategories.map(cat => (
                              <button
                                key={`hero-custom-med-${cat}`}
                                type="button"
                                onClick={() => handleSelectCategory(cat)}
                                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  selectedCategory === cat
                                    ? 'bg-blue-500/10 text-[#259CF4] font-black'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                              >
                                <span>{cat}</span>
                                {selectedCategory === cat && <Check size={14} className="text-[#259CF4]" />}
                              </button>
                            ))}
                          </div>
                        )}

                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Right Action Button (Sky Blue Pill Button) */}
                <button
                  type="submit"
                  aria-label="Buscar arancel"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#259CF4] hover:bg-[#1d82ce] text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-transform active:scale-95 cursor-pointer shrink-0 ml-1"
                >
                  <Search size={22} strokeWidth={2.5} />
                </button>
              </div>
            </form>

            {/* Popular / Frequent Search Tags */}
            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-slate-500 font-medium pl-2 pt-1 justify-center sm:justify-start">
              <span className="font-bold text-slate-700">Búsquedas frecuentes:</span>
              <div className="flex items-center gap-2 flex-wrap">
                {FREQUENT_SEARCHES.map((tag, idx) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className="underline text-slate-500 hover:text-[#259CF4] transition-colors cursor-pointer font-medium"
                  >
                    {tag}{idx < FREQUENT_SEARCHES.length - 1 ? ',' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Animated Scroll Indicator: Centered clean text with bouncing arrow */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pt-8 flex flex-col items-center justify-center w-full"
            >
              <button
                type="button"
                onClick={scrollToTable}
                className="group flex flex-col items-center gap-1.5 text-slate-400 hover:text-[#259CF4] transition-colors cursor-pointer text-xs font-bold uppercase tracking-widest"
              >
                <span>Ver tabla de aranceles</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronDown size={18} className="text-[#259CF4] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                </motion.div>
              </button>
            </motion.div>

          </motion.div>

        </div>
      </div>

    </section>
  );
};
