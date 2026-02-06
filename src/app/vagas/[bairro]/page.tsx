import React from 'react';
import { Metadata } from 'next';
import neighborhoods from '@/lib/neighborhoods.json';
import { Briefcase, MapPin, Search, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface PageProps {
  params: { bairro: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const neighborhood = neighborhoods.find(n => n.id === params.bairro);
  const name = neighborhood?.name || params.bairro;
  
  return {
    title: `Empregos em ${name}, Natal/RN | Natal Vagas Pro`,
    description: `Encontre as melhores oportunidades de trabalho no bairro ${name} em Natal. Vagas atualizadas hoje para varejo, serviços, saúde e muito mais.`,
    keywords: `vagas de emprego natal rn, empregos ${name}, trabalhar em natal, natal vagas pro, oportunidades ${name}`,
    openGraph: {
      title: `Vagas de Emprego em ${name} - Natal Vagas Pro`,
      description: `Busque seu próximo emprego em ${name}. Milhares de oportunidades em Natal/RN.`,
      url: `https://natalvagaspro.com.br/vagas/${params.bairro}`,
    }
  };
}

export default async function NeighborhoodPage({ params }: PageProps) {
  const neighborhood = neighborhoods.find(n => n.id === params.bairro);
  
  if (!neighborhood) {
    return <div className="p-20 text-center">Bairro não encontrado.</div>;
  }

  // Fetch jobs for this neighborhood
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .ilike('location_bairro', `%${neighborhood.name}%`)
    .eq('is_active', true)
    .limit(10);

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Hero */}
      <section className="bg-slate-900 text-white pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full -mr-64 -mt-64"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-600/30 px-4 py-1.5 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            <MapPin className="w-3 h-3" /> NATAL • {neighborhood.name.toUpperCase()}
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none">
            Vagas de Emprego em <span className="text-blue-500">{neighborhood.name}</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
            {neighborhood.description} Explore as melhores oportunidades de carreira nesta região estratégica de Natal.
          </p>
        </div>
      </section>

      {/* Stats / Benefits */}
      <section className="py-12 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="flex gap-4 items-center">
              <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Briefcase className="w-6 h-6" /></div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">{jobs?.length || 0}+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vagas Ativas</p>
              </div>
           </div>
           <div className="flex gap-4 items-center">
              <div className="bg-green-50 p-3 rounded-2xl text-green-600"><Star className="w-6 h-6" /></div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">Top 1%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Empresas Verificadas</p>
              </div>
           </div>
           <div className="flex gap-4 items-center">
              <div className="bg-orange-50 p-3 rounded-2xl text-orange-600"><Search className="w-6 h-6" /></div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-none">Hoje</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Última Atualização</p>
              </div>
           </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-20 px-4 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Oportunidades Disponíveis</h2>
               <p className="text-slate-500 font-medium">Candidatura simplificada e retorno rápido.</p>
            </div>
            <Link href="/mapa" className="text-blue-600 text-sm font-black flex items-center gap-1 hover:underline">
               VER NO MAPA <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            {jobs && jobs.length > 0 ? jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-300 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-6">
                   <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {job.company_name.charAt(0)}
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <p className="text-slate-500 font-bold text-sm mb-2">{job.company_name} • {job.location_bairro}</p>
                      <div className="flex gap-2">
                         <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{job.job_type}</span>
                         <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{job.salary_range || 'A combinar'}</span>
                      </div>
                   </div>
                </div>
                <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-slate-100 group-hover:shadow-blue-200">
                   CANDIDATAR-SE AGORA
                </button>
              </div>
            )) : (
              <div className="text-center py-10 bg-white border border-dashed border-slate-300 rounded-3xl">
                <p className="text-slate-400 font-bold">Nenhuma vaga aberta no momento para {neighborhood.name}.</p>
                <Link href="/" className="text-blue-600 font-black mt-4 inline-block hover:underline">Ver vagas em outros bairros</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEO Footer Content */}
      <section className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
           <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Por que trabalhar em {neighborhood.name}?</h3>
           <div className="grid md:grid-cols-2 gap-10 text-slate-600 leading-relaxed font-medium">
              <p>
                 O bairro de {neighborhood.name} é um dos pilares da economia de Natal. Com uma infraestrutura completa, a região atrai empresas de diversos setores, desde grandes redes de varejo até startups de tecnologia e serviços especializados.
              </p>
              <p>
                 Trabalhar nesta região oferece vantagens como facilidade de acesso via transporte público, ampla oferta de serviços bancários, alimentação e lazer, tornando o dia a dia profissional muito mais produtivo e agradável.
              </p>
           </div>
        </div>
      </section>
    </div>
  );
}
