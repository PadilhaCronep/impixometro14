
import React from 'react';
import { Justice, PressureStatus, SenateSupport, VoteData } from '../types';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface JusticeCardProps {
  justice: Justice;
  onClick: () => void;
  isSelected: boolean;
  votes: VoteData;
  hasVoted: boolean;
  onVote: (type: 'falls' | 'stays') => void;
}

const JusticeCard: React.FC<JusticeCardProps> = ({ 
  justice, 
  onClick, 
  isSelected, 
  votes, 
  hasVoted, 
  onVote 
}) => {
  const chartData = justice.trend.map((val, i) => ({ val, i }));
  const total = (votes.falls || 0) + (votes.stays || 0);
  const fallsPercent = total > 0 ? Math.round((votes.falls / total) * 100) : 50;
  const staysPercent = 100 - fallsPercent;

  const isIndicado = justice.id === '11';

  const statusColors = {
    [PressureStatus.STABLE]: 'bg-stableGreen',
    [PressureStatus.ATTENTION]: 'bg-warningYellow',
    [PressureStatus.CRITICAL]: 'bg-alertRed',
  };

  const supportLabels = {
    [SenateSupport.LOW]: 'Baixa',
    [SenateSupport.MEDIUM]: 'Média',
    [SenateSupport.HIGH]: 'Alta',
  };

  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-500 border-2 w-full min-h-[300px] flex flex-col ${
        isSelected 
          ? 'border-primary bg-zinc-900 shadow-[0_0_50px_rgba(249,204,24,0.15)] z-10 scale-[1.03]' 
          : 'border-zinc-800 bg-black hover:border-zinc-600'
      } p-6 gap-4 overflow-hidden active:scale-[0.98] transition-all`}
    >
      <div className="flex gap-4 items-start">
        <div className={`relative w-20 h-20 shrink-0 overflow-hidden rounded-full border border-zinc-700 bg-zinc-900 ${isSelected ? 'ring-2 ring-primary ring-offset-4 ring-offset-zinc-950' : ''}`}>
          <img 
            src={justice.imageUrl} 
            alt={justice.name}
            className={`w-full h-full object-cover transition-all duration-700 ${isSelected ? 'grayscale-0 scale-110' : 'grayscale group-hover:grayscale-0'}`}
          />
          <div className={`absolute top-0 right-1 w-3.5 h-3.5 ${statusColors[justice.status]} border-2 border-black rounded-full shadow-lg`}></div>
        </div>
        
        <div className="flex-1 overflow-hidden pt-1">
          <h3 className="font-heading text-lg font-black leading-tight uppercase tracking-tight text-white group-hover:text-primary transition-colors truncate">
            {justice.name}
          </h3>
          <div className="mt-2.5 space-y-1">
            <p className="text-[10px] font-black text-white leading-none uppercase italic truncate">
               P. {justice.appointedBy} ({justice.appointmentYear})
            </p>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
               Origem: {justice.presidentParty}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-zinc-950/80 border border-zinc-900 p-2 rounded-sm shadow-inner">
        {isIndicado ? (
          <div className="h-10 flex items-center justify-center">
            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600 italic">Cadeira em Vacância</span>
          </div>
        ) : !hasVoted ? (
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onVote('falls'); }}
              className="flex-1 bg-alertRed/5 hover:bg-alertRed text-alertRed hover:text-white border border-alertRed/30 text-[10px] font-black py-2.5 uppercase tracking-widest transition-all"
            >
              CAI
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onVote('stays'); }}
              className="flex-1 bg-stableGreen/5 hover:bg-stableGreen text-stableGreen hover:text-white border border-stableGreen/30 text-[10px] font-black py-2.5 uppercase tracking-widest transition-all"
            >
              FICA
            </button>
          </div>
        ) : (
          <div className="flex h-8 w-full rounded-sm overflow-hidden border border-zinc-800">
            <div className="bg-alertRed flex items-center justify-center relative group/bar" style={{ width: `${fallsPercent}%` }}>
              <span className="text-[9px] font-black text-white drop-shadow-md">{fallsPercent}%</span>
            </div>
            <div className="bg-stableGreen flex items-center justify-center relative group/bar" style={{ width: `${staysPercent}%` }}>
              <span className="text-[9px] font-black text-white drop-shadow-md">{staysPercent}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4 items-end">
        <div>
          <p className="text-[8px] uppercase font-black text-zinc-600 tracking-[0.2em] mb-1.5">Aprovação Social</p>
          <p className={`text-[10px] font-black uppercase ${justice.senateSupport === SenateSupport.LOW ? 'text-alertRed' : 'text-primary'} tracking-widest italic`}>
            {supportLabels[justice.senateSupport]}
          </p>
        </div>
        <div className="h-8 opacity-20 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Area 
                type="monotone" 
                dataKey="val" 
                stroke={isSelected ? '#F9CC18' : '#333'} 
                fill={isSelected ? '#F9CC18' : '#222'} 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default JusticeCard;
