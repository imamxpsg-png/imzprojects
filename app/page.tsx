"use client";

import { useState, useEffect, useRef } from 'react';

export default function HomePage() {
  const [bgIndex, setBgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slide1Images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoi9MV5RBpiRa1hU71nhq05JYw6MUcXK1ZHH9aKXfMuw&s=10',
    'https://i0.wp.com/global.unair.ac.id/wp-content/uploads/2024/07/Osaka.jpg?resize=803%2C535&ssl=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLzfIx0cXb0egNFZfKkq_z_zbdHv84nsBHOrjEdg9kL8PEVBtKh1dWw_w&s=10',
    'https://picsum.photos'
  ];

  const poweredByImages = [
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUuQjgdwPqzxui3v3W6onjs3BEZUaYAoxUlTS2MpAmXaYcYDegPOXjeWcu&s=10', text: 'SMKN 2 SALATIGA' },
    { url: 'https://www.tt.emb-japan.go.jp/files/100050878.jpg', text: 'Mext Scholarship' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR24UV5-wJhPNSF3IgnX2cGbYkiElk3Vzav3OT0Ez5dRA&s=10', text: 'Next.js' },
    { url: 'https://course-net.com/wp-content/uploads/2025/03/GitHub-logo-scaled-1.webp', text: 'GitHub' },
    { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J4g2qTrVjOBNmi0IX0e8sAJKg3hywPv-qbu_SyxjmA&s=10', text: 'Netlify' },
    { url: 'https://framerusercontent.com/images/ky3fUz6Uuqp1BqWWii7LO1PPAY.webp?width=750&height=422', text: 'Supabase' },
    { url: 'https://givery-consulting.com/wp-content/themes/givery-consulting-corp/og.png', text: 'Givery Japan' },
    { url: 'https://i.scdn.co/image/ab6765630000ba8a453123ca61c1045ec6842e79', text: 'Japan DEV' }
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
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory relative bg-neutral-950 scroll-smooth antialiased pt-16 md:pt-0"
    >
      
      {/* SLIDE 1 */}
      <div 
        className="w-full h-[calc(100vh-4rem)] md:h-screen snap-start flex-shrink-0 bg-cover bg-center flex flex-col items-center justify-center relative transition-all duration-1000 px-4"
        style={{ backgroundImage: `url(${slide1Images[bgIndex]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
        
        <div className="z-10 text-center max-w-3xl flex flex-col items-center">
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-3 block drop-shadow-md">
            Creative Technology Studio
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-white py-2 drop-shadow-sm leading-tight uppercase">
            WELCOME TO <br />
            <span className="text-blue-400">IMZPROJECT</span>
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm md:text-base mt-4 max-w-xl font-light leading-relaxed tracking-wide">
            Kami mengintegrasikan kecerdasan buatan, ekosistem store modern, dan pusat pembelajaran praktis dalam satu platform digital terpadu.
          </p>
          <button 
            onClick={() => scrollToSlide(1)}
            className="mt-6 text-xs font-semibold uppercase tracking-widest text-white border border-white/20 bg-white/5 hover:bg-white hover:text-black px-6 py-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            Explore Platform
          </button>
        </div>
      </div>

      {/* SLIDE 2 */}
      <div className="w-full h-[calc(100vh-4rem)] md:h-screen snap-start flex-shrink-0 bg-neutral-950 flex flex-col justify-center items-center px-4 py-8 overflow-y-auto">
        <div className="text-center mb-6 md:mb-10">
          <span className="text-blue-500 font-bold tracking-widest text-xs uppercase block mb-1">Our Trusted Network</span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            POWERED BY
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 max-w-4xl w-full">
          {poweredByImages.map((img, i) => (
            <div key={i} className="group flex flex-col items-center p-3 md:p-5 bg-neutral-900/40 rounded-xl border border-neutral-800/60 hover:border-neutral-700/80 hover:bg-neutral-900/80 transition-all duration-300 backdrop-blur-sm shadow-xl">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden mb-2 bg-white flex items-center justify-center p-1 border border-neutral-800 group-hover:scale-105 transition-transform duration-300">
                <img src={img.url} alt={img.text} className="w-full h-full object-cover rounded" />
              </div>
              <span className="text-[10px] md:text-xs font-medium tracking-wider text-neutral-400 text-center uppercase group-hover:text-white transition-colors">
                {img.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SLIDE 3 */}
      <div className="w-full h-[calc(100vh-4rem)] md:h-screen snap-start flex-shrink-0 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 flex flex-col justify-center items-center px-4 py-8 overflow-y-auto">
        <div className="text-center mb-6 md:mb-10">
          <span className="text-blue-500 font-bold tracking-widest text-xs uppercase block mb-1">Get In Touch</span>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            CONNECT WITH US
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl justify-center items-center">
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer" 
             className="group flex flex-col items-start w-full md:w-60 p-4 bg-neutral-900/50 text-white rounded-xl border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900/80 transition-all duration-300 shadow-xl">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">WhatsApp (W2A)</span>
            <span className="text-xs md:text-sm font-light text-neutral-400 group-hover:text-neutral-200 transition-colors">Hubungi Admin Respons Cepat</span>
          </a>
          
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className="group flex flex-col items-start w-full md:w-60 p-4 bg-neutral-900/50 text-white rounded-xl border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-900/80 transition-all duration-300 shadow-xl">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">LinkedIn Network</span>
            <span className="text-xs md:text-sm font-light text-neutral-400 group-hover:text-neutral-200 transition-colors">Hubungkan Secara Profil</span>
          </a>
          
          <a href="#" 
             className="group flex flex-col items-start w-full md:w-60 p-4 bg-neutral-900/50 text-white rounded-xl border border-neutral-800 hover:border-purple-500/50 hover:bg-neutral-900/80 transition-all duration-300 shadow-xl">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Social Media</span>
            <span className="text-xs md:text-sm font-light text-neutral-400 group-hover:text-neutral-200 transition-colors">Ikuti Aktivitas Harian Kami</span>
          </a>
        </div>
      </div>

      {/* Indikator Bulat Samping */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        {[0, 1, 2].map((slide) => (
          <button 
            key={slide} 
            aria-label={`Go to slide ${slide + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-500 relative ${
              currentSlide === slide 
                ? 'bg-blue-500 scale-150' 
                : 'bg-neutral-600 hover:bg-neutral-400'
            }`}
            onClick={() => scrollToSlide(slide)}
          />
        ))}
      </div>

    </div>
  );
}
