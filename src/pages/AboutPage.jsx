import React, { useEffect, useRef, useState } from 'react';
import { Target, Flag, Users, Activity, CheckCircle2, ShieldCheck, Rocket, Zap, Globe, Layers, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import LeadershipSection from '../components/about/LeadershipSection';
import TeamSection from '../components/about/TeamSection';
import OfficeGallery from '../components/about/OfficeGallery';
import aboutbgImage from '../assets/about-bgImage.png';

const InnerPageHero = ({ title, subtitle, bgImage }) => (
  <section className="relative w-full min-h-[500px] md:h-[700px] flex items-center bg-[#111] pt-[280px]">

    <div className="absolute inset-0 z-0">
      <img
        src={bgImage}
        alt="Hero"
        className="w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
    </div>

    <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 font-sans">

      <div className="pl-2 md:pl-4">

        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] font-extrabold text-white mb-8 drop-shadow-[0_6px_30px_rgba(0,0,0,1)]">
          {title}
        </h1>

        <p className="border-l-[3px] border-[#00a3ff] pl-6 text-white text-[1.1rem] md:text-[1.4rem] font-medium leading-relaxed drop-shadow-[0_4px_20px_rgba(0,0,0,1)] max-w-lg">
          {subtitle}
        </p>

      </div>

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
        bgImage={aboutbgImage}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 font-sans">

          <div className="flex flex-col lg:flex-row gap-10 md:gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-[2.2rem] md:text-[3rem] font-extrabold mb-8 text-[#111] leading-tight gsap-title tracking-tight">
                Engineering Digital Excellence <br className="hidden md:block" /> <span className="text-[#007cc3]">for Tomorrow.</span>
              </h2>
              <div className="h-[2px] bg-gray-200 w-full mb-8 overflow-hidden">
                <div className="h-full bg-[#007cc3] w-0 gsap-line"></div>
              </div>
              <p className="text-xl text-[#333] font-light leading-relaxed mb-6">
                NSG Solutions Private Limited is a multi-domain company delivering IT services, video production, Animation, Designing, Digital Marketing and training.
              </p>
              <p className="text-xl text-[#333] font-light leading-relaxed mb-10">
                We help businesses build technology, create impactful content, and grow digitally.
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
                  className={`${metric.bg} ${metric.hover} p-8 sm:p-12 text-white shadow-xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden`}
                >
                  <div className="opacity-40 mb-6 group-hover:opacity-100 transition-opacity">
                    {metric.icon}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-4xl sm:text-6xl font-black mb-3 tracking-tighter leading-none">{metric.num}</h3>
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase opacity-80">{metric.label}</p>
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
              To become a leading global provider of innovative technology and digital solutions.
            </p>

            <div className="mt-8 h-1 w-16 bg-white/40 rounded-full group-hover:w-full transition-all duration-700" />
          </motion.div>

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
              To deliver scalable, cost-effective, and high-quality services that empower businesses.
            </p>

            <div className="mt-8 h-1 w-16 bg-white/40 rounded-full group-hover:w-full transition-all duration-700" />
          </motion.div>

        </div>

        {/* Motto Section */}
        <div className="max-w-6xl mx-auto px-6 mt-16 font-sans pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative w-full py-16 md:py-24 text-center bg-gradient-to-br from-[#060B27] via-[#1E1B4B] to-[#000] border border-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 px-6"
          >
            {/* Ambient Atmosphere Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <span className="relative z-10 text-[#00a3ff] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-[9px] md:text-[10px] mb-6 md:mb-8 block drop-shadow-lg">
              Our Motto
            </span>

            <h2 className="relative z-10 text-3xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
              Innovate. Build. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a3ff] to-[#60a5fa] drop-shadow-sm">Grow.</span>
            </h2>

            <div className="relative z-10 flex justify-center gap-6 mt-10">
              <div className="h-1.5 w-16 bg-[#007cc3] rounded-full" />
              <div className="h-1.5 w-16 bg-[#4f46e5] rounded-full" />
              <div className="h-1.5 w-16 bg-[#00a3ff] rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Corporate Summary Section (Why Choose Us / Strength / Future) */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100 font-sans">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-gradient-to-br from-[#007cc3] to-[#00a3ff] rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/10"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#007cc3] mb-10 shadow-lg">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">Why Choose Us</h3>
              <ul className="space-y-5">
                {[
                  'End-to-end services under one roof',
                  'Cost-effective & scalable solutions',
                  'Client-focused approach',
                  'Innovative and modern technology'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-blue-50 font-bold text-sm tracking-tight border-l-4 border-white/40 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Strength */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-10 bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/10"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-700 mb-10 shadow-lg">
                <Rocket size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">Our Strength</h3>
              <ul className="space-y-5">
                {[
                  'Multi-domain expertise',
                  'Real-time project execution',
                  'Fast delivery with quality',
                  'Strong support & maintenance'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-indigo-50 font-bold text-sm tracking-tight border-l-4 border-white/40 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Future Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 bg-gradient-to-br from-[#059669] to-[#10b981] rounded-[2.5rem] shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/10"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-700 mb-10 shadow-lg">
                <Globe size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">Future Goals</h3>
              <ul className="space-y-5">
                {[
                  'Expand AI & SaaS solutions',
                  'Grow digital marketing division',
                  'Enter global market',
                  'Build scalable products'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-emerald-50 font-bold text-sm tracking-tight border-l-4 border-white/40 pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Placeholders handled by the Developer (Rahul) */}
      {/* Leadership Collective Section */}
      <LeadershipSection />

      <TeamSection />
      <OfficeGallery />
    </div>
  );
};

export default AboutPage;
