import React from 'react';
import { motion } from 'framer-motion';
import founderImg from "./rahul-infosys.jpg";

const FounderSection = () => {
  return (
    <section className="py-24 bg-white text-[#0f172a] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10"
          >
            <img
              src={founderImg}
              alt="Founder"
              className="w-full h-[550px] object-cover 
              group-hover:scale-105 transition-transform duration-[2s] ease-out"
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 bg-blue-50 text-[#007cc3] text-[11px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
              LEADERSHIP
            </div>

            <h2 className="text-[3rem] font-medium mb-8 text-[#0f172a] leading-tight font-infosys-heading">
              Visionary <br /> <span className="text-[#007cc3]">Leadership</span>
            </h2>

            <div className="space-y-6">
              <p className="text-xl text-[#334155] font-light leading-relaxed pl-8 border-l-4 border-[#007cc3] italic">
                "Our founder is a visionary leader inspired by innovation and integrity."
              </p>
              
              <p className="text-lg text-[#64748b] leading-relaxed font-light">
                He builds scalable solutions that create real business value and drives
                the company toward excellence in the digital era. With a focus on engineering 
                perfection, he steer complex organizations into the future securely.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;