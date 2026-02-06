'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 font-bold"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="hidden md:inline">Suporte Potiguar</span>
        </button>
      ) : (
        <div className="bg-white w-[350px] h-[450px] rounded-[32px] shadow-3xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-black uppercase tracking-widest text-xs">Atendimento Online</span>
            </div>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-4">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 text-sm font-medium text-slate-600">
              Olá! Como posso ajudar você hoje com as vagas em Natal?
            </div>
          </div>

          <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
            <input 
              type="text" 
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-blue-600 text-white p-3 rounded-xl"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
