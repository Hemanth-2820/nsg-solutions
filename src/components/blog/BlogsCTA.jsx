import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogsCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-[#fdfaf6] text-center relative overflow-hidden">
      {/* Decorative Perspective Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-black" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-black rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="p-4 bg-white rounded-full shadow-xl mb-12"
        >
          <Zap size={24} className="text-[#007cc3]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight font-infosys-heading italic"
        >
          Ready to Build <br /> <span className="text-[#007cc3]">Something Great?</span>
        </motion.h2>

        <p className="text-xl text-black/50 mb-16 max-w-2xl leading-relaxed font-medium italic">
          Our team is ready to help you turn these ideas into real solutions for your business.
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,124,0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/contact')}
          className="bg-black text-white px-16 py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[13px] shadow-2xl hover:bg-[#007cc3] transition-all duration-500 flex items-center gap-4 group cursor-pointer"
        >
          Let's Talk
          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
        </motion.button>
      </div>
    </section>
  );
};

export default BlogsCTA;