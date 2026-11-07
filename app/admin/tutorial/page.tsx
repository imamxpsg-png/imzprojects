'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <p className="text-sm text-neutral-400 p-4">Memuat Word Editor...</p>
});

import 'react-quill-new/dist/quill.snow.css';

interface Tutorial {
  id: number;
  title: string;
  created_at: string;
}

export default function AdminManageTutorial() {
  const [title, setTitle] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const router = useRouter();

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['code-block'],
      ['image', 'link'],
      ['clean']
    ],
  }), []);

  // Ambil daftar tutorial yang ada
  const fetchTutorials = async () => {
    const { data } = await supabase.from('tutorials').select('id, title, created_at').order('created_at', { ascending: false });
    if (data) setTutorials(data);
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !contentHtml) return;
    setLoading(true);

    const { error } = await supabase.from('tutorials').insert([
      { title, content_text: contentHtml, images_url: [] }
    ]);

    if (!error) {
      alert('Tutorial berhasil diterbitkan!');
      setTitle('');
      setContentHtml('');
      fetchTutorials(); // Muat ulang daftar setelah ditambah
    } else {
      alert('Gagal memposting tutorial.');
    }
    setLoading(false);
  };

  // FUNGSI UTAMA UNTUK HAPUS TUTORIAL
  const handleDelete = async (id: number, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus tutorial: "${title}"?`)) {
      const { error } = await supabase.from('tutorials').delete().eq('id', id);
      if (!error) {
        alert('Tutorial berhasil dihapus!');
        fetchTutorials(); // Muat ulang daftar setelah dihapus
      } else {
        alert('Gagal menghapus tutorial.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* FORM INPUT */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
          <div className="border-b border-neutral-800 pb-4 mb-6">
            <h2 className="text-2xl font-black text-blue-400 uppercase">Pusat Dokumentasi Jobsheet</h2>
          </div>

          <form onSubmit={handlePost} className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-2 uppercase">Judul Artikel</label>
              <input type="text" required placeholder="Contoh: Tutorial SSH Server Debian 12" className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-2 uppercase">Isi Konten Panduan</label>
              <div className="bg-neutral-950 rounded-xl border border-neutral-800 overflow-hidden text-white">
                <style>{`
                  .ql-toolbar.ql-snow { border: none; border-bottom: 1px solid #262626; background: #171717; }
                  .ql-container.ql-snow { border: none; min-height: 300px; color: #f5f5f5; }
                  .ql-snow .ql-stroke { stroke: #a3a3a3 !important; }
                  .ql-snow .ql-fill { fill: #a3a3a3 !important; }
                  .ql-snow .ql-picker { color: #a3a3a3 !important; }
                `}</style>
                <ReactQuill theme="snow" value={contentHtml} onChange={setContentHtml} modules={modules} placeholder="Tulis langkah praktikum..." />
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold text-sm transition">{loading ? 'Memproses...' : 'Terbitkan Modul'}</button>
              <button type="button" onClick={() => router.push('/admin/dashboard')} className="bg-neutral-800 text-neutral-300 px-6 rounded-xl font-bold text-sm transition">Kembali ke Dasbor</button>
            </div>
          </form>
        </div>

        {/* LIST DAFTAR UNTUK MENGHAPUS */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Daftar Tutorial Aktif</h3>
          <div className="space-y-3">
            {tutorials.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-sm font-medium text-neutral-200 truncate pr-4">{t.title}</span>
                <button 
                  onClick={() => handleDelete(t.id, t.title)}
                  className="bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-900/60 px-3 py-1.5 rounded-lg text-xs font-bold transition flex-shrink-0"
                >
                  🗑️ Hapus
                </button>
              </div>
            ))}
            {tutorials.length === 0 && <p className="text-neutral-600 text-xs py-4 text-center">Belum ada data tutorial.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
