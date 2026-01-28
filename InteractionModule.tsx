
import React from 'react';
import { VoteData } from '../types';

interface InteractionModuleProps {
  justiceName: string;
  justiceId: string;
  votes: VoteData;
  hasVoted: boolean;
  onVote: (type: 'falls' | 'stays') => void;
}

const InteractionModule: React.FC<InteractionModuleProps> = ({ 
  justiceName, 
  justiceId, 
  votes, 
  hasVoted, 
  onVote 
}) => {
  const total = (votes.falls || 0) + (votes.stays || 0);
  const fallsPercent = total > 0 ? Math.round((votes.falls / total) * 100) : 50;
  const staysPercent = 100 - fallsPercent;

  const isVacant = justiceId === '11';

  if (isVacant) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-8 text-center">
        <h2 className="font-heading text-2xl font-black italic uppercase tracking-tighter text-zinc-700">
          Cadeira Vaga
        </h2>
        <p className="text-xs text-zinc-600 uppercase tracking-widest font-bold mt-2 leading-relaxed">
          O monitoramento de pulsação social estará disponível <br className="hidden md:block"/> assim que a posse oficial for oficializada na corte.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-10 rounded-none transition-all duration-500">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-4">
          Pulsação Social Individual
        </div>
        <h2 className="font-heading text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-2 text-white leading-tight">
          O Ministro <span className="text-primary underline decoration-primary/30 underline-offset-8">{justiceName}</span> cai?
        </h2>
        <p className="text-[10px] md:text-sm text-zinc-400 mb-8 uppercase tracking-widest font-bold leading-snug">
          Seu voto gera um registro unitário no auditor do Google Sheets.
        </p>

        {!hasVoted ? (
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onVote('falls')}
              className="bg-alertRed hover:bg-red-700 text-white font-black py-4 md:py-6 uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-alertRed/10"
            >
              CAI
            </button>
            <button 
              onClick={() => onVote('stays')}
              className="bg-stableGreen hover:bg-green-700 text-white font-black py-4 md:py-6 uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-stableGreen/10"
            >
              NÃO CAI
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="relative h-16 md:h-20 bg-zinc-800 flex items-stretch overflow-hidden border-2 border-zinc-700 shadow-inner">
              <div 
                className="bg-alertRed transition-all duration-1000 flex flex-col items-center justify-center font-black"
                style={{ width: `${fallsPercent}%` }}
              >
                <span className="text-xl md:text-2xl leading-none">{fallsPercent}%</span>
                <span className="text-[7px] md:text-[8px] uppercase tracking-tighter opacity-70">Cai</span>
              </div>
              <div 
                className="bg-stableGreen transition-all duration-1000 flex flex-col items-center justify-center font-black"
                style={{ width: `${staysPercent}%` }}
              >
                <span className="text-xl md:text-2xl leading-none">{staysPercent}%</span>
                <span className="text-[7px] md:text-[8px] uppercase tracking-tighter opacity-70">Fica</span>
              </div>
              
              <div className="absolute top-0 bottom-0 w-1 bg-white/20 blur-[1px]" style={{ left: `${fallsPercent}%` }}></div>
            </div>
            
            <div className="flex justify-between items-center px-1 md:px-2">
              <div className="text-left">
                <p className="text-[7px] md:text-[8px] font-black uppercase text-zinc-600">Total Auditado</p>
                <p className="text-[10px] md:text-xs font-black text-white">{total.toLocaleString('pt-BR')} Votos</p>
              </div>
              <div className="bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 border border-primary/20">
                <span className="text-[8px] md:text-[10px] uppercase font-black tracking-widest text-primary italic">Computado</span>
              </div>
            </div>
            
            <div className="text-center text-[8px] md:text-[9px] uppercase font-black tracking-[0.2em] text-zinc-500 italic pt-2">
              Sincronização em tempo real com a planilha mestre.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractionModule;
