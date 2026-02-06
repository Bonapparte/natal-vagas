'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Briefcase, MapPin, ArrowLeft, Navigation, Clock, Car } from 'lucide-react';
import Link from 'next/link';

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster'), { ssr: false });

// Mock data (could be fetched from Supabase)
const JOBS_WITH_GPS = [
  { id: 1, title: 'Garçom', company: 'Camarões', lat: -5.8817, lng: -35.1764, salary: 'R$ 1.600' },
  { id: 2, title: 'Vendedor', company: 'Midway Mall', lat: -5.8118, lng: -35.2056, salary: 'R$ 1.500' },
  { id: 3, title: 'Recepcionista', company: 'Praiamar Hotel', lat: -5.8750, lng: -35.1740, salary: 'R$ 1.800' },
  { id: 4, title: 'Auxiliar de Cozinha', company: 'Mangai', lat: -5.8780, lng: -35.1800, salary: 'R$ 1.400' },
  { id: 5, title: 'Vendedor de Loja', company: 'Natal Shopping', lat: -5.8450, lng: -35.2100, salary: 'R$ 1.550' },
];

export default function JobMapPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => console.warn("Acesso à localização negado.")
      );
    }
  }, []);

  // Haversine Formula for distance estimation
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getTravelTime = (distance: number) => {
    // Estimativa simples: 30km/h médio em Natal
    const timeInHours = distance / 30;
    const timeInMinutes = Math.round(timeInHours * 60);
    return timeInMinutes < 60 ? `${timeInMinutes} min` : `${Math.floor(timeInMinutes / 60)}h ${timeInMinutes % 60}min`;
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 overflow-hidden font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container { font-family: inherit; }
        .marker-cluster-small { background-color: rgba(37, 99, 235, 0.6) !important; }
        .marker-cluster-small div { background-color: rgba(37, 99, 235, 0.9) !important; color: white !important; font-weight: bold; }
        .marker-cluster-medium { background-color: rgba(37, 99, 235, 0.6) !important; }
        .marker-cluster-medium div { background-color: rgba(37, 99, 235, 0.9) !important; color: white !important; font-weight: bold; }
      `}} />

      {/* Map Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/10 p-4 absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between mx-4 mt-4 rounded-2xl shadow-2xl">
        <Link href="/" className="flex items-center gap-2 text-white font-black hover:text-blue-400 transition-colors">
          <ArrowLeft className="w-5 h-5" /> NATAL<span className="text-blue-500">VAGAS</span>
        </Link>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-xs font-black text-blue-500 uppercase tracking-widest leading-none">GPS INTELIGENTE</span>
              <span className="text-[10px] font-bold text-slate-300">Clustering & Estimativa de Rota</span>
           </div>
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Navigation className="w-5 h-5 text-white animate-pulse" />
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
            url="https://{s}.tile.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Map style cleaner
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Sua localização atual</Popup>
            </Marker>
          )}

          <MarkerClusterGroup chunkedLoading>
            {JOBS_WITH_GPS.map(job => (
              <Marker 
                key={job.id} 
                position={[job.lat, job.lng]}
                eventHandlers={{
                  click: () => setSelectedJob(job),
                }}
              >
                <Popup>
                  <div className="p-3 min-w-[200px]">
                    <h4 className="font-black text-slate-900 m-0 leading-tight">{job.title}</h4>
                    <p className="text-slate-500 font-bold text-xs m-0 mb-3">{job.company}</p>
                    
                    {userLocation && (
                      <div className="bg-slate-50 rounded-lg p-2 mb-3 border border-slate-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight flex items-center gap-1">
                            <Car className="w-3 h-3" /> Distância
                          </span>
                          <span className="text-xs font-black text-slate-900">
                            {calculateDistance(userLocation[0], userLocation[1], job.lat, job.lng).toFixed(1)} km
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Tempo Est.
                          </span>
                          <span className="text-xs font-black text-blue-600">
                            ~{getTravelTime(calculateDistance(userLocation[0], userLocation[1], job.lat, job.lng))}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between border-t pt-3 border-slate-100">
                      <span className="text-green-600 font-black text-sm">{job.salary}</span>
                      <button className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black hover:bg-blue-600 transition-all">
                        CANDIDATAR-SE
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      {/* Floating Info Card */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 -mr-16 -mt-16 rounded-full opacity-50"></div>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="bg-slate-900 p-3.5 rounded-2xl shadow-xl">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 tracking-tight text-lg">Radar de Oportunidades</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Otimizado para Natal/RN</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Vagas na Área</p>
              <p className="text-xl font-black text-slate-900">{JOBS_WITH_GPS.length}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Média Salarial</p>
              <p className="text-xl font-black text-green-600">R$ 1.6k</p>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 relative z-10">
            ENCONTRAR VAGAS PERTO DE MIM
          </button>
        </div>
      </div>
    </div>
  );
}
