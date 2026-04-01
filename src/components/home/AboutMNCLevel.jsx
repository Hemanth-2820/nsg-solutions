import React, { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ value, duration = 3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 80, // Slightly slower, more deliberate for "MNC" feel
    damping: 30,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return <span ref={ref}><motion.span>{display}</motion.span></span>;
};

const stats = [
  {
    num: 50,
    suffix: "+",
    label: "CLIENTS",
    color: "bg-[#a35e00]", // Brownish Orange
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute bottom-4 right-4 opacity-20 text-white fill-none stroke-current stroke-[2px]">
        <circle cx="30" cy="30" r="10" />
        <path d="M10,60 Q30,40 50,60 T90,60" />
        <rect x="20" y="20" width="60" height="40" rx="4" />
      </svg>
    )
  },
  {
    num: 200,
    suffix: "+",
    label: "PROJECTS",
    color: "bg-[#0069b4]", // Corporate Blue
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute bottom-4 right-4 opacity-20 text-white fill-none stroke-current stroke-[2px]">
        <circle cx="50" cy="40" r="12" />
        <circle cx="30" cy="70" r="12" />
        <circle cx="70" cy="70" r="12" />
        <path d="M50,40 L30,70 M50,40 L70,70" />
      </svg>
    )
  },
  {
    num: 15,
    suffix: "+",
    label: "YEARS EXP.",
    color: "bg-[#007b5d]", // Deep Teal
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute bottom-4 right-4 opacity-20 text-white fill-none stroke-current stroke-[2px]">
        <path d="M20,80 L80,80 L50,20 Z" />
        <path d="M35,80 L35,60 M65,80 L65,60" />
        <circle cx="50" cy="20" r="5" />
      </svg>
    )
  },
  {
    num: 95,
    suffix: "%",
    label: "SATISFACTION",
    color: "bg-[#c1391d]", // Terracotta Red
    icon: (
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute bottom-4 right-4 opacity-20 text-white fill-none stroke-current stroke-[2px]">
        <path d="M30,30 Q50,10 70,30 T90,30" />
        <circle cx="50" cy="50" r="30" />
        <path d="M40,45 L45,50 L60,40" />
      </svg>
    )
  }
];

const AboutMNCLevel = () => (
  <section className="bg-[#f1f5f9] py-28 relative overflow-hidden">
    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10 transition-all">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className={`relative ${stat.color} aspect-video md:aspect-[4/3] p-6 md:p-10 flex flex-col justify-between overflow-hidden group cursor-default shadow-2xl hover:-translate-y-4 transition-all duration-700 rounded-sm`}
          >
            {/* Background Texture Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,100" stroke="white" strokeWidth="0.1" />
                <path d="M0,50 L50,0 T100,50" fill="none" stroke="white" strokeWidth="0.1" />
              </svg>
            </div>

            {/* Content Display */}
            <div className="relative z-10">
              <h4 className="text-white text-[1.5rem] font-black tracking-[0.05em] leading-none mb-4 uppercase">
                {stat.label}
              </h4>
              <div className="w-12 h-[4px] bg-white/30 rounded-full group-hover:w-20 transition-all duration-700"></div>
            </div>

            <div className="relative z-10">
              <span className="text-white text-[4rem] lg:text-[4.8rem] font-black tracking-tighter leading-none flex items-baseline">
                <Counter value={stat.num} />
                <span className="text-[2.5rem] opacity-70 ml-1 font-bold">{stat.suffix}</span>
              </span>
            </div>

            {/* Decorative Logo Art Layer */}
            {stat.icon}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutMNCLevel;
