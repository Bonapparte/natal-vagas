'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, CheckCircle, Shield, ArrowRight, 
  User, FileText, Smartphone, Calendar,
  RefreshCw, Check
} from 'lucide-react';
import Link from 'next/link';

export default function KYCPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    whatsapp: ''
  });
  
  const [captures, setCaptures] = useState<{ [key: string]: string | null }>({
    docFront: null,
    docBack: null,
    selfie: null
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Iniciar Câmera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: step === 2 ? 'user' : 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      alert("Erro ao acessar a câmera. Por favor, permita o acesso.");
    }
  };

  // Parar Câmera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  // Capturar Foto
  const takePhoto = (key: string) => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const data = canvasRef.current.toDataURL('image/png');
        setCaptures(prev => ({ ...prev, [key]: data }));
        stopCamera();
      }
    }
  };

  useEffect(() => {
    if (step === 1 || step === 2) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [step]);

  return (
    <div className="min-h-screen bg-white py-12 px-4 selection:bg-blue-100">
      <div className="max-w-xl mx-auto">
        
        {/* Progress Tracker */}
        <div className="flex justify-between mb-12 px-4">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                step >= s ? 'bg-slate-900 text-white shadow-xl' : 'bg-slate-100 text-slate-300'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          
          <div className="p-10">
            {/* Step 0: Personal Data */}
            {step === 0 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                  <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Seus Dados</h1>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Passo 1 de 4</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                    <input 
                      type="text" 
                      placeholder="Ex: João da Silva Potiguar"
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CPF</label>
                      <input 
                        type="text" 
                        placeholder="000.000.000-00"
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                        value={formData.cpf}
                        onChange={e => setFormData({...formData, cpf: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nascimento</label>
                      <input 
                        type="date" 
                        className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                        value={formData.birthDate}
                        onChange={e => setFormData({...formData, birthDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp de Contato</label>
                    <input 
                      type="tel" 
                      placeholder="(84) 90000-0000"
                      className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-blue-600 outline-none"
                      value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  disabled={!formData.fullName || !formData.cpf}
                  onClick={() => setStep(1)}
                  className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-blue-600 transition-all shadow-xl disabled:opacity-30"
                >
                  CONTINUAR PARA DOCUMENTOS
                </button>
              </div>
            )}

            {/* Step 1: Document Camera */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-900">Fotos do Documento</h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">RG ou CNH (Frente e Verso)</p>
                </div>

                <div className="space-y-6">
                   {/* Front Capture */}
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" /> 1. Frente do Documento
                      </label>
                      {!captures.docFront ? (
                        <div className="relative bg-slate-900 rounded-3xl overflow-hidden aspect-[4/3] border-4 border-slate-100">
                           <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                           <div className="absolute inset-0 border-2 border-white/20 border-dashed m-10 rounded-xl pointer-events-none"></div>
                           <button onClick={() => takePhoto('docFront')} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-slate-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
                             <Camera className="w-6 h-6" />
                           </button>
                        </div>
                      ) : (
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-green-500">
                           <img src={captures.docFront} className="w-full h-full object-cover" />
                           <button onClick={() => setCaptures({...captures, docFront: null})} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                             <RefreshCw className="w-4 h-4" />
                           </button>
                        </div>
                      )}
                   </div>

                   {/* Back Capture (Only show after front) */}
                   {captures.docFront && (
                     <div className="space-y-4 animate-in slide-in-from-bottom-4">
                        <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" /> 2. Verso do Documento
                        </label>
                        {!captures.docBack ? (
                          <div className="relative bg-slate-900 rounded-3xl overflow-hidden aspect-[4/3] border-4 border-slate-100">
                             <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                             <button onClick={() => takePhoto('docBack')} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-slate-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
                               <Camera className="w-6 h-6" />
                             </button>
                          </div>
                        ) : (
                          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-green-500">
                             <img src={captures.docBack} className="w-full h-full object-cover" />
                             <button onClick={() => setCaptures({...captures, docBack: null})} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                               <RefreshCw className="w-4 h-4" />
                             </button>
                          </div>
                        )}
                     </div>
                   )}
                </div>

                {captures.docFront && captures.docBack && (
                  <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-blue-600 transition-all shadow-2xl">
                    PRÓXIMO PASSO: SELFIE
                  </button>
                )}
              </div>
            )}

            {/* Step 2: Selfie Camera */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-900">Selfie de Verificação</h2>
                  <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Olhe para a câmera e posicione seu rosto no círculo</p>
                </div>

                {!captures.selfie ? (
                  <div className="relative bg-slate-900 aspect-square rounded-full overflow-hidden border-[12px] border-slate-50 max-w-[300px] mx-auto shadow-2xl">
                     <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
                     <button onClick={() => takePhoto('selfie')} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-slate-900 p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
                        <Camera className="w-6 h-6" />
                     </button>
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-full overflow-hidden border-[12px] border-green-500 max-w-[300px] mx-auto shadow-2xl">
                     <img src={captures.selfie} className="w-full h-full object-cover scale-x-[-1]" />
                     <button onClick={() => setCaptures({...captures, selfie: null})} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                        <RefreshCw className="w-4 h-4" />
                     </button>
                  </div>
                )}

                {captures.selfie && (
                  <button onClick={() => setStep(3)} className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-blue-600 transition-all shadow-2xl">
                    FINALIZAR VERIFICAÇÃO
                  </button>
                )}
              </div>
            )}

            {/* Step 3: Finalized */}
            {step === 3 && (
              <div className="text-center space-y-8 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Análise Iniciada</h1>
                <p className="text-slate-500 font-bold max-w-xs mx-auto">Sua identidade e documentos foram enviados. Você receberá uma confirmação no WhatsApp **{formData.whatsapp}** em até 24h.</p>
                
                <Link href="/" className="inline-block w-full bg-slate-900 text-white font-black py-5 rounded-3xl hover:bg-blue-600 transition-all shadow-xl">
                  VOLTAR AO INÍCIO
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Hidden Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        <p className="text-center mt-12 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <Shield className="w-4 h-4" /> Proteção Criptográfica Nível 4 (AES-256)
        </p>
      </div>
    </div>
  );
}
