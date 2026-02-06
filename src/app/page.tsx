'use client';

import React, { useState, useEffect } from 'react';
import { 
  Briefcase, MapPin, Search, Zap, Shield, 
  TrendingUp, Users, Check, ArrowRight, 
  MessageSquare, Star, Globe, Smartphone, PlayCircle,
  Moon, Sun 
} from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseLanding() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Auto-upgrade: Theme Engine (Skill #14)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 6 || hour > 18) setIsDarkMode(true);
  }, []);

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-100 transition-colors duration-500 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      
      {/* Premium Navigation - Integrated Dark Mode */}
      <nav className={`fixed top-0 w-full z-[100] backdrop-blur-md border-b transition-colors ${
        isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-blue-200">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className={`text-2xl font-black tracking-tighter uppercase ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Natal<span className="text-blue-600">Vagas</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {['Buscar Vagas', 'Empresas', 'Mapa GPS', 'Cursos'].map((item) => (
              <Link key={item} href="#" className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                isDarkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'
              }`}>
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border transition-all ${
                isDarkMode ? 'border-slate-800 text-yellow-400' : 'border-slate-200 text-slate-400'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/admin" className="text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest">Acesso RH</Link>
            <Link href="/kyc" className="bg-blue-600 text-white px-6 py-3 rounded-2xl text-xs font-black hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-100 uppercase tracking-widest">
              Começar Agora
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {/* Hero: Authority & Professionalism */}
        <section className={`relative py-24 lg:py-40 px-6 overflow-hidden ${
          isDarkMode ? 'bg-slate-950' : 'bg-[#F8FAFC]'
        }`}>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div> Rede Oficial de Empregos do RN
              </div>
              <h1 className={`text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Talento local, <br />
                <span className="text-blue-600 italic">verificado.</span>
              </h1>
              <p className={`text-xl font-medium leading-relaxed max-w-xl ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                A Natal Vagas Pro conecta as melhores empresas potiguares a profissionais qualificados através de uma plataforma segura e baseada em geolocalização.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/kyc" className="bg-blue-600 text-white px-10 py-5 rounded-[24px] text-lg font-black hover:bg-blue-700 transition-all shadow-2xl flex items-center justify-center gap-3">
                  CANDIDATAR-SE AGORA <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/postar" className={`px-10 py-5 rounded-[24px] text-lg font-black transition-all flex items-center justify-center gap-3 border-2 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800 text-white hover:border-blue-600' : 'bg-white border-slate-100 text-slate-900 hover:border-blue-600'
                }`}>
                  DIVULGAR VAGA
                </Link>
              </div>

              <div className={`flex items-center gap-8 pt-10 border-t ${
                isDarkMode ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter">12.000+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Candidatos Reais</span>
                </div>
                <div className={`w-px h-12 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter">450+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Empresas Verificadas</span>
                </div>
                <div className={`w-px h-12 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                <div className="flex items-center gap-2">
                   <div className="bg-green-100 p-2 rounded-lg"><PlayCircle className="w-5 h-5 text-green-600" /></div>
                   <span className="text-[10px] font-black uppercase tracking-widest leading-none">Vagas<br/>ao vivo</span>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <div className={`p-4 rounded-[60px] shadow-3xl border rotate-2 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <div className="bg-slate-950 aspect-square rounded-[50px] overflow-hidden relative">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80')] bg-cover opacity-40"></div>
                   <div className={`absolute bottom-10 left-10 right-10 p-8 backdrop-blur-xl rounded-[32px] border ${
                     isDarkMode ? 'bg-slate-900/90 border-slate-700' : 'bg-white/90 border-white/20'
                   }`}>
                      <div className="flex items-center gap-4 mb-4">
                         <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white"><Shield className="w-6 h-6" /></div>
                         <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Tecnologia KYC</p>
                            <p className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Perfil 100% Autêntico</p>
                         </div>
                      </div>
                      <p className="text-sm font-medium text-slate-500">Documentação e Selfie validados por nossa equipe de especialistas.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Dark/Light Features Section */}
        <section className={`py-32 px-6 transition-colors ${
          isDarkMode ? 'bg-slate-950' : 'bg-white'
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-24">
              <h2 className="text-5xl font-black tracking-tighter leading-none mb-6">Inovação aplicada à <br/><span className="text-blue-600">realidade de Natal.</span></h2>
              <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Não somos apenas um mural de anúncios. Somos a ponte inteligente entre a mão de obra qualificada e o mercado potiguar.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              {[
                { 
                  icon: <MapPin className="w-12 h-12 text-blue-600" />, 
                  title: 'Economia de Transporte', 
                  desc: 'Filtre vagas por bairro (Ponta Negra, Alecrim, Tirol, etc.) e encontre oportunidades perto de casa.' 
                },
                { 
                  icon: <Smartphone className={`w-12 h-12 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />, 
                  title: 'Contratação via WhatsApp', 
                  desc: 'Eliminamos a burocracia. Candidatos qualificados falam direto com o RH via WhatsApp integrado.' 
                },
                { 
                  icon: <Zap className="w-12 h-12 text-orange-600" />, 
                  title: 'Vagas de Alta Urgência', 
                  desc: 'Setor de Turismo e Comércio de Natal com vagas para contratação imediata e verificação real.' 
                }
              ].map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className={`mb-8 p-6 rounded-[32px] w-fit transition-colors ${
                    isDarkMode ? 'bg-slate-900 group-hover:bg-blue-900/30' : 'bg-slate-50 group-hover:bg-blue-50'
                  }`}>{item.icon}</div>
                  <h3 className="text-2xl font-black mb-4 tracking-tight uppercase">{item.title}</h3>
                  <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} font-medium leading-relaxed`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={`border-t py-20 px-6 transition-colors ${
        isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="bg-blue-600 p-1.5 rounded-lg"><Briefcase className="w-4 h-4 text-white" /></div>
            <span className={`text-xl font-black tracking-tighter uppercase ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>Natal<span className="text-blue-600">Vagas</span></span>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-12">Líder em Empregabilidade no Rio Grande do Norte</p>
        </div>
      </footer>
    </div>
  );
}
