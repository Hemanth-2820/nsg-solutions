import React from 'react';
import { ArrowRight, Zap, Globe, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutMNCLevel = () => (
  <section className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] py-32 relative overflow-hidden">
    {/* Radial Overlay Layer (MNC Secret) */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent)] z-0 pointer-events-none"></div>
    {/* Deep Background Gradient / Noise Layer */}
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-15 mix-blend-screen pointer-events-none"></div>
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#5bb8e4] blur-[250px] opacity-20 rounded-full z-0 pointer-events-none"></div>

    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
      
      {/* TEXT & IMAGE SPLIT */}
      <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="lg:w-1/2"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-[2px] bg-[#5bb8e4]"></div>
            <span className="text-[#5bb8e4] font-bold tracking-[0.3em] text-[13px] uppercase">Who We Are</span>
          </div>
          
          <h2 className="text-[3.5rem] lg:text-[4.5rem] font-infosys-heading text-white leading-[1.1] tracking-tight mb-8 drop-shadow-md">
            Engineering Digital <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5bb8e4] to-white">Transformation</span> at Scale
          </h2>
          
          <p className="text-[#cbd5e1] text-[1.25rem] font-light leading-[1.8] mb-12 border-l-[3px] border-[#5bb8e4] pl-8">
            NSG Solutions is a global leader in next-generation digital services and consulting. We enable clients across the world to navigate their digital transformation, applying AI-first frameworks and enterprise-grade architecture to achieve breakthrough results.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-y border-white/20 py-8">
            {[
              { num: "50+", label: "Countries" },
              { num: "100+", label: "Projects" },
              { num: "10+", label: "Years Exp." },
              { num: "95%", label: "Satisfaction" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col group cursor-default">
                 <span className="text-[2.5rem] font-infosys-heading font-bold text-white mb-1 group-hover:text-[#5bb8e4] transition-colors duration-300 drop-shadow-md">{stat.num}</span>
                 <span className="text-[12px] text-[#93c5fd] uppercase tracking-widest font-bold">{stat.label}</span>
              </div>
            ))}
          </div>

          <Link to="/about" className="inline-flex items-center gap-3 bg-white text-[#1e3a8a] px-10 py-4 rounded-full font-bold tracking-widest uppercase text-[13px] shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:bg-[#5bb8e4] hover:text-white hover:scale-105 transition-all duration-300">
            Discover our DNA <ArrowRight size={18} strokeWidth={3} />
          </Link>
        </motion.div>

        {/* Right Side: Image Group */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:w-1/2 relative group w-full"
        >
          {/* Animated Glowing Orb / Shadow behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#5bb8e4] to-transparent opacity-30 group-hover:opacity-60 transition-opacity duration-700 blur-[60px] rounded-full"></div>
          
          <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] bg-[#111]">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80" 
              alt="NSG Innovation Center" 
              className="w-full h-[600px] object-cover transform group-hover:scale-110 transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale-[20%]" 
            />
            {/* Dark overlay at bottom so image blends gracefully */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
          </div>
        </motion.div>
        
      </div>

      {/* WHY NSG - MINI SECTION */}
      <div>
        <div className="text-center mb-16">
           <h3 className="text-[3rem] font-infosys-heading text-white tracking-tight drop-shadow-sm">
             The <span className="text-[#5bb8e4]">NSG</span> Advantage
           </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Zap size={32} strokeWidth={1.5} />, title: "AI-Driven Solutions", desc: "Predictive analytics and machine learning embedded directly into your core systems." },
            { icon: <Globe size={32} strokeWidth={1.5} />, title: "Cloud-Native", desc: "Elastic, scalable application architectures deployed seamlessly across multi-cloud." },
            { icon: <TrendingUp size={32} strokeWidth={1.5} />, title: "Scalable Systems", desc: "Enterprise-grade frameworks strictly designed to handle massive data velocity." },
            { icon: <ShieldCheck size={32} strokeWidth={1.5} />, title: "End-to-End", desc: "From ideation strategy to full-stack deployment, we engineer every milestone." }
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="bg-white/10 backdrop-blur-[10px] border border-white/20 p-10 rounded-2xl hover:bg-white/20 hover:border-[#5bb8e4] hover:-translate-y-3 transition-all duration-500 group shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex flex-col items-start"
            >
              <div className="text-[#5bb8e4] mb-8 bg-white/10 p-4 rounded-xl drop-shadow-[0_0_15px_rgba(91,184,228,0.5)] transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                 {card.icon}
              </div>
              <h4 className="text-[1.3rem] font-bold text-white mb-4 tracking-wide font-sans">{card.title}</h4>
              <p className="text-[#e2e8f0] font-light leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export default AboutMNCLevel;
