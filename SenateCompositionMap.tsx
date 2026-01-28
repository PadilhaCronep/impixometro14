
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { NORMALIZED_SENATORS } from '../senatorData';
import { Senator } from '../types';

const SenateCompositionMap: React.FC = () => {
  const [selectedSen, setSelectedSen] = useState<Senator | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Split senators into blocks for visual reference
  const blocks = useMemo(() => {
    const opposition = NORMALIZED_SENATORS.filter(s => s.blocStatus === 'opposition');
    const government = NORMALIZED_SENATORS.filter(s => s.blocStatus === 'government');
    const neutral = NORMALIZED_SENATORS.filter(s => s.blocStatus === 'unknown');
    return { opposition, neutral, government };
  }, []);

  const sortedSenators = useMemo(() => {
    return [...NORMALIZED_SENATORS].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredSenators = useMemo(() => {
    return sortedSenators.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.party.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedSenators]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SenatorDot = ({ senator }: { senator: Senator }) => {
    const isPresident = senator.name === 'RODRIGO PACHECO';
    const colorClass = senator.blocStatus === 'government' ? 'bg-stableGreen' : senator.blocStatus === 'opposition' ? 'bg-alertRed' : 'bg-zinc-700';
    
    return (
      <div 
        onClick={() => setSelectedSen(senator)} 
        className={`relative w-4 h-4 md:w-5 md:h-5 border border-black/20 ${colorClass} cursor-pointer hover:scale-125 transition-transform flex items-center justify-center ${selectedSen?.id === senator.id ? 'ring-2 ring-white scale-125 z-10 shadow-lg' : ''}`}
      >
        {isPresident && (
          <span className="text-[8px] md:text-[9px] font-black text-white leading-none">P</span>
        )}
      </div>
    );
  };

  return (
    <section className="bg-zinc-950 border border-zinc-800 p-6 lg:p-10 space-y-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-zinc-900 pb-8">
        <div className="flex-1">
          <h2 className="font-heading text-2xl lg:text-3xl font-black italic uppercase tracking-tighter text-white">Fiscalize seu Senador</h2>
          <p className="text-[9px] lg:text-[10px] uppercase font-bold text-zinc-500 tracking-[0.2em] mt-2 italic">
            A pressão institucional passa pelo crivo dos 81 parlamentares. Identifique o Presidente (P) e os blocos.
          </p>
        </div>

        {/* DROP DOWN DE SENADORES */}
        <div className="w-full lg:w-96 relative" ref={dropdownRef}>
          <div className="relative">
             <input 
              type="text" 
              placeholder="BUSCAR PARLAMENTAR..." 
              value={searchQuery}
              onFocus={() => setIsDropdownOpen(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              className="w-full bg-black border-2 border-zinc-800 px-5 py-4 text-xs font-black uppercase tracking-widest text-primary focus:border-primary outline-none transition-all placeholder:text-zinc-800"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-800">
               <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-zinc-900 border-2 border-zinc-800 mt-2 max-h-[400px] overflow-y-auto z-50 shadow-[0_30px_60px_rgba(0,0,0,0.8)] no-scrollbar">
              {filteredSenators.length > 0 ? (
                filteredSenators.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { 
                      setSelectedSen(s); 
                      setSearchQuery(s.name);
                      setIsDropdownOpen(false); 
                    }}
                    className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-primary hover:text-black transition-colors border-b border-zinc-800 flex justify-between items-center group"
                  >
                    <span>{s.name} <span className="text-zinc-600 group-hover:text-black/50 ml-2">({s.party}/{s.uf})</span></span>
                    <span className={`w-2 h-2 rounded-full ${s.blocStatus === 'government' ? 'bg-stableGreen' : s.blocStatus === 'opposition' ? 'bg-alertRed' : 'bg-zinc-700'}`}></span>
                  </button>
                ))
              ) : (
                <div className="px-5 py-3 text-[10px] text-zinc-700 font-black uppercase">Nenhum resultado encontrado</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-12">
        {/* Visualização de Blocos */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8 opacity-40 hover:opacity-100 transition-opacity">
          <div className="flex-1 space-y-3">
             <p className="text-[9px] font-black text-alertRed uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-alertRed rounded-full"></span> Oposição ({blocks.opposition.length})
             </p>
             <div className="flex flex-wrap gap-1.5">
                {blocks.opposition.map(s => <SenatorDot key={s.id} senator={s} />)}
             </div>
          </div>
          <div className="flex-1 space-y-3">
             <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full"></span> Centro ({blocks.neutral.length})
             </p>
             <div className="flex flex-wrap gap-1.5">
                {blocks.neutral.map(s => <SenatorDot key={s.id} senator={s} />)}
             </div>
          </div>
          <div className="flex-1 space-y-3">
             <p className="text-[9px] font-black text-stableGreen uppercase tracking-widest flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-stableGreen rounded-full"></span> Situação ({blocks.government.length})
             </p>
             <div className="flex flex-wrap gap-1.5">
                {blocks.government.map(s => <SenatorDot key={s.id} senator={s} />)}
             </div>
          </div>
        </div>

        {/* Detalhes do Parlamentar Selecionado */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedSen ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
          <div className="bg-zinc-900 border-2 border-primary p-8 flex items-center shadow-[0_0_30px_rgba(249,204,24,0.1)]">
            {selectedSen && (
              <div className="w-full grid lg:grid-cols-2 gap-8 items-center animate-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-4xl font-black uppercase italic tracking-tighter text-primary leading-none">{selectedSen.name}</h3>
                    {selectedSen.name === 'RODRIGO PACHECO' && (
                      <span className="bg-primary text-black text-[9px] font-black px-2 py-0.5 uppercase tracking-widest">PRESIDENTE</span>
                    )}
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">{selectedSen.party} / {selectedSen.uf} — BL. {selectedSen.blocStatus.toUpperCase()}</p>
                </div>
                <div className="flex flex-wrap gap-6 lg:justify-end">
                  <div className="bg-black/40 p-4 border border-zinc-800 min-w-[160px]">
                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Contato Direto</p>
                    <p className="text-xs font-bold text-white mb-1">{selectedSen.contact.email}</p>
                    <p className="text-xs font-bold text-primary">{selectedSen.contact.phone}</p>
                  </div>
                  <div className="bg-black/40 p-4 border border-zinc-800 min-w-[120px] flex flex-col justify-center text-center">
                    <p className="text-[8px] font-black text-zinc-600 uppercase mb-1">Status Eleitoral</p>
                    <span className="text-[10px] font-black text-white bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 whitespace-nowrap uppercase tracking-tighter">REELEIÇÃO {selectedSen.reelectionYear}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {!selectedSen && (
          <div className="w-full text-center pt-8 border-t border-zinc-900/50">
            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.5em] italic animate-pulse">
              Selecione um parlamentar no mapa acima para estender os detalhes
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SenateCompositionMap;
