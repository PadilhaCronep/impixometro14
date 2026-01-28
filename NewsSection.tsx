
import React from 'react';
import { Justice, NewsItem } from '../types';
import { NEWS_DATA } from '../constants';

interface NewsSectionProps {
  selectedJustice: Justice;
}

const NewsSection: React.FC<NewsSectionProps> = ({ selectedJustice }) => {
  const filteredNews = NEWS_DATA.filter(
    item => item.justiceId === selectedJustice.id || item.justiceId === 'general'
  );

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b border-zinc-800 pb-3 lg:pb-4 gap-4">
        <div>
          <h2 className="font-heading text-3xl lg:text-4xl font-black italic uppercase tracking-tighter text-white">Contexto & Cobertura</h2>
          <p className="text-zinc-500 text-[10px] lg:text-xs uppercase tracking-[0.2em] font-bold mt-1 lg:mt-2">
            Desdobramentos relacionados a {selectedJustice.name}
          </p>
        </div>
        <div className="hidden lg:block">
           <span className="bg-zinc-900 text-[10px] font-black uppercase px-3 py-1 tracking-widest text-zinc-400 border border-zinc-800">
             Feed em Tempo Real
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredNews.map((news) => (
          <a 
            key={news.id} 
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-950 border border-zinc-900 p-5 lg:p-6 flex flex-col group hover:border-primary transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(249,204,24,0.1)] active:scale-[0.98] transition-mobile"
          >
            <div className="flex justify-between items-start mb-3 lg:mb-4">
              <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-widest bg-zinc-900 px-1.5 py-0.5 text-primary border border-zinc-800">
                {news.type}
              </span>
              <span className="text-[8px] lg:text-[9px] font-black uppercase text-zinc-600">{news.date}</span>
            </div>
            
            <h3 className="font-heading text-base lg:text-lg font-black uppercase leading-tight mb-2 lg:mb-3 group-hover:text-primary transition-colors text-white">
              {news.headline}
            </h3>
            
            <p className="text-[10px] lg:text-xs text-zinc-500 font-bold uppercase tracking-tight mb-4 lg:mb-6 line-clamp-3 leading-snug">
              {news.excerpt}
            </p>
            
            <div className="mt-auto pt-3 lg:pt-4 border-t border-zinc-900 flex justify-between items-center">
              <span className="text-[8px] lg:text-[9px] font-black uppercase text-zinc-400">{news.source}</span>
              <div className="flex items-center gap-1 text-zinc-700 group-hover:text-primary transition-colors">
                <span className="text-[7px] lg:text-[8px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Acessar</span>
                <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-zinc-900/30 p-3 lg:p-4 border border-zinc-900/50 flex items-center gap-3 lg:gap-4">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"></div>
        <p className="text-[8px] lg:text-[10px] uppercase font-black tracking-widest text-zinc-500 leading-tight">
          Toque nos cards para ler as matérias completas. Monitoramento 24h.
        </p>
      </div>
    </div>
  );
};

export default NewsSection;