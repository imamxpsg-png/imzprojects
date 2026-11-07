'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function AdminAddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Ambil daftar produk
  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('id, name, price').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('products').insert([
      { name, price: Number(price), description: desc, image_url: imgUrl }
    ]);

    if (!error) {
      alert('Produk Berhasil Ditambahkan!');
      setName('');
      setPrice('');
      setDesc('');
      setImgUrl('');
      fetchProducts(); // Muat ulang list toko
    } else {
      alert('Gagal menambah produk.');
    }
    setLoading(false);
  };

  // FUNGSI UTAMA UNTUK HAPUS PRODUK STORE
  const handleDeleteProduct = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk jualan: "${name}"?`)) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        alert('Produk berhasil dihapus dari toko pelanggan!');
        fetchProducts(); // Muat ulang list toko
      } else {
        alert('Gagal menghapus produk.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 antialiased">
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* FORM INPUT */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-xl font-black text-emerald-400 uppercase mb-6 border-b border-neutral-800 pb-3">Tambah Produk Toko</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">Nama Produk / Jasa</label>
              <input type="text" required className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Jasa Modul Jaringan" />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">Harga (Rupiah)</label>
              <input type="number" required className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm" value={price} onChange={e => setPrice(e.target.value)} placeholder="150000" />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">Tautan Link Foto</label>
              <input type="text" required className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs" value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-400 block mb-1">Deskripsi Layanan</label>
              <textarea rows={3} required className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Spesifikasi..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading} className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-3 rounded-xl font-bold text-sm transition">{loading ? 'Menyimpan...' : 'Masukkan ke Toko'}</button>
              <button type="button" onClick={() => router.push('/admin/dashboard')} className="bg-neutral-800 text-neutral-300 px-4 rounded-xl font-bold text-sm transition">Batal</button>
            </div>
          </form>
        </div>

        {/* LIST DAFTAR UNTUK MENGHAPUS PRODUK STORE */}
        <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
          <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">Daftar Barang Jualan Aktif</h3>
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex flex-col truncate pr-4">
                  <span className="text-sm font-medium text-neutral-200 truncate">{p.name}</span>
                  <span className="text-xs text-orange-400 font-bold mt-0.5">Rp {p.price.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={() => handleDeleteProduct(p.id, p.name)}
                  className="bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-900/60 px-3 py-1.5 rounded-lg text-xs font-bold transition flex-shrink-0"
                >
                  🗑️ Hapus
                </button>
              </div>
            ))}
            {products.length === 0 && <p className="text-neutral-600 text-xs py-4 text-center">Belum ada barang jualan.</p>}
          </div>
        </div>

      </div>
    </div>
  );
}
