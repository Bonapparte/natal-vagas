'use client';

import React from 'react';
import { 
  Users, Briefcase, ShieldCheck, 
  Settings, LogOut, Bell, Search, CheckCircle, Clock, 
  Map as MapIcon, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F1F5F9] flex">
      {/* Sidebar Corporativa - Discreta e Profissional */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-50">
        <div className="p-8 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900 uppercase">NATAL<span className="text-blue-600">PRO</span></span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Painel de Controle</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 bg-slate-50 text-blue-600 p-3 rounded-xl font-bold text-sm">
            <Briefcase className="w-4 h-4" /> Gestão de Vagas
          </Link>
          <Link href="/admin/verificacao" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all">
            <ShieldCheck className="w-4 h-4" /> Verificação KYC
          </Link>
          <Link href="/admin/candidatos" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all">
            <Users className="w-4 h-4" /> Base de Talentos
          </Link>
          <Link href="/admin/mapa-operacional" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all">
            <MapIcon className="w-4 h-4" /> Mapa de Calor
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link href="/admin/config" className="flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 mb-2">
            <Settings className="w-4 h-4" /> Ajustes
          </Link>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all">
            <LogOut className="w-4 h-4" /> Encerrar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Gestão Operacional</h1>
            <p className="text-slate-500 text-sm font-medium">Monitorando o fluxo de empregabilidade em Natal.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Servidor Estável</span>
            </div>
            <button className="bg-white border border-slate-200 p-2.5 rounded-xl text-slate-500 relative hover:bg-slate-50 transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Operational Stats (No Financial Data here) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Vagas Publicadas', val: '1.240', color: 'text-slate-900' },
            { label: 'Pendentes de Verificação', val: '42', color: 'text-orange-600' },
            { label: 'Candidaturas Hoje', val: '856', color: 'text-blue-600' },
            { label: 'Match de Geolocalização', val: '92%', color: 'text-green-600' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-black ${stat.color}`}>{stat.val}</h3>
            </div>
          ))}
        </div>

        {/* Action Center */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Moderation Queue */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-black text-slate-900 uppercase tracking-tight">Fila de Moderação</h2>
              <button className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1">Ver todos <ChevronRight className="w-3 h-3" /></button>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { title: 'Auxiliar Administrativo', company: 'Mercado Potiguar', time: 'Há 5 min' },
                { title: 'Vendedor de Loja', company: 'Natal Shopping', time: 'Há 12 min' },
                { title: 'Desenvolvedor Jr', company: 'Startup Lagoa Nova', time: 'Há 18 min' }
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.company} • {item.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-600 hover:text-white transition-all"><CheckCircle className="w-4 h-4" /></button>
                    <button className="bg-slate-100 text-slate-400 p-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / System Status */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl shadow-slate-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-20 -mr-16 -mt-16 rounded-full"></div>
               <h3 className="text-xl font-black mb-2 relative z-10">Relatórios Estratégicos</h3>
               <p className="text-slate-400 text-xs font-medium mb-6 relative z-10">Acesse métricas de receita, conversão e desempenho financeiro.</p>
               <Link href="/admin/financeiro" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-blue-700 transition-all relative z-10">
                 ACESSAR ÁREA FINANCEIRA <ChevronRight className="w-4 h-4" />
               </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200">
               <h4 className="font-black text-slate-900 text-sm mb-4 uppercase tracking-widest">Alertas do Sistema</h4>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                     <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                     <span className="text-[10px] font-bold text-orange-800 uppercase tracking-tight">12 Documentos aguardando revisão</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                     <span className="text-[10px] font-bold text-blue-800 uppercase tracking-tight">Backup realizado com sucesso</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
