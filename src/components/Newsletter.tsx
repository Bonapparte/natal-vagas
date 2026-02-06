'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      // Aqui integraria com a API do Resend/Supabase futuramente
    }
  };

  if (subscribed) {
    return (
      <div className="bg-blue-600 rounded-[32px] p-8 text-white flex flex-col items-center text-center animate-in zoom-in duration-500">
        <CheckCircle className="w-12 h-12 mb-4" />
        <h3 className="text-2xl font-black mb-2">Inscrição Confirmada!</h3>
        <p className="text-blue-100 font-medium">Você começará a receber as melhores vagas de Natal toda segunda-feira.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 -mr-16 -mt-16 rounded-full blur-3xl"></div>
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-4">Vagas no seu e-mail.</h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Receba o "Digest Potiguar" com as oportunidades que acabaram de sair do forno nos melhores bairros de Natal.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail"
            className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2">
            INSCREVER <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
