'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const { error } = await supabase.from('orders').insert([{
      product_id: selectedProduct.id,
      buyer_name: form.name,
      buyer_phone: form.phone,
      buyer_address: form.address,
      status: 'pending'
    }]);

    if (!error) {
      alert('Pesanan Sukses Dibuat! Admin akan segera memverifikasi.');
      setSelectedProduct(null);
      setForm({ name: '', phone: '', address: '' });
    } else {
      alert('Gagal memproses pesanan.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Imz Store</h1>
      
      {/* Katalog grid produk */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((prod) => (
          <div key={prod.id} className="bg-gray-950 p-4 rounded-lg border border-gray-800 flex flex-col justify-between">
            <img src={prod.image_url} alt={prod.name} className="w-full h-48 object-cover rounded mb-4" />
            <div>
              <h3 className="font-bold text-lg">{prod.name}</h3>
              <p className="text-orange-500 font-semibold text-md my-1">Rp {prod.price.toLocaleString()}</p>
              <p className="text-gray-400 text-xs line-clamp-2 mb-4">{prod.description}</p>
            </div>
            <button 
              onClick={() => setSelectedProduct(prod)}
              className="w-full bg-orange-600 py-2 rounded text-sm font-bold hover:bg-orange-700 transition"
            >
              Beli Sekarang (Checkout)
            </button>
          </div>
        ))}
      </div>

      {/* Modal Checkout Pop-up Ala Shopee */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCheckout} className="bg-gray-950 p-6 rounded-lg max-w-md w-full border border-gray-700">
            <h2 className="text-xl font-bold border-b border-gray-800 pb-2 mb-4">Detail Pengiriman</h2>
            <p className="text-sm mb-4">Produk: <span className="text-orange-400 font-semibold">{selectedProduct.name}</span></p>
            <input 
              type="text" placeholder="Nama Lengkap Pembeli" required
              className="w-full p-2 mb-3 bg-gray-900 border border-gray-800 rounded text-sm"
              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
            />
            <input 
              type="text" placeholder="Nomor WhatsAppAktif" required
              className="w-full p-2 mb-3 bg-gray-900 border border-gray-800 rounded text-sm"
              value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
            />
            <textarea 
              placeholder="Alamat Lengkap Pengiriman" required rows={3}
              className="w-full p-2 mb-4 bg-gray-900 border border-gray-800 rounded text-sm"
              value={form.address} onChange={e => setForm({...form, address: e.target.value})}
            />
            <div className="flex gap-3">
              <button type="submit" className="flex-1 bg-orange-600 py-2 rounded font-bold text-sm">Buat Pesanan</button>
              <button type="button" onClick={() => setSelectedProduct(null)} className="flex-1 bg-gray-800 py-2 rounded text-sm">Batal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
