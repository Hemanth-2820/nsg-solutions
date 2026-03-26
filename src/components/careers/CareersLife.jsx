import React from 'react';
import { motion } from 'framer-motion';

// Using absolute path for generated image
import cultureHeroImg from '../../assets/generated/careers_culture_hero_1774529200225.png';

const CultureBlock = ({ title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
    className="group relative"
  >
    <div className="flex items-start gap-6">
      <div className="w-1 h-full absolute left-0 top-0 bg-black/5 group-hover:bg-[#007cc3] transition-colors duration-500" />
      <div className="pl-6 py-2">
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-infosys-heading group-hover:text-[#007cc3] transition-colors duration-500">{title}</h3>
        <p className="text-black/50 text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const CareersLife = () => {
  const blocks = [
    { title: "Radical Transparency", desc: "We believe in open channels. From architectural reviews to company roadmaps, we share everything that matters." },
    { title: "The Craftsmanship Vibe", desc: "Ours is a culture of makers. We obsess over clean code, elegant architecture, and deterministic results." },
    { title: "Async-First Flow", desc: "We value deep work. Our processes are optimized for minimal interruptions and maximum engineering focus." },
    { title: "Continuous Evolution", desc: "The tech stack of today isn't the stack of tomorrow. We allocate dedicated time for R&D and upskilling." }
  ];

  return (
    <section id="careers-life" className="py-24 px-6 bg-[#f5f7fa] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Side: Creative Image Frame */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#007cc3]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#1e3a8a]/5 rounded-full blur-3xl" />
          
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white group">
            <motion.img 
              src={cultureHeroImg} 
              alt="Life at NSG" 
              className="w-full h-full object-cover aspect-[4/5] lg:aspect-auto lg:h-[600px] group-hover:scale-110 transition-transform duration-1000"
              whileHover={{ scale: 1.05 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#007cc3]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </motion.div>

        {/* Right Side: Narrative Content */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 font-infosys-heading italic"
          >
            The Culture Of <span className="text-[#007cc3]">Craftsmanship</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-black/60 text-lg mb-12 leading-relaxed font-medium"
          >
            We've built a sanctuary for engineers who care about "how" things are built as much as "what" is built. Join a team where excellence is the baseline.
          </motion.p>
          
          <div className="space-y-12">
            {blocks.map((block, i) => (
              <CultureBlock key={i} {...block} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersLife;