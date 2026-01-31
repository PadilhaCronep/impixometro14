
import React from 'react';
import { Justice } from './types';

interface ShareButtonProps {
  justice: Justice;
  variant?: 'primary' | 'minimal';
}

const ShareButton: React.FC<ShareButtonProps> = ({ justice, variant = 'primary' }) => {
  const shareText = "Eu votei no Inpixômetro, vote você também";
  const shareUrl = "https://aludydias.com.br/";
  const hashtags = "Inpixômetro,foramaster,ForaottoLobo,foraxandao";

  // Usamos o Web Intent URL diretamente para garantir o comportamento de nova aba e preenchimento correto
  const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;

  if (variant === 'minimal') {
    return (
      <div className="flex items-center">
        <a 
          href={intentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-black uppercase tracking-widest text-primary border-b border-primary hover:text-white hover:border-white transition-all flex items-center gap-2"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          COMPARTILHAR NO X
        </a>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-4">
      <a 
        href={intentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-primary text-black font-black px-8 py-4 uppercase tracking-[0.2em] text-xs hover:bg-white transition-all transform active:scale-95 shadow-xl"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        COMPARTILHAR RESULTADO NO X
      </a>
    </div>
  );
};

export default ShareButton;
