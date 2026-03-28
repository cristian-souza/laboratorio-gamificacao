import React, { useState, useEffect } from 'react';
import { Activity, Shield, Terminal } from 'lucide-react';

export const SystemStatus: React.FC = () => {
  const [segments, setSegments] = useState([true, true, true, true, true, true, true, false, false, false]);
  const [load, setLoad] = useState(62);

  useEffect(() => {
    const interval = setInterval(() => {
      setSegments(prev => {
        const newSegs = [...prev];
        const randIndex = Math.floor(Math.random() * newSegs.length);
        newSegs[randIndex] = !newSegs[randIndex];
        return newSegs;
      });
      setLoad(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        return Math.max(40, Math.min(95, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6 bg-surface-low/50 border-[0.5px] border-outline-variant/30 relative overflow-hidden group">
      {/* Background Pulse Effect */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity pointer-events-none" />
      
      <div className="flex flex-col gap-1 relative z-10">
        <div className="flex justify-between items-center">
          <span className="font-display text-[0.55rem] text-primary uppercase tracking-[0.15rem] opacity-70 animate-flicker">SISTEMA_OPERACIONAL</span>
          <span className="font-display text-[0.55rem] text-secondary-container animate-pulse-glow">ESTÁVEL</span>
        </div>
        <div className="flex gap-px h-1.5 mt-2">
          {segments.map((active, i) => (
            <div 
              key={i} 
              className={`flex-1 transition-all duration-500 ${active ? 'bg-primary shadow-[0_0_5px_var(--tw-colors-primary-container)] animate-pulse-glow' : 'bg-outline-variant/20'}`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 border-[0.5px] border-primary/20 group-hover:border-primary/50 transition-colors">
            <Activity size={12} className="text-primary animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[0.5rem] text-on-surface-variant uppercase tracking-[0.1rem]">CPU_LOAD</span>
            <span className="font-display text-xs text-primary tabular-nums">{load}%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary-container/10 border-[0.5px] border-secondary-container/20 group-hover:border-secondary-container/50 transition-colors">
            <Shield size={12} className="text-secondary-container animate-flicker" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[0.5rem] text-on-surface-variant uppercase tracking-[0.1rem]">FIREWALL</span>
            <span className="font-display text-xs text-secondary-container">ATIVO</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-tertiary-container/10 border-[0.5px] border-tertiary-container/20 group-hover:border-tertiary-container/50 transition-colors">
            <Terminal size={12} className="text-tertiary-container" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-[0.5rem] text-on-surface-variant uppercase tracking-[0.1rem]">ENCRYPT</span>
            <span className="font-display text-xs text-tertiary-container">AES-256</span>
          </div>
        </div>
      </div>
    </div>
  );
};
