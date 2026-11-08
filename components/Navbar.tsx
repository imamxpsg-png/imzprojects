'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 text-white px-4 md:px-6 py-4 flex flex-wrap justify-between items-center gap-2">
      <Link href="/" className="text-lg md:text-xl font-black tracking-widest text-white hover:opacity-80 transition">
        IMZPROJECT
      </Link>
      <div className="flex gap-3 md:gap-6 text-xs md:text-sm font-medium">
        <Link href="/" className="hover:text-neutral-400 transition">Home</Link>
        <Link href="/tutorial" className="hover:text-neutral-400 transition">Tutorial</Link>
        <Link href="/store" className="hover:text-neutral-400 transition">Store</Link>
        <Link href="/ai-assistant" className="hover:text-neutral-400 transition">AI Assistant</Link>
      </div>
    </nav>
  );
}
