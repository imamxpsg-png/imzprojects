"use client";

import { useEffect, useState, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

interface Tutorial {
  id: number;
  title: string;
  content_text: string;
  created_at: string;
}

// 1. Komponen Utama Konten Jobsheet
function TutorialContent() {
  const params = useParams();
  const id = params?.id as string;
  
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    async function fetchDetail() {
      try {
        const { data, error } = await supabase
          .from('tutorials')
          .select('*')
          .eq('id', id)
          .single();
        
        if (data) setTutorial(data);
        if (error) console.error(error);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-neutral-950 text-neutral-500 flex items-center justify-center text-sm animate-pulse">Membuka lembar kerja jobsheet...</div>;
  if (!tutorial) return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Modul tidak ditemukan.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900/20 border border-neutral-800/60 p-6 md:p-10 rounded-3xl shadow-2xl backdrop-blur-sm">
      
      {/* Tombol Kembali */}
      <button 
        onClick={() => router.push('/tutorial')}
        className="text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800/50 px-4 py-2 rounded-full mb-6 border border-neutral-800 transition"
      >
        ← Kembali ke Daftar Modul
      </button>

      <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white mb-6 uppercase border-b border-neutral-800 pb-6">
        {tutorial.title}
      </h1>

      <style>{`
        .jobsheet-content h1 { font-size: 1.6rem; font-weight: 800; margin: 1.5rem 0 0.8rem 0; color: #ffffff; }
        .jobsheet-content h2 { font-size: 1.4rem; font-weight: 700; margin: 1.2rem 0 0.6rem 0; color: #f3f4f6; }
        .jobsheet-content p { font-size: 0.95rem; line-height: 1.7; color: #d4d4d4; margin-bottom: 1.2rem; font-weight: 300; }
        .jobsheet-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.2rem; }
        .jobsheet-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.2rem; }
        .jobsheet-content li { margin-bottom: 0.4rem; color: #d4d4d4; font-weight: 300; }
        .jobsheet-content strong { font-weight: 700; color: #ffffff; }
        
        .jobsheet-content img { 
          max-width: 100%; 
          height: auto; 
          border-radius: 16px; 
          margin: 1.5rem auto; 
          display: block;
          border: 1px solid #262626;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
        }
        
        .jobsheet-content pre.ql-syntax { 
          background-color: #171717 !important; 
          color: #f43f5e !important; 
          padding: 16px; 
          border-radius: 12px; 
          font-family: monospace; 
          font-size: 0.9rem;
          margin: 1.5rem 0;
          border: 1px solid #262626;
          overflow-x: auto;
        }
      `}</style>

      {/* Render Isi Modul Lengkap */}
      <div 
        className="jobsheet-content"
        dangerouslySetInnerHTML={{ __html: tutorial.content_text }} 
      />

      <div className="mt-12 pt-6 border-t border-neutral-800 text-xs text-neutral-500 flex justify-between">
        <span>Format: Dokumen Digital Client</span>
        <span>Diunggah: {new Date(tutorial.created_at).toLocaleDateString('id-ID')}</span>
      </div>

    </div>
  );
}

// 2. Default Export yang Membungkus Konten di dalam Suspense Guard (Menghilangkan Error Server)
export default function TutorialDetailPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 px-4 md:px-8 pb-20 antialiased">
      <Suspense fallback={<div className="text-center text-sm text-neutral-500 mt-20 animate-pulse">Sinkronisasi URL...</div>}>
        <TutorialContent />
      </Suspense>
    </div>
  );
}
