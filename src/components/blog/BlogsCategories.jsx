import React from 'react';
import { motion } from 'framer-motion';

const categories = ['All', 'AI Architecture', 'Cloud Native', 'Cyber Security', 'Digital Transformation', 'Engineering Culture'];

const BlogsCategories = ({ active, setActive }) => {
  return (
    <div className="w-full bg-[#f5f7fa] py-8 border-b border-black/5 sticky top-0 z-40 backdrop-blur-xl bg-opacity-80">
      <div className="max-w-7xl mx-auto px-6 hide-scrollbar overflow-x-auto">
        <div className="flex items-center justify-center gap-6 min-w-max">
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActive(cat)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-6 py-2 group"
            >
              <span className={`relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
                active === cat ? 'text-[#007cc3]' : 'text-black/40 group-hover:text-black'
              }`}>
                {cat}
              </span>
              
              {active === cat && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-[#007cc3]/5 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#007cc3] group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsCategories;