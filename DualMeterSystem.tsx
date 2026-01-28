
import React from 'react';
import { Justice, SenateSupport, PoliticalAlignment } from '../types';
import ShareButton from './ShareButton';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DualMeterSystemProps {
  justice: Justice;
}

const DualMeterSystem: React.FC<DualMeterSystemProps> = ({ justice }) => {
  const supportLabels = {
    [SenateSupport.LOW]: 'Rejeição Popular',
    [SenateSupport.MEDIUM]: 'Opinião Dividida',
    [SenateSupport.HIGH]: 'Aprovação Popular',
  };

  const getAlignmentName = (align: PoliticalAlignment) => {
    switch (align) {
      case PoliticalAlignment.SITUACAO: return 'Governo (Situação)';
      case PoliticalAlignment.OPOSICAO: return 'Oposição (Direita)';
      case PoliticalAlignment.CENTRAO: return 'Independente (Centrão)';
      default: return 'Não Classificado';
    }
  };

  return (
    <div className="space-y-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* 100% Stacked Area Chart - TRANSLUCENT */}
        <div className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-heading text-xl font-black uppercase italic tracking-tighter text-white">Pulsação Social (Proporção)</h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Visualização translúcida: Equilíbrio de forças em tempo real</p>
          </div>
          <div className="bg-zinc-950 border border-zinc-900 p-6 h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={justice.sentimentHistory} stackOffset="expand">
                <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#3f3f46" 
                  fontSize={10} 
                  tick={{ fontWeight: 800 }} 
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} stroke="#3f3f46" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', border: '1px solid #F9CC18', borderRadius: 0 }}
                  itemStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '10px' }}
                  labelStyle={{ color: '#fff', fontWeight: 900, fontSize: '12px', marginBottom: '8px' }}
                  formatter={(value: any) => `${(parseFloat(value) * 100).toFixed(1)}%`}
                />
                <Area 
                  type="monotone" 
                  dataKey="falls" 
                  stackId="1"
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.3} // TRANSLUCENT
                  animationDuration={1500}
                  name="Rejeição"
                />
                <Area 
                  type="monotone" 
                  dataKey="stays" 
                  stackId="1"
                  stroke="#22C55E" 
                  fill="#22C55E" 
                  fillOpacity={0.3} // TRANSLUCENT
                  animationDuration={1500}
                  name="Aprovação"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-6 text-[9px] font-black uppercase tracking-[0.2em]">
              <span className="text-alertRed">Sentimento "Cai"</span>
              <span className="text-zinc-700 italic">Tendência Amostrada</span>
              <span className="text-stableGreen">Sentimento "Fica"</span>
            </div>
          </div>
        </div>

        {/* Support & Pressure Metrics Updated - NEW PRESSURE VISUAL */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="border-l-4 border-white pl-4">
            <h3 className="font-heading text-xl font-black uppercase italic tracking-tighter text-white">Voz Institucional</h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Cruzamento entre indicação e respaldo popular</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4 flex-1">
            <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Origem da Indicação</p>
              <p className="text-3xl font-black text-primary italic uppercase tracking-tighter">
                {getAlignmentName(justice.politicalAlignment)}
              </p>
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Status do Apoio Popular</p>
              <div className="flex flex-col">
                <p className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight">
                  {supportLabels[justice.senateSupport]}
                </p>
                <p className="text-[9px] font-bold text-zinc-600 uppercase mt-1">
                  Baseado em volume de votos e engajamento cívico.
                </p>
              </div>
            </div>

            {/* NEW VISUAL FOR PRESSURE INDEX - SEGMENTED DIGITAL METER */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-center relative overflow-hidden">
              <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-4">Índice de Tensão (Pressão)</p>
              <div className="flex items-center gap-2 h-10 w-full">
                {Array.from({ length: 10 }).map((_, i) => {
                  const threshold = (i + 1) * 10;
                  const isActive = justice.pressureScore >= threshold;
                  const color = justice.pressureScore > 70 ? 'bg-alertRed' : justice.pressureScore > 40 ? 'bg-warningYellow' : 'bg-stableGreen';
                  
                  return (
                    <div 
                      key={i}
                      className={`h-full flex-1 border border-black/50 transition-all duration-700 ${isActive ? color : 'bg-zinc-800 opacity-20'}`}
                      style={{ 
                        boxShadow: isActive ? `0 0 15px ${isActive ? (justice.pressureScore > 70 ? '#EF4444' : justice.pressureScore > 40 ? '#FBBF24' : '#22C55E') : 'transparent'}` : 'none',
                        transitionDelay: `${i * 50}ms`
                      }}
                    ></div>
                  );
                })}
                <div className="ml-4 flex flex-col">
                  <span className="text-4xl font-black text-white italic leading-none">{justice.pressureScore}%</span>
                </div>
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 mt-4 text-center">Nível de Pressão Civil Auditada</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-zinc-900 pt-8">
        <ShareButton justice={justice} />
      </div>
    </div>
  );
};

export default DualMeterSystem;
