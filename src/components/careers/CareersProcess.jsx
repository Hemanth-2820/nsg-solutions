import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const steps = [
  { num: '01', title: 'Technical Intake', desc: 'Our journey begins with a meticulous review of your technical portfolio and engineering philosophy.' },
  { num: '02', title: 'The Deep Dive', desc: 'A rigorous, peer-led exploration into your architecture skills and problem-solving intuition.' },
  { num: '03', title: 'Cultural Synthesis', desc: 'A dialogue focused on shared values, engineering craftsmanship, and long-term vision.' },
  { num: '04', title: 'The Ascension', desc: 'Final alignment, rapid offer delivery, and a structured launch into your first NSG project.' }
];

const CareersProcess = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 px-6 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block"
          >
            The Journey
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-infosys-heading italic">How We <span className="text-[#007cc3]">Scale Together</span></h2>
          <p className="text-black/50 text-xl font-medium max-w-2xl mx-auto italic">"A focused, objective, and engineering-led selection process."</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* SVG Connecting Path */}
          <div className="hidden md:block absolute top-[50px] left-[10%] w-[80%] h-2 bg-black/5 z-0 overflow-hidden">
             <motion.div 
               style={{ scaleX: pathLength }}
               className="h-full bg-[#007cc3] origin-left"
             />
          </div>
          
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-black/10 flex items-center justify-center text-3xl font-bold text-[#007cc3] mb-12 shadow-sm group-hover:border-[#007cc3] group-hover:border-solid transition-all duration-500"
              >
                {step.num}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-infosys-heading group-hover:text-[#007cc3] transition-colors duration-500">{step.title}</h3>
              <p className="text-black/50 text-sm leading-relaxed font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersProcess;