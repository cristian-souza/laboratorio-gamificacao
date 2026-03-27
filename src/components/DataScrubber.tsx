import React from 'react';

interface DataScrubberProps {
  current: number;
  total: number;
}

export const DataScrubber: React.FC<DataScrubberProps> = ({ current, total }) => {
  const pad = (num: number) => String(num).padStart(3, '0');
  
  return (
    <div className="fixed bottom-8 right-10 font-display text-sm text-primary tracking-[0.1rem] opacity-70 transition-opacity duration-300 hover:opacity-100 hover:drop-shadow-[0_0_5px_var(--tw-colors-primary-DEFAULT)] z-50 pointer-events-none">
      {pad(current)} // {pad(total)}
    </div>
  );
};
