import React from 'react';
import { motion } from 'framer-motion';

const ServicesCTA = () => {
  return (
    <section className="bg-[#050505] relative overflow-hidden flex items-center pb-32">
       {/* Edge Glow Line connecting Grid to CTA logically */}
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
       
       <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#5bb8e4] blur-[250px] opacity-10 rounded-full z-0 pointer-events-none"></div>

       <motion.div 
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 1, ease: "easeOut" }}
         className="max-w-[1500px] mx-auto w-full bg-gradient-to-r from-[#111] to-[#0a0f16] border border-white/10 rounded-3xl p-16 md:p-24 relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 shadow-[0_30px_60px_rgba(0,0,0,0.8)] mx-6 lg:mx-12"
       >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay rounded-3xl pointer-events-none"></div>

          <h2 className="text-[3rem] lg:text-[4.5rem] font-infosys-heading text-white tracking-tight leading-[1.05] drop-shadow-md z-10 w-full md:w-2/3">
             Ready to elevate your <span className="text-[#5bb8e4]">digital maturity?</span>
          </h2>
          
          <div className="z-10 w-full md:w-auto">
             <button className="bg-[#5bb8e4] text-[#050505] px-12 py-5 rounded-full font-bold tracking-[0.2em] uppercase text-[13px] shadow-[0_0_40px_rgba(91,184,228,0.4)] hover:bg-white hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Consult an Expert
             </button>
          </div>
       </motion.div>
    </section>
  );
};

export default ServicesCTA;
