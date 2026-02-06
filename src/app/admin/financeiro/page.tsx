'use client';

import React from 'react';
import { 
  TrendingUp, CreditCard, DollarSign, 
  ArrowLeft, Download, Filter 
} from 'lucide-react';
import Link from 'next/link';

export default function FinanceDashboard() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-slate-900 text-white p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-slate-400 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" /> Voltar para Operações
          </Link>
          <span className="font-black tracking-tighter uppercase">Área Financeira <span className="text-blue-500">Restrita</span></span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Fluxo de Caixa</h1>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">Visão consolidada de rentabilidade</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all">
              <Download className="w-4 h-4" /> Exportar Relatório
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              CONFIGURAR TAXAS
            </button>
          </div>
        </header>

        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 p-10 rounded-[48px] border border-slate-100">
             <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-6 h-6 text-blue-600" />
             </div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Receita Total Bruta</p>
             <h3 className="text-4xl font-black text-slate-900 tracking-tight">R$ 48.950,00</h3>
             <span className="text-green-600 text-xs font-black mt-4 inline-block bg-green-50 px-3 py-1 rounded-full">+22% este mês</span>
          </div>
          
          <div className="bg-slate-50 p-10 rounded-[48px] border border-slate-100">
             <div className="bg-orange-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-orange-600" />
             </div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Vendas Premium (AdSense + Ads Locais)</p>
             <h3 className="text-4xl font-black text-slate-900 tracking-tight">R$ 15.200,00</h3>
             <span className="text-blue-600 text-xs font-black mt-4 inline-block bg-blue-50 px-3 py-1 rounded-full">Meta de 80% atingida</span>
          </div>

          <div className="bg-slate-900 p-10 rounded-[48px] text-white">
             <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
             </div>
             <p className="text-xs font-black text-white/50 uppercase tracking-widest mb-2">LUCRO LÍQUIDO (ESTIMADO)</p>
             <h3 className="text-4xl font-black text-white tracking-tight">R$ 32.410,00</h3>
             <span className="text-blue-400 text-xs font-black mt-4 inline-block bg-white/5 px-3 py-1 rounded-full">Próximo saque em 4 dias</span>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
           <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Histórico de Transações</h2>
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-white rounded-lg transition-all"><Filter className="w-5 h-5 text-slate-400" /></button>
              </div>
           </div>
           <div className="p-4">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                       <th className="p-4">Origem</th>
                       <th className="p-4">Data</th>
                       <th className="p-4">Status</th>
                       <th className="p-4 text-right">Valor</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm font-bold text-slate-600">
                    {[
                      { source: 'Assinatura Premium - Hotel Majestic', date: '06/02/2026', status: 'Concluído', value: 'R$ 149,00' },
                      { source: 'Google AdSense (Payout)', date: '01/02/2026', status: 'Processando', value: 'R$ 4.250,00' },
                      { source: 'Impulsionamento de Vaga - Alecrim Store', date: '05/02/2026', status: 'Concluído', value: 'R$ 29,90' },
                    ].map((tx, i) => (
                      <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer">
                        <td className="p-4 text-slate-900">{tx.source}</td>
                        <td className="p-4">{tx.date}</td>
                        <td className="p-4 text-xs">
                           <span className={`px-3 py-1 rounded-full uppercase tracking-tighter font-black ${
                             tx.status === 'Concluído' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                           }`}>
                             {tx.status}
                           </span>
                        </td>
                        <td className="p-4 text-right font-black text-slate-900">{tx.value}</td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </main>
    </div>
  );
}
