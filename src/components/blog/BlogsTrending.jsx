import React from 'react';
import { motion } from 'framer-motion';

const trending = [ 
  "Generative Enterprise AI", 
  "Deterministic Cloud Fabric", 
  "Quantum-Resistant Security", 
  "Zero-Trust Architecture", 
  "Multi-Cloud Synchronicity",
  "High-Concurrency Rust",
  "Deterministic Engineering culture"
];

const BlogsTrending = () => {
  return (
    <div className="w-full bg-[#fdfaf6] border-y border-black/5 py-4 overflow-hidden relative group">
      {/* Blurred Edge Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#fdfaf6] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#fdfaf6] to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex whitespace-nowrap gap-16 items-center px-12"
        animate={{ x: [0, -1500] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {[...trending, ...trending, ...trending].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="w-1 h-8 bg-black/5" />
            <span className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[10px]">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BlogsTrending;