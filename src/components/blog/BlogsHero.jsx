import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import blogBanner from '../../assets/generated/bolg-banner.jpeg';

const Particle = ({ delay }) => (
  <motion.div
    initial={{ y: 0, x: 0, opacity: 0 }}
    animate={{ 
      y: [0, -100, -200], 
      x: [0, 50, -50, 0],
      opacity: [0, 0.4, 0] 
    }}
    transition={{ 
      duration: 10 + Math.random() * 10, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear"
    }}
    className="absolute w-1 h-1 bg-[#007cc3] rounded-full blur-[1px]"
    style={{ 
      left: `${Math.random() * 100}%`, 
      top: `${Math.random() * 100}%` 
    }}
  />
);

const BlogsHero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const words = "Insights, Ideas & Innovation".split(" ");

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black pt-[160px]">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={blogBanner} 
          alt="NSG Technical Blog" 
          className="w-full h-full object-cover scale-110 opacity-70"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </motion.div>

      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 z-10 opacity-30">
        {[...Array(30)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">


        <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-tighter leading-tight mb-8">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "circOut" }}
              className="inline-block mr-5 last:mr-0"
            >
              {word === "Innovation" ? <span className="text-[#007cc3]">{word}</span> : word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mx-auto text-xl md:text-2xl text-white/50 font-medium leading-relaxed italic"
        >
          "Architecting the future of enterprise intelligence, one insight at a time."
        </motion.p>
      </div>
    </section>
  );
};

export default BlogsHero;