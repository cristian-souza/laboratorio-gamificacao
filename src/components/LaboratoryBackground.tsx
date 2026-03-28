import React, { useState } from 'react';

export const LaboratoryBackground: React.FC = () => {
  // Geramos partículas aleatórias (estrelas/moléculas/pixels) apenas uma vez no carregamento
  const [particles] = useState(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      opacity: Math.random() * 0.5 + 0.1,
      color: i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary-container' : 'bg-tertiary-container'
    }));
  });

  // Estrelas de Prótons que cruzam a tela
  const [protonStars] = useState(() => {
    return [...Array(12)].map((_, i) => ({
      id: `proton-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 15,
      color: i % 2 === 0 ? 'bg-primary-container' : 'bg-secondary-container'
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. UNIVERSO: Nebulosas Profundas */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-nebula-pulse mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-container/5 rounded-full blur-[100px] animate-nebula-pulse [animation-delay:-5s] mix-blend-screen" />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-tertiary-container/5 rounded-full blur-[80px] animate-nebula-pulse [animation-delay:-12s] mix-blend-screen" />
      
      {/* 2. LABORATÓRIO: Grade Técnica */}
      <div className="absolute inset-0 lab-grid opacity-30" />
      
      {/* 3. GAME/CIÊNCIA: Partículas flutuantes (Pixels/Estrelas) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.color} animate-float shadow-[0_0_10px_currentColor]`}
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        >
           {/* Efeito de brilho de pixel/estrela */}
           <div className="absolute inset-0 bg-white opacity-40 blur-[1px]" />
        </div>
      ))}

      {/* 3.1 PROTON STARS: Estrelas que passam e flutuam */}
      {protonStars.map((s) => (
        <div
          key={s.id}
          className={`absolute rounded-full ${s.color} animate-proton-drift`}
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`
          }}
        >
          <div className="w-full h-full rounded-full animate-proton-pulse shadow-[0_0_15px_currentColor]">
             <div className="absolute inset-0 bg-white opacity-60 blur-[1px] rounded-full" />
          </div>
          {/* Rastro sutil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border border-white/5 rounded-full blur-sm" />
        </div>
      ))}

      {/* 4. SCANLINE (Monitor de Laboratório) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full lab-scanline animate-scanline opacity-[0.07]" />
      </div>

      {/* 5. HUD: Cantos de Laboratório */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-primary/20 m-8 opacity-40" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-primary/20 m-8 opacity-40" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-primary/20 m-8 opacity-40" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-primary/20 m-8 opacity-40" />
    </div>
  );
};
