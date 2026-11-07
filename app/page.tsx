"use client";

import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [bgIndex, setBgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // URL gambar background stabil
  const slide1Images = [
    'https://picsum.photos',
    'https://picsum.photos',
    'https://picsum.photos',
    'https://picsum.photos'
  ];

  // URL logo partner stabil yang dijamin tidak retak hijau
  const poweredByImages = [
    { url: 'https://clearbit.com', text: 'Google Tech' },
    { url: 'https://clearbit.com', text: 'GitHub Dev' },
    { url: 'https://clearbit.com', text: 'Vercel Cloud' },
    { url: 'https://clearbit.com', text: 'Supabase DB' },
    { url: 'https://clearbit.com', text: 'OpenAI Intelligence' },
    { url: 'https://clearbit.com', text: 'Microsoft Tech' },
    { url: 'https://clearbit.com', text: 'Meta Group' },
    { url: 'https://clearbit.com', text: 'Amazon Web' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % slide1Images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slide1Images.length]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const windowHeight = window.innerHeight;
    const activeIndex = Math.round(scrollTop / windowHeight);
    setCurrentSlide(activeIndex);
  };

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
    setCurrentSlide(index);
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory relative bg-neutral-950 scroll-smooth antialiased"
    >
      
      {/* SLIDE 1 */}
      <div 
        className="w-full h-screen snap-start flex-shrink-0 bg-cover bg-center flex flex-col items-center justify-center relative transition-all duration-1000"
        style={{ backgroundImage: `url(${slide1Images[bgIndex]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
        
        <div className="z-10 text-center max-w-3xl px-4 flex flex-col items-center">
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-3 block drop-shadow-md">
            Creative Technology Studio
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 py-2 drop-shadow-sm leading-tight">
            WELCOME TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">IMZPROJECT</span>
          </h1>
          <p className="text-neutral-400 text-sm md:text-base mt-6 max-w-xl font-light leading-relaxed tracking-wide">
            Kami mengintegrasikan kecerdasan buatan, ekosistem store modern, dan pusat pembelajaran praktis dalam satu platform digital terpadu.
          </p>
          <button 
            onClick={() => scrollToSlide(1)}
            className="mt-8 text-xs font-semibold uppercase tracking-widest text-white border border-white/20 bg-white/5 hover:bg-white hover:text-black px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            Explore Platform
          </button>
        </div>
      </div>

      {/* SLIDE 2 */}
      <div className="w-full h-screen snap-start flex-shrink-0 bg-neutral-950 flex flex-col justify-center items-center px-6 relative">
        <div className="text-center mb-12">
          <span className="text-blue-500 font-bold tracking-widest text-xs uppercase block mb-2">Our Trusted Network</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            POWERED BY
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl w-full">
          {poweredByImages.map((img, i) => (
            <div key={i} className="group flex flex-col items-center p-6 bg-neutral-900/40 rounded-2xl border border-neutral-800/60 hover:border-neutral-700/80 hover:bg-neutral-900/80 transition-all duration-300 backdrop-blur-sm shadow-xl">
              <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 bg-white flex items-center justify-center p-3 border border-neutral-800 group-hover:scale-105 transition-transform duration-300">
                <img src={img.url} alt={img.text} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-medium tracking-wider text-neutral-400 text-center uppercase group-hover:text-white transition-colors">
                {img.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SLIDE 3 */}
      <div className="w-full h-screen snap-start flex-shrink-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 flex flex-col justify-center items-center px-6">
        <div className="text-center mb-10">
          <span className="text-blue-500 font-bold tracking-widest text-xs uppercase block mb-2">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            CONNECT WITH US
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-5 w-full max-w-3xl justify-center items-center">
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer" 
             className="group flex flex-col items-start w-full md:w-60 p-5 bg-neutral-900/50 text-white rounded-2xl border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900/80 transition-all duration-300 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">WhatsApp (W2A)</span>
            <span className="text-sm font-light text-neutral-400 group-hover:text-neutral-200 transition-colors">Hubungi Admin Respons Cepat</span>
          </a>
          
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className="group flex flex-col items-start w-full md:w-60 p-5 bg-neutral-900/50 text-white rounded-2xl border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-900/80 transition-all duration-300 shadow-xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">LinkedIn Network</span>
            <span className="text-sm font-light text-neutral-400 group-hover:text-neutral-200 transition-colors">Hubungkan Secara Profesional</span>
          </a>
          
          <a href="#" 
             className="group flex flex-col items-start w-full md:w-60 p-5 bg-neutral-900/50 text-white rounded-2xl border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900/80 transition-all duration-300 shadow-xl">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Social Media</span>
            <span className="text-sm font-light text-neutral-400 group-hover:text-neutral-200 transition-colors">Ikuti Aktivitas Harian Kami</span>
          </a>
        </div>
      </div>

      {/* Indikator Bulat Samping Kanan */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-40">
        {[0, 1, 2].map((slide) => (
          <button 
            key={slide} 
            aria-label={`Go to slide ${slide + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-500 relative ${
              currentSlide === slide 
                ? 'bg-blue-500 scale-150 after:absolute after:inset-[-4px] after:border after:border-blue-500 after:rounded-full after:animate-ping' 
                : 'bg-neutral-600 hover:bg-neutral-400'
            }`}
            onClick={() => scrollToSlide(slide)}
          />
        ))}
      </div>

    </div>
  );
}
