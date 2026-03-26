import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApplicationFormModal from './ApplicationFormModal';

const CareersCTA = () => {
  const [formOpen, setFormOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <ApplicationFormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

      <section className="py-32 px-6 bg-[#f5f7fa] text-center relative overflow-hidden">
        {/* Portal Decoration */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1.5, opacity: 0.1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[1px] border-[#007cc3] rounded-full pointer-events-none"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1.2, opacity: 0.05 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[1px] border-[#007cc3] rounded-full pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[11px] mb-6 block"
          >
            Final Step
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 font-infosys-heading italic"
          >
            Begin Your <span className="text-[#007cc3]">Ascension</span>
          </motion.h2>
          <p className="text-xl text-black/50 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            The next decade of digital excellence is being built right here. We've reserved a seat for the extraordinary. Are you ready?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Apply Now → opens Application Form */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,124,195,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFormOpen(true)}
              className="px-16 py-5 bg-[#007cc3] text-white font-bold rounded-full transition-all uppercase tracking-widest text-[13px] cursor-pointer"
            >
              Apply Now
            </motion.button>

            {/* Ask a Question → goes to contact page */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/contact')}
              className="px-16 py-5 bg-white border border-black/10 text-gray-900 font-bold rounded-full hover:bg-black/5 transition-all uppercase tracking-widest text-[13px] cursor-pointer"
            >
              Ask a Question
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersCTA;