"use client";

import React, { useEffect, useState } from 'react';

export function SparklesBackground() {
  const [sparkles, setSparkles] = useState<{id: number, size: number, top: number, left: number, delay: number, duration: number, blur: number}[]>([]);

  useEffect(() => {
    // Reducimos a 40 para optimizar el Main Thread sin perder la estética
    const generated = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      blur: Math.random() > 0.8 ? 1 : 0.5
    }));
    setSparkles(generated);
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] hidden dark:block">
      {/* Active Ambient Clouds */}
      <div className="absolute top-[10%] left-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] animate-pulse-slow"></div>
      <div className="absolute bottom-[15%] right-[-5%] w-[700px] h-[700px] bg-secondary/5 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

      {/* Sparkling Drifters */}
      {sparkles.map((s) => (
        <div 
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            top: `${s.top}%`,
            left: `${s.left}%`,
            opacity: 0,
            filter: `blur(${s.blur}px)`,
            boxShadow: `0 0 ${s.size * 2}px rgba(255, 255, 255, 0.5)`,
            animation: `sparkleAnim ${s.duration}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
}
