import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const capabilities = [
  {
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    tag: "WHITEPAPER",
    title: "Digital Engineering\nAccelerating cloud foundation",
    revealText: "How can people and AI thrive together? Explore our leadership traits to achieve breakthrough results and outperform peers in the modern landscape.",
  },
  {
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    tag: "RESEARCH REPORT",
    title: "AI innovation is nonstop.\nDelivering value securely.",
    revealText: "Continuous digital transformation requires an infrastructure that can scale dynamically. Discover how secure frameworks empower continuous deployment.",
  },
  {
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tag: "PERSPECTIVE",
    title: "Making self-funding\nsupply chains real",
    revealText: "Unlock operational excellence by integrating end-to-end data pipelines that identify cost-saving initiatives across the entire global supply chain.",
  },
];

const CapabilitiesSection = () => (
  <section className="py-28 bg-white relative overflow-hidden">
    {/* Subtle top border */}
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

    <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#1e3a8a]"></div>
            <span className="text-[#1e3a8a] font-bold tracking-[0.25em] uppercase text-[11px]">Our Capabilities</span>
          </div>
          <h2 className="text-[2.8rem] md:text-[3.5rem] font-infosys-heading text-[#111] tracking-tight leading-tight">
            Navigate your next in<br />
            <span className="text-[#007cc3]">Digital Services</span>
          </h2>
        </div>
        <a href="/services" className="hidden md:inline-flex items-center gap-2 text-[#007cc3] font-bold text-[13px] uppercase tracking-widest hover:gap-4 transition-all">
          All Services <ArrowRight size={16} strokeWidth={3} />
        </a>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {capabilities.map((cap, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
          >
            {/* Image */}
            <div className="h-[220px] overflow-hidden relative">
              <img
                src={cap.img} alt={cap.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>
              <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-[#1e3a8a] font-bold tracking-widest uppercase text-[10px] px-4 py-1.5 rounded-full">
                {cap.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="w-8 h-[2px] bg-[#007cc3] mb-5 group-hover:w-16 transition-all duration-500"></div>
              <h3 className="text-[1.5rem] font-infosys-heading font-bold text-[#111] leading-[1.2] tracking-tight mb-4 whitespace-pre-line group-hover:text-[#007cc3] transition-colors duration-300">
                {cap.title}
              </h3>
              <p className="text-[#64748b] font-light text-[15px] leading-relaxed mb-8 flex-grow">
                {cap.revealText}
              </p>
              <span className="text-[#007cc3] font-bold uppercase tracking-widest text-[12px] flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                Expand <ArrowRight size={14} strokeWidth={3} />
              </span>
            </div>

            {/* Blue top accent line */}
            <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#007cc3] group-hover:w-full transition-all duration-700"></div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CapabilitiesSection;
