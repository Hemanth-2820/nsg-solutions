import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, TrendingUp, Brain } from 'lucide-react';

const subServices = [
  { name: "Corporate Consulting", icon: Briefcase, color: "from-[#007cc3] to-cyan-500" },
  { name: "Business Modeling", icon: TrendingUp, color: "from-purple-600 to-indigo-600" },
  { name: "Strategic Transformation", icon: Brain, color: "from-emerald-600 to-teal-500" }
];

const EnterpriseStrategyPage = () => (
  <div className="min-h-screen bg-white font-sans overflow-x-hidden pt-32 pb-20">
    <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
      <Link 
        to="/services" 
        className="mb-8 inline-flex items-center gap-2 text-[#007cc3] font-black text-xs uppercase tracking-widest hover:-translate-x-2 transition-transform duration-300"
      >
        <ArrowLeft size={14} /> Back to Services
      </Link>

      <div className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-[#0f172a] mb-6 tracking-tight italic">
          Enterprise Strategy
        </h1>
        <div className="w-24 h-1.5 bg-[#007cc3] rounded-full mb-8"></div>
        <p className="text-gray-500 text-xl font-light max-w-3xl leading-relaxed">
          Corporate business architecture & consulting — designed to architect, transform, and future-proof your enterprise.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {subServices.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -12 }}
              className={`
                group relative h-[250px]
                rounded-[2.5rem] flex flex-col items-center justify-center text-center
                bg-gradient-to-br ${item.color}
                transition-all duration-700
                shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                cursor-pointer overflow-hidden
              `}
            >
              <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none group-hover:scale-110 transition-transform duration-[2s]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`hex-strat-${i}`} width="30" height="50" patternUnits="userSpaceOnUse">
                      <path d="M15 0L30 8.5V25.5L15 34L0 25.5V8.5L15 0Z" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#hex-strat-${i})`} />
                </svg>
              </div>

              <div className="relative z-10 mb-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl group-hover:rotate-[360deg] transition-transform duration-700">
                <Icon size={42} className="text-white" />
              </div>

              <h4 className="relative z-10 text-[1.4rem] font-black text-white px-8 tracking-tight leading-tight group-hover:scale-110 transition-transform duration-500">
                {item.name}
              </h4>

              <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 blur-2xl rounded-full group-hover:bg-white/30 transition-all duration-500"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);

export default EnterpriseStrategyPage;
