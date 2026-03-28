import React, { useEffect, useRef } from 'react';
import { Target, Flag, Users, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import FounderSection from '../components/about/FounderSection';
import TeamSection from '../components/about/TeamSection';
import OfficeGallery from '../components/about/OfficeGallery';

const InnerPageHero = ({ title, subtitle, bgImage }) => (
  <section className="relative w-full h-[600px] flex items-center bg-[#111]">
    <div className="absolute inset-0 z-0 opacity-50">
      <img src={bgImage} alt="Hero" className="w-full h-full object-cover grayscale mix-blend-overlay" />
    </div>
    <div className="max-w-[1400px] mx-auto px-6 w-full pt-32 relative z-10 font-sans">
      <h1 className="text-[3.5rem] md:text-[5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-6 mt-10">
        {title}
      </h1>
      <p className="border-l-[3px] border-[#007cc3] pl-6 text-white text-[1.4rem] font-light max-w-2xl leading-relaxed opacity-90">
        {subtitle}
      </p>
    </div>
  </section>
);

const AboutPage = () => {
  const comp = useRef(null);

  useEffect(() => {
    // Top-tier Corporate GSAP stagger setup
    const ctx = gsap.context(() => {
      gsap.from('.gsap-title', {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
      });

      gsap.to('.gsap-line', {
        width: '100%',
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.2
      });
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white" ref={comp}>
      <InnerPageHero
        title="Who We Are"
        subtitle="We navigate global enterprises through their digital transformation. Driven by innovation, engineered perfectly."
        bgImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
      />

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 font-sans">

          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-[2.5rem] md:text-[3rem] font-extrabold mb-10 text-[#111] leading-tight gsap-title tracking-tight">
                Engineering Digital Excellence <br /> <span className="text-[#007cc3]">for Tomorrow.</span>
              </h2>
              <div className="h-[2px] bg-gray-200 w-full mb-10 overflow-hidden">
                <div className="h-full bg-[#007cc3] w-0 gsap-line"></div>
              </div>
              <p className="text-xl text-[#333] font-light leading-relaxed mb-6">
                NSG Solutions is a modern IT services and consulting enterprise focused on delivering highly scalable digital frameworks alongside bespoke cloud intelligence.
              </p>
              <p className="text-xl text-[#333] font-light leading-relaxed mb-10">
                Our strategy combines agile software methodology, advanced data infrastructure mapping, and global-scale cloud optimization to steer complex organizations into the future securely.
              </p>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              {[
                { 
                  num: "50+", 
                  label: "Global Clients", 
                  icon: <Users size={32} />,
                  bg: "bg-[#007cc3]", // NSG Blue
                  hover: "hover:bg-[#006bb0]"
                },
                { 
                  num: "3M+", 
                  label: "Code Deployed", 
                  icon: <Activity size={32} />,
                  bg: "bg-[#4f46e5]", // Indigo
                  hover: "hover:bg-[#4338ca]"
                },
                { 
                  num: "99%", 
                  label: "Uptime Guaranteed", 
                  icon: <CheckCircle2 size={32} />,
                  bg: "bg-[#10b981]", // Emerald
                  hover: "hover:bg-[#059669]"
                },
                { 
                  num: "A+", 
                  label: "Security Rating", 
                  icon: <ShieldCheck size={32} />,
                  bg: "bg-[#e11d48]", // Rose
                  hover: "hover:bg-[#be123c]"
                }
              ].map((metric, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={`${metric.bg} ${metric.hover} p-10 md:p-12 text-white shadow-xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="opacity-40 mb-10 group-hover:opacity-100 transition-opacity">
                    {metric.icon}
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-5xl md:text-6xl font-black mb-3 tracking-tighter leading-none">{metric.num}</h3>
                    <p className="text-[11px] font-black tracking-[0.3em] uppercase opacity-80">{metric.label}</p>
                  </div>

                  {/* Geometric Decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 -translate-y-1/2 translate-x-1/2 rotate-45 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-white">
          
          {/* Mission Card: More Compact with Blueprint Accents */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            className="group cursor-default bg-gradient-to-br from-[#007cc3] to-[#00a3ff] p-8 md:p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col items-start border border-white/20"
          >
            {/* Corner Decor */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-3xl group-hover:border-white/60 transition-colors" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-3xl group-hover:border-white/60 transition-colors" />

            <div className="mb-6 w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg border border-white/30">
              <Target size={32} className="text-white group-hover:scale-125 transition-transform" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Our Mission</h3>
            <p className="text-white/90 font-medium text-lg leading-relaxed border-l-2 border-white/40 pl-6 group-hover:border-white transition-colors duration-500">
              Deliver high-quality software and enable growth through innovative strategies. Streamline IT architectures globally.
            </p>

            <div className="mt-8 h-1 w-16 bg-white/40 rounded-full group-hover:w-full transition-all duration-700" />
          </motion.div>

          {/* Vision Card: Bold Straight Font */}
          <motion.div 
            whileHover={{ y: -8, scale: 1.01 }}
            className="group cursor-default bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] p-8 md:p-10 rounded-[2.5rem] shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col items-start border border-white/20"
          >
            {/* Corner Decor */}
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/20 rounded-tr-3xl group-hover:border-white/60 transition-colors" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/20 rounded-bl-3xl group-hover:border-white/60 transition-colors" />

            <div className="mb-6 w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg border border-white/30">
              <Flag size={32} className="text-white group-hover:scale-125 transition-transform" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">Our Vision</h3>
            <p className="text-white/90 font-medium text-lg leading-relaxed border-l-2 border-white/40 pl-6 group-hover:border-white transition-colors duration-500">
              Become the definitive global leader in digital transformation, shaping the technological frontier worldwide.
            </p>

            <div className="mt-8 h-1 w-16 bg-white/40 rounded-full group-hover:w-full transition-all duration-700" />
          </motion.div>

        </div>
      </section>

      {/* Placeholders handled by the Developer (Rahul) */}
      <FounderSection />
      <TeamSection />
      <OfficeGallery />
    </div>
  );
};

export default AboutPage;
