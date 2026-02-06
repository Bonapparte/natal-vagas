'use client';

import React from 'react';
import { Zap, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const PLANS = [
  {
    name: 'Destaque Bronze',
    price: 'R$ 49',
    amount: 4900,
    features: ['No topo por 7 dias', 'Selo de verificação', 'Suporte via WhatsApp'],
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  {
    name: 'Destaque Ouro',
    price: 'R$ 99',
    amount: 9900,
    features: ['No topo por 15 dias', 'Selo de verificação VIP', 'Notificação push para candidatos', 'Analytics detalhado'],
    color: 'bg-blue-600 text-white border-blue-700 shadow-xl shadow-blue-200'
  }
];

export default function PremiumPlansPage() {
  const handleCheckout = async (plan: typeof PLANS[0]) => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        jobId: 'vaga-exemplo-123', // Seria dinâmico
        planName: plan.name,
        amount: plan.amount
      }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
          <Zap className="w-4 h-4" /> Multiplique suas contratações
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
          Sua vaga em destaque na <br/><span className="text-blue-600 italic">Cidade do Sol.</span>
        </h1>
        <p className="text-xl text-slate-500 font-medium mb-16 max-w-2xl mx-auto">
          Empresas que utilizam o plano Premium em Natal recebem até 5x mais currículos verificados por dia.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`p-10 rounded-[48px] border text-left flex flex-col ${plan.color}`}>
              <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">{plan.name}</h3>
              <div className="text-4xl font-black mb-8">{plan.price}</div>
              
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 font-bold text-sm">
                    <div className="bg-current/10 p-1 rounded-full"><Check className="w-4 h-4" /></div>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleCheckout(plan)}
                className={`w-full py-5 rounded-[24px] font-black text-lg transition-all flex items-center justify-center gap-3 ${
                  plan.name === 'Destaque Ouro' ? 'bg-white text-blue-600 hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
                }`}
              >
                ATIVAR AGORA <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white rounded-[32px] border border-slate-100 shadow-sm flex items-center justify-center gap-4">
           <ShieldCheck className="w-8 h-8 text-green-500" />
           <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Pagamento 100% seguro via Stripe Architecture</p>
        </div>
      </div>
    </div>
  );
}
