'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // =========================================================================
    // 🔒 KREDENSIAL LOGIN YANG DI-HARDCODE (HANYA ANDA YANG TAHU)
    // Silakan ganti nilai di dalam tanda petik ini langsung dari kode program jika ingin diubah
    // =========================================================================
    const ADMIN_USER = "imz"; 
    const ADMIN_PASS = "123";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Menyimpan token otentikasi sementara di browser client
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      // Alihkan langsung ke dashboard kendali sistem admin
      router.push('/admin/dashboard');
    } else {
      alert('Akses Ditolak! Kredensial owner tidak valid.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white px-4 antialiased">
      {/* Efek pencahayaan latar belakang abstrak */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-sm bg-neutral-900/60 border border-neutral-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md z-10">
        
        {/* Header Form */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase block mb-1">
            System Control
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase">
            IMZPROJECT ADMIN
          </h2>
          <p className="text-xs text-neutral-400 mt-2 font-light">
            Masukkan kredensial khusus owner untuk masuk ke panel navigasi.
          </p>
        </div>

        {/* Formulir Login */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5 tracking-wide uppercase">
              Username Owner
            </label>
            <input 
              type="text" 
              required
              autoComplete="off"
              placeholder="Masukkan username rahasia" 
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              value={username} 
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-400 block mb-1.5 tracking-wide uppercase">
              Password Keamanan
            </label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-red-500/50 transition-colors"
              value={password} 
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 bg-white text-neutral-950 py-3 rounded-xl font-bold text-sm tracking-wide hover:bg-neutral-200 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'Memverifikasi Otoritas...' : 'Otentikasi Masuk'}
          </button>
        </form>

      </div>
    </div>
  );
}
