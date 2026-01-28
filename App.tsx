
import React, { useState, useMemo, useEffect } from 'react';
import { JUSTICES } from './constants';
import { Justice, VoteData } from './types';
import JusticeCard from './JusticeCard';
import DualMeterSystem from './DualMeterSystem';
import InteractionModule from './InteractionModule';
import SenateCompositionMap from './SenateCompositionMap';
import LeadWall from './LeadWall';
import NewsSection from './NewsSection';
import ShareButton from './ShareButton';
import ProjectCredits from './ProjectCredits';

const SYNC_POST_URL = "https://script.google.com/macros/s/AKfycbzuNkYdkNllvPvzuEAixiE-K7kn3TdsiK-igPg8yDbEBSl3I-iEyRldHhUhxdjF9PrZtA/exec";
const FETCH_GET_URL = "https://script.google.com/macros/s/AKfycbxvFulGsFoGFtuwmthkWh9-PQEQXBcs0DXEPprJOT73Lnt8nkfs5u615FwsfH2YTKwKzA/exec";
const MAX_VOTES_PER_IP = 20;
const CACHE_DURATION = 300000; // 5 Minutos de Janela de Cache

const App: React.FC = () => {
  const [showLeadWall, setShowLeadWall] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(() => !!localStorage.getItem('stf_user_email'));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('stf_user_email') || '');
  
  const [votedKeys, setVotedKeys] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('stf_voted_registry');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [ipVoteCount, setIpVoteCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('stf_ip_vote_count') || '0');
  });

  const [votesByJustice, setVotesByJustice] = useState<Record<string, VoteData>>(() => {
    const initial: Record<string, VoteData> = {};
    JUSTICES.forEach(j => { initial[j.id] = { falls: 1, stays: 1 }; });
    return initial;
  });

  const fetchGlobalVotes = async (force: boolean = false) => {
    const lastFetch = localStorage.getItem('stf_last_fetch_time');
    const now = Date.now();

    if (force || !lastFetch || (now - parseInt(lastFetch)) >= CACHE_DURATION) {
      try {
        const response = await fetch(`${FETCH_GET_URL}?t=${now}`);
        const remoteData = await response.json();
        
        if (remoteData && Array.isArray(remoteData)) {
          const mappedVotes: Record<string, VoteData> = {};
          remoteData.forEach((row: any) => {
            const jId = row.JusticeID || row.justiceId;
            const falls = parseInt(row.Falls || row.falls) || 0;
            const stays = parseInt(row.Stays || row.stays) || 0;
            if (jId) mappedVotes[jId] = { falls, stays };
          });
          
          if (Object.keys(mappedVotes).length > 0) {
            setVotesByJustice(mappedVotes);
            localStorage.setItem('stf_cached_votes', JSON.stringify(mappedVotes));
            localStorage.setItem('stf_last_fetch_time', now.toString());
          }
        }
      } catch (e) {
        const cached = localStorage.getItem('stf_cached_votes');
        if (cached) setVotesByJustice(JSON.parse(cached));
      }
    } else {
      const cached = localStorage.getItem('stf_cached_votes');
      if (cached) setVotesByJustice(JSON.parse(cached));
    }
  };

  useEffect(() => {
    fetchGlobalVotes(true);
    const interval = setInterval(() => fetchGlobalVotes(false), CACHE_DURATION);
    return () => clearInterval(interval);
  }, []);

  const alphabeticalJustices = useMemo(() => {
    return [...JUSTICES].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const totalGlobalVotes = useMemo(() => {
    return Object.values(votesByJustice).reduce((acc: number, curr: VoteData) => acc + (curr.falls || 0) + (curr.stays || 0), 0);
  }, [votesByJustice]);

  const [selectedJustice, setSelectedJustice] = useState<Justice>(alphabeticalJustices[0]);

  const syncWithSheet = async (email: string, justiceId: string, type: string) => {
    try {
      await fetch(SYNC_POST_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, justiceId, type, date: new Date().toISOString() })
      });
    } catch (e) { console.error(e); }
  };

  const handleVote = (justiceId: string, type: 'falls' | 'stays') => {
    if (justiceId === '11') return;

    if (ipVoteCount >= MAX_VOTES_PER_IP) {
      alert("A integridade da auditoria detectou excesso de interações para este terminal. Seu voto foi retido para verificação manual.");
      return;
    }

    const voteKey = `${userEmail || 'anon'}_${justiceId}`;
    if (votedKeys.has(voteKey)) {
      alert("Voto já registrado para este perfil institucional.");
      return;
    }

    setVotesByJustice(prev => ({
      ...prev,
      [justiceId]: { 
        falls: type === 'falls' ? (prev[justiceId]?.falls || 0) + 1 : (prev[justiceId]?.falls || 0),
        stays: type === 'stays' ? (prev[justiceId]?.stays || 0) + 1 : (prev[justiceId]?.stays || 0)
      }
    }));

    const newKeys = new Set(votedKeys).add(voteKey);
    setVotedKeys(newKeys);
    localStorage.setItem('stf_voted_registry', JSON.stringify(Array.from(newKeys)));

    const newIpCount = ipVoteCount + 1;
    setIpVoteCount(newIpCount);
    localStorage.setItem('stf_ip_vote_count', newIpCount.toString());

    if (isSubscribed) {
      syncWithSheet(userEmail, justiceId, type);
    } else {
      setShowLeadWall(true);
    }
  };

  return (
    <div className="min-h-screen bg-brandBlack text-brandWhite selection:bg-primary selection:text-black overflow-x-hidden">
      <LeadWall isOpen={showLeadWall} onClose={(email) => {
        localStorage.setItem('stf_user_email', email);
        setUserEmail(email);
        setIsSubscribed(true);
        setShowLeadWall(false);
      }} />

      {/* CABEÇALHO SUPERIOR - STATUS DE AUDITORIA */}
      <div className="bg-primary text-black py-2.5 px-4 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] md:text-xs font-black uppercase tracking-widest italic">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 bg-black text-primary px-2 py-0.5 rounded-sm">
                <span className="w-1.5 h-1.5 bg-stableGreen rounded-full animate-pulse"></span>
                CONEXÃO SEGURA
             </div>
             <span>AUDITORIA INDEPENDENTE EM TEMPO REAL</span>
          </div>
          <div className="hidden md:flex gap-6 items-center">
             <span>DADOS PROTEGIDOS CONTRA MANIPULAÇÃO</span>
             <div className="w-px h-3 bg-black/20"></div>
             <span className="animate-pulse">SINCRONIZANDO VOTOS (5M)...</span>
          </div>
        </div>
      </div>

      <header className="pt-8 pb-4 md:pt-16 md:pb-8 px-4 lg:px-6 relative overflow-hidden border-b-2 border-zinc-900">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-2 md:gap-10">
            <h1 className="font-heading text-4xl md:text-8xl lg:text-[10rem] font-black uppercase italic leading-[0.7] tracking-tighter text-white">STF</h1>
            <div className="flex flex-col items-start md:items-end text-left md:text-right border-l-4 md:border-l-0 md:border-r-4 border-primary pl-4 md:pl-0 md:pr-10 pb-2">
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-primary text-3xl md:text-7xl lg:text-9xl tabular-nums font-black tracking-tighter leading-none">
                  {totalGlobalVotes.toLocaleString('pt-BR')}
                </span>
              </div>
              <span className="text-[7px] md:text-[10px] lg:text-lg uppercase tracking-[0.2em] text-zinc-600 font-black italic">opinadores auditados</span>
            </div>
          </div>
          <h2 className="font-heading text-2xl md:text-7xl lg:text-[8rem] font-black uppercase italic leading-[0.8] tracking-tighter text-primary">Inpixômetro</h2>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-10 md:py-20 space-y-20 md:space-y-32">
        <section id="monitoring-panel">
          <div className="flex justify-between items-end mb-8 border-b border-zinc-900 pb-4">
            <div>
              <h2 className="font-heading text-lg md:text-3xl font-black italic uppercase tracking-tighter text-white underline decoration-primary decoration-2 underline-offset-4">Supremo Monitor</h2>
              <p className="text-zinc-600 text-[8px] md:text-[11px] uppercase tracking-[0.1em] font-black mt-2 italic">Selecione um perfil para ver o contexto e registrar seu voto</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {alphabeticalJustices.map(justice => (
              <JusticeCard 
                key={justice.id} 
                justice={justice} 
                isSelected={selectedJustice.id === justice.id}
                onClick={() => setSelectedJustice(justice)}
                votes={votesByJustice[justice.id] || {falls: 0, stays: 0}}
                hasVoted={votedKeys.has(`${userEmail || 'anon'}_${justice.id}`)}
                onVote={(type) => handleVote(justice.id, type)}
              />
            ))}
          </div>
        </section>

        <section className="bg-zinc-950 p-1 border-4 border-zinc-900 shadow-2xl relative">
          <InteractionModule 
            justiceName={selectedJustice.name}
            justiceId={selectedJustice.id}
            votes={votesByJustice[selectedJustice.id] || {falls: 1, stays: 1}}
            hasVoted={votedKeys.has(`${userEmail || 'anon'}_${selectedJustice.id}`)}
            onVote={(type) => handleVote(selectedJustice.id, type)}
          />
        </section>

        <section className={`space-y-16 transition-all duration-1000 ${!isSubscribed ? 'blur-3xl opacity-5 grayscale' : ''}`}>
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-zinc-900 pb-8 gap-6">
            <h2 className="font-heading text-xl md:text-4xl font-black italic uppercase tracking-tighter text-white">Fluxo de Pressão</h2>
            <ShareButton justice={selectedJustice} variant="minimal" />
          </div>
          <DualMeterSystem justice={selectedJustice} />
        </section>

        <section className={`${!isSubscribed ? 'blur-3xl opacity-5' : ''}`}><SenateCompositionMap /></section>
        <section className={`${!isSubscribed ? 'blur-2xl opacity-10' : ''}`}><NewsSection selectedJustice={selectedJustice} /></section>
        <ProjectCredits />
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 md:py-24 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
           {/* QUADRO DE COMPLIANCE ATUALIZADO */}
           <div className="bg-primary/5 border border-primary/20 p-6 md:p-10 text-center rounded-sm shadow-[0_0_30px_rgba(249,204,24,0.05)]">
              <h4 className="text-primary font-black uppercase tracking-[0.5em] text-[8px] md:text-[10px] mb-4 italic">Protocolo de Integridade & Compliance Cívico</h4>
              <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-zinc-400 italic leading-relaxed max-w-4xl mx-auto">
                 ESTA PLATAFORMA OPERA SOB PROTOCOLOS DE AUDITORIA INDEPENDENTE. NÃO POSSUÍMOS VÍNCULO COM O PODER JUDICIÁRIO, ÓRGÃOS GOVERNAMENTAIS OU PARTIDOS POLÍTICOS. TODOS OS VOTOS SÃO CRIPTOGRAFADOS E PROCESSADOS PARA GARANTIR A LEGITIMIDADE DA SOBERANIA POPULAR. <br className="hidden md:block" /> 
                 <span className="text-primary/60 mt-4 block text-[8px] md:text-[11px]">SISTEMA DE MONITORAMENTO PERMANENTE — BRASÍLIA/DF</span>
              </p>
           </div>

           <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <h3 className="font-heading text-lg md:text-2xl font-black uppercase italic tracking-tighter text-white mb-2">STF Inpixômetro</h3>
                <p className="text-zinc-700 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]">Brasília / DF — Vigilância Soberana Permanente</p>
              </div>
              
              <div className="flex items-center gap-6 text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                 <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                   <span>Live AUDIT Sync</span>
                 </div>
                 <div className="w-px h-4 bg-zinc-800"></div>
                 <span>v13.6.8 STABLE</span>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
