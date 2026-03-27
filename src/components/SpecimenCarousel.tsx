import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SpecimenCard, type ProjectData } from './SpecimenCard';

interface SpecimenCarouselProps {
  projects: ProjectData[];
  autoPlayInterval?: number;
  className?: string;
}

export const SpecimenCarousel: React.FC<SpecimenCarouselProps> = ({ 
  projects, 
  autoPlayInterval = 15000,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Conforme solicitado, agora sempre 1 item por vez
  const itemsPerPage = 1;
  const maxIndex = projects.length - 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (projects.length <= itemsPerPage) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, projects.length, itemsPerPage]);

  if (projects.length === 0) return null;

  return (
    <div className={`relative w-full group pb-16 ${className}`}>
      <div className="overflow-hidden">
        {/* Container do Carrossel */}
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-full px-1"
            >
              <SpecimenCard {...project} className="!h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Controles de Navegação */}
      {projects.length > 1 && (
        <>
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevSlide}
              className="p-3 bg-surface-high/80 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary/20 transition-all rounded-full shadow-lg shadow-void/50"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={nextSlide}
              className="p-3 bg-surface-high/80 backdrop-blur-md border border-primary/20 text-primary hover:bg-primary/20 transition-all rounded-full shadow-lg shadow-void/50"
              aria-label="Próximo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Barra de Progresso e Indicadores */}
          <div className="absolute bottom-0 left-0 w-full flex flex-col gap-6 mt-8">
             {/* Indicadores Visuais */}
             <div className="flex justify-center items-center gap-3">
               {projects.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => setCurrentIndex(index)}
                   className={`h-1 transition-all duration-300 ${
                     index === currentIndex 
                       ? 'w-12 bg-primary' 
                       : 'w-4 bg-outline-variant/30 hover:bg-primary/40'
                   }`}
                   aria-label={`Ir para slide ${index + 1}`}
                 />
               ))}
             </div>

             {/* Timer de Progresso (Visual apenas) */}
             <div className="w-full h-[2px] bg-outline-variant/10 overflow-hidden rounded-full">
               <div 
                 key={currentIndex}
                 className="h-full bg-primary/40 animate-progress-bar origin-left"
                 style={{ animationDuration: `${autoPlayInterval}ms` }}
               />
             </div>
          </div>
        </>
      )}
    </div>
  );
};
