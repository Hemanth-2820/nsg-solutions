import React from 'react';
import { motion } from 'framer-motion';

// Using absolute paths for generated images
import aiTechImg from '../../assets/generated/careers_ai_tech_1774529131976.png';
import cloudTechImg from '../../assets/generated/careers_cloud_tech_1774529148242.png';
import uiTechImg from '../../assets/generated/careers_ui_tech_1774529165327.png';
import backendTechImg from '../../assets/generated/careers_backend_tech_1774529182685.png';

const WorkAreaCard = ({ title, img, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.15 }}
    className="relative group h-[300px] rounded-3xl overflow-hidden border border-black/5"
  >
    <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />
    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <h3 className="text-xl font-bold text-white mb-2 font-infosys-heading">{title}</h3>
      <p className="text-white/60 text-[13px] font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
        {desc}
      </p>
    </div>
  </motion.div>
);

const CareersWork = () => {
  const areas = [
    { title: "Cognitive AI", img: aiTechImg, desc: "Building neural networks that power the next generation of predictive enterprise analytics." },
    { title: "Cloud Fabric", img: cloudTechImg, desc: "Architecting frictionless, multi-cloud environments for high-concurrency global operations." },
    { title: "Quantum UI", img: uiTechImg, desc: "Crafting fluid, deterministic interfaces that redefine the boundary between human and machine." },
    { title: "Hardened Backend", img: backendTechImg, desc: "Engineering the invisible spine of enterprise logic with uncompromising security and scale." }
  ];

  return (
    <section className="py-24 px-6 bg-[#fdfaf6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block"
            >
              The Work
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 font-infosys-heading leading-tight">
              Architecting <span className="text-[#007cc3]">Complex Systems</span> For Ambitious Brands
            </h2>
          </div>
          <p className="text-black/50 font-medium max-w-sm text-lg leading-relaxed italic">
            "Innovation is not about just building features; it's about solving the heavy problems that others shy away from."
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {areas.map((area, idx) => (
            <WorkAreaCard key={idx} {...area} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersWork;