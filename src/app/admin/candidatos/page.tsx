'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, ChevronRight, 
  Star, MessageSquare, Clock, CheckCircle, 
  XCircle, AlertCircle, MoreVertical, ExternalLink,
  MapPin, Phone, Mail, Calendar, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

// Tipagem básica
interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  status: 'applied' | 'reviewing' | 'interview' | 'hired' | 'rejected';
  notes: string | null;
  rating: number | null;
  created_at: string;
  jobs: {
    title: string;
    company_name: string;
  };
  profiles: {
    full_name: string;
    whatsapp: string;
    avatar_url: string | null;
  };
}

export default function ATSDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (title, company_name),
          profiles:candidate_id (full_name, whatsapp, avatar_url)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Erro ao carregar candidaturas:', err);
    } finally {
      setLoading(false);
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setApplications(apps => apps.map(app => 
        app.id === id ? { ...app, status: newStatus as any } : app
      ));
      
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus as any });
      }

      // Track event
      await supabase.from('application_events').insert({
        application_id: id,
        status: newStatus,
        notes: `Status alterado para ${newStatus}`
      });

    } catch (err) {
      alert('Erro ao atualizar status');
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = app.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.jobs?.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'reviewing': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'interview': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'hired': return 'bg-green-50 text-green-600 border-green-100';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'applied': return 'Recebido';
      case 'reviewing': return 'Em Análise';
      case 'interview': return 'Entrevista';
      case 'hired': return 'Contratado';
      case 'rejected': return 'Recusado';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar (Simplificada para o contexto) */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-slate-100">
           <span className="hidden lg:block text-xl font-black text-slate-900">NATAL<span className="text-blue-600">PRO</span></span>
           <Briefcase className="w-6 h-6 text-blue-600 lg:hidden" />
        </div>
        <nav className="p-4 space-y-2">
           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2 hidden lg:block">Recrutamento</div>
           <button className="w-full flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-bold text-sm">
             <Users className="w-4 h-4" /> <span className="hidden lg:block">ATS / Candidatos</span>
           </button>
           {/* Outros itens seriam links */}
        </nav>
      </aside>

      <main className="md:ml-20 lg:ml-64 flex-1 p-4 lg:p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sistema de Rastreamento (ATS)</h1>
            <p className="text-slate-500 text-sm">Gerencie o fluxo de contratação e histórico de talentos.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar candidato ou vaga..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main List */}
          <div className={`${selectedApp ? 'lg:col-span-7' : 'lg:col-span-12'} transition-all duration-300`}>
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex gap-2 overflow-x-auto">
                {['all', 'applied', 'reviewing', 'interview', 'hired', 'rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      filterStatus === status 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {status === 'all' ? 'Todos' : getStatusLabel(status)}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-slate-50">
                {loading ? (
                  <div className="p-20 text-center text-slate-400">Carregando candidaturas...</div>
                ) : filteredApps.length === 0 ? (
                  <div className="p-20 text-center text-slate-400 font-medium">Nenhuma candidatura encontrada.</div>
                ) : (
                  filteredApps.map((app) => (
                    <div 
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-4 flex items-center justify-between hover:bg-blue-50/30 cursor-pointer transition-all ${selectedApp?.id === app.id ? 'bg-blue-50/50 ring-1 ring-inset ring-blue-100' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex-shrink-0 overflow-hidden border-2 border-white shadow-sm">
                          {app.profiles?.avatar_url ? (
                            <img src={app.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                              {app.profiles?.full_name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{app.profiles?.full_name}</h3>
                          <p className="text-[11px] font-bold text-blue-600 uppercase tracking-tight">{app.jobs?.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${getStatusColor(app.status)}`}>
                              {getStatusLabel(app.status)}
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {new Date(app.created_at).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-slate-300 transition-transform ${selectedApp?.id === app.id ? 'translate-x-1 text-blue-400' : ''}`} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          <AnimatePresence>
            {selectedApp && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[calc(100vh-200px)] sticky top-8"
              >
                <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex-shrink-0 overflow-hidden">
                       {selectedApp.profiles?.avatar_url && <img src={selectedApp.profiles.avatar_url} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900">{selectedApp.profiles?.full_name}</h2>
                      <p className="text-sm font-bold text-slate-400">Candidato ID: #{selectedApp.id.slice(0, 8)}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedApp(null)}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-slate-300" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {/* Status Actions */}
                  <section>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Mudar Estágio</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'reviewing', icon: Clock, label: 'Analisar' },
                        { id: 'interview', icon: MessageSquare, label: 'Entrevista' },
                        { id: 'hired', icon: CheckCircle, label: 'Contratar' },
                        { id: 'rejected', icon: AlertCircle, label: 'Recusar' }
                      ].map((action) => (
                        <button
                          key={action.id}
                          onClick={() => updateStatus(selectedApp.id, action.id)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                            selectedApp.status === action.id 
                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <action.icon className="w-3 h-3" />
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </section>

                  {/* Info Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Vaga Pretendida</p>
                      <p className="text-xs font-bold text-slate-900">{selectedApp.jobs?.title}</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp</p>
                      <p className="text-xs font-bold text-blue-600 flex items-center gap-1 cursor-pointer">
                        <Phone className="w-3 h-3" /> {selectedApp.profiles?.whatsapp || 'Não informado'}
                      </p>
                    </div>
                  </div>

                  {/* Notes & Feedback */}
                  <section>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Anotações Internas</h4>
                    <textarea 
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 h-32 resize-none"
                      placeholder="Adicione observações sobre o candidato..."
                      defaultValue={selectedApp.notes || ''}
                    ></textarea>
                  </section>

                  {/* Timeline (Mock) */}
                  <section>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Histórico</h4>
                    <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm"></div>
                        <p className="text-xs font-bold text-slate-900">Candidatura Recebida</p>
                        <p className="text-[10px] text-slate-400">{new Date(selectedApp.created_at).toLocaleString()}</p>
                      </div>
                      {selectedApp.status !== 'applied' && (
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-900 border-4 border-white shadow-sm"></div>
                          <p className="text-xs font-bold text-slate-900">Movido para: {getStatusLabel(selectedApp.status)}</p>
                          <p className="text-[10px] text-slate-400">Recém atualizado</p>
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-100">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" /> VER PERFIL COMPLETO
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
