import React from 'react';
import { motion } from 'framer-motion';
import founderImg from "./rahul-infosys.jpg";

const FounderSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0f172a] to-black text-white relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-500/20 blur-[100px]" />

      <div className="max-w-[1400px] mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* IMAGE */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className="group overflow-hidden rounded-2xl"
          >
            <img
              src={founderImg}
              alt="Founder"
              className="w-full h-[450px] object-cover 
              group-hover:scale-110 transition duration-[1.5s]"
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-blue-400 mb-4">
              LEADERSHIP
            </p>

            <h2 className="text-4xl font-semibold mb-6">
              Visionary <span className="text-blue-400">Leadership</span>
            </h2>

            <p className="text-gray-400 leading-relaxed border-l-2 border-blue-400 pl-6">
              Our founder is a visionary leader inspired by innovation and integrity.
              He builds scalable solutions that create real business value and drives
              the company toward excellence in the digital era.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FounderSection;