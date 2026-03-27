import { useState, useCallback, useRef, useEffect } from 'react';

export const useMouseTilt = (settings = { max: 10, perspective: 1000 }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((x - centerX) / centerX) * settings.max;
    const tiltY = ((y - centerY) / centerY) * settings.max;

    setTilt({ x: tiltX, y: -tiltY });
  }, [settings.max]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const el = elementRef.current;
    if (el) {
      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [handleMouseMove, handleMouseLeave]);

  return {
    elementRef,
    style: {
      transform: `perspective(${settings.perspective}px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      transition: tilt.x === 0 && tilt.y === 0 ? 'all 0.5s ease' : 'none'
    }
  };
};
