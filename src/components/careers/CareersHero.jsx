import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import nsgCareers from '../../assets/nsg-careers.jpeg';
import ApplicationFormModal from './ApplicationFormModal';

const CareersHero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const [showForm, setShowForm] = useState(false);

  const title = "Engineering The Next Digital Frontier";
  const words = title.split(" ");

  const scrollToRoles = () => {
    const el = document.getElementById('careers-roles');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToLife = () => {
    const el = document.getElementById('careers-life');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <ApplicationFormModal isOpen={showForm} onClose={() => setShowForm(false)} />

      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-[280px] lg:pt-[180px]">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img src={nsgCareers} alt="Careers at NSG" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="overflow-hidden mb-6 flex flex-wrap justify-center gap-x-4">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="text-5xl md:text-8xl font-extrabold text-white tracking-tight block"
              >
                {word}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Join a league of extraordinary engineers building the world's most complex digital ecosystems. Your journey to mastery starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {/* Explore Roles → scrolls to roles section */}
            <button
              onClick={scrollToRoles}
              className="px-12 py-5 bg-[#007cc3] text-white font-bold rounded-full shadow-[0_20px_40px_rgba(0,124,195,0.3)] hover:bg-[#005fa3] hover:-translate-y-1 transition-all uppercase tracking-widest text-[13px]"
            >
              Explore Roles
            </button>
            {/* Life at NSG → scrolls to life/culture section */}
            <button
              onClick={scrollToLife}
              className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all uppercase tracking-widest text-[13px]"
            >
              Life at NSG
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#007cc3] to-transparent" />
        </motion.div>
      </section>
    </>
  );
};

export default CareersHero;
