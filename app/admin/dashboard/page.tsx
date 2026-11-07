'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const isLogin = localStorage.getItem('isAdminAuthenticated');
    if (isLogin !== 'true') {
      router.push('/admin'); // Proteksi halaman jika dicoba bypass URL
    } else {
      setAuth(true);
    }
    // PERBAIKAN UTAMA: Mengosongkan dependency array agar ukurannya konstan dan aman dari crash
  }, []);

  if (!auth) return <p className="text-center text-white mt-20">Memvalidasi Otoritas Owner...</p>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 antialiased">
      <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-8">
        <h1 className="text-2xl font-black text-red-500 tracking-wider">IMZPROJECT SYSTEM CONTROL</h1>
        <button 
          onClick={() => { localStorage.removeItem('isAdminAuthenticated'); router.push('/admin'); }}
          className="bg-neutral-900 border border-neutral-800 text-xs px-4 py-2 rounded-xl text-neutral-400 hover:text-white transition"
        >
          Logout Control
        </button>
      </div>

      {/* GRID MENU UTAMA ADMIN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Tombol 1: Kelola Tutorial */}
        <Link href="/admin/tutorial" className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-blue-500 block transition-all duration-300 shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-blue-400">✍️ Kelola & Isi Post Tutorial</h2>
          <p className="text-sm text-neutral-400 font-light">Tambah panduan baru Debian, ketik teks jobsheet, dan tempel jajaran gambar screenshot tutorial.</p>
        </Link>

        {/* Tombol 2: Monitor Pesanan */}
        <Link href="/admin/orders" className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-orange-500 block transition-all duration-300 shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-orange-400">📦 Monitor & Cek Pesanan Store</h2>
          <p className="text-sm text-neutral-400 font-light">Lihat nomor telepon pembeli, alamat pengiriman, barang yang di-checkout, serta logs AI history.</p>
        </Link>

        {/* Tombol 3: Katalog Store & Tambah Produk */}
        <Link href="/admin/products" className="p-6 bg-neutral-900/50 rounded-2xl border border-neutral-800 hover:border-emerald-500 block transition-all duration-300 shadow-xl">
          <h2 className="text-xl font-bold mb-2 text-emerald-400">🛍️ Katalog Store & Tambah Produk</h2>
          <p className="text-sm text-neutral-400 font-light">Masukkan jasa layanan baru, harga item dalam rupiah, beserta link gambar produk ke toko.</p>
        </Link>

      </div>
    </div>
  );
}
