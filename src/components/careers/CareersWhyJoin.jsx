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
    title: 'Freedom to Solve Real Problems', 
    desc: 'At NSG, engineers are trusted to make decisions. No unnecessary approvals or red tape — just clear goals and the freedom to build smart solutions.' 
  },
  { 
    image: growthIcon, 
    title: 'Grow Faster Than Anywhere Else', 
    desc: 'We reward results, not titles. High performers move up quickly. We provide the mentorship and the stage — you bring the drive.' 
  },
  { 
    image: collabIcon, 
    title: 'Work With Great People', 
    desc: 'Every person on the team was chosen for their skills and mindset. Working here means learning from some of the best engineers around.' 
  },
  { 
    image: impactIcon, 
    title: 'Your Work Reaches the World', 
    desc: 'The systems you build here run inside some of the world\'s largest companies. Your contributions have real, visible impact at global scale.' 
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
            Why Choose NSG
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-infosys-heading italic">
            A Place Where You Can Do <span className="text-[#007cc3]">Your Best Work</span>
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