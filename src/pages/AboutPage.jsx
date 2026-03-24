import React, { useEffect, useRef } from 'react';
import { Target, Flag, Users, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';

const InnerPageHero = ({ title, subtitle, bgImage }) => (
  <section className="relative w-full h-[600px] flex items-center bg-[#111]">
    <div className="absolute inset-0 z-0 opacity-50">
       <img src={bgImage} alt="Hero" className="w-full h-full object-cover grayscale mix-blend-overlay" />
    </div>
    <div className="max-w-[1400px] mx-auto px-6 w-full pt-32 relative z-10 font-sans">
      <h1 className="text-[4rem] md:text-[5.5rem] font-infosys-heading text-white leading-[1.05] tracking-tight mb-6 mt-10">
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
      gsap.from('.gsap-metric', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5
      });
      
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
              <h2 className="text-[3rem] font-infosys-heading mb-10 text-[#111] leading-tight gsap-title">
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
            
            <div className="lg:w-1/2 grid grid-cols-2 gap-8">
               {[
                 { num: "50+", label: "Global Clients", icon: <Users size={24}/> },
                 { num: "3M+", label: "Code Deployed", icon: <Activity size={24}/> },
                 { num: "99%", label: "Uptime Guaranteed", icon: <CheckCircle2 size={24}/> },
                 { num: "A+", label: "Security Rating", icon: <ShieldCheck size={24}/> }
               ].map((metric, i) => (
                 <div key={i} className="bg-[#f8f8f8] p-8 border-t-[4px] border-[#007cc3] gsap-metric transform hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-[#007cc3] mb-6">{metric.icon}</div>
                    <h3 className="text-4xl font-infosys-heading font-medium text-[#111] mb-2">{metric.num}</h3>
                    <p className="text-sm font-bold tracking-widest uppercase text-gray-500">{metric.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111] text-white py-24">
         <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20 font-sans">
            <div className="group cursor-pointer">
               <div className="mb-8 p-6 bg-white/5 inline-block rounded-sm group-hover:bg-[#007cc3] transition-colors duration-500">
                  <Target size={40} className="text-[#5bb8e4] group-hover:text-white transition-colors"/>
               </div>
               <h3 className="text-3xl font-infosys-heading mb-6 tracking-tight">Our Mission</h3>
               <p className="text-gray-300 font-light text-lg leading-relaxed border-l-[3px] border-[#333] pl-6 group-hover:border-[#007cc3] transition-colors">
                 To deliver high-quality software solutions and enable business growth through innovative strategies. We streamline IT architectures globally to ensure resilience.
               </p>
            </div>
            
            <div className="group cursor-pointer">
               <div className="mb-8 p-6 bg-white/5 inline-block rounded-sm group-hover:bg-[#007cc3] transition-colors duration-500">
                  <Flag size={40} className="text-[#5bb8e4] group-hover:text-white transition-colors"/>
               </div>
               <h3 className="text-3xl font-infosys-heading mb-6 tracking-tight">Our Vision</h3>
               <p className="text-gray-300 font-light text-lg leading-relaxed border-l-[3px] border-[#333] pl-6 group-hover:border-[#007cc3] transition-colors">
                 To become the definitive global leader in digital transformation and cloud consulting services, shaping the technological frontier for enterprises worldwide.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default AboutPage;
