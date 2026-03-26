import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ServicesHero = ({ title, subtitle }) => (
  <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center bg-[#0a0f16] overflow-hidden">

    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f16] to-[#050505]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-10"></div>
    </div>

    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Sparkles size={16} className="text-[#5bb8e4]" />
        <span className="text-[#5bb8e4] font-bold tracking-[0.3em] text-[12px] uppercase">
          Enterprise Services
        </span>
      </motion.div>

      <h1 className="text-[3rem] md:text-[5rem] font-infosys-heading text-white leading-tight">
        {title}
      </h1>

      <p className="mt-6 text-[#cbd5e1] text-[1.2rem] leading-[1.6] max-w-2xl">
        {subtitle}
      </p>
    </div>
  </section>
);

export default ServicesHero;