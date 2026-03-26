import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const StatCard = ({ number, suffix, title, index }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, parseInt(number) || 0, { 
      duration: 2, 
      delay: index * 0.2 + 0.5,
      ease: "easeOut" 
    });
    return controls.stop;
  }, [number, index, count]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ 
        rotateY: 10, 
        rotateX: -5, 
        scale: 1.05,
        boxShadow: "0 30px 60px -12px rgba(0,0,0,0.12)"
      }}
      style={{ perspective: 1000 }}
      className="bg-white p-10 rounded-3xl border border-black/5 shadow-sm text-center flex flex-col items-center flex-1 transition-all duration-300"
    >
      <div className="text-5xl md:text-6xl font-bold text-[#007cc3] mb-4 flex items-baseline">
        <motion.span>{isNaN(parseInt(number)) ? number : rounded}</motion.span>
        <span className="text-3xl ml-1">{suffix}</span>
      </div>
      <div className="text-black/40 font-bold uppercase tracking-[0.2em] text-[10px]">
        {title}
      </div>
    </motion.div>
  );
};

const CareersStats = () => {
  const stats = [
    { number: "98", suffix: "%", title: "Engineering Excellence" },
    { number: "15", suffix: "+", title: "Global Innovation Hubs" },
    { number: "400", suffix: "+", title: "Scale Projects" },
  ];

  return (
    <section className="py-24 px-6 bg-[#fdfaf6]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8">
        {stats.map((stat, i) => (
          <StatCard key={i} index={i} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default CareersStats;