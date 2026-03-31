import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const steps = [
  { num: '01', title: 'We Review Your Application', desc: 'We carefully look at your experience, work history, and what you\'ve built before making our next decision.' },
  { num: '02', title: 'Technical Interview', desc: 'A focused conversation about your technical skills and how you solve problems. No trick questions — just real engineering challenges.' },
  { num: '03', title: 'Team Conversation', desc: 'A casual chat with the team to see if we\'re a good fit for each other — your values, working style, and what you\'re looking for.' },
  { num: '04', title: 'Offer & Onboarding', desc: 'If everything feels right, we move fast. You\'ll get an offer, and we\'ll make sure your first weeks at NSG are smooth and welcoming.' }
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
            How It Works
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-infosys-heading italic">Our <span className="text-[#007cc3]">Hiring Process</span></h2>
          <p className="text-black/50 text-xl font-medium max-w-2xl mx-auto italic">Simple, fair, and focused on finding the right fit — for you and for us.</p>
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