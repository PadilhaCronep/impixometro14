
import React from 'react';

const ProjectCredits: React.FC = () => {
  return (
    <section className="border-t border-zinc-900 pt-24 pb-12">
      <div className="bg-zinc-950/50 border border-zinc-900 p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Left/Top: Profile Image */}
        <div className="shrink-0">
          <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_40px_rgba(249,204,24,0.1)]">
            <img 
              src="https://lh3.googleusercontent.com/d/1ld8LyI2YdeLhedyxFC45gH4bHkF-OwDE" 
              alt="Ludymilla Dias" 
              className="w-full h-full object-cover transition-all duration-700"
            />
          </div>
        </div>

        {/* Right/Bottom: Attribution Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="space-y-2">
            <h3 className="font-heading text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">
              Créditos do Projeto
            </h3>
            <h2 className="font-heading text-3xl md:text-4xl font-black uppercase italic leading-tight text-white tracking-tighter">
              Desenvolvido por<br/>Equipe Ludymilla Dias
            </h2>
          </div>

          <p className="text-zinc-400 text-sm md:text-base font-bold uppercase tracking-tight leading-relaxed max-w-xl">
            Este projeto foi desenvolvido pela Equipe Ludymilla Dias, sob a mentoria e direção estratégica de Ludymilla Dias — estrategista focada em estrutura, clareza e posicionamento político e institucional de longo prazo.
          </p>

          {/* Social Icons Replacement */}
          <div className="flex items-center justify-center md:justify-start gap-8 pt-4">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/aludydias" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-all transform hover:scale-110 active:scale-90"
              aria-label="Instagram"
            >
              <svg className="w-8 h-8 lg:w-9 lg:h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            
            {/* TikTok */}
            <a 
              href="https://www.tiktok.com/@aludydias0?_r=1&_t=ZS-934QTiIJPYj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-all transform hover:scale-110 active:scale-90"
              aria-label="TikTok"
            >
              <svg className="w-8 h-8 lg:w-9 lg:h-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a6.43 6.43 0 0 1-1.11-.75v7.57a6.6 6.6 0 0 1-2.25 4.91 6.65 6.65 0 0 1-9.2-.18 6.65 6.65 0 0 1-.22-9.23 6.6 6.6 0 0 1 4.58-2.31c.14-.01.27-.01.41 0v4.03c-1.34.02-2.61.7-3.32 1.83a3.33 3.33 0 0 0 .1 3.33 3.33 3.33 0 0 0 3.31 1.83c1.33-.02 2.6-.7 3.31-1.83.14-.23.23-.48.27-.74.03-.31.04-.63.04-.95V.02h.01z"/>
              </svg>
            </a>

            {/* X (Twitter) */}
            <a 
              href="https://x.com/Aludydias" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-all transform hover:scale-110 active:scale-90"
              aria-label="X (Twitter)"
            >
              <svg className="w-7 h-7 lg:w-8 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-zinc-700 italic">
          Mentoria • Estratégia • Integridade Institucional
        </p>
      </div>
    </section>
  );
};

export default ProjectCredits;
