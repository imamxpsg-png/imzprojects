"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AIAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // 1. Panggil API internal Next.js ke Groq Cloud
      const response = await fetch('/api/chat-groq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.reply || 'Maaf, terjadi gangguan koneksi.' };
      
      setMessages((prev) => [...prev, aiMessage]);

      // 2. Simpan Riwayat Chat ke Supabase Database secara otomatis
      await supabase.from('orders').insert([
        {
          buyer_name: 'User AI Chat',
          buyer_phone: 'AI Logs',
          buyer_address: `Q: ${input} | A: ${aiMessage.content}`,
          status: 'ai_history'
        }
      ]);

    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Terjadi kesalahan sistem.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-6 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-gray-950 rounded-xl border border-gray-800 shadow-2xl flex flex-col h-[75vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 bg-gray-900/50 rounded-t-xl flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <h2 className="font-bold text-sm tracking-wider uppercase text-blue-400">Givery AI Assistant</h2>
        </div>

        {/* Kotak Obrolan Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 text-sm mt-10">
              Halo! Ada yang bisa saya bantu untuk proyek Givery hari ini?
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-100 rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-400 text-xs rounded-xl px-4 py-2 rounded-bl-none animate-pulse">
                AI sedang berpikir...
              </div>
            </div>
          )}
        </div>

        {/* Formulir Input Teks */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-gray-900/30 flex gap-3">
          <input
            type="text"
            placeholder="Tanyakan sesuatu pada AI..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition disabled:opacity-50"
            disabled={loading}
          >
            Kirim
          </button>
        </form>

      </div>
    </div>
  );
}
