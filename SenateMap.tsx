
import React, { useState } from 'react';
import { Senator, Alignment } from './types';
// Fixed: Import NORMALIZED_SENATORS from senatorData instead of non-existent SENATORS from constants
import { NORMALIZED_SENATORS } from './senatorData';

interface SenateMapProps {
  selectedJusticeId: string;
}

const SenateMap: React.FC<SenateMapProps> = ({ selectedJusticeId }) => {
  const [hoveredSenator, setHoveredSenator] = useState<Senator | null>(null);

  const getAlignmentColor = (alignment: Alignment) => {
    switch (alignment) {
      case Alignment.SUPPORT: return '#22C55E';
      case Alignment.OPPOSITION: return '#EF4444';
      default: return '#52525b';
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="font-heading text-2xl font-black uppercase italic tracking-tighter">Composição do Senado</h3>
          <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest mt-1">Alinhamento institucional relativo ao Ministro selecionado</p>
        </div>
        <div className="flex gap-4 text-[9px] uppercase font-black tracking-widest">
           <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-stableGreen"></span> Apoio</div>
           <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-zinc-600"></span> Neutro</div>
           <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-alertRed"></span> Oposição</div>
        </div>
      </div>

      <div className="grid grid-cols-9 sm:grid-cols-12 md:grid-cols-[repeat(27,minmax(0,1fr))] gap-1.5">
        {/* Fixed: Iterate over NORMALIZED_SENATORS instead of the non-existent SENATORS */}
        {NORMALIZED_SENATORS.map((senator) => {
          const alignment = senator.proximityToJustices[selectedJusticeId] || Alignment.NEUTRAL;
          return (
            <div
              key={senator.id}
              onMouseEnter={() => setHoveredSenator(senator)}
              onMouseLeave={() => setHoveredSenator(null)}
              className="aspect-square w-full transition-all duration-300 cursor-help transform hover:scale-125 hover:z-10"
              style={{ backgroundColor: getAlignmentColor(alignment) }}
            />
          );
        })}
      </div>

      <div className="h-16 flex items-center border-t border-zinc-900 pt-4">
        {hoveredSenator ? (
          <div className="flex justify-between w-full items-center">
            <div>
              <p className="text-primary font-black uppercase italic text-lg leading-none">{hoveredSenator.name}</p>
              {/* Corrected property access from 'state' to 'uf' */}
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Senador por {hoveredSenator.uf}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-400 font-black uppercase">Grau de Alinhamento</p>
              <p className="font-heading font-black text-xl italic" style={{ color: getAlignmentColor(hoveredSenator.proximityToJustices[selectedJusticeId]) }}>
                {hoveredSenator.proximityToJustices[selectedJusticeId]}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest italic">Passe o mouse sobre um nodo para ver detalhes do parlamentar</p>
        )}
      </div>
    </div>
  );
};

export default SenateMap;
