import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Globe, BookOpen, Briefcase, TrendingUp, Heart } from 'lucide-react';

const benefits = [
  {
    title: "Competitive Salary",
    desc: "Globally benchmarked pay. Great work deserves great compensation — always.",
    icon: DollarSign,
    color: "#007cc3",
    num: "01",
  },
  {
    title: "Work From Anywhere",
    desc: "Remote-friendly by design. Work from our offices or wherever you do your best work.",
    icon: Globe,
    color: "#0e9f6e",
    num: "02",
  },
  {
    title: "Dedicated Learning Time",
    desc: "10% of your time is yours — for learning, R&D, and exploring new ideas.",
    icon: BookOpen,
    color: "#7c3aed",
    num: "03",
  },
  {
    title: "Health Coverage",
    desc: "Premium health insurance for you and your family, because your wellbeing comes first.",
    icon: Heart,
    color: "#e11d48",
    num: "04",
  },
  {
    title: "Real Ownership",
    desc: "Lead meaningful projects for large enterprise clients — real responsibility from day one.",
    icon: Briefcase,
    color: "#d97706",
    num: "05",
  },
  {
    title: "Clear Career Growth",
    desc: "Transparent tracks for technical and leadership paths — you always know what's next.",
    icon: TrendingUp,
    color: "#007cc3",
    num: "06",
  },
];

const BenefitCard = ({ title, desc, icon: Icon, color, num, idx }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group relative bg-white rounded-[1.5rem] border border-black/[0.06] overflow-hidden cursor-default"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
    >
      {/* Top colour stripe — slides in on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Huge faint number watermark */}
      <span
        className="absolute -bottom-3 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none transition-opacity duration-500 opacity-[0.04] group-hover:opacity-[0.08]"
        style={{ color }}
      >
        {num}
      </span>

      <div className="relative p-7 flex flex-col gap-5">
        {/* Icon pill */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]"
          style={{ background: `${color}18`, color }}
        >
          <Icon size={20} strokeWidth={2.2} />
        </div>

        <div>
          <h3 className="text-gray-900 font-bold text-[1.05rem] leading-snug mb-2 font-infosys-heading group-hover:text-[color:var(--c)] transition-colors duration-400"
            style={{ '--c': color }}
          >
            {title}
          </h3>
          <p className="text-black/45 text-[13px] leading-relaxed font-medium">
            {desc}
          </p>
        </div>

        {/* Animated bottom pill */}
        <div className="flex items-center gap-2 pt-1 overflow-hidden">
          <motion.div
            className="h-[2px] rounded-full"
            style={{ background: color }}
            initial={{ width: 16 }}
            whileHover={{ width: 40 }}
            transition={{ duration: 0.3 }}
          />
          <span
            className="text-[9px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-60 transition-opacity duration-400"
            style={{ color }}
          >
            {num}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const CareersBenefits = () => (
  <section className="py-24 px-6 bg-[#fdfaf6] relative overflow-hidden">
    {/* Very subtle dot pattern */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.025]"
      style={{ backgroundImage: 'radial-gradient(#007cc3 1px, transparent 1px)', backgroundSize: '28px 28px' }}
    />

    <div className="max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[#007cc3] font-bold uppercase tracking-[0.35em] text-[10px] block mb-5"
        >
          What You Get
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-infosys-heading italic"
        >
          Benefits That <span className="text-[#007cc3]">Actually Matter</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-black/40 text-base font-medium max-w-lg mx-auto italic"
        >
          We invest in our people because great work comes from great conditions.
        </motion.p>
      </div>

      {/* Responsive 3-col grid — compact, balanced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {benefits.map((b, idx) => (
          <BenefitCard key={idx} {...b} idx={idx} />
        ))}
      </div>
    </div>
  </section>
);

export default CareersBenefits;