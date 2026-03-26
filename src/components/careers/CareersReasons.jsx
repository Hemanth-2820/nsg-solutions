import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

import reason1 from '../../assets/external/careers_reason_1.jpg';
import reason2 from '../../assets/external/careers_reason_2.jpg';
import reason3 from '../../assets/external/careers_reason_3.jpg';
import reason4 from '../../assets/external/careers_reason_4.jpg';
import reason5 from '../../assets/external/careers_reason_5.jpg';

const reasons = [
  {
    num: '1',
    title: 'Our people & culture',
    desc: 'We foster a culture of belonging where every voice is valued. At NSG, you will work alongside brilliant minds who are passionate about solving the world\'s toughest digital challenges.',
    img: reason1,
  },
  {
    num: '2',
    title: 'Culture of belonging',
    desc: 'Inclusion is not a program — it is our operating model. We celebrate difference and build teams where authenticity drives innovation.',
    img: reason2,
  },
  {
    num: '3',
    title: 'Cutting-edge innovation',
    desc: 'Work on real AI, cloud, and data engineering challenges at a global scale. At NSG, innovation is not a buzzword — it is what we do every day.',
    img: reason3,
  },
  {
    num: '4',
    title: 'Global impact',
    desc: 'Our work spans 50+ countries and touches industries from finance to healthcare. Every project you lead creates measurable impact at a massive scale.',
    img: reason4,
  },
  {
    num: '5',
    title: 'Growth & development',
    desc: 'Structured learning paths, mentorship programs, and access to top-tier certifications. We invest in your growth because your success is our success.',
    img: reason5,
  },
];

const CareersReasons = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="reasons" className="bg-white overflow-hidden">
      {/* Section header */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-24 pb-16">
        <h2 className="text-[2.8rem] md:text-[4rem] font-infosys-heading text-[#111] tracking-tight leading-tight">
          {reasons.length} reasons to join <span className="text-[#0d9488]">NSG</span>
        </h2>
        <p className="text-[#64748b] text-[1.1rem] font-light mt-4 max-w-2xl">
          We strive to be an organization where our people can thrive. With a focus on development, well-being, and purpose — NSG is where careers are built.
        </p>
      </div>

      {/* Accordion + Image panel grid */}
      <div className="w-full">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="flex flex-col md:flex-row w-full min-h-[340px] border-t border-gray-100 cursor-pointer"
            onClick={() => setActive(active === i ? -1 : i)}
          >
            {/* LEFT: Blue text panel */}
            <div
              className={`md:w-1/2 flex flex-col justify-between p-12 md:p-16 transition-colors duration-500 ${
                active === i ? 'bg-[#0d6e87]' : 'bg-[#0f7193] hover:bg-[#0d6e87]'
              }`}
            >
              <div>
                <p className="text-white/50 font-bold tracking-[0.2em] text-[12px] uppercase mb-6">
                  {reason.num}.
                </p>
                <h3 className="text-[2rem] md:text-[2.4rem] font-infosys-heading text-white leading-[1.15] tracking-tight">
                  {reason.title}
                </h3>

                <AnimatePresence>
                  {active === i && (
                    <motion.p
                      key="desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-white/80 font-light text-[1.05rem] leading-relaxed mt-6 overflow-hidden"
                    >
                      {reason.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-10">
                <span className="text-white/70 font-bold uppercase tracking-widest text-[11px]">
                  {active === i ? 'Close' : 'Find out more'}
                </span>
                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white">
                  {active === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </div>
            </div>

            {/* RIGHT: Image panel */}
            <div className="md:w-1/2 bg-gray-100 overflow-hidden min-h-[260px] md:min-h-0">
              <img
                src={reason.img}
                alt={reason.title}
                className={`w-full h-full object-cover transition-transform duration-[1.5s] ${
                  active === i ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CareersReasons;
