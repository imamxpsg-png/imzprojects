"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Tutorial {
  id: number;
  title: string;
  created_at: string;
}

export default function TutorialPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTutorials() {
      const { data } = await supabase.from('tutorials').select('id, title, created_at').order('created_at', { ascending: false });
      if (data) setTutorials(data);
      setLoading(false);
    }
    fetchTutorials();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 px-6 pb-16 antialiased">
      <div className="max-w-4xl mx-auto">
        <div className="border-b border-neutral-800 pb-6 mb-10">
          <span className="text-xs font-bold tracking-[0.3em] text-blue-500 uppercase block mb-1">Modul Praktikum</span>
          <h1 className="text-3xl font-black text-white uppercase">DAFTAR JOBSHEET DEBIAN</h1>
        </div>

        {loading && <p className="text-neutral-500 animate-pulse text-sm">Memuat daftar dokumen...</p>}

        {/* GRID DAFTAR DOKUMEN ELEGAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((item) => (
            <div key={item.id} className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between hover:border-neutral-700 transition shadow-xl">
              <div>
                {/* Ikon Miniatur Dokumen / PDF */}
                <div className="w-10 h-12 bg-red-600/10 border border-red-500/30 rounded-lg flex items-center justify-center text-red-500 font-bold text-xs mb-4">
                  PDF
                </div>
                <h2 className="text-lg font-bold text-white line-clamp-2 mb-4 leading-snug">{item.title}</h2>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-4 border-t border-neutral-800/60">
                <span className="text-xs text-neutral-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                <Link 
                  href={`/tutorial/${item.id}`}
                  className="text-xs font-bold text-blue-400 bg-blue-500/10 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-lg transition"
                >
                  Buka Modul →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
