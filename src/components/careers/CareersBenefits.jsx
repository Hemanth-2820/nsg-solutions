import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Globe, BookOpen, Briefcase, TrendingUp, Heart, ArrowUpRight } from 'lucide-react';

const benefits = [
  { 
    title: "Global Compensation", 
    desc: "We offer elite-tier salary packages pegged to global engineering standards.", 
    icon: <DollarSign size={20} />,
    gridClass: "md:col-span-1 md:row-span-1",
    bgColor: "from-[#fff1f2] to-[#ffedd5]", // Rose to Peach
    accentColor: "#be123c",
    shadowColor: "shadow-rose-100"
  },
  { 
    title: "Work Anywhere", 
    desc: "Distributed by design. Work from our hubs or your home.", 
    icon: <Globe size={20} />,
    gridClass: "md:col-span-1 md:row-span-1",
    bgColor: "from-[#eff6ff] to-[#dbeafe]", // Blue to Sky
    accentColor: "#1d4ed8",
    shadowColor: "shadow-blue-100"
  },
  { 
    title: "R&D Fellowship", 
    desc: "10% of your time for research and experimental engineering.", 
    icon: <BookOpen size={20} />,
    gridClass: "md:col-span-1 md:row-span-1",
    bgColor: "from-[#f5f3ff] to-[#ede9fe]", // Violet to Purple
    accentColor: "#6d28d9",
    shadowColor: "shadow-violet-100"
  },
  { 
    title: "Health & Vitality", 
    desc: "Premium health coverage for you and your family.", 
    icon: <Heart size={20} />,
    gridClass: "md:col-span-1 md:row-span-1",
    bgColor: "from-[#f0fdf4] to-[#dcfce7]", // Emerald to Mint
    accentColor: "#059669",
    shadowColor: "shadow-emerald-100"
  },
  { 
    title: "Project Ownership", 
    desc: "Lead transformations for Fortune 500 partners.", 
    icon: <Briefcase size={20} />,
    gridClass: "md:col-span-1 md:row-span-1",
    bgColor: "from-[#fff7ed] to-[#ffedd5]", // Peach to Amber
    accentColor: "#c2410c",
    shadowColor: "shadow-orange-100"
  },
  { 
    title: "Vertical Growth", 
    desc: "Transparent tracks for leadership and management.", 
    icon: <TrendingUp size={20} />,
    gridClass: "md:col-span-1 md:row-span-1",
    bgColor: "from-[#ecfeff] to-[#cffafe]", // Cyan to Sky
    accentColor: "#0891b2",
    shadowColor: "shadow-cyan-100"
  }
];

const CareersBenefits = () => {
  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-50/50 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-5 py-1.5 bg-slate-100 rounded-full mb-4"
          >
            <span className="text-slate-600 font-bold uppercase tracking-[0.4em] text-[9px]">EXCEPTIONAL PERKS</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-infosys-heading italic tracking-tight">
            Investing In <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007cc3] to-blue-400">Excellence</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className={`bg-gradient-to-br ${benefit.bgColor} border border-white/40 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between group transition-all duration-500 shadow-lg ${benefit.shadowColor} hover:shadow-2xl relative overflow-hidden h-full`}
            >
              {/* Glassmorphism Shine */}
              <div className="absolute top-0 left-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start mb-10">
                <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 z-10 shadow-md group-hover:scale-110 group-hover:rotate-[15deg]"
                    style={{ backgroundColor: 'white', color: benefit.accentColor }}
                >
                    {benefit.icon}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-3 group-hover:translate-x-0">
                    <ArrowUpRight size={24} style={{ color: benefit.accentColor }} />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-900 mb-4 font-infosys-heading leading-tight italic">{benefit.title}</h3>
                <p className="text-slate-600 text-[14px] leading-relaxed font-medium opacity-90">{benefit.desc}</p>
              </div>

              <div className="mt-8 h-1 w-16 bg-white/50 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full"
                    style={{ backgroundColor: benefit.accentColor }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersBenefits;