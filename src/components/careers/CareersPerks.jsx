import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const stats = [
  { num: '5,000+', label: 'Employees Worldwide' },
  { num: '50+',    label: 'Countries' },
  { num: '92%',    label: 'Employee Satisfaction' },
  { num: '4.7★',   label: 'Glassdoor Rating' },
];

const perks = [
  { title: 'Health & Wellness',  sub: 'Full medical, dental & mental coverage for you and your family — globally.', color: '#ef4444' },
  { title: 'Stock & Equity',     sub: 'Employee stock options and performance bonuses tied directly to your impact.', color: '#22c55e' },
  { title: '$3K Learning Budget',sub: 'Annual budget for certifications, courses, and global tech conferences.', color: '#a855f7' },
  { title: 'Global Mobility',    sub: 'Rotational assignments across 50+ countries with full relocation support.', color: '#0ea5e9' },
  { title: 'Flexible Work',      sub: 'Hybrid-first culture. Work from home, office, or anywhere you thrive best.', color: '#f59e0b' },
  { title: 'Parental Leave',     sub: '26 weeks fully paid leave for all parents, regardless of gender.', color: '#14b8a6' },
];

/* Tiny inline SVG noise for the card texture */
const noiseSVG = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
  <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/></filter>
  <rect width='400' height='400' filter='url(#n)' opacity='1'/>
</svg>
`);

const CareersPerks = () => (
  <section className="bg-white overflow-hidden relative">

    {/* ── STATS BAND ── */}
    <div className="border-b border-[#e2e8f0]">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-14 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#e2e8f0]">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center py-8 px-4 group cursor-default"
          >
            <p className="text-[3rem] md:text-[3.8rem] font-infosys-heading font-bold text-[#111] leading-none mb-3 group-hover:text-[#007cc3] transition-colors duration-500">
              {s.num}
            </p>
            <p className="text-[#64748b] font-bold uppercase tracking-[0.25em] text-[10px]">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* ── MAIN CONTENT ── */}
    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 pt-24 pb-28 relative z-10">

      {/* Split header: big left text + CTA, cards on right */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-16 mb-16">

        {/* Left: Editorial heading */}
        <div className="lg:w-[38%] lg:sticky lg:top-32 self-start">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#007cc3] font-bold tracking-[0.3em] uppercase text-[11px] mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-[2px] bg-[#007cc3]"></span> Benefits
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[3.5rem] md:text-[5rem] font-infosys-heading text-[#111] font-bold leading-[0.95] tracking-tight mb-10"
          >
            We are<br />people<br />first
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#475569] font-light text-[1.05rem] leading-relaxed mb-12 max-w-[320px]"
          >
            Industry-leading benefits and a culture that invests in every dimension of your growth.
          </motion.p>

          <motion.a
            href="#roles"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 border border-[#cbd5e1] text-[#111] font-bold px-8 py-4 rounded-full uppercase tracking-widest text-[11px] hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-300 group"
          >
            See all roles <ArrowRight size={15} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Right: Solid white cards grid with clean grey borders */}
        <div className="lg:w-[62%] grid grid-cols-1 sm:grid-cols-2 gap-5">
          {perks.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 + Math.floor(i / 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="group relative rounded-[20px] overflow-hidden cursor-default flex flex-col justify-between min-h-[240px] p-8 bg-[#f8fafc] border border-[#e2e8f0] hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-[#cbd5e1] transition-all duration-500"
            >
              {/* Subtle noise texture layer for premium paper feel */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,${noiseSVG}")`,
                  backgroundSize: '200px 200px',
                }}
              />

              {/* Accent blob glow in corner (subtler on light mode) */}
              <div
                className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: p.color }}
              />

              {/* Sliding top accent on hover */}
              <div
                className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: p.color }}
              />

              {/* Card body */}
              <div className="relative z-10">
                {/* Dot accent */}
                <div
                  className="w-3 h-3 rounded-full mb-6 opacity-90 shadow-sm"
                  style={{ backgroundColor: p.color }}
                />

                <h3 className="text-[1.45rem] font-infosys-heading font-bold text-[#111] leading-tight mb-4 group-hover:text-[#007cc3] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[#64748b] font-light text-[14px] leading-relaxed group-hover:text-[#475569] transition-colors duration-500">
                  {p.sub}
                </p>
              </div>

              {/* LTM-style arrow CTA at bottom (light mode) */}
              <div className="relative z-10 mt-8 flex items-center gap-2 text-[#94a3b8] group-hover:text-[#007cc3] text-[12px] font-bold uppercase tracking-widest transition-colors duration-400">
                <ArrowRight size={14} strokeWidth={3} /> Read more
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default CareersPerks;
