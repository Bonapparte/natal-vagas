'use client';

import React, { useState } from 'react';
import { 
  Briefcase, MapPin, Search, Zap, Shield, 
  TrendingUp, Users, Check, ArrowRight, 
  MessageSquare, Star, Globe, Smartphone, PlayCircle,
  Menu, X, Bell
} from 'lucide-react';
import Link from 'next/link';

export default function NatalVagasNormal() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      
      {/* Header Padrao (Estilo SINE/Indeed) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <Briefcase className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-blue-900">NATAL<span className="text-blue-600">VAGAS</span></span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Vagas</Link>
              <Link href="#" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Cursos</Link>
              <Link href="/mapa" className="text-sm font-semibold text-gray-600 hover:text-blue-600">Mapa</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-semibold text-gray-500 hover:text-gray-900 hidden sm:block">Empresas / RH</Link>
            <Link href="/kyc" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all">
              Entrar / Cadastrar
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Simples e Direto - Foco em Busca */}
        <section className="bg-blue-700 py-12 px-4 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Encontre seu novo emprego em Natal e RN</h1>
            <p className="text-blue-100 mb-8 opacity-90">O maior portal de vagas da capital potiguar</p>
            
            <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 gap-2 border-b md:border-b-0 md:border-r border-gray-100 py-3 md:py-0">
                <Search className="text-gray-400 w-5 h-5" />
                <input type="text" placeholder="Cargo ou palavra-chave" className="w-full text-gray-800 focus:outline-none" />
              </div>
              <div className="flex-1 flex items-center px-4 gap-2 py-3 md:py-0">
                <MapPin className="text-gray-400 w-5 h-5" />
                <select className="w-full text-gray-800 focus:outline-none bg-transparent">
                  <option>Todos os bairros de Natal</option>
                  <option>Ponta Negra</option>
                  <option>Tirol</option>
                  <option>Alecrim</option>
                  <option>Zona Norte</option>
                  <option>Grande Natal</option>
                </select>
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-800 transition-colors">
                BUSCAR
              </button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
          {/* Coluna Esquerda: Filtros e Categorias */}
          <aside className="w-full lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Vagas por Categoria</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {['Comércio e Vendas', 'Turismo e Hotelaria', 'Administrativo', 'Tecnologia', 'Saúde'].map(cat => (
                  <li key={cat} className="flex justify-between hover:text-blue-600 cursor-pointer group">
                    <span>{cat}</span>
                    <span className="text-gray-400 group-hover:text-blue-600">(12)</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Banner AdSense Placeholder */}
            <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-400 text-xs text-center p-4">
              Publicidade<br/>(Google AdSense)
            </div>
          </aside>

          {/* Coluna Central: Lista de Vagas */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">Vagas Recentes</h2>
              <span className="text-sm text-gray-500">Natal/RN</span>
            </div>

            {[
              { title: 'Recepcionista (Pousada)', company: 'Hospedagem Ponta Negra', bairro: 'Ponta Negra', type: 'CLT', salary: 'R$ 1.600,00' },
              { title: 'Vendedor Externo', company: 'Distribuidora RN', bairro: 'Alecrim', type: 'PJ', salary: 'Comissão' },
              { title: 'Auxiliar de Cozinha', company: 'Restaurante Sabor Natal', bairro: 'Lagoa Nova', type: 'Temporário', salary: 'R$ 1.500,00' },
              { title: 'Desenvolvedor Frontend Jr', company: 'Potiguar Tech', bairro: 'Tirol', type: 'Remoto', salary: 'R$ 3.000,00' },
            ].map((job, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-400 transition-all shadow-sm group">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-blue-600 border border-gray-100 group-hover:bg-blue-50 transition-colors">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-blue-900 group-hover:text-blue-600 leading-tight">{job.title}</h3>
                      <p className="text-gray-600 font-medium text-sm">{job.company}</p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-gray-400 font-bold uppercase"><MapPin className="w-3 h-3 text-blue-500" /> {job.bairro}</span>
                        <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded uppercase">{job.type}</span>
                        <span className="text-green-600 text-xs font-bold">{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition-all">
                    VER VAGA
                  </button>
                </div>
              </div>
            ))}

            <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-blue-400 hover:text-blue-600 transition-all">
              Ver mais vagas em Natal...
            </button>
          </div>

          {/* Coluna Direita: Vagas Premium / Informativos */}
          <aside className="w-full lg:w-72 space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-4"><Zap className="w-4 h-4 fill-current" /> Vagas Premium</h3>
              <div className="space-y-4">
                 {[1, 2].map(i => (
                   <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 cursor-pointer hover:shadow-md">
                      <h4 className="text-sm font-bold text-blue-900 mb-1">Gerente de Vendas</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">Shopping Midway Mall</p>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-4 text-xs font-black text-blue-600 uppercase hover:underline">Quero destacar minha vaga</button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
               <h3 className="font-bold text-gray-900 mb-4">Dicas de Carreira</h3>
               <div className="space-y-4">
                  <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">Como se sair bem em entrevistas em Natal?</div>
                  <div className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer">O que colocar no currículo para vagas no comércio?</div>
               </div>
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1 rounded text-white"><Briefcase className="w-5 h-5" /></div>
              <span className="text-xl font-bold text-blue-900">NATALVAGAS</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm">O portal definitivo para quem busca emprego ou novos talentos no Rio Grande do Norte.</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Navegação</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><Link href="#" className="hover:text-blue-600">Buscar Vagas</Link></li>
              <li><Link href="/mapa" className="hover:text-blue-600">Mapa GPS</Link></li>
              <li><Link href="/admin" className="hover:text-blue-600">Para Empresas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Institucional</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><Link href="#" className="hover:text-blue-600">Sobre Nós</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Contato</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
           © 2026 NATAL VAGAS - TODOS OS DIREITOS RESERVADOS
        </div>
      </footer>
    </div>
  );
}
