'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Briefcase, MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Importação dinâmica do Leaflet para evitar erros de SSR no Next.js
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const JOBS_WITH_GPS = [
  { id: 1, title: 'Garçom', company: 'Camarões', lat: -5.8817, lng: -35.1764, salary: 'R$ 1.600' },
  { id: 2, title: 'Vendedor', company: 'Midway Mall', lat: -5.8118, lng: -35.2056, salary: 'R$ 1.500' },
  { id: 3, title: 'Recepcionista', company: 'Praiamar Hotel', lat: -5.8750, lng: -35.1740, salary: 'R$ 1.800' },
];

export default function JobMapPage() {
  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden">
      {/* Map Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/10 p-4 absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between mx-4 mt-4 rounded-2xl shadow-2xl">
        <Link href="/" className="flex items-center gap-2 text-white font-black hover:text-blue-400 transition-colors">
          <ArrowLeft className="w-5 h-5" /> NATAL<span className="text-blue-500">VAGAS</span>
        </Link>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-black text-blue-500 uppercase tracking-widest leading-none">GPS Ativo</span>
              <span className="text-[10px] font-bold text-slate-400">Encontrando vagas próximas a você</span>
           </div>
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center animate-pulse">
              <MapPin className="w-5 h-5 text-white" />
           </div>
        </div>
      </header>

      {/* Full Screen Map */}
      <div className="flex-1 w-full relative">
        <MapContainer 
          center={[-5.8128, -35.2092]} // Centro de Natal
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {JOBS_WITH_GPS.map(job => (
            <Marker key={job.id} position={[job.lat, job.lng]}>
              <Popup>
                <div className="p-2 min-w-[150px]">
                  <h4 className="font-black text-slate-900 m-0">{job.title}</h4>
                  <p className="text-slate-500 font-bold text-xs m-0 mb-2">{job.company}</p>
                  <div className="flex items-center justify-between border-t pt-2 border-slate-100">
                    <span className="text-green-600 font-black text-xs">{job.salary}</span>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">Ver Detalhes</button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Floating Info Card */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-2xl">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 tracking-tight">Busca por GPS</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">3 vagas encontradas nesta área</p>
            </div>
          </div>
          <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
            LISTAR VAGAS DO MAPA
          </button>
        </div>
      </div>
    </div>
  );
}
