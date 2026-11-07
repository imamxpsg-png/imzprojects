'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Mengubah nama dari GIVERY.JP menjadi IMZPROJECT dengan warna putih solid */}
      <Link href="/" className="text-xl font-black tracking-widest text-white hover:opacity-80 transition">
        IMZPROJECT
      </Link>
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-gray-300 transition">Home</Link>
        <Link href="/tutorial" className="hover:text-gray-300 transition">Tutorial</Link>
        <Link href="/store" className="hover:text-gray-300 transition">Store</Link>
        <Link href="/ai-assistant" className="hover:text-gray-300 transition">AI Assistant</Link>
      </div>
    </nav>
  );
}
