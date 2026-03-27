import { useState, useEffect } from 'react';

export function useDataScrubber() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState({ current: 1, total: 5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Coordenadas limitadas à escala de 0 a 100 para o \"radar\"
      const xPos = Math.round((event.clientX / window.innerWidth) * 100);
      const yPos = Math.round((event.clientY / window.innerHeight) * 100);
      setPos({ x: xPos, y: yPos });

      // Efeito Parallax (Tilt) sutil
      const tiltX = (event.clientX / window.innerWidth - 0.5) * 8;
      const tiltY = (event.clientY / window.innerHeight - 0.5) * 8;
      setTilt({ x: tiltX, y: tiltY });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let current = 1;
      if (docHeight > 0) {
        const pct = scrollTop / docHeight;
        current = Math.min(5, Math.ceil(pct * 5)) || 1;
      }
      setScroll({ current, total: 5 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Atualiza imediatamente na montagem
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { pos, tilt, scroll };
}
