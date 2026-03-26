import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Globe, BookOpen, Briefcase, TrendingUp, Heart } from 'lucide-react';

const benefits = [
  { 
    title: "Global Compensation", 
    desc: "We offer elite-tier salary packages pegged to global engineering standards, not just local averages.", 
    icon: <DollarSign size={24} />,
    gridClass: "md:col-span-2 md:row-span-1"
  },
  { 
    title: "Work Anywhere", 
    desc: "Distributed by design. Work from our hubs or your home.", 
    icon: <Globe size={24} />,
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    title: "R&D Fellowship", 
    desc: "10% of your time is dedicated to pure research and experimental engineering.", 
    icon: <BookOpen size={24} />,
    gridClass: "md:col-span-1 md:row-span-2"
  },
  { 
    title: "Health & Vitality", 
    desc: "Comprehensive premium health coverage for you and your family.", 
    icon: <Heart size={24} />,
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    title: "Project Ownership", 
    desc: "Lead high-stakes digital transformations for Fortune 500 partners.", 
    icon: <Briefcase size={24} />,
    gridClass: "md:col-span-1 md:row-span-1"
  },
  { 
    title: "Vertical Growth", 
    desc: "Clear, transparent tracks for technical or management leadership.", 
    icon: <TrendingUp size={24} />,
    gridClass: "md:col-span-2 md:row-span-1"
  }
];

const CareersBenefits = () => {
  return (
    <section className="py-24 px-6 bg-[#fdfaf6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block"
          >
            The Perks
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-infosys-heading italic">Investing In <span className="text-[#007cc3]">Excellence</span></h2>
          <p className="text-black/50 text-xl font-medium max-w-2xl mx-auto italic">"We provide the soil; you provide the seeds. Greatness is a collaborative effort."</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
              className={`bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between group transition-all duration-300 ${benefit.gridClass}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#007cc3]/5 text-[#007cc3] flex items-center justify-center mb-8 group-hover:bg-[#007cc3] group-hover:text-white transition-all duration-500">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-infosys-heading">{benefit.title}</h3>
                <p className="text-black/50 text-sm leading-relaxed font-medium">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersBenefits;