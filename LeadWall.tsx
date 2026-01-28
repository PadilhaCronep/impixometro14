
import React, { useState } from 'react';

interface LeadWallProps {
  isOpen: boolean;
  onClose: (email: string) => void;
}

const LeadWall: React.FC<LeadWallProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
      <div className="bg-brandBlack border-4 border-primary p-8 md:p-12 max-w-xl w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        
        <h2 className="font-heading text-4xl font-black uppercase italic tracking-tighter mb-4 leading-none">
          Integridade de <span className="text-primary">Monitoramento</span>
        </h2>
        
        <p className="text-sm text-zinc-400 font-bold uppercase tracking-tight mb-8">
          Para garantir a autenticidade dos dados e evitar ataques de bots, solicitamos uma verificação simples. Seu voto foi computado, mas valide seu acesso para ver os gráficos avançados.
        </p>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (email && acceptedTerms) {
              onClose(email);
            }
          }}
          className="space-y-6"
        >
          <input 
            type="email" 
            required
            placeholder="SEU MELHOR E-MAIL"
            className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white font-black uppercase tracking-widest focus:border-primary outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="flex items-start gap-3 text-left">
            <div className="relative flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                required
                className="w-5 h-5 bg-zinc-900 border-zinc-700 rounded focus:ring-primary accent-primary cursor-pointer"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
            </div>
            <label htmlFor="terms" className="text-[11px] text-zinc-400 font-medium leading-tight cursor-pointer">
              Eu aceito os <span className="text-primary underline font-bold">termos de uso</span> e autorizo o contato para fins de mobilização.
            </label>
          </div>

          <button 
            type="submit"
            disabled={!acceptedTerms}
            className={`w-full font-black py-4 uppercase tracking-[0.3em] transition-colors ${
              acceptedTerms 
                ? 'bg-primary text-black hover:bg-white' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            VALIDAR E CONTINUAR
          </button>
        </form>

        <p className="text-[10px] text-zinc-600 mt-8 uppercase font-bold">
          Prometemos transparência total. Sem SPAM. Apenas dados.
        </p>
      </div>
    </div>
  );
};

export default LeadWall;
