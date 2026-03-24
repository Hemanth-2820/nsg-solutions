import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Briefcase } from 'lucide-react';

const roles = [
  { title: 'Senior AI/ML Engineer',         dept: 'Engineering',      loc: 'Hyderabad / Remote',  type: 'Full-time', tag: 'HOT' },
  { title: 'Cloud Architect (AWS/Azure)',    dept: 'Cloud Services',   loc: 'Bengaluru / Remote',  type: 'Full-time', tag: '' },
  { title: 'Full Stack Developer (React)',   dept: 'Product',          loc: 'Remote',              type: 'Full-time', tag: 'NEW' },
  { title: 'Data Scientist – NLP',          dept: 'AI & Data',        loc: 'Mumbai',              type: 'Full-time', tag: 'HOT' },
  { title: 'UI/UX Lead Designer',           dept: 'Design',           loc: 'Remote',              type: 'Full-time', tag: 'NEW' },
  { title: 'DevOps / SRE Engineer',         dept: 'Infrastructure',   loc: 'Hyderabad',           type: 'Full-time', tag: '' },
  { title: 'Business Analyst – FinTech',    dept: 'Consulting',       loc: 'Delhi / Remote',      type: 'Full-time', tag: '' },
  { title: 'IT Strategy Consultant',        dept: 'Consulting',       loc: 'Global',              type: 'Full-time', tag: 'NEW' },
  { title: 'Marketing Technology Lead',     dept: 'Marketing',        loc: 'Remote',              type: 'Contract',  tag: '' },
];

const depts = ['All', 'Engineering', 'Cloud Services', 'Product', 'AI & Data', 'Design', 'Consulting', 'Marketing', 'Infrastructure'];

const tagColors = {
  HOT: 'bg-red-50 text-red-600 border-red-100',
  NEW: 'bg-emerald-50 text-emerald-600 border-emerald-100',
};

const CareersRoles = () => {
  const [filter, setFilter] = useState('All');
  const visible = roles.filter(r => filter === 'All' || r.dept === filter);

  return (
    <section className="bg-[#f5f7fa] py-28 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-[2px] bg-[#1e3a8a]"></div>
              <span className="text-[#1e3a8a] font-bold tracking-[0.3em] uppercase text-[11px]">Open Positions</span>
            </div>
            <h2 className="text-[2.8rem] md:text-[4rem] font-infosys-heading text-[#111] tracking-tight leading-tight">
              Find your <span className="text-[#007cc3]">next role</span>
            </h2>
          </div>
          <p className="text-[#64748b] font-light text-[1.05rem] max-w-md">
            We're hiring across all disciplines. Every role is an opportunity to shape the future of digital.
          </p>
        </div>

        {/* Dept Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-12">
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-6 py-2.5 rounded-full text-[12px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                filter === d
                  ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-[0_4px_20px_rgba(30,58,138,0.2)]'
                  : 'bg-white text-[#475569] border-gray-200 hover:border-[#1e3a8a] hover:text-[#1e3a8a]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div className="flex flex-col gap-4">
          {visible.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl px-8 py-6 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-[#007cc3]/30 transition-all duration-400 cursor-pointer"
            >
              {/* Left: Title + Meta */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-[1.2rem] font-infosys-heading font-bold text-[#111] group-hover:text-[#007cc3] transition-colors">
                    {role.title}
                  </h3>
                  {role.tag && (
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${tagColors[role.tag]}`}>
                      {role.tag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                  <span className="flex items-center gap-1.5 text-[#64748b] text-[13px]">
                    <Briefcase size={13} className="text-[#007cc3]" /> {role.dept}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#64748b] text-[13px]">
                    <MapPin size={13} className="text-[#007cc3]" /> {role.loc}
                  </span>
                  <span className="flex items-center gap-1.5 text-[#64748b] text-[13px]">
                    <Clock size={13} className="text-[#007cc3]" /> {role.type}
                  </span>
                </div>
              </div>

              {/* Right: CTA */}
              <div className="shrink-0">
                <span className="inline-flex items-center gap-2 text-[#007cc3] font-bold uppercase tracking-widest text-[12px] group-hover:gap-4 transition-all duration-300">
                  Apply Now <ArrowRight size={15} strokeWidth={3} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-20 text-[#94a3b8] font-bold uppercase tracking-widest">
            No open roles in this category right now.
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#64748b] text-[1.05rem] mb-6">
            Don't see the right fit? We're always looking for exceptional talent.
          </p>
          <button className="border-[2px] border-[#1e3a8a] text-[#1e3a8a] px-12 py-4 rounded-full font-bold tracking-widest uppercase text-[12px] hover:bg-[#1e3a8a] hover:text-white hover:shadow-[0_10px_30px_rgba(30,58,138,0.25)] hover:scale-105 transition-all duration-300">
            Send Speculative Application
          </button>
        </div>

      </div>
    </section>
  );
};

export default CareersRoles;
