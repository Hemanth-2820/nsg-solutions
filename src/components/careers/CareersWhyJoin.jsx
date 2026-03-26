import React from 'react';
import { motion } from 'framer-motion';

// Using absolute paths for generated images
import innovationIcon from '../../assets/generated/careers_innovation_icon_1774529067466.png';
import growthIcon from '../../assets/generated/careers_growth_icon_1774529082103.png';
import collabIcon from '../../assets/generated/careers_collab_icon_1774529098505.png';
import impactIcon from '../../assets/generated/careers_impact_icon_1774529117324.png';

const reasons = [
  { 
    image: innovationIcon, 
    title: 'Architectural Freedom', 
    desc: 'We don’t just write code; we architect systems. Experience the freedom to solve complex engineering puzzles without the red tape.' 
  },
  { 
    image: growthIcon, 
    title: 'Exponential Growth', 
    desc: 'Our meritocratic culture ensures that high performers ascend rapidly. We provide the mentorship and the stage; you provide the ambition.' 
  },
  { 
    image: collabIcon, 
    title: 'Collaborative Elite', 
    desc: 'Work alongside a hand-picked team of specialists. At NSG, the "average" engineer is a world-class problem solver.' 
  },
  { 
    image: impactIcon, 
    title: 'Global Scale Impact', 
    desc: 'Our solutions power enterprise operations at a massive scale. See your contributions move the needle for Fortune 500 giants.' 
  }
];

const CareersWhyJoin = () => {
  return (
    <section className="py-24 px-6 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block"
          >
            Our Philosophy
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-infosys-heading italic">
            Engineered For the <span className="text-[#007cc3]">Ambitious</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -15 }}
              className="bg-white border border-black/5 rounded-[2rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group"
            >
              {/* Subtle hover background decoration */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#007cc3]/5 rounded-full group-hover:scale-[3] transition-transform duration-700 pointer-events-none" />
              
              <div className="w-24 h-24 mb-10 relative z-10 transition-transform duration-500 group-hover:scale-110">
                <img src={reason.image} alt={reason.title} className="w-full h-full object-contain" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 font-infosys-heading">{reason.title}</h3>
                <p className="text-black/50 leading-relaxed text-[15px] font-medium">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersWhyJoin;