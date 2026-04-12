import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ContactHero = () => (
  <section className="relative w-full h-[60vh] bg-[#0a0f16] overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(91,184,228,0.2),transparent_55%)]"></div>
    </div>

    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full pt-[280px] relative z-10">


      <div className="overflow-hidden pb-3">
        <motion.h1
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-infosys-heading text-white leading-[1.0] tracking-tight"
        >
          Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5bb8e4] to-white">With Us</span>
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border-l-[3px] border-[#5bb8e4] pl-6 text-[#cbd5e1] text-[1.2rem] md:text-[1.4rem] font-light max-w-2xl leading-relaxed mt-6"
      >
      </motion.p>
    </div>
  </section>
);

export default ContactHero;
