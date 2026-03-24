import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const servicesList = [
  { title: 'Digital Engineering', desc: 'Scalable applications using modern technologies like microservices, cloud, and DevOps.', img: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80', badge: 'CORE' },
  { title: 'Software Development', desc: 'Custom web & mobile applications, Enterprise software solutions built for extreme performance.', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', badge: 'CUSTOM' },
  { title: 'Cloud Services', desc: 'Cloud migration, native application development, and resilient infrastructure management.', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', badge: 'CLOUD' },
  { title: 'AI & Data Analytics', desc: 'Machine learning, predictive analytics, and executive business intelligence dashboards.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', badge: 'DATA' },
  { title: 'IT Consulting', desc: 'Business strategy planning, technology alignment, and digital transformation roadmaps.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', badge: 'STRATEGY' },
  { title: 'Media Production', desc: 'Corporate virtual assets, high-fidelity promotional visualizations, and 3D integration.', img: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80', badge: 'CREATIVE' },
];

const ServicesGrid = () => {
  return (
    <section className="bg-[#f8fafc] py-32 overflow-hidden w-full relative">
      {/* Light subtle abstract pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Subtle Section Tag */}
        <div className="mb-16 flex items-center gap-4">
           <div className="w-10 h-[2px] bg-[#007cc3]"></div>
           <span className="text-[#007cc3] font-bold tracking-[0.2em] uppercase text-[12px]">Our Capabilities Matrix</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesList.map((service, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.15, ease: "easeOut" }}
              className="group relative bg-white rounded-3xl cursor-pointer border border-gray-100 hover:border-[#007cc3]/30 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,124,195,0.12)] hover:-translate-y-3 transition-all duration-500 overflow-hidden flex flex-col h-[500px]"
            >
              {/* Image Header Block */}
              <div className="h-[220px] w-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-[#007cc3]/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                 <img src={service.img} alt={service.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-110 group-hover:-rotate-1 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                 
                 {/* Glass Badge */}
                 <div className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md border border-white px-4 py-1.5 rounded-full shadow-sm">
                    <span className="text-[#007cc3] font-bold tracking-widest uppercase text-[10px]">{service.badge}</span>
                 </div>
              </div>

              {/* Text Body */}
              <div className="p-10 flex flex-col justify-between flex-grow bg-white z-20 relative">
                 <div className="relative z-10">
                    <h3 className="text-[1.8rem] lg:text-[2rem] font-bold font-infosys-heading text-[#111] mb-4 leading-tight group-hover:text-[#007cc3] transition-colors">{service.title}</h3>
                    <p className="text-[#475569] font-light text-[15px] xl:text-[16px] leading-relaxed mb-8">{service.desc}</p>
                 </div>
                 
                 {/* Push CTA to bottom dynamically */}
                 <div className="mt-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 relative z-10">
                   <span className="text-[#007cc3] font-sans font-bold uppercase tracking-[0.2em] text-[12px] flex items-center gap-3 bg-[#f8fafc] w-max px-6 py-3 rounded-full border border-gray-100 group-hover:bg-[#007cc3] group-hover:text-white group-hover:border-[#007cc3] transition-all">
                     Explore Capability <ArrowRight size={16} strokeWidth={3} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                   </span>
                 </div>
                 
                 {/* Ghost Icon background element strictly for light mode */}
                 <ArrowRight size={120} className="absolute -bottom-10 -right-10 text-gray-50 opacity-20 transform -rotate-45 pointer-events-none group-hover:scale-110 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-transform duration-700" />
              </div>

              {/* Glowing Top Frame Accents */}
              <div className="absolute top-0 left-0 w-0 h-[4px] bg-gradient-to-r from-[#007cc3] to-[#5bb8e4] group-hover:w-full transition-all duration-700 ease-out z-30"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
