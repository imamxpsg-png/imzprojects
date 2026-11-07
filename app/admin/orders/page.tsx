'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Order {
  id: string;
  buyer_name: string;
  buyer_phone: string;
  buyer_address: string;
  status: string;
  created_at: string;
  products: {
    name: string;
    price: number;
  };
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      // Melakukan join query otomatis dari orders ke tabel products untuk mengambil nama & harga produk
      const { data } = await supabase
        .from('orders')
        .select(`
          id, buyer_name, buyer_phone, buyer_address, status, created_at,
          products ( name, price )
        `)
        .order('created_at', { ascending: false });

      if (data) setOrders(data as any);
    }
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'pending' ? 'diproses' : 'selesai';
    const { error } = await supabase.from('orders').update({ status: nextStatus }).eq('id', id);
    if (!error) {
      alert('Status Pemesanan Diperbarui!');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h2 className="text-2xl font-bold mb-6 text-orange-400">Daftar Transaksi Masuk (Shopee System)</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-800 text-sm">
          <thead>
            <tr className="bg-gray-900 text-gray-400">
              <th className="p-3 border border-gray-800">Nama Pembeli</th>
              <th className="p-3 border border-gray-800">Kontak WA</th>
              <th className="p-3 border border-gray-800">Alamat Tujuan</th>
              <th className="p-3 border border-gray-800">Item Produk</th>
              <th className="p-3 border border-gray-800">Status</th>
              <th className="p-3 border border-gray-800">Aksi Panel</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord.id} className="hover:bg-gray-900/50">
                <td className="p-3 border border-gray-800 font-medium">{ord.buyer_name}</td>
                <td className="p-3 border border-gray-800 text-blue-400">{ord.buyer_phone}</td>
                <td className="p-3 border border-gray-800 max-w-xs truncate">{ord.buyer_address}</td>
                <td className="p-3 border border-gray-800">
                  {ord.products?.name} <span className="text-xs text-gray-500">(Rp {ord.products?.price.toLocaleString()})</span>
                </td>
                <td className="p-3 border border-gray-800">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    ord.status === 'pending' ? 'bg-yellow-900/50 text-yellow-400' :
                    ord.status === 'diproses' ? 'bg-blue-900/50 text-blue-400' : 'bg-green-900/50 text-green-400'
                  }`}>{ord.status.toUpperCase()}</span>
                </td>
                <td className="p-3 border border-gray-800">
                  {ord.status !== 'selesai' && (
                    <button 
                      onClick={() => updateStatus(ord.id, ord.status)}
                      className="bg-gray-800 hover:bg-gray-700 text-xs px-2 py-1 rounded"
                    >
                      Proses Ke Tahap Berikutnya
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
