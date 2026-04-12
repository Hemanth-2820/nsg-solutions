import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Database, Zap, ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TCSStyleSolutions from '../components/solutions/TCSStyleSolutions';

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#5bb8e4] rounded-full blur-[2px]"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.1,
            scale: Math.random() * 1.5 + 0.5
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            x: [null, Math.random() * 100 - 50],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>
  );
};

const Interactive3DHero = () => (
  <section className="relative w-full min-h-screen flex items-center bg-[#0a0f16] overflow-hidden">
    {/* Deep Layered Premium Background */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f16] to-[#050505] opacity-100"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-15 mix-blend-overlay"></div>
      {/* Secret Radial Glow Spec */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.3), transparent 50%)' }}></div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 80% 60%, rgba(91,184,228,0.15), transparent 40%)' }}></div>
    </div>

    <FloatingParticles />

    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full pt-[280px] lg:pt-[180px] relative z-10 flex flex-col lg:flex-row justify-between h-full items-center font-sans">

      {/* LEFT CONTENT COLUMN */}
      <div className="w-full lg:w-[60%] flex flex-col items-start relative z-20">

        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <Sparkles size={16} className="text-[#5bb8e4]" />
          <span className="text-[#5bb8e4] font-bold tracking-[0.3em] text-[12px] uppercase">Industry Solutions</span>
        </motion.div>

        {/* Animated Stagger Heading */}
        <div className="overflow-hidden pb-2 w-full">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-infosys-heading text-white leading-[1.05] tracking-tight drop-shadow-md"
          >
            Industry-Specific
          </motion.h1>
        </div>
        <div className="overflow-hidden pb-4 w-full">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-infosys-heading text-white leading-[1.05] tracking-tight drop-shadow-md"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5bb8e4] to-white">Solutions</span>
          </motion.h1>
        </div>

        {/* Subtext Paragraph */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-l-[3px] border-[#5bb8e4] pl-6 text-[#cbd5e1] text-[1.25rem] font-light max-w-2xl leading-[1.8] mt-6 mb-12"
        >
          We leverage deep domain knowledge to build custom technology solutions that address the unique challenges of your industry at global scale.
        </motion.p>

        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center gap-6"
        >
          <Link to="#explore" className="inline-flex items-center gap-3 bg-[#5bb8e4] text-[#050505] px-8 py-4 rounded-full font-bold tracking-widest uppercase text-[12px] hover:bg-white hover:shadow-[0_0_30px_rgba(91,184,228,0.6)] hover:scale-105 transition-all duration-300">
            Explore Solutions <ArrowRight size={16} strokeWidth={3} />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-3 bg-transparent border-[2px] border-white/30 text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-[12px] hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300">
            Contact Us
          </Link>
        </motion.div>

      </div>

      {/* RIGHT CONTENT COLUMN: 3D OBJECT PLACEHOLDER */}
      <div className="w-full lg:w-[40%] h-[400px] lg:h-full relative flex items-center justify-center mt-12 lg:mt-0 z-10">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-[#5bb8e4]/20 flex items-center justify-center shadow-[0_0_100px_rgba(91,184,228,0.15)] bg-gradient-to-tr from-white/5 to-transparent backdrop-blur-[2px]"
        >
          {/* Abstract Inner Core mimicking a highly complex node structure waiting for Spline */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-[#5bb8e4]/40"
          ></motion.div>
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-tr from-[#5bb8e4] to-white shadow-[0_0_50px_rgba(91,184,228,0.8)] animate-pulse"></div>

          {/* Notification Badge replacing standard text - premium SaaS feel */}
          <div className="absolute -right-10 top-20 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] px-6 py-3 rounded-full tracking-widest uppercase shadow-xl">
            Spline 3D Ready
          </div>
        </motion.div>
      </div>

    </div>

    {/* SCROLL INDICATOR */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
    >
      <span className="text-[#a0aab2] text-[10px] uppercase tracking-[0.2em] font-bold">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
      >
        <div className="w-1.5 h-3 bg-[#5bb8e4] rounded-full"></div>
      </motion.div>
    </motion.div>

  </section>
);

const customOfferings = [
  { title: 'Cybersecurity Assurance', icon: <ShieldCheck size={36} strokeWidth={1.5} className="mb-8" /> },
  { title: 'Big Data Integration', icon: <Database size={36} strokeWidth={1.5} className="mb-8" /> },
  { title: 'Serverless Acceleration', icon: <Zap size={36} strokeWidth={1.5} className="mb-8" /> },
];

const industries = [
  { name: 'Banking & Financial Services', bg: 'bg-[#6ebaba]', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&w=800&q=80', objectPos: 'center right' },
  { name: 'Insurance', bg: 'bg-[#82c6b4]', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&w=800&q=80', objectPos: 'center center' },
  { name: 'Healthcare', bg: 'bg-[#00acc1]', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&w=800&q=80', objectPos: 'center left' },
  { name: 'Life Sciences', bg: 'bg-[#009bba]', img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&w=800&q=80', objectPos: 'center center' },
  { name: 'Industrial', bg: 'bg-[#ffc107]', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&w=800&q=80', objectPos: 'center center' },
  { name: 'Software & Hi-Tech', bg: 'bg-[#ff7043]', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&w=800&q=80', objectPos: 'center center' },
];

const PersistentStyleGrid = () => {
  return (
    <section className="w-full bg-[#f5f7fa] font-sans pb-24">
      {/* Structural Header */}
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-24 pb-14">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-[2px] bg-[#1e3a8a]"></div>
          <span className="text-[#1e3a8a] font-bold tracking-[0.3em] text-[12px] uppercase">Industries</span>
        </div>
        <h2 className="text-[2.8rem] md:text-[3.8rem] font-infosys-heading text-[#111] tracking-tight">
          Solutions Across <span className="text-[#007cc3]">Industries</span>
        </h2>
      </div>

      {/* Grid Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-[1500px] mx-auto px-6 lg:px-12 gap-8 pb-8">
        {industries.map((industry, index) => (
          <motion.div
            key={industry.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
            className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-500`}
          >
            {/* Base Image Layer */}
            <div className="absolute inset-0 z-0">
              <img src={industry.img} alt={industry.name} style={{ objectPosition: industry.objectPos }} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </div>

            {/* Permanent Dark Overlay for Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>

            {/* Typography & CTA Container */}
            <div className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white font-infosys-heading font-bold text-[1.8rem] leading-[1.1] tracking-tight">
                {industry.name}
              </h3>
              <div className="mt-5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <span className="text-white font-bold tracking-[0.2em] font-sans uppercase text-[11px] flex items-center gap-2 group-hover:gap-4 transition-all">
                  Learn More <ArrowRight size={13} strokeWidth={3} />
                </span>
              </div>
            </div>

            {/* Hover Top Line */}
            <div className="absolute top-0 left-0 w-0 h-[3px] bg-[#007cc3] group-hover:w-full transition-all duration-700 z-30"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Interactive3DHero />

      <TCSStyleSolutions />

      <section className="bg-white border-t border-gray-100 py-24 px-6">
        <div className="max-w-[1500px] mx-auto font-sans lg:px-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-[2px] bg-[#1e3a8a]"></div>
            <span className="text-[#1e3a8a] font-bold tracking-[0.3em] text-[11px] uppercase">Edge Capabilities</span>
          </div>
          <h2 className="text-[2.8rem] md:text-[3.5rem] font-infosys-heading font-medium tracking-tight mb-16 leading-tight text-[#111]">
            Custom <span className="text-[#007cc3]">Edge Solutions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
            {customOfferings.map((offering, idx) => (
              <div key={idx} className="group p-12 hover:bg-[#f5f7fa] transition-colors duration-300 cursor-pointer flex flex-col min-h-[260px]">
                <div className="text-[#007cc3] mb-6">
                  {offering.icon}
                </div>
                <h4 className="text-[1.9rem] font-infosys-heading font-bold mb-auto tracking-tight leading-tight text-[#111] group-hover:text-[#007cc3] transition-colors">{offering.title}</h4>
                <Link to="/contact" className="text-[#007cc3] uppercase text-[12px] font-bold tracking-[0.15em] flex items-center gap-2 group-hover:gap-4 transition-all duration-300 mt-10">
                  REQUEST DEMO <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
