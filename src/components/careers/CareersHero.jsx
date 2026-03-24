import React from 'react';
import { motion } from 'framer-motion';

const CareersHero = () => {
  const rings = [
    { count: 18, r: 55,  size: 5,  color: '#86efac', dur: 22 },
    { count: 28, r: 100, size: 6,  color: '#34d399', dur: 28 },
    { count: 38, r: 150, size: 7,  color: '#2dd4bf', dur: 35 },
    { count: 50, r: 205, size: 7,  color: '#5eead4', dur: 42 },
    { count: 64, r: 265, size: 8,  color: '#a3e635', dur: 50 },
    { count: 80, r: 330, size: 8,  color: '#86efac', dur: 60 },
    { count: 96, r: 400, size: 9,  color: '#4ade80', dur: 70 },
  ];

  return (
    <section
      className="relative w-full bg-black overflow-hidden"
      style={{ height: '90vh', minHeight: '560px' }}
    >
      <style>{`
        @keyframes nsg-spin-cw  { to { transform: rotate(360deg);  } }
        @keyframes nsg-spin-ccw { to { transform: rotate(-360deg); } }
      `}</style>

      {/* Ring container — centred absolutely inside the section */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      >
        {rings.map((ring, ri) => {
          const ccw = ri % 2 === 1;
          return (
            <div
              key={ri}
              style={{
                position: 'absolute',
                width: ring.r * 2,
                height: ring.r * 2,
                top: -ring.r,
                left: -ring.r,
                animation: `${ccw ? 'nsg-spin-ccw' : 'nsg-spin-cw'} ${ring.dur}s linear infinite`,
              }}
            >
              {Array.from({ length: ring.count }).map((_, di) => {
                const angle = (di / ring.count) * 360;
                const rad   = (angle * Math.PI) / 180;
                const x     = ring.r + ring.r * Math.cos(rad) - ring.size / 2;
                const y     = ring.r + ring.r * Math.sin(rad) - ring.size / 2;
                const op    = 0.4 + 0.55 * Math.abs(Math.sin((di / ring.count) * Math.PI * 3));
                return (
                  <span
                    key={di}
                    style={{
                      position: 'absolute',
                      width: ring.size,
                      height: ring.size,
                      left: x,
                      top: y,
                      borderRadius: '50%',
                      backgroundColor: ring.color,
                      opacity: op,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Centre text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[#34d399] font-bold tracking-[0.35em] uppercase text-[12px] mb-6"
        >
          Careers at NSG
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-infosys-heading text-white leading-[1.0] tracking-tight max-w-4xl"
        >
          Where talent<br />meets purpose
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 text-white/60 text-[1.15rem] font-light max-w-xl"
        >
          Join a team engineering the future of digital for the world's leading enterprises.
        </motion.p>

        <motion.a
          href="#join-us"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 bg-[#2dd4bf] text-black font-bold px-10 py-4 rounded-full uppercase tracking-widest text-[12px] hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg inline-block"
        >
          Explore Careers
        </motion.a>
      </div>
    </section>
  );
};

export default CareersHero;
