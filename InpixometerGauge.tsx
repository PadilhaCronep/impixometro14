
import React from 'react';

interface InpixometerGaugeProps {
  score: number;
}

const InpixometerGauge: React.FC<InpixometerGaugeProps> = ({ score }) => {
  const rotation = (score / 100) * 180 - 90;
  
  const getColor = (val: number) => {
    if (val > 75) return '#EF4444';
    if (val > 40) return '#FBBF24';
    return '#22C55E';
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[2/1] overflow-hidden">
      {/* Background Arc */}
      <div className="absolute inset-0 border-[24px] border-zinc-900/80 rounded-t-full"></div>
      
      {/* Active Arc Segments */}
      <div 
        className="absolute inset-0 border-[24px] rounded-t-full" 
        style={{
          borderColor: getColor(score),
          clipPath: `inset(0 ${100 - score}% 0 0)`,
          transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      ></div>

      {/* Needle */}
      <div 
        className="absolute bottom-0 left-1/2 w-2 h-36 bg-primary origin-bottom z-20"
        style={{ 
          transform: `translateX(-50%) rotate(${rotation}deg)`,
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary shadow-[0_0_15px_rgba(249,204,24,0.8)] border border-black/20"></div>
      </div>

      {/* Center Cap */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-brandBlack border-4 border-primary rounded-full z-30 shadow-2xl"></div>
      
      {/* Value Label - MAX VISIBILITY */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center w-full z-10 pb-2">
        <div className="relative inline-block">
          <span 
            className="text-8xl lg:text-9xl font-black tracking-tighter block leading-none" 
            style={{ 
              color: getColor(score),
              textShadow: '0 10px 30px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.5)'
            }}
          >
            {score}%
          </span>
        </div>
        
        <div className="mt-4">
          <p className="text-[10px] lg:text-xs uppercase tracking-[0.5em] font-black text-white bg-black/80 py-2 px-6 inline-block rounded-full border-2 border-white/20 backdrop-blur-md shadow-2xl">
            Índice de Pressão
          </p>
        </div>
      </div>

      {/* Subtle Arc Markers */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 text-[8px] font-black text-zinc-600 uppercase tracking-widest translate-y-4">
        <span>Estável</span>
        <span>Crítico</span>
      </div>
    </div>
  );
};

export default InpixometerGauge;
