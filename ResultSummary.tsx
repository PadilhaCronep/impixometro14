
import React from 'react';
import { Justice, SenateSupport } from '../types';

interface ResultSummaryProps {
  justice: Justice;
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ justice }) => {
  const supportLabels = {
    [SenateSupport.LOW]: 'Baixo / Crítico',
    [SenateSupport.MEDIUM]: 'Médio / Em Observação',
    [SenateSupport.HIGH]: 'Alto / Estável',
  };

  const getStatusColor = (score: number) => {
    if (score > 75) return 'text-alertRed';
    if (score > 40) return 'text-warningYellow';
    return 'text-stableGreen';
  };

  return (
    <div className="bg-zinc-950 border border-zinc-900 overflow-hidden">
      <div className="bg-zinc-900 px-6 py-3 border-b border-zinc-800 flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Resumo da Análise • Período Atual</h3>
        <span className="text-[9px] font-black uppercase text-primary">Ref. Out 2024</span>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Indicador Institucional</p>
            <p className={`text-4xl font-black italic ${getStatusColor(justice.pressureScore)}`}>
              {justice.pressureScore}%
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Apoio no Senado</p>
            <p className="text-xl font-black uppercase text-white">
              {supportLabels[justice.senateSupport]}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Processos Ativos</p>
            <p className="text-xl font-black text-white">
              {justice.openCases} <span className="text-[10px] text-zinc-500 italic">Ações</span>
            </p>
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-1">Tendência 7d</p>
            <p className="text-xl font-black text-white flex items-center gap-2">
              {justice.trend[6] > justice.trend[0] ? (
                <>EM ALTA <span className="text-alertRed">▲</span></>
              ) : (
                <>ESTÁVEL <span className="text-stableGreen">▼</span></>
              )}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-900">
           <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-tight leading-relaxed max-w-3xl">
             <span className="text-zinc-400">NOTA DO ANALISTA:</span> O status institucional de {justice.name} apresenta volatilidade baseada em {justice.senateSupport === SenateSupport.LOW ? 'baixa' : 'moderada'} coesão parlamentar. O índice de {justice.pressureScore}% reflete o risco agregado de sanções legislativas ou questionamentos de competência.
           </p>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
