import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ServicesHero = ({ title, subtitle }) => (
  <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE] overflow-hidden pt-[160px]">

    {/* Subtle texture */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-10"></div>

    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10 w-full">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-8"
      >
        <Sparkles size={16} className="text-[#007cc3]" />

        <span className="text-[#007cc3] font-bold tracking-[0.3em] text-[12px] uppercase">
          Enterprise Services
        </span>
      </motion.div>

      <h1 className="text-[3.5rem] md:text-[5rem] font-extrabold text-[#0f172a] leading-tight mb-8 tracking-tight">
        {title}
      </h1>

      <p className="text-[#334155] text-[1.3rem] leading-relaxed max-w-3xl border-l-[4px] border-[#007cc3] pl-8 font-light">
        {subtitle}
      </p>

    </div>
  </section>
);

export default ServicesHero;