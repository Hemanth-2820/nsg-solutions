import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ServicesHero = ({ title, subtitle }) => (
  <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center bg-[#0a0f16] overflow-hidden">
    {/* MNC Background Depth */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f16] to-[#050505] opacity-100"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-15 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.2),transparent_50%)]"></div>
    </div>
    
    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full pt-20 relative z-10 flex flex-col justify-center h-full font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-3 mb-6"
      >
        <Sparkles size={16} className="text-[#5bb8e4]" />
        <span className="text-[#5bb8e4] font-bold tracking-[0.3em] text-[12px] uppercase">Enterprise Services</span>
      </motion.div>

      <div className="overflow-hidden pb-4">
        <motion.h1 
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[4rem] md:text-[5rem] lg:text-[6rem] font-infosys-heading text-white leading-[1.0] tracking-tight drop-shadow-md"
        >
          {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5bb8e4] to-white">{title.split(' ').slice(1).join(' ')}</span>
        </motion.h1>
      </div>

      <motion.p 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border-l-[3px] border-[#5bb8e4] pl-6 text-[#cbd5e1] text-[1.25rem] md:text-[1.4rem] font-light max-w-3xl leading-relaxed mt-6"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

export default ServicesHero;
