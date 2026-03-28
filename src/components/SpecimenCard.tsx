import React from 'react';
import { useMouseTilt } from '../hooks/useMouseTilt';
import { ExternalLink } from 'lucide-react';

export interface ProjectData {
    id: string;
    title: string;
    description: string;
    details?: string;
    coords: string;
    status: string;
    featured?: boolean;
    progress?: number; // 0 a 100
    eta?: string;
    tags?: string[];
    url?: string;
    createdAt?: string;
}

interface SpecimenCardProps extends ProjectData {
    className?: string;
}

export const SpecimenCard: React.FC<SpecimenCardProps> = ({ 
  id, title, description, details, coords, status, progress, eta, tags, url, className = ""
}) => {
  const { elementRef, style } = useMouseTilt({ max: 5, perspective: 1000 });

  const CardContent = (
    <>
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-display text-[0.6rem] text-primary uppercase tracking-[0.2rem] opacity-70 group-hover:opacity-100 transition-opacity flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${progress !== undefined && progress < 100 ? 'bg-secondary-container animate-pulse' : 'bg-primary animate-pulse-glow'}`} />
            ESPÉCIME: {id}
          </span>
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl md:text-3xl text-primary tracking-[-0.01em] font-bold uppercase group-hover:animate-flicker transition-all">
              {title}
            </h2>
            {url && <ExternalLink size={16} className="text-primary/40 group-hover:text-primary transition-colors" />}
          </div>
        </div>
        {eta && (
          <div className="text-right">
            <span className="font-display text-[0.5rem] text-on-surface-variant tracking-[0.1rem] uppercase">TEMPO_ESTIMADO</span>
            <span className="block font-display text-xs text-secondary-container tracking-[0.1rem]">{eta}</span>
          </div>
        )}
      </div>
      
      <div className="text-sm leading-relaxed text-on-surface-variant flex flex-col gap-4 font-body">
        <p>{description}</p>
        {details && (
          <p className="opacity-60 text-xs md:text-sm italic border-l-[0.5px] border-primary/30 pl-4">
            {details}
          </p>
        )}
      </div>

      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags
            .filter(tag => tag !== "PORTFOLIO" && tag !== "DESTAQUE")
            .map(tag => (
            <span key={tag} className="border-[0.5px] border-outline-variant/40 bg-surface/40 px-2 py-0.5 font-display text-[0.55rem] tracking-[0.1rem] text-on-surface-variant uppercase group-hover:border-primary/30 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      )}

      {progress !== undefined && (
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center font-display text-[0.5rem] text-on-surface-variant tracking-[0.1rem]">
            <span>SCAN_DE_COMPILAÇÃO</span>
            <span>{progress}%</span>
          </div>
          <div className="flex gap-[2px] h-1.5 w-full">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 transition-all duration-500 ${i < Math.floor(progress / 10) 
                  ? (progress === 100 ? 'bg-tertiary-container shadow-[0_0_5px_var(--tw-colors-tertiary-container)]' : 'bg-primary shadow-[0_0_5px_var(--tw-colors-primary-container)]') 
                  : 'bg-outline-variant/20'}`} 
              />
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#32353c]/40 p-5 px-8 md:px-10 -mx-8 md:-mx-10 -mb-8 md:-mb-10 mt-auto flex justify-between items-center transition-colors duration-400 border-t-[0.5px] border-outline-variant/20 group-hover:border-primary/20">
        <span className="font-display text-[0.6rem] text-primary uppercase tracking-[0.15rem]">
          {coords}
        </span>
        <span className={`font-display text-[0.6rem] uppercase tracking-[0.15rem] ${progress === 100 ? 'text-tertiary-container' : 'text-secondary-container animate-pulse'}`}>
          {status}
        </span>
      </div>
    </>
  );

  const cardClasses = `w-full bg-[#1d2026]/40 backdrop-blur-[20px] border-[0.5px] border-[#3b494b]/20 p-8 md:p-10 flex flex-col gap-6 shadow-[0_20px_40px_rgba(0,240,255,0.03)] hover:border-primary/40 hover:shadow-[0_20px_40px_rgba(0,240,255,0.08)] transition-all duration-400 ease-out relative z-10 group ${className}`;

  if (url) {
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        className={`${cardClasses} cursor-pointer block no-underline`}
        style={style}
      >
        {CardContent}
      </a>
    );
  }

  return (
    <section 
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cardClasses}
      style={style}
    >
      {CardContent}
    </section>
  );
};
