'use client';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowUpRight, Copy, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const [time, setTime] = useState('');
  const [copied, setCopied] = useState(false);

  // Live Clock Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata' // Set your timezone here
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy Email Logic
  const handleCopy = () => {
    navigator.clipboard.writeText('pariharsachin5002@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative bg-[#050505] pt-20 pb-40 border-t border-white/10">
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
         <div className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
         <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Infinite Scrolling Text */}
   {/* SEAMLESS INFINITE TICKER */}
   <div className="w-full border-b border-white/5 bg-neutral-900/30 backdrop-blur-sm mb-16 relative" style={{ overflow: 'hidden' }}>
        
        {/* Gradient Masks for smooth fade in/out */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] via-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] via-[#050505] to-transparent z-10 pointer-events-none"></div>

        {/* The Track - properly contained with max-width */}
        <div className="relative w-full" style={{ overflow: 'hidden', maxWidth: '100%' }}>
          <motion.div 
            className="flex flex-nowrap py-4 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ willChange: 'transform', display: 'flex' }}
          >
            {/* Render items twice to create the infinite loop effect */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-nowrap items-center" style={{ flexShrink: 0 }}>
                 {[...Array(6)].map((_, j) => (
                    <span key={j} className="text-neutral-500 font-mono text-sm mx-8 uppercase tracking-widest flex items-center gap-4" style={{ flexShrink: 0 }}>
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                      Open for Work
                      <span className="text-neutral-800 text-xl mx-2">•</span>
                      Frontend Architecture
                      <span className="text-neutral-800 text-xl mx-2">•</span>
                      Interactive Design
                    </span>
                 ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          
          {/* LEFT: Massive CTA */}
          <div className="space-y-8">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
              LET'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-white hover:text-white transition-colors duration-500">
                COOK.
              </span>
            </h2>
            <p className="text-neutral-400 text-lg max-w-md">
              Have a project that needs to look expensive but load instantly? I'm your guy. Let's build something that breaks the internet (in a good way).
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleCopy}
                className="group relative px-6 py-3 bg-white/5 border border-white/10 rounded-full flex items-center gap-3 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <Mail size={18} />
                <span>pariharsachin5002@gmail.com</span>
                <span className="ml-2 bg-white/10 p-1 rounded group-hover:bg-black/10">
                  {copied ? "Copied!" : <Copy size={12} />}
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT: The Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 lg:pt-4">
            
            {/* Navigation Column */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-2">Sitemap</h4>
              {['Home', 'About', 'Projects', 'Blog'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-lg text-neutral-300 hover:text-white hover:translate-x-2 transition-transform duration-300 w-fit">
                  {item}
                </a>
              ))}
            </div>

            {/* Socials Column */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-neutral-500 font-mono text-xs uppercase tracking-wider mb-2">Socials</h4>
              <SocialLink href="https://github.com" label="GitHub" />
              <SocialLink href="https://linkedin.com" label="LinkedIn" />
              <SocialLink href="https://twitter.com" label="Twitter" />
              <SocialLink href="https://instagram.com" label="Instagram" />
            </div>

            {/* Location & Time Block */}
            <div className="col-span-2 mt-8 p-6 rounded-2xl bg-neutral-900/50 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                 <div className="p-3 bg-white/5 rounded-full border border-white/5">
                    <MapPin size={20} className="text-white" />
                 </div>
                 <div>
                    <p className="text-white font-medium">Pune, India</p>
                    <p className="text-neutral-500 text-xs">Remote Compatible</p>
                 </div>
              </div>
              
              <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>

              <div className="text-right">
                <p className="text-3xl font-bold text-white font-mono tracking-widest">{time}</p>
                <p className="text-neutral-500 text-xs text-right">Local Time</p>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-neutral-600 text-sm">
          <p>© {new Date().getFullYear()} Sachin Parihar.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span className="hover:text-neutral-400 cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-neutral-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Links with Hover Arrow
const SocialLink = ({ href, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
  >
    <span className="relative overflow-hidden">
      <span className="block group-hover:-translate-y-full transition-transform duration-300">{label}</span>
      <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-white">{label}</span>
    </span>
    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
  </a>
);

export default Footer;