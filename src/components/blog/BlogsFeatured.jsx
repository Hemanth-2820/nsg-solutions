import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, X, ChevronDown } from 'lucide-react';

// Using relative path for generated image
import featuredAiImg from '../../assets/generated/blog_featured_ai_1774529522969.png';

const BlogsFeatured = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-6 bg-[#fdfaf6]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="group relative bg-white border border-black/5 rounded-[3rem] overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-700"
        >
          <div className="grid lg:grid-cols-2 items-stretch">
            {/* Image Section */}
            <div className="h-[400px] lg:h-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
              <motion.img 
                src={featuredAiImg}
                alt="Featured Post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
              />
              <div className="absolute top-8 left-8 z-20">
                <div className="px-5 py-2 bg-white/90 backdrop-blur-md text-[#007cc3] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full flex items-center gap-2 shadow-xl">
                  <Sparkles size={14} /> Spotlight
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-10 lg:p-20 flex flex-col justify-center">
              <motion.h2 
                layout
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1] font-infosys-heading italic"
              >
                The Architecture of <br /> <span className="text-[#007cc3]">Cognitive Enterprise</span>
              </motion.h2>
              <motion.p 
                layout
                className="text-black/50 text-xl mb-12 leading-relaxed font-medium italic"
              >
                "We are moving beyond simple automation into the realm of deterministic, AI-driven deterministic systems."
              </motion.p>
              
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-4 py-4 px-10 bg-black text-white font-bold rounded-full hover:bg-[#007cc3] transition-all duration-500 uppercase tracking-widest text-[12px]"
                >
                  {isOpen ? 'Close Thesis' : 'Read Full Thesis'} 
                  {isOpen ? <X size={18} /> : <ArrowRight size={18} />}
                </button>
                <div className="text-black/30 font-bold uppercase tracking-[0.2em] text-[10px]">
                  12 Min Read
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                className="overflow-hidden bg-[#f5f7fa] border-t border-black/5"
              >
                <div className="p-10 lg:p-20">
                  <div className="max-w-4xl mx-auto space-y-12">
                     <div className="grid md:grid-cols-2 gap-12 border-b border-black/5 pb-12">
                        <div>
                           <h4 className="text-[#007cc3] font-bold uppercase tracking-widest text-xs mb-4">The Objective</h4>
                           <p className="text-black/60 italic leading-relaxed">To define the structural requirements of a truly cognitive enterprise where decision-making is distributed and AI is the core OS, not a plugin.</p>
                        </div>
                        <div>
                           <h4 className="text-[#007cc3] font-bold uppercase tracking-widest text-xs mb-4">Key Finding</h4>
                           <p className="text-black/60 italic leading-relaxed">Transitioning from stochastic LLM responses to deterministic agentic workflows is the prerequisite for enterprise-grade deployment.</p>
                        </div>
                     </div>

                     <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-gray-900 font-infosys-heading italic">I. The Stochastic Barrier</h3>
                        <p className="text-black/50 text-lg leading-relaxed italic">The primary challenge facing the modern enterprise is the inherent unpredictability of standard AI models. To build at scale, we must introduce "Guard-Rail Architectures" that wrap neural outputs in symbolic logic.</p>
                        
                        <h3 className="text-3xl font-bold text-gray-900 font-infosys-heading italic">II. Distributed Intelligence</h3>
                        <p className="text-black/50 text-lg leading-relaxed italic">Instead of a monolithic central AI, the cognitive enterprise relies on specialized agents orbiting a central "Knowledge Mesh." This ensures data integrity and reduces circular reasoning errors in complex task loops.</p>
                     </div>

                     <div className="pt-12 text-center">
                        <motion.button 
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           className="text-black/30 font-bold uppercase tracking-widest text-[10px] flex flex-col items-center gap-4 mx-auto"
                           onClick={() => setIsOpen(false)}
                        >
                           End of Preview - Close Reader
                           <ChevronDown size={20} className="animate-bounce" />
                        </motion.button>
                     </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsFeatured;